# VORPROMPTER — roh rein, Spec raus

Der Flaschenhals-Killer. Du kippst rohen Tunnel-Text oder Dateien rein,
ein Modell rekonstruiert **Struktur · Inhalt · Emotion · Spec** + **offene Fragen**
(damit nachher NIE geraten und du NIE auf 0 erklärst). Raus kommt eine **visuelle Karte**.

## So benutzt du es (visuell, ohne Terminal)
1. Doppelklick auf **START-Vorprompter.command**
2. Datei (pdf · docx · txt · md · json) in den **eingang/**-Ordner ziehen
3. Karte geht automatisch im Browser auf und liegt in **ausgang/**

## Per Terminal
```
node vorprompter.mjs                    # alles in eingang/ verarbeiten
node vorprompter.mjs datei.pdf          # gezielte datei
node vorprompter.mjs --text "roh text"  # tunnel-text direkt
node vorprompter.mjs --engine ollama    # echt-offline / 0-token (schwächer)
node vorprompter.mjs --watch            # dauerlauf: eingang/ beobachten
```

## Engines (günstig zuerst, Rückfall automatisch)
- **groq** (llama-3.3-70b) — Default, beste Rekonstruktion, ~0 €
- **openai** (gpt-4o-mini) — zuverlässiger Rückfall
- **ollama** (llama3, lokal) — 0 Token / 0 €, aber schwächer → `--engine ollama`
- **deepseek** — letzter Rückfall

Keys werden aus `~/Briefkasten/briefkasten/.env.local` geerbt (nichts neu einrichten).
Text-Extraktion läuft lokal/0-Token: `textutil` (docx), `pdftotext`/`pypdf` (pdf).

## Was als Nächstes drankommt (die Kette)
Vorprompter = **Stufe 2**. Danach: die Spec (`ausgang/*.json`) geht an den **Motor**
(billige Loops führen aus, Opus setzt die Weiche 1×), Ergebnis landet in der **Abnahme-Bahn**.
