# Claude Deploy Handoff — TAKTØR Longform Pilot v01

## Auftrag

Deploye den vorhandenen Branch `feature/taktor-longform-pilot-v01` als kontrollierte TAKTØR-Pilotstrecke. Nach der einmaligen Einrichtung darf der Nutzer keine Soundfetzen anklicken oder manuell zusammensetzen müssen.

Der erste Lauf erzeugt vier vollständige 600-Sekunden-Kandidaten, prüft sie automatisch und legt nur die zwei besten als WAV und Review-MP3 ab.

## Harte Grenzen

- Keine Referenzaudios an ACE-Step senden.
- Keine vorhandenen 8-/20-Sekunden-Sound-IDs als Audioquelle verwenden.
- Voice bleibt im ersten Musikpilot deaktiviert.
- Keine Secrets in Git, Logs oder Frontend-Bundles.
- Kein Vercel-Dateisystem als Audiospeicher.
- Kein öffentlich erreichbarer ACE-Step-Port ohne Authentifizierung.
- Kein Erfolgstatus, wenn weniger als zwei Kandidaten die QA bestehen.

## Vorhandene Komponenten

- Story-DNA: `modules/taktor/pilots/offener-kreis-01/story-dna.json`
- Pilotjob: `modules/taktor/pilots/offener-kreis-01/pilot-job.json`
- Orchestrator: `modules/taktor/orchestrator/run_pilot.py`
- Container: `modules/taktor/orchestrator/Dockerfile`
- Stack: `modules/taktor/deploy/docker-compose.longform.yml`
- Secretschema: `modules/taktor/deploy/.env.example`

## Zielarchitektur

```text
briefkasten.lichtreich.info / Setup-Assistent
  -> Projektmanifest und Ablageziel
  -> LICHTREICH MCP / TAKTØR Queue
  -> OpenAI Responses API: eingeschränkte Director-Regie
  -> ACE-Step 1.5: vier vollständige Musikrender
  -> FFmpeg + librosa QA
  -> zwei Reviewkandidaten
  -> dateien.lichtreich.info / Object Storage
  -> optionaler Spiegel nach Drive oder Dropbox
```

`herrkuenstler.lichtreich.info` bleibt zuständig für Cover, Visuals und transmediale Gestaltung. TAKTØR übernimmt Musik, Audioanalyse, Dramaturgie, Render und Review.

## GPU-Entscheidung

Der normale LICHTREICH-VPS bleibt Orchestrator, Queue, Rechte- und Storage-Knoten. ACE-Step benötigt für sinnvolle Laufzeiten einen GPU-Host. Zwei zulässige Varianten:

1. Docker Compose vollständig auf einem NVIDIA-GPU-Host ausführen.
2. Nur `acestep` auf einem privaten GPU-Worker ausführen; auf dem LICHTREICH-VPS `ACESTEP_BASE_URL` auf diesen internen, authentifizierten Dienst setzen.

CPU-only ist nur ein technischer Fallback, nicht der geplante Produktionsweg für 4 x 10 Minuten.

## Einmalige Installation

```bash
git fetch origin
git checkout feature/taktor-longform-pilot-v01
cd modules/taktor/deploy
cp .env.example .env
chmod 600 .env
# Secrets über den vorhandenen Secret-Manager oder interaktiv eintragen.
docker compose -f docker-compose.longform.yml up -d acestep
```

Health prüfen:

```bash
docker compose -f docker-compose.longform.yml exec acestep \
  python -c "import urllib.request; print(urllib.request.urlopen('http://127.0.0.1:8001/health').read().decode())"
```

## Erster No-Click-Pilot

```bash
docker compose -f docker-compose.longform.yml --profile pilot run --rm taktor-pilot
```

Der Lauf endet nur erfolgreich mit:

```text
/data/creative-society/msjuehang/offener-kreis/pilot-01/MSJ-OFFENER-KREIS-01-v01/
  STATUS
  director_blueprint.json
  provenance.json
  analysis_metrics.json
  pilot_candidate_01.wav
  pilot_candidate_01_review.mp3
  pilot_candidate_02.wav
  pilot_candidate_02_review.mp3
  review_sheet.md
```

`STATUS` muss `READY_FOR_ONE_HUMAN_REVIEW` enthalten.

## Storage-Integration

Kanonischer logischer Pfad:

```text
creative-society/msjuehang/offener-kreis/pilot-01/{job_id}/
```

Physisch bevorzugt:

1. `dateien.lichtreich.info` / S3-kompatibler Object Storage;
2. lokaler VPS-Mount als transaktionaler Zwischenspeicher;
3. Google Drive oder Dropbox nur als konfigurierter Spiegel.

Der Setup-Assistent im Briefkasten soll pro Projekt speichern:

- `storage_provider`
- `canonical_bucket_or_root`
- `mirror_provider`
- `mirror_folder_id`
- `retention_policy`
- `data_classification`

## OpenAI-Rollen

OpenAI erzeugt keine Musikdatei. Es darf:

- den gesperrten Caption-Text verdichten;
- Abschnittsnotizen formulieren;
- Metadaten und Reviewberichte erstellen;
- später Voice-Text und TTS steuern.

Es darf BPM, Tonzentrum, Dauer, Motive, Rechte-Gate und Avoid-Liste nicht verändern. Fehlt die API oder schlägt sie fehl, verwendet der Orchestrator deterministisch den gesperrten lokalen Caption-Text.

## Abnahme

- [ ] ACE-Step `/health` ist intern erreichbar.
- [ ] API-Key ist aktiv; Port 8001 ist nicht öffentlich offen.
- [ ] Vier vollständige Aufgaben wurden mit dokumentierten Seeds erzeugt.
- [ ] `reference_audio_sent_to_renderer` ist `false`.
- [ ] QA-Metriken und SHA-256 sind vorhanden.
- [ ] Nur zwei bestandene Kandidaten liegen im Reviewordner.
- [ ] Drive/Dropbox-Spiegel ist optional und darf den Render nicht blockieren.
- [ ] TAKTØR-UI zeigt Jobstatus und genau einen Review-Gate, nicht 20 Einzelklicks.
