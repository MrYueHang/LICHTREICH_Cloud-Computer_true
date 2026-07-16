# Session 1 — Briefkasten-Loop rund (Backend)
## Ziel: Upload → n8n → Analyse → Firestore-Status → Akte, end-to-end echt.
## Aufgaben
- [ ] Stefan/Browser: Service-Account-JSON laden (n8n-firestore, Cloud Datastore User)
- [ ] Claude: n8n `bob-briefweg` importieren+aktivieren (n8n/bob-briefweg.json)
- [ ] Claude: n8n schreibt Job-Status in Firestore `jobs` (empfangen→ocr→analyse→entwurf→fertig)
- [ ] cheap: OCR+classify+strategy (groq→openai)
## DoD: 1 echter Upload läuft bis „fertig", Status-Ampel zeigt live.
## Dialog an Studio: „briefkasten-Frontend steht — Backend verdrahtet Claude, keine UI-Änderung nötig."
