# _SYNC-REPORT — Claude.Terminal ↔ AI Studio (Ping-Pong)

> Antwort auf `CLAUDE_SYNC.txt`. Sync-Pass #1 · 2026-07-16 · ausgeführt von Claude-Terminal.
> Prinzip: AI Studio schreibt die Product-Truth → dieses Repo ist Bindegewebe → Claude synct ins Live-System.

## ✅ Sync-Aufgaben (aus CLAUDE_SYNC.txt)

| # | Aufgabe | Status | Beleg |
|---|---------|--------|-------|
| 1 | TODO/README/HANDBUCH analysieren | ✅ | dieser Report |
| 2 | BOB-Briefweg-Metastruktur → JSON-Schema | ✅ | `schemas/workflow.schema.json` + `schemas/bob-briefweg.json` |
| 3 | TODO.md → strukturierte Tickets | ✅ | 12 GitHub-Issues #1–#12, Labels `prio:kritisch/hoch/mittel/strategisch` |
| 4 | README-Kernaussagen → RAG-Ingest | 🟡 vorbereitet | `rag-ingest/product-truth.md` — Push wartet auf Ingest-Endpoint (health = 404, s.u.) |
| 5 | Nächste n8n-Migration benennen | ✅ | unten |

## 5) n8n-Workflow-Migration auf die Metastruktur (Reihenfolge)
Deine 3 Live-Workflows an `schemas/workflow.schema.json` andocken:
1. **`bob-briefweg`** (mdZOV2H5dDmw0Pke) — zuerst, ist der Kern-Loop. Instanz liegt schon (`schemas/bob-briefweg.json`), Status `alpha`.
2. **`rag-datenfutter`** (Ingest→Embedding) — Status `live`, sauber dokumentieren als Referenz-Vorlage.
3. **`vertragsvergleich`** (lKTENoLZ… / NhFgVKV3…) — Status `pilot`, danach.
→ Regel: erst wenn `tests` grün (Happy Path + Fehlerfall) wird `status: live`.

## 🔌 Ingest-Kanal (Task 4, ehrlich)
`ingest.lichtreich.info/api/health` und `/api/ingest` → **404**. Der Push wird NICHT blind gemacht.
Payload liegt bereit in `rag-ingest/product-truth.md`. Sobald der Ingest-Endpoint/Console bestätigt ist
(oder Claude-in-Chrome die Ingest-UI bedient), geht der Push raus + wird auf `rag` verifiziert (Chunk-Count vorher/nachher).

## 🐛 Debug: Platzhalter & tote Knöpfe (Frontend-Scan)
| Ort | Befund | Fix / Head-of-Board |
|-----|--------|---------------------|
| `Footer.tsx:40-41` | Impressum + Datenschutz = `href="#"` | ⚠️ **Impressum ist in DE Pflicht** → echte Seiten (setup) |
| `Hero.tsx` Waitlist | Form hat Handler, aber **kein Backend** (schreibt nirgends) | POST an api/board-Endpoint → Warteliste (api) |
| `Hero.tsx:96` „Architektur ansehen" | Button **ohne Handler** | Anker/Route auf Betriebskette (frontend) |
| `.env.example` | nur `GEMINI_API_KEY`, `APP_URL` | Connector-Vars ergänzt → s. `.env.example` |

## 🧭 ROUTING — wann/wer/wie/was (Anthropic-Token sparen)
Der Kern deiner Frage: **wer macht was, damit Opus-Token nur für Architektur draufgehen.**

| Job | Ausführer | Warum |
|-----|-----------|-------|
| Strategie, Architektur, Verdrahtung, Schema-Entscheid | **Claude-Terminal (Opus, hier)** | teuer → nur das Heikle |
| Frontend/hübsch bauen, Landing, Module | **Google AI Studio** | Superpro-Frontend, 0 Anthropic-Token |
| UI-Importe (AI-Studio-Export, n8n-/Whiteboard-Import) | **Claude-in-Chrome** | bedient Oberflächen, die keine API haben |
| Dauer-Loops, headless Batch | **Desktop/VPS-Claude headless** | läuft nebenbei, ohne dich |
| Masse-Text, OCR, Entwürfe, Formatieren | **lokal/cheap** (`chat.mjs`: groq→openai→gemini, `aider`) | Cent statt Opus-Token |
| Workflow-Ausführung (Trigger, Ketten) | **n8n** | Execution-Layer, kein LLM nötig |
| Code-Sandbox, Live-Edit | **GitHub Codespaces / VS Code** | isoliert, ohne lokale Last |
| Wissen/Suche | **rag + ingest** | einmal einspeisen, alle Agenten wissen es |

**Faustregel:** Kommt eine Aufgabe rein → *ist es Architektur/Entscheidung?* Ja → hier. Nein → an den billigsten Ausführer oben routen. Opus dirigiert, führt nicht aus.

## 🏓 PING-PONG-PROTOKOLL (so loopst du das, für JEDE App)
1. **App (AI Studio o.a.)** legt `CLAUDE_SYNC.txt` ab (Systemdialog-Block) + `README/HANDBUCH/TODO`.
2. **Export → GitHub** in ein `*_true`-Repo.
3. **Claude-Terminal** klont, führt die 5 Standard-Schritte aus → `_SYNC-REPORT.md` zurück.
4. **Verknoten:** Schema in `schemas/`, Tickets als Issues, Payload in `rag-ingest/`.
5. **Nächster Ball:** offene Fragen unten → App verbessert → neuer Sync-Pass.
→ Gilt für n8n, Whiteboard und die nächsten Apps identisch. Der Teppich fliegt, weil der Loop immer gleich ist.

## ❓ OFFENE GRUNDSATZFRAGEN (zurück an die App / dich)
- **Ingest-Endpoint:** Wie speist man `rag` produktiv? (Console-URL / API-Route / Token?)
- **Waitlist-Ziel:** Wohin sollen E-Mails? (Neon-Tabelle `warteliste`? n8n-Webhook? Mail?)
- **Impressum/Datenschutz:** Auf `setup` zentral, dann von allen Apps verlinken?
- **Preis-Kollision:** README sagt 0/9/29/Whitelabel — Board/Memory sagte 0/29/Enterprise. **Welches gilt?**
- **Repo-Kanon:** `LICHTREICH_Cloud-Computer_true` = ab jetzt das eine Cloud-Computer-Repo? Andere archivieren?

## 📥 NÄCHSTER SYNC-INPUT (angekündigt)
`deep-research-report.md` + `LIESMICH-vorprompter.md` (Deep-Research-Briefing) — eingespeist in `docs/research/`.

---

# Sync-Pass #2 — Antwort auf CLAUDE_SYNC (Frontend-Pass #3)
2026-07-16 · AI Studio hat geliefert (FAQ/GTM/HeadOfBoard/Personas/WorkflowCards/Impressum/Datenschutz/Routing/Waitlist) + AGENTS.md + neue TODO (Rollentrennung, Async, Multi-Repo).

| Auftrag | Status | Beleg |
|---------|--------|-------|
| 1. Multi-Repo-Struktur | ✅ | `docs/MULTI-REPO-MATRIX.md` |
| 2. Briefkasten-Async-Payload | ✅ | `schemas/briefkasten-upload-async.schema.json` + `.example.json` |
| 3. Skill/Meta-Prompt | ✅ | `LIESMICH-loop-agent.md` (→ als AGENTS.md in jedes Repo) + Claude-Skill `github-loop` |
| 4. Nächste zauberSPEC (briefkasten) | ✅ | `specs/briefkasten.zauberSPEC.md` (Upload-Maske + async Status) |

**Live-Verifikation:** `rag.lichtreich.info/api/stats` → **2035 Chunks** (wissen 2002, entscheidungen 12, …).
Ingest-**Write**-Route weiter 404 (alle Varianten) → Ingest ist Console/UI-getrieben → Push via Claude-in-Chrome, nicht blind.

**Entscheidung gefallen (aus AI-Studio `.env`):** Waitlist-Ziel = **n8n-Webhook** `n8n.lichtreich.info/webhook/warteliste`. ✅
**Noch offen:** Preis-Kanon (0/9/29/WL vs 0/29/Ent) · produktiver Ingest-Write-Endpoint.

**Nächster Frontend-Ball (AI Studio):** `specs/briefkasten.zauberSPEC.md` bauen (User-Ebene, Upload + async Status).
**Ausblick geparkt:** live.dev.synthesizer (alle Tools/Connectoren ein Loop) · Browser-KI + chat.online einbetten · Artefakte aus Claude-/AI-Studio-Bibliothek modulfähig machen (remix ab Modul-Schwelle) · GPT-/NotebookLM-eigene Loops für „smarte Auslesen". Siehe `docs/OUTLOOK-synthesizer.md`.
