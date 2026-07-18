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

## ⚡ Integration-first (gegen den Secrets-Krampf) — für ALLE Projekte
Bevor irgendjemand Backend/Secrets/.env von Hand verdrahtet: **AI Studios native Integrations nutzen.**
Studio trägt die Keys/OAuth selbst ein (Integrations-Panel) — Claude sucht KEINE Enden mehr.

| Bedarf | Native Integration (statt Hand-Backend/n8n) |
|--------|---------------------------------------------|
| DB / Persistenz | **Firebase Firestore** (ready to use) · Cloud SQL |
| Auth / eigener Bereich | **Firebase Auth** · Enable OAuth manually |
| Mail / IMAP | **Gmail** |
| Fristen-Kalender (Sub-Tool) | **Google Calendar** |
| Redaktionsplan / Tabellen | **Google Sheets** · **Google Tasks** |
| Dokumente / Briefe | **Google Docs** · Slides |
| Datei-Upload / Drive | **Google Drive** / **Picker** |
| Kontakte | **Contacts** |
| Team-Chat | **Google Chat spaces** |

→ Diese ersetzen die meisten n8n-**Connectoren**. **n8n bleibt nur für SYSTEM-Orchestrierung**
(Health-Live-Karte, RAG-Ingest, VPS-übergreifende Ketten) — nicht mehr für jeden Einzel-Connector.

## Token-Doktrin
Opus nur für Architektur/Heikles. Frontend + DB/Auth/Connectoren → AI Studio (native Integrations, Plan/Free).
Masse → groq/lokal. Execution → n8n. Wissen einmal in `rag`, dann kennen es alle. „So fliegt der Teppich."

## Tag-Konvention (wiederfinden)
`Head-of-Board: **<dienst>**` · `Betriebskette: eingang|analyse|interview|briefe|akte` ·
Status: `alpha|pilot|beta|live` · Dialog-Punkt: `vorschlag→bestätigt→ausgeführt` (nie raten).

## 💾 Prompt-Caching (Token sparen, wo Claude-API genutzt wird)
- **Claude Code cached automatisch** (1h-TTL) — diese Sessions sparen schon. Nichts einzurichten.
- **Claude-API-Agenten (Head-of-Module, orchestra):** `cache_control:{type:"ephemeral"}` auf den STABILEN Präfix
  (System + RAG + Product-Truth ZUERST), variable Frage ZULETZT. ~90% billiger auf Wiederhol-Reads. Min ~1024 tok, max 4 Breakpoints.
  Prüfen: `usage.cache_read_input_tokens` > 0 (sonst killt ein Zeitstempel/unsortiertes JSON den Cache).
- **cheap-Loop = OpenAI** (eigenes Auto-Caching) — Anthropic-Caching nur bei Claude-Calls.
- Metrik: platform.claude.com/usage/cache.
