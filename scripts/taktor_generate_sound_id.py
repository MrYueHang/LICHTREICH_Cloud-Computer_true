#!/usr/bin/env python3
"""TAKTØR Sound-ID worker.

Generates three short, independent music variants through the public MusicGen
Gradio API. The worker is intentionally provider-adapted and sequential:
- no Replit Agent credits
- no local oscillator/noise synthesis
- no reference audio is copied
- optional provider replacement via MUSICGEN_SPACE
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import quote, urljoin, urlparse

import requests

SPACE = os.getenv("MUSICGEN_SPACE", "https://facebook-musicgen.hf.space").rstrip("/")
DURATION = max(10, min(int(os.getenv("DURATION_SECONDS", "30")), 60))
OUT_DIR = Path(os.getenv("OUTPUT_DIR", "artifacts/taktor-sound-id"))
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "900"))

BASE_BRIEF = (
    "instrumental underground techno, warm deep elastic bass, hypnotic rolling "
    "groove, organic mechanical movement, patient musical evolution, bodily and "
    "spacious, coherent long-form feeling, no vocals, no harsh noise, no white-noise "
    "riser, no EDM drop, no generic trance lead, no abrupt scene changes"
)

VARIANTS = {
    "A_WARM_ROLLING": (
        "warm and rolling, playful psychedelic micro-details, open-air night floor, "
        "subtle harmonic light, humorous but not comic"
    ),
    "B_MECHANICAL_BODY": (
        "resistant mechanical texture, physical low-end ownership, restrained acid "
        "motion, industrial character without darkness or harshness"
    ),
    "C_MRJUEHANG_CORE": (
        "warm foundation, hypnotic movement, resistant texture, light resolution, "
        "barfuss trotz Stahlkappe, strange affectionate details, freedom and forward motion"
    ),
}


def iter_values(value: Any) -> Iterable[Any]:
    yield value
    if isinstance(value, dict):
        for item in value.values():
            yield from iter_values(item)
    elif isinstance(value, (list, tuple)):
        for item in value:
            yield from iter_values(item)


def resolve_audio_url(payload: Any) -> str:
    candidates: list[str] = []
    paths: list[str] = []

    for value in iter_values(payload):
        if isinstance(value, dict):
            url = value.get("url")
            path = value.get("path")
            if isinstance(url, str):
                candidates.append(url)
            if isinstance(path, str):
                paths.append(path)
        elif isinstance(value, str):
            if value.startswith(("http://", "https://")):
                candidates.append(value)
            elif value.endswith((".wav", ".mp3", ".flac", ".ogg", ".m4a")):
                paths.append(value)

    for candidate in candidates:
        if any(token in candidate.lower() for token in (".wav", ".mp3", ".flac", ".ogg", "file=")):
            return urljoin(f"{SPACE}/", candidate)

    for path in paths:
        if path.startswith(("http://", "https://")):
            return path
        return f"{SPACE}/gradio_api/file={quote(path, safe='/')}"

    raise RuntimeError(f"No audio URL found in Gradio result: {payload!r}")


def parse_sse(response: requests.Response) -> Any:
    complete_payload: Any | None = None
    latest_payload: Any | None = None
    latest_event = ""

    for raw_line in response.iter_lines(decode_unicode=True):
        if raw_line is None:
            continue
        line = raw_line.strip()
        if not line:
            continue
        if line.startswith("event:"):
            latest_event = line.partition(":")[2].strip()
            continue
        if not line.startswith("data:"):
            continue

        raw_data = line.partition(":")[2].strip()
        try:
            data = json.loads(raw_data)
        except json.JSONDecodeError:
            data = raw_data
        latest_payload = data

        if latest_event in {"error", "cancelled"}:
            raise RuntimeError(f"Gradio event {latest_event}: {data}")
        if latest_event == "complete":
            complete_payload = data

    if complete_payload is not None:
        return complete_payload
    if latest_payload is not None:
        return latest_payload
    raise RuntimeError("Gradio returned no SSE data")


def generate(prompt: str) -> tuple[bytes, str]:
    endpoint = f"{SPACE}/gradio_api/call/predict_batched"
    payload = {"data": [[prompt], [None], DURATION]}

    for attempt in range(1, 4):
        try:
            response = requests.post(endpoint, json=payload, timeout=60)
            response.raise_for_status()
            event_id = response.json().get("event_id")
            if not event_id:
                raise RuntimeError(f"Missing event_id: {response.text[:500]}")

            event_url = f"{endpoint}/{event_id}"
            with requests.get(event_url, stream=True, timeout=REQUEST_TIMEOUT) as events:
                events.raise_for_status()
                result = parse_sse(events)

            audio_url = resolve_audio_url(result)
            audio = requests.get(audio_url, timeout=180)
            audio.raise_for_status()
            content_type = audio.headers.get("content-type", "audio/wav")
            return audio.content, content_type
        except Exception as exc:  # noqa: BLE001 - retry boundary
            if attempt == 3:
                raise RuntimeError(f"MusicGen generation failed after 3 attempts: {exc}") from exc
            wait_seconds = 20 * attempt
            print(f"Attempt {attempt} failed: {exc}; retry in {wait_seconds}s", file=sys.stderr)
            time.sleep(wait_seconds)

    raise AssertionError("unreachable")


def extension_for(content_type: str, audio_url_hint: str = "") -> str:
    mapping = {
        "audio/mpeg": ".mp3",
        "audio/mp3": ".mp3",
        "audio/flac": ".flac",
        "audio/ogg": ".ogg",
        "audio/x-wav": ".wav",
        "audio/wav": ".wav",
    }
    base_type = content_type.split(";", 1)[0].strip().lower()
    if base_type in mapping:
        return mapping[base_type]
    suffix = Path(urlparse(audio_url_hint).path).suffix.lower()
    return suffix if suffix in {".wav", ".mp3", ".flac", ".ogg", ".m4a"} else ".wav"


def safe_name(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", name).strip("_")


def convert_to_mp3(source: Path, target: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(source),
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "320k",
            str(target),
        ],
        check=True,
    )


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, Any] = {
        "worker": "TAKTOR_SOUND_ID_v01",
        "provider": SPACE,
        "duration_seconds": DURATION,
        "rules": [
            "no reference audio copied",
            "no local oscillator or synthetic noise-bed generation",
            "three independent sequential variants",
        ],
        "variants": [],
    }

    for index, (variant_name, direction) in enumerate(VARIANTS.items(), start=1):
        prompt = f"{BASE_BRIEF}. Specific direction: {direction}."
        print(f"[{index}/{len(VARIANTS)}] generating {variant_name}", flush=True)
        audio_bytes, content_type = generate(prompt)
        ext = extension_for(content_type)
        source_path = OUT_DIR / f"{index:02d}_{safe_name(variant_name)}{ext}"
        source_path.write_bytes(audio_bytes)

        mp3_path = OUT_DIR / f"{index:02d}_{safe_name(variant_name)}_320K.mp3"
        try:
            if source_path.suffix.lower() == ".mp3":
                mp3_path.write_bytes(audio_bytes)
            else:
                convert_to_mp3(source_path, mp3_path)
        except Exception as exc:  # noqa: BLE001
            print(f"MP3 conversion failed for {source_path}: {exc}", file=sys.stderr)
            mp3_path = source_path

        manifest["variants"].append(
            {
                "name": variant_name,
                "prompt": prompt,
                "source_file": source_path.name,
                "review_file": mp3_path.name,
                "content_type": content_type,
            }
        )

    (OUT_DIR / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (OUT_DIR / "REVIEW.md").write_text(
        "# TAKTØR Sound-ID Review v01\n\n"
        "Bewerte jede Variante mit `KEEP / MIX / REJECT` und kurzen Timestamp-Hinweisen.\n\n"
        "- 01 A_WARM_ROLLING: ___\n"
        "- 02 B_MECHANICAL_BODY: ___\n"
        "- 03 C_MRJUEHANG_CORE: ___\n",
        encoding="utf-8",
    )
    print(f"Created artifacts in {OUT_DIR}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
