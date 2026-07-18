# 🧠 MODUL.of.Board — Head-of-Module-KI für Wissen (Ingest, richtig gedacht)
> Stefan prüft Wissen NICHT selbst. Er gibt Thema + Quellen; die KI kuratiert/gewichtet/prüft/speist.
> Korrigiert das Missverständnis: kein absatzweises Selbst-Review. Die Steuer-Logik (Thema/Budget/Anzahl)
> ist Backend; die Head-of-Module-KI fährt sie. UI online in ingest.lichtreich.info (Klick, kein Code).

## Bedienung (online, für Stefan)
1. **Thema eingeben** (z.B. „Inkasso-Schonfrist").
2. **Quellen klicken** (Presets nach Glaubhaftigkeit):
   - 🟢 Hart: Wikipedia · PubMed · Rechtsprechung/Gesetze · Fachdatenbanken
   - 🟡 Kontext: Foren · Blogs · Branchen-Seiten
   - 🔴 Fringe (markiert): Telegram-Channels · Weltanschauungen · Verschwörung
3. **Regler:** Budget (Cent) · Anzahl · Zeit · Tiefe.
4. **KI kuratiert:** holt, dedupliziert (keine Doppel/Widersprüche wie früher), **taggt Glaubhaftigkeit 🟢🟡🔴**, speist → RAG.

## Glaubhaftigkeits-Gewicht (Kern)
Jeder Chunk kriegt `glaubhaftigkeit: hoch|mittel|niedrig` + `quelle`. RAG-Antworten priorisieren hoch,
zeigen niedrig nur mit Warnung. So ist auch **vorhandenes** Wissen prüf-/filterbar.

## Anti-Widerspruch (Lehre aus alten Versuchen)
- Dedupe vor Ingest (idempotent, gleiche quelle_id).
- Bei Konflikt zwischen Quellen: NICHT beide blind rein — KI markiert „strittig", behält beide MIT Glaubhaftigkeit.
- NotebookLM als **Gegenlese-/Live-Handbuch-Schicht** (erklärt, findet Widersprüche) — nicht als 2. Wahrheit.

## Backend (existiert schon)
`ingest-steuer.mjs` (Thema/Budget/Anzahl/Dry) → embed → wissen/wissen_vektoren. Fehlt: Quellen-Konnektoren
(Wikipedia/PubMed/Telegram-Fetcher) + Glaubhaftigkeits-Feld + die Online-Regler-UI. = eigener Bau-Slot.

## Desktop-AI (Idee): auf daedalOS ein Assistent, der sich selbst einrichtet
daedalOS hat StableDiffusion, aber KEINEN Cortana-Assistenten out-of-the-box → wir setzen die Head-of-Module-KI
als Desktop-Assistent drauf, der sich von innen heraus optimal einrichtet. Später, eigener Slot.
