#!/usr/bin/env python3
"""Safe ZIP inventory/extract tool for LICHTREICH source packages.

- scans ZIP files under a directory
- computes SHA-256 and detects exact duplicates
- validates members against zip-slip paths
- optionally extracts each archive into an isolated hash directory
- never deletes, renames, or overwrites source files
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path, PurePosixPath
import sys
import zipfile


def sha256_file(path: Path, chunk_size: int = 1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as file:
        while chunk := file.read(chunk_size):
            h.update(chunk)
    return h.hexdigest()


def safe_member(name: str) -> bool:
    path = PurePosixPath(name.replace("\\", "/"))
    return not path.is_absolute() and ".." not in path.parts


def inventory(root: Path, recursive: bool, extract_to: Path | None) -> list[dict]:
    pattern = "**/*.zip" if recursive else "*.zip"
    archives = sorted(path for path in root.glob(pattern) if path.is_file())
    records: list[dict] = []
    seen: dict[str, str] = {}

    for archive in archives:
        digest = sha256_file(archive)
        duplicate_of = seen.get(digest)
        if duplicate_of is None:
            seen[digest] = str(archive)

        record = {
            "path": str(archive),
            "filename": archive.name,
            "bytes": archive.stat().st_size,
            "sha256": digest,
            "duplicate_of": duplicate_of or "",
            "zip_valid": False,
            "unsafe_member_count": 0,
            "member_count": 0,
            "extracted_to": "",
            "error": "",
        }
        try:
            with zipfile.ZipFile(archive) as zip_file:
                bad_crc = zip_file.testzip()
                names = zip_file.namelist()
                unsafe = [name for name in names if not safe_member(name)]
                record["member_count"] = len(names)
                record["unsafe_member_count"] = len(unsafe)
                record["zip_valid"] = bad_crc is None and not unsafe
                if bad_crc:
                    record["error"] = f"CRC failure: {bad_crc}"
                elif unsafe:
                    record["error"] = f"Unsafe paths: {unsafe[:5]}"
                elif extract_to is not None:
                    target = extract_to / digest[:16]
                    target.mkdir(parents=True, exist_ok=True)
                    if not any(target.iterdir()):
                        zip_file.extractall(target)
                    record["extracted_to"] = str(target)
        except (OSError, zipfile.BadZipFile, RuntimeError) as exc:
            record["error"] = str(exc)
        records.append(record)
    return records


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path, help="Directory containing ZIP files")
    parser.add_argument("--recursive", action="store_true")
    parser.add_argument("--extract-to", type=Path)
    parser.add_argument("--json", type=Path, default=Path("zip-inventory.json"))
    parser.add_argument("--csv", type=Path, default=Path("zip-inventory.csv"))
    args = parser.parse_args()

    root = args.root.expanduser().resolve()
    if not root.is_dir():
        print(f"Not a directory: {root}", file=sys.stderr)
        return 2
    extract_to = args.extract_to.expanduser().resolve() if args.extract_to else None
    if extract_to:
        extract_to.mkdir(parents=True, exist_ok=True)

    records = inventory(root, args.recursive, extract_to)
    args.json.write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
    fields = list(records[0].keys()) if records else ["path", "filename", "bytes", "sha256"]
    with args.csv.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fields)
        writer.writeheader()
        writer.writerows(records)

    duplicates = sum(bool(record["duplicate_of"]) for record in records)
    invalid = sum(not record["zip_valid"] for record in records)
    print(f"ZIPs: {len(records)} | duplicates: {duplicates} | invalid/unsafe: {invalid}")
    print(f"JSON: {args.json} | CSV: {args.csv}")
    return 1 if invalid else 0


if __name__ == "__main__":
    raise SystemExit(main())
