# 🪄 studioAI.zauberSPEC — N8N-STYLE PROZESS-BOARD

> Das Board als **n8n-Node-Graph**: alle Workflows/Prozesse als verbundene Knoten, live, drag&drop.
> Quelle der Prozesse: `schemas/workflow.schema.json` + die Prozess-Instanzen (bob-briefweg, waitlist,
> datei-manager, einrichtungs-lampe …). Online lichtreich.info. Integration-first (Firestore für Layout/State).

## Was man sieht
Eine Canvas wie n8n: **Knoten = Steps** (upload·ocr·classify·strategy·draft·finalize·…), **Kanten = Fluss**.
- Jeder Workflow (aus der Metastruktur) wird als Kette gerendert: Inputs → Steps → Outputs.
- **Live-Status je Knoten** (Bauhaus-Ampel): läuft / ok / fehler — aus Firestore/n8n-Execution.
- **Drag&drop:** Knoten verschieben, Ketten neu verdrahten (Layout persistent in Firestore).
- **KI am Knoten anpingen:** „was macht dieser Step? / warum rot?" → Kommentar am Knoten.
- **Bibliothek links:** verfügbare Prozesse (bob-briefweg, waitlist, datei-manager, assistent-lampe …) → auf Canvas ziehen.

## Prozess-Katalog (die zu übersetzenden Workflows)
| Prozess | Steps | Status |
|---------|-------|--------|
| bob-briefweg | upload→ocr→classify→strategy→draft→finalize | JSON da (`n8n/bob-briefweg.json`) |
| waitlist | webhook→(Firestore/Set) | JSON da (`n8n/warteliste.json`) |
| datei-analyse | classify→relevanz→frist | zu übersetzen |
| datei-übersetzen | detect→translate→neue Version | zu übersetzen |
| datei-umbenennen | suggest→confirm→rename | zu übersetzen |
| einrichtungs-lampe | connect→test-call→🟢/🔴 | zu übersetzen |
| rag-ingest | upload→embed→rag | zu übersetzen |

## Datenmodell
`workflows/{slug}` (Metastruktur) · `board_layout/{uid}` (Knoten-Positionen/Kanten, Firestore) ·
`executions/{jobId}` (Live-Status je Step). Ein Kern, N Sichten (dieselben Prozesse wie überall).

## Bauen (Studio — Frontend)
- Node-Graph-Canvas (SVG/Canvas), Knoten+Kanten aus `workflows`, Layout aus Firestore, Auto-Save.
- Bibliothek-Panel · Live-Status-Poll (Firestore-Snapshot) · KI-Ping am Knoten (async, Kommentar).
- Bauhaus-CI. Kein blockierendes UI.

## Backend (Claude + cleap-Agent)
- **Übersetzung ALLER Prozesse → n8n-JSON** (Issue, cheap-Agent, orientiert an schemas/ + specs/).
- n8n-Execution-Status → Firestore `executions` (Rückkanal, Service-Account).

## Definition of Done
- [ ] Canvas rendert ≥2 echte Prozesse als Node-Graph (aus workflows)
- [ ] Knoten verschiebbar, Layout überlebt Reload (Firestore)
- [ ] Live-Status je Knoten (min. bob-briefweg)
- [ ] KI-Ping am Knoten → async Kommentar
- [ ] neuer CLAUDE_SYNC.txt
