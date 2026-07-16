# OUTLOOK — live.dev.synthesizer (geparkter Gesamt-Ausblick)

> Stefans Vision über den aktuellen Loop hinaus. NICHT jetzt bauen — Kontext festhalten, damit der
> Teppich in dieselbe Richtung wächst. Alles im **GitHub-Loop**, rollen-getrennt, token-sparend.

## Die Idee
Ein **live.dev.synthesizer**: nicht 13 Insel-Dienste, sondern eine Fläche, in der **alle Tools und
Connectoren** zusammenlaufen. Jedes KI-Tool fährt seinen **eigenen Ping-Pong-Loop**, die Ergebnisse
werden modulfähig gemacht und ausgegliedert.

## Bausteine (Backlog, grob)
1. **Multi-Tool-Loops** — je Tool ein Loop nach demselben Muster (`LIESMICH-loop-agent.md`):
   - **AI Studio (Gemini)** — Frontend/UI. ✅ läuft.
   - **Claude-Terminal** — Architektur/Backend. ✅ läuft.
   - **GPT-Loop** — „smarte Auslesen" (Extraktion/Analyse) asynchron in GPT ablegen.
   - **NotebookLM** — Dokument-/Notebook-Synthese als eigene Quelle.
   - **Browser-KI (Claude-in-Chrome) + chat.online** — smooth eingebettet, UI-Importe + Live-Chat.
2. **Messaging-Agenten** — **Telegram + WhatsApp** als Ein-/Ausgabe-Kanäle + ihre **Boards**;
   Nachrichten werden im Loop **geparst** → Akte/Task (User-Ebene, async über n8n).
3. **Artefakt-Import** — Artefakte aus **Claude-App-Bibliothek** oder **AI-Studio-Bibliothek** laden →
   angleichen (Bauhaus-CI) → **modulfähig** machen → als `<modul>_true`-Repo ausgliedern.
4. **Remix ab Schwelle** — ab einer gewissen Modul-Sammlung Module per **Remix** neu kombinieren.
5. **Connector-Fläche** — alle Connectoren (Storage/Mail/Messaging/Notebooks/LLMs) an einem Ort,
   „ehrliche Lampe" (echt-test) je Connector. Admin-Ebene.
6. **Notebooks/Tools auslesen** — Notebooks + weitere Tools maschinell auslesen und in `rag` einspeisen.

## Leitplanken (damit es nicht wieder zerfasert)
- Alles über **GitHub-Loop** (Ping-Pong), nie ad-hoc.
- **Rollentrennung** Public/User/Admin/System bleibt hart.
- **Async**: kein LLM blockiert je ein UI. n8n = Execution-Layer.
- **Token**: Opus nur Architektur; Frontend AI Studio; Masse groq/lokal; Wissen einmal in `rag`.
- **Ehrlich**: Status alpha/pilot/beta/live; nichts behaupten ohne Beleg (curl/Verifikation).

## Reihenfolge-Vorschlag (wenn dran)
briefkasten-User-Frontend (läuft an) → n8n `bob-briefweg` verdrahten → Messaging-Agenten (Telegram zuerst)
→ GPT-/NotebookLM-Loops → Connector-Fläche → Remix/Ausgliederung.

## Nachtrag (Brain-Dump 16.07)
- **Instanzen-Manager:** bei 3–4 parallelen Claude-Instanzen ein Manager, der koordiniert — über
  **Git-Branches** (je Instanz/Modul ein Branch, Loop merged), halb mitgeschrieben, kleine Steps oder API.
- **NotebookLM „andersrum":** nicht nur Quelle, sondern **Live-Handbuch-Visualisierer** — erklärt sich selbst
  (IST → SOLL → what's new). Hand-off: `handoffs/NOTEBOOKLM.md`. Braucht nur saubere Anleitung + Schnittebene.
- **Sub-Modul-Dialog-Muster:** Ebenen als Unterseiten/Sub-Module einbauen — aber **auseinandergezogen**, damit
  der Nutzer an jedem Punkt eingreifen kann (wie dieser Chat). Dialog-Punkt überall: vorschlag→✓→ausgeführt.
- **~100 .md sortieren:** schnell in richtige Reihenfolge bringen (Skill `wissens-ingest`, cheap/lokal) →
  dann als NotebookLM-Quelle + `rag`.
- **n8n Live-Landkarte + Mega-RAG:** das Muster noch cooler ziehen (Landkarte = lebende Sicht auf den RAG).
- **Andere Subdomains reinziehen:** je Subdomain in denselben Loop (Hand-offs GPT/Gemini/NotebookLM).
