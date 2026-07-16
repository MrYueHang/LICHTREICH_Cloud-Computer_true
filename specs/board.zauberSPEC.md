# 🪄 studioAI.zauberSPEC — App: board (Lücke #1 schließen)

> Für AI Studio. Ebene: User/Admin. Basis: `docs/BOARD-AUDIT-chrome.md`. Das Board ist visuell stark, aber
> nicht verdrahtet (DEMO-TASKS, keine Persistenz, Deko-Sub-Nav). Ziel: aus „angedeutet" → „fertig".
> Frontend baut AI Studio; Backend/Daten verdrahtet Claude-Terminal (unten getrennt).

## ⚡ INTEGRATION-FIRST (bevorzugt — kein Secrets-Krampf!)
Nutze die **nativen AI-Studio-Integrations** statt handverdrahtetes Backend. Das löst Persistenz + Auth +
Connectoren ohne .env-Sucherei:
- **Firebase Firestore** (Integrations → „Built-in database, ready to use") = **Persistenz-Layer** (Board-State, Akten, Tasks).
- **Firebase Auth** = **eigener Bereich / Login** (User-Ebene, jeder sieht nur seins).
- **Google Picker / OAuth** = Drive-/Datei-Connectoren nativ.
→ Erst diese nutzen. Nur wenn eine Integration nicht reicht, auf api/Neon zurückfallen (System-Ebene, Claude).

## P0 — Persistenz (via Firestore, nicht Hand-Backend)
- Whiteboard-Zustand (Knoten-Positionen + Verbindungen) **überlebt Branchenwechsel & Reload** → in **Firestore** speichern (collection `board_state`, doc pro user+branche).
- Auto-Save (debounced) + sichtbarer „gespeichert"-Status. Kein reiner Client-State mehr.
- (Fallback nur falls nötig: `POST/GET /api/board/state` → Neon, verdrahtet Claude.)

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

## Was Claude-Terminal übernimmt (nur System-Ebene, Rest macht Studio nativ)
- Board-Datenquelle Health/Status aus n8n Live-Karte + `api.lichtreich.info` → echte Kacheln (Lücke #1). *(Studio fetcht, Claude sichert die API.)*
- `/api/projects` Feld-Whitelist (kein Deploy-Metadaten-Leak).
- Persistenz + Auth macht **Studio via Firestore/Firebase-Auth** — Claude NICHT mehr per Hand (kein Neon-Krampf).
- System-übergreifende n8n-Flows nur, wo Firestore nicht reicht.

## DoD
- [ ] Whiteboard-Zustand übersteht Reload/Branchenwechsel
- [ ] ≥1 Sub-Nav-Pill öffnet echtes Sub-Tool mit Trigger
- [ ] Kanban-Karte klickbar + editierbar
- [ ] Board zeigt ≥1 echten Live-Wert statt DEMO
- [ ] neuer `CLAUDE_SYNC.txt` (was Backend noch braucht)
