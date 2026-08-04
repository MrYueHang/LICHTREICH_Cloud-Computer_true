#!/usr/bin/env python3
"""LICHTREICH BookLab Local — stdlib-only archive/canon bootstrap."""
from __future__ import annotations

import argparse
import csv
import hashlib
import html
import json
import re
import shutil
import socketserver
import threading
import webbrowser
import zipfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler
from pathlib import Path

TEXT_EXTS = {".md", ".txt", ".csv", ".json", ".jsonl", ".yaml", ".yml", ".vtt"}
ALLOWED = TEXT_EXTS | {".docx", ".pdf", ".png", ".jpg", ".jpeg", ".webp", ".zip"}
VERSION_RE = re.compile(r"(?:^|[_\- ])v(\d{1,3})", re.I)
PATTERNS = {
    "nichts": re.compile(r"\bnichts\b", re.I),
    "nicht_nichts": re.compile(r"\bnicht\s+nichts\b", re.I),
    "auf_jeden_fall": re.compile(r"\bauf\s+jeden\s+fall\b", re.I),
    "offen": re.compile(r"\boffen\w*", re.I),
    "kreis": re.compile(r"\bkreis\w*", re.I),
    "grenze": re.compile(r"\bgrenz\w*", re.I),
    "tragen": re.compile(r"\btragen\b|\btr(?:ä|ae)gt\b", re.I),
    "duerfen": re.compile(r"\bdarf\b|\bd(?:ü|ue)rf\w*", re.I),
    "gleichzeitig": re.compile(r"\bgleichzeitig\b|\bzugleich\b", re.I),
    "nicht_sondern": re.compile(r"\bnicht\b.{0,160}\bsondern\b", re.I),
    "weder_noch": re.compile(r"\bweder\b.{0,160}\bnoch\b", re.I),
}


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        while block := handle.read(1024 * 1024):
            h.update(block)
    return h.hexdigest()


def version(name: str) -> str | None:
    match = VERSION_RE.search(Path(name).stem)
    return f"v{int(match.group(1))}" if match else None


def classify(path: Path) -> tuple[str, str]:
    low = str(path).lower()
    if "full_manuscript_v15" in low:
        return "canon", "CANON_FROZEN"
    if "editorial_preproduction_v16" in low or "redaktionsmatrix_v16" in low or "kapitel_expose_v16" in low:
        return "proposal", "PROPOSAL_REVIEW"
    if any(token in low for token in ("qa_report", "audit", "handoff", "production_contract", "gate")):
        return "governance", "REFERENCE"
    if any(token in low for token in ("reference-first", "matrix_bedeutender", "unsichtbare")):
        return "reference", "REFERENCE_ONLY"
    if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"} or any(token in low for token in ("cover", "sketch", "visual")):
        return "asset", "WORKING_ASSET"
    if "full_manuscript" in low or re.search(r"kapitel_\d", low):
        return "manuscript-history", "ARCHIVE"
    if path.suffix.lower() in {".json", ".jsonl", ".csv", ".yaml", ".yml"}:
        return "structured-data", "WORKING_DATA"
    return "document", "WORKING_DOCUMENT"


def safe_extract(source: Path, target: Path) -> list[Path]:
    target.mkdir(parents=True, exist_ok=True)
    root = target.resolve()
    files: list[Path] = []
    with zipfile.ZipFile(source) as archive:
        for item in archive.infolist():
            if item.is_dir():
                continue
            destination = (target / item.filename.replace("\\", "/")).resolve()
            if root not in destination.parents:
                raise ValueError(f"unsafe ZIP path: {item.filename}")
            destination.parent.mkdir(parents=True, exist_ok=True)
            with archive.open(item) as src, destination.open("wb") as dst:
                shutil.copyfileobj(src, dst)
            files.append(destination)
    return files


def ensure(project: Path) -> None:
    for rel in ("raw/packages", "raw/extracted", "canon", "proposals", "manifest", "ledgers", "dashboard", "releases"):
        (project / rel).mkdir(parents=True, exist_ok=True)
    ignore = project / ".gitignore"
    if not ignore.exists():
        ignore.write_text("raw/\ncanon/\nreleases/\nassets/\n*.zip\n*.pdf\n*.docx\n.env\n", encoding="utf-8")


def records_path(project: Path) -> Path:
    return project / "manifest/files.jsonl"


def load(project: Path) -> list[dict]:
    path = records_path(project)
    if not path.exists():
        return []
    result = []
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        try:
            result.append(json.loads(line))
        except json.JSONDecodeError:
            pass
    return result


def save(project: Path, records: list[dict]) -> None:
    with records_path(project).open("w", encoding="utf-8") as handle:
        for row in records:
            handle.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")


def source_files(source: Path):
    if source.is_file():
        yield source
        return
    for path in sorted(source.rglob("*")):
        if path.is_file() and path.suffix.lower() in ALLOWED and not any(part.startswith(".") for part in path.parts):
            yield path


def register(path: Path, stored: Path, package: str, extracted_from: str | None, duplicate_of: str | None) -> dict:
    sha = digest(path)
    category, status = classify(path)
    source_key = hashlib.sha1(str(path).encode()).hexdigest()[:8]
    return {
        "id": f"FILE-{sha[:12]}-{source_key}",
        "source_path": str(path), "stored_path": str(stored), "name": path.name,
        "extension": path.suffix.lower(), "size": path.stat().st_size, "sha256": sha,
        "category": category, "status": status, "version": version(path.name),
        "package": package, "extracted_from": extracted_from, "duplicate_of": duplicate_of,
        "modified_utc": datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).replace(microsecond=0).isoformat(),
    }


def import_source(project: Path, sources: list[Path]) -> dict:
    ensure(project)
    rows = load(project)
    hash_index = {row["sha256"]: row for row in rows}
    occurrences = {(row["source_path"], row["sha256"]) for row in rows}
    queue: list[tuple[Path, str, str]] = []
    imported = skipped = 0
    for root in sources:
        root = root.expanduser().resolve()
        if not root.exists():
            print(f"WARN source missing: {root}")
            continue
        for source in source_files(root):
            sha = digest(source)
            occurrence = (str(source), sha)
            if occurrence in occurrences:
                skipped += 1
                continue
            duplicate = hash_index.get(sha)
            if duplicate:
                stored = Path(duplicate["stored_path"])
            else:
                stored = project / "raw/packages" / f"{sha[:12]}__{source.name}"
                shutil.copy2(source, stored)
            row = register(source, stored, root.name, None, duplicate["id"] if duplicate else None)
            rows.append(row)
            hash_index.setdefault(sha, row)
            occurrences.add(occurrence)
            imported += 1
            if source.suffix.lower() == ".zip" and not duplicate:
                queue.append((stored, sha, source.name))
    for archive, archive_sha, archive_name in queue:
        destination = project / "raw/extracted" / f"{Path(archive_name).stem}__{archive_sha[:12]}"
        try:
            extracted = safe_extract(archive, destination)
        except (zipfile.BadZipFile, OSError, ValueError) as exc:
            print(f"WARN archive skipped: {archive_name}: {exc}")
            continue
        for source in extracted:
            sha = digest(source)
            occurrence = (str(source), sha)
            if occurrence in occurrences:
                continue
            duplicate = hash_index.get(sha)
            row = register(source, source, archive_name, archive_sha, duplicate["id"] if duplicate else None)
            rows.append(row)
            hash_index.setdefault(sha, row)
            occurrences.add(occurrence)
    save(project, rows)
    promote(project, rows)
    return {"imported": imported, "skipped": skipped, "records": len(rows)}


def promote(project: Path, rows: list[dict]) -> None:
    canon = [row for row in rows if row["status"] == "CANON_FROZEN" and row["extension"] == ".md"]
    canon.sort(key=lambda row: row["modified_utc"], reverse=True)
    target = project / "canon/OFFENER_KREIS_v15_CANON.md"
    if canon and not target.exists():
        shutil.copy2(canon[0]["stored_path"], target)
    proposals = sorted((row for row in rows if row["status"] == "PROPOSAL_REVIEW"), key=lambda row: row["name"].lower())
    lines = ["# v16 proposal index", "", "These files do not modify canon automatically.", ""]
    lines += [f"- `{row['name']}` · `{row['sha256'][:12]}`" for row in proposals]
    (project / "proposals/V16_PREPRODUCTION_INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def read_text(path: Path) -> str:
    if path.suffix.lower() in TEXT_EXTS:
        return path.read_text(encoding="utf-8", errors="replace")[:12_000_000]
    if path.suffix.lower() == ".docx":
        try:
            with zipfile.ZipFile(path) as archive:
                xml = archive.read("word/document.xml").decode("utf-8", errors="replace")
            return re.sub(r"<[^>]+>", " ", xml)[:12_000_000]
        except Exception:
            return ""
    return ""


def write_csv(path: Path, rows: list[dict]) -> None:
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def phrase_ledgers(project: Path, rows: list[dict]) -> dict:
    finds = []
    oppositions = []
    nothing = []
    seen = set()
    for record in rows:
        if record["extension"] not in TEXT_EXTS | {".docx"}:
            continue
        path = Path(record["stored_path"])
        if not path.exists() or path.stat().st_size > 30_000_000:
            continue
        for line_no, line in enumerate(read_text(path).splitlines(), 1):
            text = re.sub(r"\s+", " ", line).strip()
            tags = [name for name, pattern in PATTERNS.items() if pattern.search(text)]
            key = (record["name"], line_no, text)
            if not tags or key in seen:
                continue
            seen.add(key)
            item = {"source": record["name"], "line": line_no, "version": record.get("version") or "", "status": record["status"], "tags": "|".join(tags), "excerpt": text[:700]}
            finds.append(item)
            if "nichts" in tags:
                nothing.append(item)
            if any(tag in tags for tag in ("nicht_nichts", "nicht_sondern", "weder_noch", "gleichzeitig")):
                oppositions.append(item)
    write_csv(project / "ledgers/SPRACHFUNDE_LEDGER.csv", finds)
    write_csv(project / "ledgers/NICHTS_CONCORDANCE.csv", nothing)
    write_csv(project / "ledgers/WORTSINN_GEGENSATZ_LEDGER.csv", oppositions)
    return {"phrase_finds": len(finds), "nothing_finds": len(nothing), "oppositions": len(oppositions)}


def audit(project: Path) -> dict:
    ensure(project)
    rows = load(project)
    hashes = defaultdict(list)
    names = defaultdict(list)
    for row in rows:
        hashes[row["sha256"]].append(row)
        names[row["name"].lower()].append(row)
    duplicates = [{"sha256": sha, "count": len(items), "files": [item["source_path"] for item in items]} for sha, items in hashes.items() if len(items) > 1]
    collisions = [{"name": name, "count": len(items), "hashes": sorted({item["sha256"] for item in items})} for name, items in names.items() if len({item["sha256"] for item in items}) > 1]
    phrase = phrase_ledgers(project, rows)
    summary = {
        "generated_utc": now(), "files": len(rows), "bytes": sum(row["size"] for row in rows),
        "category_counts": dict(Counter(row["category"] for row in rows)),
        "status_counts": dict(Counter(row["status"] for row in rows)),
        "exact_duplicate_groups": len(duplicates), "name_collision_groups": len(collisions), **phrase,
    }
    (project / "manifest/summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    (project / "manifest/duplicates.json").write_text(json.dumps(duplicates, ensure_ascii=False, indent=2), encoding="utf-8")
    (project / "manifest/name-collisions.json").write_text(json.dumps(collisions, ensure_ascii=False, indent=2), encoding="utf-8")
    dashboard(project, summary, rows)
    return summary


def dashboard(project: Path, summary: dict, rows: list[dict]) -> None:
    cards = "".join(f"<div><b>{html.escape(key)}</b><span>{value}</span></div>" for key, value in (("files", summary["files"]), ("phrase finds", summary["phrase_finds"]), ("Nichts", summary["nothing_finds"]), ("oppositions", summary["oppositions"])))
    body = "".join(f"<tr><td>{html.escape(row['status'])}</td><td>{html.escape(str(row.get('version') or ''))}</td><td>{html.escape(row['name'])}</td><td>{row['size']}</td><td>{row['sha256'][:12]}</td></tr>" for row in sorted(rows, key=lambda item: (item["status"], item["name"]))[:600])
    page = f"""<!doctype html><meta charset='utf-8'><title>BookLab Local</title><style>body{{margin:0;background:#eee9df;color:#1d1d1b;font:14px/1.45 ui-monospace,monospace}}header,main{{padding:32px max(24px,6vw)}}h1{{font-size:clamp(32px,6vw,72px);letter-spacing:-.06em}}.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px}}.cards div{{border:1px solid #aaa;padding:16px;display:flex;flex-direction:column}}.cards span{{font-size:28px}}table{{margin-top:32px;width:100%;border-collapse:collapse;background:#f7f4ee;font-size:12px}}th,td{{border:1px solid #bbb;padding:6px;text-align:left}}</style><header><h1>OFFENER KREIS<br>BOOKLAB LOCAL</h1><p><b>v15 remains canon. v16 remains proposal until a Decision Record exists.</b></p></header><main><div class='cards'>{cards}</div><table><tr><th>status</th><th>version</th><th>name</th><th>bytes</th><th>sha</th></tr>{body}</table></main>"""
    (project / "dashboard/index.html").write_text(page, encoding="utf-8")


def serve(project: Path, port: int, open_browser: bool) -> None:
    audit(project)
    directory = project / "dashboard"
    handler = lambda *args, **kwargs: SimpleHTTPRequestHandler(*args, directory=str(directory), **kwargs)
    with socketserver.TCPServer(("127.0.0.1", port), handler) as server:
        url = f"http://127.0.0.1:{port}/"
        print(f"BookLab local: {url}")
        if open_browser:
            threading.Timer(0.7, lambda: webbrowser.open(url)).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nBookLab stopped")


def main() -> int:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("init", "audit"):
        command = sub.add_parser(name)
        command.add_argument("--project", required=True, type=Path)
    command = sub.add_parser("import")
    command.add_argument("--project", required=True, type=Path)
    command.add_argument("--source", required=True, action="append", type=Path)
    command = sub.add_parser("serve")
    command.add_argument("--project", required=True, type=Path)
    command.add_argument("--port", type=int, default=8765)
    command.add_argument("--open", action="store_true")
    args = parser.parse_args()
    project = args.project.expanduser().resolve()
    if args.command == "init":
        ensure(project)
        print(project)
    elif args.command == "import":
        print(json.dumps(import_source(project, args.source), ensure_ascii=False, indent=2))
    elif args.command == "audit":
        print(json.dumps(audit(project), ensure_ascii=False, indent=2))
    else:
        serve(project, args.port, args.open)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
