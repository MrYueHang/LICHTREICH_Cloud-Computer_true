# Hand-off → Gemini / AI Studio (Frontend-Loop)

**Rolle im Loop:** AI Studio baut Frontend (React/Tailwind, Bauhaus-CI), token-günstig. Liest `AGENTS.md`
+ die jeweilige `studioAI.zauberSPEC.md`. Kein Backend, keine blockierende LLM-Logik im UI.

## Aktueller Auftrag
Baue die App **briefkasten** (User-Ebene) nach `specs/briefkasten.zauberSPEC.md`:
Upload-Maske (foto/scan/pdf → ein Pfad) + Hinweis-Feld + Akte-Zuordnung → **fire-and-forget an n8n**
(`schemas/briefkasten-upload-async.schema.json`) + **async Status-Ampel** (empfangen→ocr→analyse→entwurf→fertig).

## Paste-Prompt (in AI Studio)
```
Lies AGENTS.md und specs/briefkasten.zauberSPEC.md. Baue das User-Frontend der App "briefkasten"
(Bauhaus-CI, React/Tailwind). Kernregel: LLM blockiert NIE das UI — Upload feuert per fetch (ohne await
auf die Analyse) an https://n8n.lichtreich.info/webhook/bob-briefweg (Payload = Schema
briefkasten-upload-async). Zeig eine Liste laufender Jobs mit Status-Ampel, die callback.status_url pollt.
Rollentrennung: User-Ebene, keine System-Settings/Secrets sichtbar.
Am Ende: aktualisiere CLAUDE_SYNC.txt mit dem, was das Backend/n8n noch verdrahten muss, und exportiere nach GitHub.
```

## Rückkanal
Export → GitHub → Claude-Terminal verdrahtet n8n `bob-briefweg` + `status_url` + Blob-Upload.
