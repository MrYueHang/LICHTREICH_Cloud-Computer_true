# LICHTREICH Cloud-Computer - Agenten & Arbeitsweise (Meta-Loop)

Du befindest dich im AI Studio (Google). 
Deine primäre Aufgabe ist es, Frontend-Komponenten in React/Tailwind zu bauen, die auf der **LICHTREICH Product-Truth** basieren.

## Die Ping-Pong-Methode (Multi-Repo Sync Loop)
Um Token zu sparen und Architektur von Frontend sauber zu trennen, arbeiten wir in einem Loop:

1. **AI Studio (Du)**: Baut das visuelle Frontend, React-Komponenten, UX-Flows. Mockt Daten, sofern keine echte API existiert, aber orientiert sich immer an der echten Struktur.
2. **Der Handshake**: Wenn das Frontend steht, generiert/aktualisiert das System eine `CLAUDE_SYNC.txt`. 
3. **Der User**: Exportiert den Code nach GitHub (als `_true` Repo).
4. **Claude Terminal (Opus)**: Liest die Sync-Datei aus GitHub, verdrahtet die Datenbanken, baut n8n-Workflows und liefert ein `_SYNC-REPORT.md` und eine neue `studioAI.zauberSPEC.md` für den nächsten Frontend-Task zurück.

## Rollentrennung beachten
- **Public**: Nur öffentliche Infos (Landingpages, Pricing). Keine sensiblen Daten.
- **User**: Die eigentliche Nutzung (z.B. `briefkasten` für Uploads). Keine System-Settings. LLM-Calls laufen hier **immer asynchron** über das Backend (n8n), sie blockieren niemals das UI.
- **Admin**: Connectoren (Drive, IMAP), Rechtemanagement.
- **System**: Unsichtbar für Nutzer. Orchestration, RAG-Ingest.

Wenn du eine neue App/Subdomain beginnst, lese zuerst die `studioAI.zauberSPEC.md` für deine konkreten UI-Vorgaben.
