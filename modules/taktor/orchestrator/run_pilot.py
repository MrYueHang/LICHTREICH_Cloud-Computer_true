#!/usr/bin/env python3
"""TAKTØR no-click long-form pilot orchestrator.

Reads a locked pilot job, optionally asks OpenAI to refine the caption without
changing musical locks, renders four complete candidates through ACE-Step 1.5,
performs deterministic audio QA, and writes only the two best candidates to the
canonical project folder.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urljoin

import librosa
import numpy as np
import requests
import soundfile as sf


@dataclass
class Metrics:
    file: str
    duration_seconds: float
    sample_rate: int
    channels: int
    peak_dbfs: float
    clipped_samples_percent: float
    rms_dbfs: float
    sub_150_energy_ratio: float
    spectral_centroid_hz: float
    spectral_flatness: float
    tempo_bpm: float
    abrupt_novelty_peaks: int
    sha256: str
    rejected: bool = False
    reject_reasons: list[str] | None = None
    score: float = 0.0


def log(message: str) -> None:
    print(f"[TAKTOR] {message}", flush=True)


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def db(value: float) -> float:
    return float(20.0 * np.log10(max(float(value), 1e-12)))


def resolve_api_data(response: requests.Response) -> Any:
    response.raise_for_status()
    payload = response.json()
    if isinstance(payload, dict) and payload.get("code") not in (None, 0, 200):
        raise RuntimeError(f"ACE-Step API error: {payload}")
    return payload.get("data", payload) if isinstance(payload, dict) else payload


def maybe_direct_caption(job: dict[str, Any], story: dict[str, Any], output_dir: Path) -> str:
    """Use OpenAI only as a constrained director; fall back to locked caption."""
    locked = job["music_parameters"]["caption"]
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_DIRECTOR_MODEL")
    if not api_key or not model:
        log("OpenAI director disabled; using locked caption verbatim")
        save_json(output_dir / "director_blueprint.json", {
            "provider": "locked_local_fallback",
            "caption": locked,
            "locks_preserved": True,
        })
        return locked

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)
        instruction = {
            "task": "Refine the music caption for one coherent 10-minute instrumental techno composition.",
            "locked_values": {
                "duration_seconds": job["duration_seconds"],
                "bpm": job["music_parameters"]["bpm"],
                "key_scale": job["music_parameters"]["key_scale"],
                "time_signature": job["music_parameters"]["time_signature"],
                "instrumental": True,
                "motifs": story["motifs"],
                "hard_avoids": story["hard_avoids"],
                "sections": job["sections"],
            },
            "base_caption": locked,
            "output": "Return JSON only with keys caption, section_notes, locks_preserved. Caption max 900 characters.",
        }
        response = client.responses.create(
            model=model,
            input=[
                {"role": "system", "content": "You are TAKTØR Director. Never alter locked musical values or introduce reference copying."},
                {"role": "user", "content": json.dumps(instruction, ensure_ascii=False)},
            ],
        )
        text = response.output_text.strip()
        blueprint = json.loads(text)
        if blueprint.get("locks_preserved") is not True:
            raise ValueError("Director did not confirm musical locks")
        caption = str(blueprint.get("caption", "")).strip()
        if not caption or len(caption) > 1200:
            raise ValueError("Director caption invalid")
        blueprint["provider"] = "openai_responses"
        blueprint["model"] = model
        save_json(output_dir / "director_blueprint.json", blueprint)
        return caption
    except Exception as exc:  # safe fallback is part of the production contract
        log(f"OpenAI director failed safely: {exc}; using locked caption")
        save_json(output_dir / "director_blueprint.json", {
            "provider": "locked_fallback_after_error",
            "error": str(exc),
            "caption": locked,
            "locks_preserved": True,
        })
        return locked


def release_task(base_url: str, api_key: str | None, payload: dict[str, Any]) -> str:
    headers = {"Content-Type": "application/json"}
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
        headers["X-API-Key"] = api_key
    response = requests.post(
        urljoin(base_url.rstrip("/") + "/", "release_task"),
        headers=headers,
        json=payload,
        timeout=90,
    )
    data = resolve_api_data(response)
    if isinstance(data, dict):
        task_id = data.get("task_id") or data.get("id")
    else:
        task_id = data
    if not task_id:
        raise RuntimeError(f"ACE-Step returned no task id: {response.text[:1000]}")
    return str(task_id)


def query_task(base_url: str, api_key: str | None, task_id: str) -> dict[str, Any]:
    headers = {"Content-Type": "application/json"}
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
        headers["X-API-Key"] = api_key
    response = requests.post(
        urljoin(base_url.rstrip("/") + "/", "query_result"),
        headers=headers,
        json={"task_id_list": [task_id]},
        timeout=90,
    )
    data = resolve_api_data(response)
    if isinstance(data, list) and data:
        return data[0]
    if isinstance(data, dict):
        if task_id in data and isinstance(data[task_id], dict):
            return data[task_id]
        return data
    raise RuntimeError(f"Unexpected query_result payload: {data!r}")


def extract_files(result: dict[str, Any]) -> list[str]:
    raw = result.get("result") or result.get("results") or result.get("data")
    if isinstance(raw, str):
        try:
            raw = json.loads(raw)
        except json.JSONDecodeError:
            raw = [{"file": raw}]
    if isinstance(raw, dict):
        raw = [raw]
    files: list[str] = []
    for item in raw or []:
        if isinstance(item, str):
            files.append(item)
        elif isinstance(item, dict):
            value = item.get("file") or item.get("url") or item.get("audio")
            if value:
                files.append(str(value))
    return files


def wait_for_task(base_url: str, api_key: str | None, task_id: str, timeout_seconds: int) -> list[str]:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        result = query_task(base_url, api_key, task_id)
        status = result.get("status")
        if status in (1, "1", "success", "SUCCESS", "completed", "COMPLETED"):
            files = extract_files(result)
            if not files:
                raise RuntimeError(f"Task succeeded but returned no files: {result}")
            return files
        if status in (2, "2", "failed", "FAILED", "error", "ERROR"):
            raise RuntimeError(f"ACE-Step task failed: {result}")
        time.sleep(10)
    raise TimeoutError(f"ACE-Step task {task_id} timed out after {timeout_seconds}s")


def download_file(base_url: str, source: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if source.startswith("http://") or source.startswith("https://"):
        url = source
    else:
        url = urljoin(base_url.rstrip("/") + "/", source.lstrip("/"))
    with requests.get(url, stream=True, timeout=600) as response:
        response.raise_for_status()
        with destination.open("wb") as handle:
            for chunk in response.iter_content(1024 * 1024):
                if chunk:
                    handle.write(chunk)


def analyse_audio(path: Path, expected_duration: float) -> Metrics:
    data, sample_rate = sf.read(path, dtype="float32", always_2d=True)
    channels = data.shape[1]
    mono = np.mean(data, axis=1)
    duration = len(mono) / sample_rate
    peak = float(np.max(np.abs(mono))) if len(mono) else 0.0
    rms = float(np.sqrt(np.mean(np.square(mono)))) if len(mono) else 0.0
    clipped = float(np.mean(np.abs(mono) >= 0.999) * 100.0) if len(mono) else 100.0

    spectrum = np.abs(np.fft.rfft(mono)) ** 2
    frequencies = np.fft.rfftfreq(len(mono), 1.0 / sample_rate)
    total_energy = float(np.sum(spectrum)) + 1e-12
    sub_ratio = float(np.sum(spectrum[frequencies < 150.0]) / total_energy)

    hop = 2048
    centroid = float(np.mean(librosa.feature.spectral_centroid(y=mono, sr=sample_rate, hop_length=hop)))
    flatness = float(np.mean(librosa.feature.spectral_flatness(y=mono, hop_length=hop)))
    onset = librosa.onset.onset_strength(y=mono, sr=sample_rate, hop_length=hop)
    tempo = float(np.asarray(librosa.feature.tempo(onset_envelope=onset, sr=sample_rate, hop_length=hop)).reshape(-1)[0])
    threshold = float(np.mean(onset) + 3.0 * np.std(onset))
    novelty = int(np.sum(onset > threshold))

    reasons: list[str] = []
    if duration < expected_duration * 0.90:
        reasons.append("render_too_short")
    if clipped > 0.001:
        reasons.append("clipping")
    if sub_ratio > 0.75:
        reasons.append("sub_only_collapse")
    if flatness > 0.20:
        reasons.append("persistent_noise_risk")
    if peak <= 1e-6 or rms <= 1e-8:
        reasons.append("silence_or_corrupt")
    if novelty > 40:
        reasons.append("too_many_abrupt_novelty_peaks")

    # Transparent heuristic: reward full-band depth, sane headroom and stable body.
    score = 100.0
    score -= abs(sub_ratio - 0.48) * 80.0
    score -= max(0.0, flatness - 0.08) * 120.0
    score -= max(0.0, clipped) * 50.0
    score -= max(0.0, abs(tempo - 126.0) - 2.0) * 1.5
    score -= novelty * 0.35
    if channels >= 2:
        score += 5.0
    if reasons:
        score -= 100.0

    return Metrics(
        file=path.name,
        duration_seconds=round(duration, 3),
        sample_rate=sample_rate,
        channels=channels,
        peak_dbfs=round(db(peak), 3),
        clipped_samples_percent=round(clipped, 6),
        rms_dbfs=round(db(rms), 3),
        sub_150_energy_ratio=round(sub_ratio, 6),
        spectral_centroid_hz=round(centroid, 2),
        spectral_flatness=round(flatness, 6),
        tempo_bpm=round(tempo, 3),
        abrupt_novelty_peaks=novelty,
        sha256=sha256_file(path),
        rejected=bool(reasons),
        reject_reasons=reasons,
        score=round(score, 3),
    )


def make_review_mp3(source: Path, destination: Path) -> None:
    subprocess.run([
        "ffmpeg", "-y", "-v", "error", "-i", str(source),
        "-c:a", "libmp3lame", "-b:a", "256k", str(destination),
    ], check=True)


def run(job_path: Path, story_path: Path, storage_root: Path) -> Path:
    job = load_json(job_path)
    story = load_json(story_path)
    job_id = job["job_id"]
    output_dir = storage_root / "creative-society" / "msjuehang" / "offener-kreis" / "pilot-01" / job_id
    working_dir = output_dir / "_working"
    working_dir.mkdir(parents=True, exist_ok=True)

    base_url = os.environ["ACESTEP_BASE_URL"].rstrip("/")
    api_key = os.getenv("ACESTEP_API_KEY")
    caption = maybe_direct_caption(job, story, output_dir)
    parameters = job["music_parameters"]
    seeds = parameters.get("seeds") or [16121982, 9072008, 17072026, 31072026]
    provenance: dict[str, Any] = {
        "job_id": job_id,
        "created_at_epoch": int(time.time()),
        "provider": job["music_provider"],
        "director_model": os.getenv("OPENAI_DIRECTOR_MODEL"),
        "worker_model": os.getenv("OPENAI_WORKER_MODEL"),
        "judge_model": os.getenv("OPENAI_JUDGE_MODEL"),
        "caption": caption,
        "seeds": seeds,
        "reference_audio_sent_to_renderer": False,
        "voice_enabled": False,
        "tasks": [],
    }

    rendered: list[Path] = []
    timeout_seconds = int(os.getenv("TAKTOR_RENDER_TIMEOUT_SECONDS", "14400"))
    for index, seed in enumerate(seeds[: job.get("render_count", 4)], start=1):
        payload = {
            "prompt": caption,
            "lyrics": parameters.get("lyrics", ""),
            "thinking": job["music_provider"].get("thinking", True),
            "use_format": job["music_provider"].get("use_format", True),
            "model": job["music_provider"].get("model", "acestep-v15-turbo"),
            "bpm": parameters["bpm"],
            "key_scale": parameters["key_scale"],
            "time_signature": parameters["time_signature"],
            "audio_duration": job["duration_seconds"],
            "audio_format": job["music_provider"].get("audio_format", "wav"),
            "inference_steps": parameters.get("inference_steps", 8),
            "batch_size": 1,
            "use_random_seed": False,
            "seed": int(seed),
            "instrumental": True,
        }
        log(f"Releasing full-length render {index}/{len(seeds[:4])}, seed={seed}")
        task_id = release_task(base_url, api_key, payload)
        provenance["tasks"].append({"task_id": task_id, "seed": seed, "payload": payload})
        files = wait_for_task(base_url, api_key, task_id, timeout_seconds)
        destination = working_dir / f"raw_candidate_{index:02d}.wav"
        download_file(base_url, files[0], destination)
        rendered.append(destination)
        save_json(output_dir / "provenance.json", provenance)

    metrics = [analyse_audio(path, job["duration_seconds"]) for path in rendered]
    ranked = sorted(zip(rendered, metrics), key=lambda item: item[1].score, reverse=True)
    survivors = [item for item in ranked if not item[1].rejected]
    if len(survivors) < job.get("human_review_count", 2):
        save_json(output_dir / "analysis_metrics.json", [asdict(item) for item in metrics])
        raise RuntimeError("Fewer than two candidates passed automatic QA; no false success emitted")

    selected = survivors[: job.get("human_review_count", 2)]
    review_rows = ["# TAKTØR Pilot Review", "", f"Job: `{job_id}`", "", "Only these QA-passing candidates require human review.", ""]
    for position, (source, metric) in enumerate(selected, start=1):
        wav_target = output_dir / f"pilot_candidate_{position:02d}.wav"
        mp3_target = output_dir / f"pilot_candidate_{position:02d}_review.mp3"
        shutil.copy2(source, wav_target)
        make_review_mp3(wav_target, mp3_target)
        review_rows.extend([
            f"## Candidate {position}",
            f"- Source: `{source.name}`",
            f"- Score: `{metric.score}`",
            f"- WAV SHA-256: `{sha256_file(wav_target)}`",
            "- Decision: `[ ] KEEP  [ ] REVISE  [ ] REJECT`",
            "",
        ])

    save_json(output_dir / "analysis_metrics.json", [asdict(item) for item in metrics])
    save_json(output_dir / "provenance.json", provenance)
    (output_dir / "review_sheet.md").write_text("\n".join(review_rows), encoding="utf-8")
    (output_dir / "STATUS").write_text("READY_FOR_ONE_HUMAN_REVIEW\n", encoding="utf-8")
    log(f"Ready for one human review: {output_dir}")
    return output_dir


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--job", type=Path, required=True)
    parser.add_argument("--story", type=Path, required=True)
    parser.add_argument("--storage-root", type=Path, default=Path(os.getenv("TAKTOR_STORAGE_ROOT", "/data")))
    args = parser.parse_args()
    try:
        output = run(args.job, args.story, args.storage_root)
        print(output)
        return 0
    except Exception as exc:
        log(f"FAILED: {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
