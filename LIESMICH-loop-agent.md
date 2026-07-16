# LIESMICH — Loop-Agent (Meta-Prompt für JEDES Repo)

> In jedes LICHTREICH-Repo als `AGENTS.md` legen. Erklärt jeder KI „without head", wie sie sich in
> das große Ganze einfügt — token-sparend, rollen-getrennt, im GitHub-Ping-Pong.

## Wer bist du gerade?
- **AI Studio (Gemini)** → du baust **Frontend** (React/Tailwind, Bauhaus-CI). Kein Backend, keine teure
  LLM-Logik im UI. Mock nur, wenn keine echte API da ist — aber an der echten Struktur orientiert.
- **Claude-Terminal (Opus)** → du machst **Architektur, Verdrahtung, Backend, n8n, Schemas, Skills**.
  Du führst nicht Masse aus — du dirigierst. Masse/Text → lokal/cheap (`chat.mjs`, `aider`).
- **Claude-in-Chrome** → **UI-Importe** (AI-Studio-Export, n8n/Whiteboard), Browser-QA.
- **Desktop/VPS headless** → **Dauer-Loops**, asynchrone Jobs.

## Der Ping-Pong (Standard-Prozess)
1. **AI Studio** baut Frontend → aktualisiert `CLAUDE_SYNC.txt` (der Ping).
2. **User/Chrome** exportiert nach GitHub (`<name>_true`-Repo).
3. **Claude-Terminal** klont, führt aus, liefert `_SYNC-REPORT.md` (Pong) + nächste `studioAI.zauberSPEC.md`.
4. **AI Studio** liest die zauberSPEC → baut den nächsten Frontend-Task. Loop.

## Die Standard-5-Schritte (Claude-Terminal je Sync)
1. `README/HANDBUCH/TODO` lesen (Product-Truth).
2. Metastruktur → JSON-Schema in `schemas/` (Vertrag).
3. `TODO.md` → GitHub-Issues mit `prio:*`-Labels.
4. Kernaussagen → `rag-ingest/` (System zieht nach `rag`).
5. `_SYNC-REPORT.md` + `studioAI.zauberSPEC.md` zurück. Debug tote Knöpfe/Secrets mitliefern.

## Rollentrennung (HART)
| Ebene | Was | Regel |
|-------|-----|-------|
| **Public** | Landing, Pricing, Warteliste | keine sensiblen Daten |
| **User** | Nutzung (briefkasten, Cockpit, Akte) | LLM-Calls **immer async** über Backend/n8n, nie blockierend |
| **Admin** | Connectoren, Rechte, Abrechnung (mandat) | Secrets nur hier |
| **System** | n8n, RAG-Ingest, Orchestrator | unsichtbar für Nutzer, headless |

## Token-Doktrin
Opus nur für Architektur/Heikles. Frontend → AI Studio (Plan/Free). Masse → groq/lokal. Execution → n8n.
Wissen einmal in `rag`, dann kennen es alle. „So fliegt der Teppich."

## Tag-Konvention (wiederfinden)
`Head-of-Board: **<dienst>**` · `Betriebskette: eingang|analyse|interview|briefe|akte` ·
Status: `alpha|pilot|beta|live` · Dialog-Punkt: `vorschlag→bestätigt→ausgeführt` (nie raten).
