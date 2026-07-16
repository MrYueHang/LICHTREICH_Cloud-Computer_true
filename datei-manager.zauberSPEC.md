# 🪄 studioAI.zauberSPEC — DATEI-MANAGER / Dokument-Werkbank

> Das nützliche, SICHTBARE Ding. Ein KI-anpingbarer Datei-Manager. Baut auf: office-kit-Pipeline
> (Datei→übersetzen/vergleichen/hinweisen) + M08 Dokument-Ebene + M09 Pfad/Storage. Online: lichtreich.info.
> Integration-first: Firestore + Firebase Storage. **Ein Datensatz, N Sichten** — dieselben Dokumente wie Briefkasten/Akte.

## Was man sieht & tut
Grid/Liste von Dokument-Karten (aus Firestore/Storage). Pro Karte **die KI anpingbar** → Aktionen:
- **🔎 Analysieren** — Typ · Relevanz · Themen · Frist · Betrag (wie BOB-Analyse).
- **🌐 Übersetzen** — Zielsprache wählen → übersetzte Version als neues Dokument.
- **✏️ Umbenennen** — KI schlägt sprechenden Namen vor („✓ ja"/ändern) → speichert.
- **📎 An Akte anhängen** — Dropdown Akten (oder „✨ neue Akte") → Verknüpfung.
- **📁 Verschieben/Hinladen** — in Ordner/Projekt/Storage-Ziel.
- **💬 Am Board anpingen** — freie Frage an die KI zum Dokument (Dialog-Punkt: vorschlag→✓→ausgeführt).

## Board-Integration (die KI am Board anpingen)
Jede Dokument-Karte auf dem Board (Whiteboard/Funnel) hat einen „KI fragen"-Punkt. Antwort erscheint als
Kommentar an der Karte (kommentierbar). Kein blockierendes UI — Aktionen laufen async (n8n/Backend), Status-Ampel.

## Datenmodell (ein Kern)
`documents/{id}`: owner_id · name · mime · storage_url · ocr_text · analyse{typ,relevanz,frist,betrag} ·
akte_id? · tags[] · versions[] (Übersetzung/Umbenennung = neue Version, Original bleibt).

## Rollen
User: eigene Dokumente. Community/Projekt: geteilte Akten-Dokumente. System: Ingest/RAG.

## Bauen (Studio — Frontend)
- Karten-Grid + Detail-Panel je Dokument mit den 6 Aktionen.
- Upload (Drag&Drop/Picker) → Firebase Storage + `documents`-Doc.
- KI-Aktionen feuern async an Backend/n8n (fire-and-forget), Status-Ampel, Ergebnis erscheint an der Karte.
- Bauhaus-CI. Online unter lichtreich.info (Arm der Haustür, User-Ebene).

## Backend (Claude)
- KI-Aktions-Endpoints (analyse/übersetzen/umbenennen) cheap-first (groq→openai→gemini).
- Übersetzung/Umbenennung → neue Version, Original erhalten. RAG-Ingest optional.

## Definition of Done
- [ ] Dokument-Grid aus Firestore/Storage (echt, nicht Mock)
- [ ] 6 Aktionen sichtbar, min. Analysieren + Umbenennen + An-Akte-anhängen funktionieren
- [ ] „KI am Board anpingen" → async Antwort als Kommentar an der Karte
- [ ] Upload landet in Storage + erzeugt documents-Doc
- [ ] neuer CLAUDE_SYNC.txt-Block
