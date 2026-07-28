# TAKTØR — MCP/VPS/Vercel Production Plan v01

Status: Architekturentscheidung / Umsetzungsplan

## Ziel

TAKTØR wird als kanonisches LICHTREICH-Audiomodul betrieben. Die Weboberfläche bleibt leicht und browserfähig; rechenintensive, lizenz- oder geheimnisrelevante Arbeit wird über kontrollierte Worker ausgeführt.

## 1. Schichten

### A. UI und Cockpit — Vercel

- Route zunächst `/taktor`, später `taktor.lichtreich.info`
- Creative Brief, Referenz-DNA, Varianten, Timeline und Review
- Browser-Local-Provider für nichtkommerzielle Entwicklung
- keine dauerhafte Audiodatei im Vercel-Dateisystem

### B. Orchestrierung — LICHTREICH MCP / Orchestra

MCP-Werkzeuge:

- `taktor.create_sound_id_job`
- `taktor.get_job_status`
- `taktor.list_variants`
- `taktor.set_review_decision`
- `taktor.render_chapter`
- `taktor.export_release_package`

Aufgaben:

- Nutzer, Projekt und Rechte prüfen
- Provider anhand Lizenz, Budget und Verfügbarkeit wählen
- Job-Manifest erzeugen
- Fortschritt und Fehler normalisieren
- Human-Gate vor Langformausbau und Release erzwingen

### C. Datenkern — PostgreSQL/Supabase

Gespeichert werden nur strukturierte Metadaten:

- Job-ID, Workspace, Projekt, Nutzer
- Prompt/Creative Brief und Parameter
- Provider, Modell, Version und Lizenznachweis
- Status, Kosten, Laufzeit, Fehlermeldung
- Reviewentscheidung `KEEP / MIX / REJECT`
- Verweise auf Audioobjekte und Manifeste

Die Datenbank ist nicht der Audio-Dateispeicher.

### D. Object Storage / dateien.lichtreich.info

Speichert:

- WAV/FLAC/MP3-Reviews
- Stems
- Render-Manifeste
- Prüfsummen
- Cue-Sheets und Reviewreports

Pfadkonvention:

`/workspace/project/taktor/session/job-id/variant-id/`

### E. Render-Worker

1. Entwicklungsprovider: Browser-local `Xenova/musicgen-small`, CC BY-NC 4.0, nichtkommerziell.
2. Produktionsprovider: austauschbarer GPU-Worker oder API mit verifizierter kommerzieller Modell- und Output-Lizenz.
3. Postproduktion: FFmpeg/ffprobe, später Matchering/Rubber Band nach License Gate.
4. Analyse: librosa/Essentia-Adapter, getrennt vom Generator.

Ein normaler Vercel- oder CPU-VPS-Prozess ist nicht der primäre GPU-Renderer. Der vorhandene VPS übernimmt Routing, Queue, Status, Storage und FFmpeg; GPU-Inferenz wird als eigener Worker angeschlossen.

## 2. Kanonischer Ablauf

`BRIEF → PROVIDER-GATE → SOUND-ID → REVIEW → HARMONIC PLAN → CHAPTER RENDER → QA → FINAL → RIGHTS GATE → RELEASE`

## 3. Provider-Gate

Vor jedem produktiven Job müssen belegt sein:

- Code-Lizenz
- Modell-Lizenz
- Datensatz-Lizenz
- kommerzielle Nutzung
- Output-/Weitergaberechte
- Attribution
- Version/Commit
- Kosten- und Datenschutzklasse

Ohne `VERIFIED` bleibt der Provider ausschließlich im Entwicklungsmodus.

## 4. Ausbauphasen

### Phase 0 — jetzt

- `/taktor` Browser-Prototyp
- drei Sound-IDs
- WAV-Download
- lokales Review
- Backenddiagnose

### Phase 1 — eigenes Modul

- Domainalias `taktor.lichtreich.info`
- Auth/Workspace-Kontext
- Review in Supabase
- Dateien nach `dateien.lichtreich.info`
- MCP-Jobstatus

### Phase 2 — Produktionsworker

- lizenzgeprüfter GPU-Provider
- Queue, Retry, Budgetlimit
- serverseitiges WAV/FLAC-Rendering
- FFmpeg-QA und Manifeste

### Phase 3 — Langform

- 8–12-Minuten-Kompositionsproof
- 45-Minuten-Kapitel
- 3-Stunden-Setarchitektur
- Story/Voice erst nach musikalischem Review

## 5. Harte Regeln

- Keine Referenzaudios kopieren.
- Kein synthetisches Dauerrauschen als Ersatz für Produktionstiefe.
- Kein Modell ohne verifizierte Lizenz produktiv aktivieren.
- Kein Ausbau eines abgelehnten Klangkörpers.
- Kein Release ohne Human Review, QA und Rights Gate.
