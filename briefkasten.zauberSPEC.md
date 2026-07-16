# 🪄 studioAI.zauberSPEC — App: briefkasten (User-Frontend, Pass #1)

> Für AI Studio. **Ebene: User.** Repo-Ziel: `briefkasten` (bzw. `briefkasten_true`). Bauhaus-CI.
> **Kernregel:** LLM-Arbeit blockiert NIE das UI. Upload → n8n → asynchron → Akte. Frontend zeigt nur Status.
> Vertrag: `schemas/briefkasten-upload-async.schema.json` (+ `.example.json`).

## Was gebaut wird: die Upload-Maske + async Status
### 1. Upload-Maske (Drop-Zone)
- Drag&Drop + Datei-Picker + **Kamera/Foto** (mobil). Quellen `foto|scan|pdf|mail|txt` → **ein** Dokumentpfad.
- Optional-Feld **„Hinweis/Strategie"** (Freitext, mehrfach) → geht als `hints[]` mit (Issue #1: müssen wirken).
- Optional **Akte-Zuordnung** (Dropdown vorhandener Akten oder „✨ neue Akte") → `akte_hint`.

### 2. Fire-and-forget an n8n
```js
const job_id = crypto.randomUUID();
// KEIN await auf die Analyse — nur den 202-Ack abwarten:
fetch("https://n8n.lichtreich.info/webhook/bob-briefweg", {
  method: "POST", headers: {"content-type":"application/json"},
  body: JSON.stringify(payload /* = schema briefkasten-upload-async */)
}); // Frontend blockiert nicht; Analyse läuft im Backend
```
n8n antwortet sofort **202 { job_id }**. Die KI (Claude/GPT) arbeitet asynchron im BOB-Briefweg.

### 3. Status-Indikator (das UI-Herzstück)
Karte pro Job, pollt `callback.status_url` (oder Push-Webhook). Zustände als Bauhaus-Ampel:
`empfangen → ocr → analyse → entwurf → fertig` (+ `fehler` rot).
Bei `fertig`: „→ in Akte ansehen"-Link. Kein Spinner, der das UI sperrt — es ist eine Liste laufender Jobs.

### 4. Dialog-Punkt (nach Analyse)
Wenn KI einen Vorschlag hat (Akte/Typ/Frist): **vorschlag → User „✓ ja"/Kommentar → ausgeführt**. Nie raten.

## Rollen-Guard (User-Ebene)
- Keine System-Settings, keine Connector-Secrets sichtbar (die sind Admin).
- Auth: eingeloggter User sieht nur eigene Akten (`owner_id`, pseudonym).

## Definition of Done
- [ ] Upload akzeptiert foto/scan/pdf, erzeugt gültiges Payload (gegen Schema)
- [ ] POST feuert an n8n, UI wartet NICHT auf Analyse
- [ ] Status-Liste pollt + zeigt 5 Zustände + Fehlerfall
- [ ] Hinweis-Feld + Akte-Zuordnung vorhanden
- [ ] neuer `CLAUDE_SYNC.txt`-Block (was das Backend/n8n noch verdrahten muss)

## Was Claude-Terminal parallel verdrahtet (nicht AI Studio)
- n8n-Workflow `bob-briefweg`: Webhook-In → 202-Ack → OCR → classify → strategy → draft → Akte-Insert.
- `status_url`-Endpoint in briefkasten-Backend (job_id → Zustand).
- Blob-Upload-Route (hält Payload klein, `storage_url` statt Base64).
