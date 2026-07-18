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

## 🗄️ Wissen partitionieren (mehrere Namespaces, nicht ein Topf)
Nicht alles in EINEN RAG-Pool — sonst vermengt sich Recht mit Verschwörung/Health/Hobby/Privatem.
Statt neuer DB: **Felder auf dem bestehenden `wissen_vektoren` + Query-Scoping** (edit, nicht neu bauen):
- `namespace/domain`: recht · medizin · finanz · immo · hobby · **privat** · fringe(verschwörung/weltanschauung) · …
- `glaubhaftigkeit`: 🟢 hoch · 🟡 mittel · 🔴 niedrig
- `ebene`: system · projekt · user
- `sensibel` (bool): persönliche Docs/Bilder → **eigener PRIVATER Store** (DSGVO), NIE im geteilten RAG.
**RAG-Query scoped** auf gewählte Namespaces → z.B. „nur recht+medizin, min. glaubhaftigkeit mittel" → kein Vermischen.
So bleibt belastbares Rechtswissen sauber getrennt von Fringe/Hobby/Privat, aber alles im selben System steuerbar.

## 🧠 Head-of-Module-KI Engine (gefunden 18.07)
- **STANDARD: gpt-4o-mini** (API, cheap) = das Gehirn. Reicht: kleiner Kontext, nur Modul-interne Aktionen, iteriert/nicht statisch.
- **PRIVAT-Fallback: web-llm** (Apache-2.0, Browser-LLM, kein Server) — für sensible/persönliche Module, rein lokal.
- **LettaAI** = persistentes Gedächtnis + Streaming (Kontext je Ebene user/community/system, „Hinweis aus dem Stream"). Auf der Liste.
- Läuft auf daedalOS (desktop.lichtreich.info): KI-Assistenz.of.Board pro Modul — vorquatschen → greift durch, führt aus/verschiebt/verbindet Nodes.
- Was die KI kann = was der User kann (kennt den zusammengefassten Kontext + datendekonstruierte Sichten).

### Klarstellung „lokal" (web-llm)
- „lokal" = **User-Browser/Gerät** (WebGPU), NICHT VPS/Server. Modell lädt 1× (~1–4GB), rechnet auf dem Gerät → 0 Kosten, komplett privat.
- Einbinden: JS-Lib `@mlc-ai/web-llm` als React-Komponente (daedalOS · me.lichtreich · briefkasten).
- Einsatz: SENSIBEL/privat (Personal-Docs, Bilder) → web-llm (Gerät). Allgemein/scoped → gpt-4o-mini (cloud). VPS-lokal wäre ollama (separat).
