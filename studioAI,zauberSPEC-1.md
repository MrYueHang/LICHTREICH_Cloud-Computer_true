# 🪄 studioAI.zauberSPEC — Rückball an AI Studio (priorisiert)

> **Der Dialog-Pong.** AI Studio hat den Ping gespielt (`CLAUDE_SYNC.txt`), Claude-Terminal hat
> synchronisiert (`_SYNC-REPORT.md`). Das hier ist der Rückball: **was AI Studio als Nächstes baut**,
> priorisiert (P0→P2), mit allem, was es bis hier brauchte. AI Studio macht das Frontend/Hübsch
> (spart Anthropic-Token), Claude verdrahtet danach ans Live-System.
>
> **Quelltext (der 90 %):** `docs/research/02_landing+faq_4v5.md` (Sekt. 4 Landing + Sekt. 5 FAQ 50+),
> `docs/research/01_befund_1v5.md`, `docs/research/03_LIESMICH-vorprompter.md`.
> **Regeln:** Bauhaus-CI beibehalten · kein Mock, Daten aus `api.lichtreich.info/api/v1` ·
> Status ehrlich (Alpha heißt Alpha) · Dialog-Punkt: vorschlag→✓→ausgeführt, nie raten.

---

## 🟥 P0 — Vertrauen & Recht (Blocker, zuerst)
1. **Impressum + Datenschutz echt** — aktuell `Footer.tsx` `href="#"`. In DE **Pflicht**. Eigene Seiten/Routen.
2. **Waitlist-Backend** — `Hero.tsx`-Form hat Handler, aber schreibt nirgends. → POST an `WAITLIST_WEBHOOK_URL`
   (n8n-Webhook `warteliste`) oder Neon-Tabelle. Erfolg/Fehler sichtbar machen.
3. **„Architektur ansehen"-Button** — ohne Handler. → Anker auf die Betriebsketten-Sektion.

## 🟧 P1 — Content-Sektionen (der 90 %-Text, aus Deep-Research)
Landing aus `docs/research/02_landing+faq_4v5.md` § „4. Landingpage-Struktur" ausbauen — in Sektionen:
- **Produktkern in öffentlicher Sprache** (keine „KI für alles" → Fall-/Aktenmaschine)
- **Betriebskette** (Eingang→Analyse→Interview→Briefe→Akte) — als Ablauf-Sektion
- **Module** (Subdomain-Landschaft, je 1 Satz Remit)
- **Personas/Zielgruppen** (§3 im Report)
- **Preise** (P1-Konflikt klären, s.u.) + **BYO-Key**-Erklärung
- **FAQ** (§5, 50+ Fragen, kategorisiert: Einstieg/Bedienung/BOB/RAG/n8n/Society/Datenschutz/Preise/Test-User/Partner/Investor)
- **GTM-Funnel** (Warteliste→Test-User→Design Partner→Pilot→Partner→Whitelabel→Investor)

## 🟧 P1 — IST → SOLL → live (ehrliche Status-Matrix, sichtbar)
Eine Sektion/Reiter, die pro Modul den **Ist-Stand** zeigt und den Weg zu **live**. Quelle: `README.md`
„Evidenz & Wahrheit" + Report §„Evidenzmatrix". Muster pro Zeile:

| Modul | IST | SOLL (Kriterium für live) |
|-------|-----|---------------------------|
| briefkasten | beta (Foto/PDF, Hinweise brüchig) | Issue #1+#2 grün → live |
| rag/ingest | live | Ingest-Endpoint public bestätigt |
| orchestra | pilot (0 Rollen live) | echte Rollen aus Society (Issue #8) |
| mandat | alpha | Rechtsreview + Beleg-Upload (Issue #6) |
| setup | beta | eigene Produkttür + SSO (Issue #3+#4) |

→ „live wird" heißt: **Tests grün (Happy Path + Fehlerfall) + Doppel-Review**. (Schema: `schemas/workflow.schema.json`.)

## 🟨 P1 — Head-of-Board-Reiter (die Klammer)
Reiter aus `GET api.lichtreich.info/api/v1/projects` rendern. Pro Reiter: Remit + Status-Lampe +
**Dialog-Feld** (vorschlag→✓/Kommentar→ausgeführt). KI-Calls cheap-first (groq→openai→gemini).

## 🟨 P1 — Whiteboard-Reiter
Freies Board (drag&drop) neben den strukturierten Reitern — Vorstufe der lebenden Landkarte (n8n × Notion).
Erstmal: Notizen/Karten frei platzieren, später an Akte/Task koppeln.

## 🟩 P2 — Connectoren-UI
Settings-Reiter für Storage/Mail (Drive/Dropbox/Box/IMAP) — Felder aus `.env.example`. Nur UI + „ehrliche Lampe"
(echt-test), echte OAuth-Secrets trägt der User/Claude ein. (Issue #5.)

---

## 🧭 Routing (wer macht was — Token sparen)
AI Studio = Frontend/hübsch · Claude-Terminal = Architektur/Verdrahtung · Claude-in-Chrome = UI-Importe ·
Desktop/VPS = Dauer-Loops · lokal/cheap (`chat.mjs`, `aider`) = Masse/Text · n8n = Execution · Codespaces = Sandbox.

## 🧩 Skills, die den Loop tragen (Claude-Seite)
`orchestrator` (Routing/Rückfall) · `outsourcing` (an Builder auslagern) · `qm-feedbackloop` (Opus 1× Spec, cheap N×) ·
`wissens-ingest` · `legal-due-diligence` (FEHLT-Prüfung) · `db-strategie` · `system-inventur`.

## ❓ Vor dem Bauen entscheiden (an dich)
1. **Preis-Kanon:** README `0/9/29/Whitelabel` **vs.** früher `0/29/Enterprise` — was gilt auf der Landing?
2. **Waitlist-Ziel:** n8n-Webhook **oder** Neon-Tabelle?
3. **Ingest-Endpoint:** wie speist man `rag` produktiv (URL/Token)?

## 📌 Definition of Done (dieser Pass)
- [ ] P0 alle drei (Recht + Waitlist + Button)
- [ ] Landing hat ≥5 Content-Sektionen aus Deep-Research
- [ ] IST→SOLL-Matrix sichtbar
- [ ] Reiter aus echter /projects-API
- [ ] neuer `CLAUDE_SYNC.txt`-Block für den nächsten Pong
