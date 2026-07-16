# 🪄 studioAI.zauberSPEC — App: board (Lücke #1 schließen)

> Für AI Studio. Ebene: User/Admin. Basis: `docs/BOARD-AUDIT-chrome.md`. Das Board ist visuell stark, aber
> nicht verdrahtet (DEMO-TASKS, keine Persistenz, Deko-Sub-Nav). Ziel: aus „angedeutet" → „fertig".
> Frontend baut AI Studio; Backend/Daten verdrahtet Claude-Terminal (unten getrennt).

## P0 — Persistenz (der fehlende Backend-Layer)
- Whiteboard-Zustand (Knoten-Positionen + Verbindungen) **überlebt Branchenwechsel & Reload**.
- Speichern gegen echte Quelle: `POST /api/board/state` (Claude verdrahtet Neon). Laden: `GET /api/board/state?branche=…`.
- Auto-Save (debounced) + sichtbarer „gespeichert"-Status. Kein reiner Client-State mehr.

## P0 — Sub-Nav-Pills → echte Sub-Tools (Baumstruktur)
- Die Deko-Pills (Fristen-Kalender, Akte-Graph, Redaktionsplan, …) werden **klickbar** und öffnen je ein
  **Sub-Tool-Panel** (Baumstruktur: Branche → Sub-Modul → Ansicht).
- Jedes Sub-Tool hat einen **Workflow-Trigger** (n8n-Webhook je Branche/Modul) statt nur Label.
- Erstmal 1 Sub-Tool echt durchspielen (z.B. Recht → Fristen-Kalender), Rest als klarer „→ in Arbeit"-Zustand (ehrlich).

## P1 — Kanban klickbar + Live statt DEMO
- Kanban-Karten öffnen Detailansicht (Titel/Status/Zuständig/Notiz), editierbar → speichert wie oben.
- „DEMO-TASKS" ersetzen durch Live-Daten aus `/api/projects` (existiert schon) + Health aus n8n Live-Karte.

## P1 — Sicherheit
- `/api/projects` nicht mehr unauth interne Deploy-Metadaten leaken → Feld-Whitelist (nur subdomain/title/status), Rest hinter Auth (User-Ebene).

## Rollen
User sieht/bearbeitet eigenes Board; Admin sieht Connector/Deploy-Daten. Public gar nicht.

## Was Claude-Terminal parallel verdrahtet (nicht AI Studio)
- `/api/board/state` (GET/POST) → **Neon** (Persistenz-Layer, Lücke #2).
- Board-Datenquelle: Health/Status aus n8n Live-Karte + `api.lichtreich.info` → echte Kacheln (Lücke #1).
- `/api/projects` Feld-Whitelist + Auth (Lücke #6).
- n8n-Webhooks je Branchen-Sub-Tool (Lücke #3).

## DoD
- [ ] Whiteboard-Zustand übersteht Reload/Branchenwechsel
- [ ] ≥1 Sub-Nav-Pill öffnet echtes Sub-Tool mit Trigger
- [ ] Kanban-Karte klickbar + editierbar
- [ ] Board zeigt ≥1 echten Live-Wert statt DEMO
- [ ] neuer `CLAUDE_SYNC.txt` (was Backend noch braucht)
