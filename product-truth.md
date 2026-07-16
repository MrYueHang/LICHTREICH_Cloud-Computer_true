# RAG-Ingest-Payload: LICHTREICH Product-Truth
> Für ingest.lichtreich.info → embed → rag. Damit alle Agenten die Ausrichtung kennen.
> Quelle: README.md + HANDBUCH.md (AI-Studio Product-Truth, 2026-07-16). Reicher Quelltext folgt aus `deep-research-report.md`.

## Kern-Positionierung (was wir SIND und NICHT sind)
LICHTREICH ist **keine** generische „KI für alles" und **kein** generischer Agenten-Builder.
Es ist eine **orchestrierte Fall- und Aktenmaschine**: modulare, KI-gestützte Arbeitsumgebung
für komplexe Akten, Vorgänge und Projekte.

## Die Betriebskette (fest)
Jeder Vorgang wird zur Akte. Jede Akte durchläuft:
**Eingang → Analyse → Interview → Briefe/Dokumente → Akte/Ausgang.**

## Modul-Architektur (Subdomains unter *.lichtreich.info)
- briefkasten — DMS-Kern (Eingang, OCR, Suche, Tags, Multi-User-Rechte)
- rag — Wissensschicht (pgvector, OpenAI-Embeddings, Ingest→Embedding→RAG)
- orchestra — KI-Orchestrierung (Modellpluralität, Provider-Fallback, Routing)
- mandat — Rechte & Rollen (Form, Freiwilligkeit, Laufzeit)
- n8n — Workflow-Automation (Execution-Layer)
- setup — Infrastruktur (SSO, Connectoren, BYO-Key)

## Wahrheitsgemäße Status-Kommunikation
Live vs. Beta/Rollout vs. Alpha wird transparent benannt. Was Alpha ist, heißt Alpha.
- Live: Subdomain-Landschaft, Dokument-/Aktenkern, RAG-Layer, BYO-Key/Fallback.
- Beta: BOB-Workflow (Bruchstellen Foto/PDF & Hinweise), SSO, Connectoren.
- Alpha: juristisch freigegebenes Mandatsmodul.

## GTM-Sequenz
Warteliste → Test-User → Design Partner → bezahlte Pilotgruppe → Partner/Affiliate → Whitelabel → Investor.
