# TAKTØR OSS Research Delta v02

**Date:** 2026-07-22  
**Purpose:** Verify v01 decisions against current upstream repositories and identify higher-leverage ready-to-build components.

## Decision changes

| Capability | v02 decision | Reason |
|---|---|---|
| Browser multitrack composer | **PILOT NOW: waveform-playlist v14 / dawcore** | MIT, active, TypeScript/React, clips, trim, fades, annotations, beats/bars, AudioWorklet, effects, WAM/Faust and adapter-pluggable transport |
| Simple waveform/review | **KEEP ADOPT: wavesurfer.js** | Smaller and mature for single-file waveform, regions and timestamp review |
| Stem worker host | **PILOT NOW: python-audio-separator** | MIT application code, Docker, CLI and Python API, multiple MDX/Demucs/MDXC model formats |
| Stem models | **MACAN GATE PER WEIGHT** | Worker license does not prove model, dataset or redistribution rights |
| Demucs original | **REFERENCE, not default runtime** | Official repo says it is no longer maintained; successor fork only handles important fixes |
| DJ engine | **REFERENCE / optional native node: Mixxx** | Actively released and excellent for behavior benchmarking; GPLv2 and native architecture make direct embedding a deliberate decision |
| MIR baseline | **KEEP ADOPT: librosa** | ISC and maintained; suitable server analysis baseline |
| Extended MIR | **KEEP WRAP: Essentia** | Broad descriptors, but AGPLv3/commercial-license gate remains |
| Audio-to-MIDI | **ADOPT AT P1, not P0** | Apache-2.0 and useful; not required for first ingest-to-review loop |
| Deterministic final render | **KEEP ADOPT: server FFmpeg/ffprobe** | Browser preview is not the final renderer for 31-minute or multi-hour reproducible outputs |

## New primary candidate: waveform-playlist

Official repository: https://github.com/naomiaro/waveform-playlist

Verified upstream facts:

- MIT license;
- multi-track editor/player built with React, Tone.js and Web Audio;
- multi-clip move/trim, fades, effects, recording, annotation and WAV export;
- precomputed waveform data, beats/bars and stem-track examples;
- v14 separates optional playout adapters and adds framework-agnostic dawcore components;
- 128 releases; GitHub shows an update on 2026-07-12.

LICHTREICH use:

```text
TAKTØR canonical mix specification
→ waveform-playlist adapter
→ Browser Composer / Review preview
→ parameter and decision events
→ server render job
→ FFmpeg evidence and immutable output
```

Do not fork the whole UI immediately. First build a thin spike with:

1. two aligned stems,
2. drag/trim/fade,
3. timestamp annotation,
4. LOCK/TUNE/REWORK/REJECT receipt,
5. JSON round-trip to the canonical mix spec,
6. Chrome + Safari memory test using a 31:40 proxy and precomputed peaks.

## New worker candidate: python-audio-separator

Official repository: https://github.com/nomadkaraoke/python-audio-separator

Verified upstream facts:

- MIT application code;
- Docker images for CPU/GPU and amd64/arm64;
- CLI and Python integration;
- PTH/ONNX inference;
- MDX-Net, VR, Demucs and MDXC model families;
- Apple Silicon CoreML path and experimental DirectML path.

LICHTREICH decision: wrap as an isolated worker candidate, not as a trusted model store.

Required job input:

```json
{
  "asset_id": "asset_...",
  "model_id": "model_...",
  "model_sha256": "...",
  "license_decision_id": "macan_...",
  "output_profile": "vocals_instrumental",
  "worker_version": "pinned",
  "seed_or_determinism": "documented"
}
```

The job is blocked unless code, model, dataset/preset, commercial use and redistribution fields are `VERIFIED`.

## Existing decisions rechecked

- Mixxx remains a strong live-DJ/reference engine. GitHub lists 2.5.6 from 2026-03-27 and GPLv2: https://github.com/mixxxdj/mixxx
- The original Demucs repository explicitly states it is no longer maintained: https://github.com/facebookresearch/demucs
- Essentia remains AGPLv3 and therefore gated: https://github.com/MTG/essentia
- librosa remains the permissive ISC analysis baseline: https://github.com/librosa/librosa
- wavesurfer.js remains a mature BSD-3-Clause waveform component: https://github.com/katspaugh/wavesurfer.js
- Tone.js remains the Web Audio scheduling/effects layer, not the canonical mix model: https://github.com/Tonejs/Tone.js
- Basic Pitch remains Apache-2.0 and supports long audio through windowed processing, but its last GitHub release shown is v0.4.0 from 2024-08-16: https://github.com/spotify/basic-pitch

## MVP stack after v02

```text
Browser Composer:
  waveform-playlist/dawcore pilot
  + wavesurfer.js for focused review
  + Tone.js preview
  + Tonal.js harmonic rules

Server:
  FFmpeg/ffprobe deterministic render
  + librosa analysis
  + python-audio-separator pilot behind MACAN model gate

Reference/optional:
  Mixxx native Live Mix node
  Essentia licensed descriptor worker
  Basic Pitch P1
  projectM visual worker
```

## Acceptance gate before adoption

A candidate moves from `PILOT` to `ADOPT` only if:

- pinned version and license evidence exist,
- 31:40 proxy and three-hour segmented case do not exhaust browser memory,
- preview and server render reference the same canonical parameters,
- reload reproduces timeline and review decisions,
- Safari and Chromium meet the agreed floor,
- no raw audio or model is uploaded outside the configured storage/worker boundary,
- final output is generated by the deterministic server path,
- rollback to the previous preview component is documented.
