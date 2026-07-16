# DEV-GUIDE — Loop-Template & Tag-System

Damit man die Dinger später wiederfindet und jede App gleich in den Ping-Pong-Loop passt.

## Ordner-Konvention (jedes `*_true`-Repo bekommt das)
```
/README.md            Product-Truth (was ist es)
/HANDBUCH.md          Metastruktur der Workflows (maschinenlesbar)
/TODO.md              Backlog (→ wird zu Issues)
/CLAUDE_SYNC.txt      Der Auftrag an Claude-Terminal (Ping)
/_SYNC-REPORT.md      Claudes Antwort (Pong)
/schemas/             workflow.schema.json + je Workflow eine .json-Instanz
/rag-ingest/          Payloads, die in rag/ingest sollen
/docs/                Dev-Guide, offene Fragen, Pflichtenheft
```

## Head-of-Board-Tags (jedes Ticket/Schema/Modul kriegt einen Owner)
Jede Aufgabe wird EINEM Dienst zugeordnet — das ist der „Head of Board" dieses Reiters:
`briefkasten · rag · orchestra · mandat · n8n · setup · board · society · consult · ingest · tickets · mcp · api · herrkuenstler`

Format im Issue/Schema:  `Head-of-Board: **<dienst>**`  ·  `Betriebskette: <stufe>`

## Betriebsketten-Stufen (Tag-Werte)
`eingang · analyse · interview · briefe · akte`  (= Eingang → Analyse → Interview → Briefe/Dokumente → Akte/Ausgang)

## Status-Tags (Reifegrad, ehrlich)
`alpha` (baustelle) · `pilot` (läuft, ungeprüft) · `beta` (rollout) · `live` (QA-doppelt grün)

## Dialog-Punkt (Pflicht in jedem KI-Schritt)
`vorschlag → bestätigt(✓ja/Kommentar) → ausgeführt`. Nie raten; bei Unklarheit `rueckfragen`.

## Prio-Labels (GitHub)
`prio:kritisch` (rot, Blocker) · `prio:hoch` (orange) · `prio:mittel` (gelb) · `prio:strategisch` (blau).

## So triggerst du einen Sync (ohne dich)
1. In der App den `CLAUDE_SYNC.txt`-Block schreiben (Vorlage: dieser Repo).
2. Export → GitHub `<name>_true`.
3. Terminal-/Desktop-Claude bekommt: „Führe den CLAUDE_SYNC-Loop auf Repo `<name>_true` aus."
→ Rest ist Standard (5 Schritte, siehe `_SYNC-REPORT.md` §Protokoll).
