# Board-Audit (board.lichtreich.info) — via Claude-in-Chrome, 16.07
> Reale Bestandsaufnahme (Phase 1). Gesichert als Datei, damit's nicht mit der Browser-Session verloren geht.

## ✅ Echt & robust
- 5 Reiter **PM · Funnel · Strategic · Controlling · Whiteboard** laden je eigenen, echten Inhalt (kein Platzhalter-Recycling).
- **Branchen-Umschalter** (Social/Agentur · Recht/Kanzlei · Kreativ · Immobilien) tauscht kompletten Datensatz + Label-Struktur.
- **Dark/Light-Toggle** einwandfrei.
- **„Live neu laden"** feuert echten Request an `/api/projects` (Quelle: mcp.lichtreich.info).
- **Whiteboard = stärkstes Stück:** Knoten frei ziehbar, echte Port-zu-Port-Verbindungen (roter→blauer Port) = funktionierender Graph-Editor, kein Mockup.

## 🟡 Nur Andeutung / Mockup
- **Sub-Nav-Pills** je Branche (Fristen-Kalender, Akte-Graph, Redaktionsplan) reagieren NICHT auf Klick = reine Deko. → **genau hier setzt das Baumstruktur/Sub-Tool-Konzept an.**
- **Kanban-Karten** (PM) nicht klickbar — keine Detailansicht/Edit.
- Alle Karten „DEMO-TASKS" = bewusst Demodaten, kein Live-Datenmanagement.

## 🔴 Robustheit / Persistenz / Sicherheit
- **Keine Persistenz:** Whiteboard-Anordnung/Verbindungen gehen bei Branchenwechsel sofort verloren (reiner Client-State). Backend/DB fehlt komplett.
- **`/api/projects` unauth öffentlich** → liefert interne Deployment-Metadaten (Vercel-Projektnamen) im Klartext. Vor echtem Deploy absichern. (Positiv: keine Keys/Tokens im window-Objekt.)
- Beim Klicken öffnete sich unerwartet ein Tab zu claude.ai-Artefakt „BOB · Ist-Stand" (Permission verweigert, nichts gelesen).

## Querbezug (aus Chrome-Recherche der Artefakte/n8n)
- Läuft echt: **n8n Live-Karte** (Health alle 5 Min, Organe/Frontends gruppiert), **BOB Brief-Weg** (mit vermerkten Bugs: Foto/Scan ≠ PDF-OCR-Weg; Hinweise von Strategie-Stufe ignoriert = „Hauptfix"), **🔥RAG-System** (mehrstufig: Knowledge/Re-ranker/Memory/Query).
- Konzept/Mockup: Marketing-Landing, Whiteboard-Persistenz, Board-Sub-Nav.
