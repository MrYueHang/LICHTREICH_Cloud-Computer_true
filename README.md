# LICHTREICH Cloud-Computer

Eine modulare, KI-gestützte Arbeitsumgebung für komplexe Akten, Vorgänge und Projekte. LICHTREICH verbindet Dokumenteingang, semantische Wissenssuche, KI-gestützte Interview- und Entwurfslogik, Rollen-/Mandatssteuerung und Workflow-Automation in einer wiederholbaren Betriebskette.

## Die Betriebskette
Jeder Vorgang wird zur Akte, und jede Akte durchläuft dieses Kernmuster:
`Eingang → Analyse → Interview → Briefe/Dokumente → Akte/Ausgang`

## Kernarchitektur & Module
Die Plattform besteht aus einer Subdomain-Landschaft unter `*.lichtreich.info`:
* **briefkasten**: DMS-Kern (Dokumenteingang, OCR, Suche, Tags, Multi-User-Rechte).
* **rag**: Wissensschicht (pgvector, OpenAI-Embeddings, Ingest→Embedding→RAG-Loop).
* **orchestra**: KI-Orchestrierung (Modellpluralität, Provider-Fallback, LLM-Routing).
* **mandat**: Rechte & Rollen (Form, Freiwilligkeit, Laufzeit).
* **n8n**: Workflow-Automation (Execution-Layer für Dossiers).
* **setup**: Infrastruktur (SSO, Connectoren, BYO-Key Verwaltung).

## Evidenz & Wahrheit (Status)
Wir kommunizieren transparent zwischen "Live", "Im Rollout" und "Geplant".
* **Live**: Modulare Subdomain-Landschaft, Dokument- und Aktenkern, RAG-Layer, BYO-Key-/Fallback-Logik.
* **Beta/Rollout**: BOB-Workflow (Bruchstellen bei Foto/PDF & Hinweisen), Plattform-SSO, Connectoren.
* **Alpha**: Juristisch freigegebenes Mandatsmodul.

## Preis- & Go-to-Market-Modell
Wir bieten ein belastbares BYO-Key (Bring Your Own Key) und Plattform-Fallback Modell:
* **Frei (0 €)**: Eigener Key, lokaler Output, begrenzte Akten.
* **Basis (~9 €/Monat)**: Erstes produktives Arbeiten, Quoten für Token/Speicher.
* **Pro (~29 €/Monat)**: Voller Loop, Kollaboration, Storage/Mail-Integration.
* **Whitelabel (Individuell)**: Eigener Namespace, eigene Secrets & Governance.

**Go-to-Market Sequenz**:
Warteliste → Test-User → Design Partner → bezahlte Pilotgruppe → Partner-/Affiliate-Schiene → Whitelabel → Investor Layer.

## Testing & QA
Freigaben erfolgen über strukturierte Regression Packs (Public Front Door, Case Loop, Connector & Rights).
Prüfstack: Öffentliche URL-Probes → authentifizierte Browser-Regression → API-Smoke-Tests → Gold-Case-Wiederholungen → Doppel-Review.
