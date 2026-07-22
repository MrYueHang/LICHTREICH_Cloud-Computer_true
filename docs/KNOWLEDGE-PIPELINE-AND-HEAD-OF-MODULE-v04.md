# Knowledge Pipeline & Head-of-Module v04

## Entscheidung

`ingest.lichtreich.info` ist der Eingang, Kontrollraum und Review-Arbeitsplatz. `rag.lichtreich.info` ist die freigegebene Retrieval-/Auskunftsschicht am Ende. Dazwischen liegt eine kanonische Wissens- und Qualitätsstrecke; RAG ist nie die Source of Truth.

## Gesamtstrecke

```text
Capture Surfaces
Briefkasten · Dateien · Chat · Voice · URL · Drive · Dropbox · Research Topic
        ↓
INGEST CONTROL PLANE
Quelle wählen · Ziel/Scope · Datenklasse · Budget · Tiefe · Outputs · Human Gate
        ↓
PASS A — Intake Workers
Hash/Dedupe · Malware · Dateityp · OCR/Transkript · Sprache · Secret/PII-Signale
        ↓
SCOPE & POLICY GATE
System · Organisation/Branche · Projekt · Community · User · Restricted/Vault
        ↓
PASS B — Knowledge Analyst
Entitäten · Fakten · Claims · Annahmen · offene Fragen · Termine · Konflikte · Beziehungen
        ↓
KNOWLEDGE REGISTRY
Quelle → Extrakt → Claim → Evidenz → Erkenntnis → Regel → Entscheidung → Aktion → Ergebnis
        ↓
CURATOR / HEAD OF KNOWLEDGE
Autorität · Aktualität · Widerspruch · Relevanz · Freigabe · Modulrouting
        ↓
PASS C — HEAD OF MODULE
Legal · Immo/DD · Social · Finance · TAKTØR · System · GEZy usw.
        ↓
HUMAN REVIEW / DECISION GATE
Übernehmen · ändern · ablehnen · beide Positionen behalten · eskalieren
        ↓
CANONICAL STORES
Git/ADR · PostgreSQL Registry · Paperless · OpenProject · Object Storage · MACAN
        ↓
INDEX BUILDERS
Volltext · Embeddings · Graph Read Model · Zeit-/Kostenmetriken
        ↓
RAG / UNIVERSAL SEARCH
scope-gefilterte Suche · Quellen · Zitate · Revocation · Retrieval Tests
        ↓
WORK CHAT / DESKTOP / MODULE UI
Antwort · Plan · Taskvorschlag · Artefakt · Workflowvorschlag · keine stille Außenwirkung
```

## Wer ist der KI-Assistent?

Es gibt nicht einen allmächtigen Bot, sondern Rollen mit einem gemeinsamen Contract.

### Personal/Workspace Coordinator

- nimmt Voice/Text/Datei/Chat entgegen,
- erkennt Ziel, Scope und zuständiges Modul,
- startet keine irreversible Fachaktion selbst,
- zeigt Plan, Budget, Datenzugriffe und Reviewbedarf.

### Head of Knowledge

- verantwortet Ingest-Qualität, Provenienz, Konflikte und Freigabe zum Index,
- darf Quellen nicht still überschreiben,
- erzeugt Knowledge Objects und Review-Vorschläge.

### Head of Module

- besitzt Fachregeln, Tools, Outputs und Qualitätskriterien eines Moduls,
- verarbeitet nur erlaubte Scope-/Datenobjekte,
- kann weitere spezialisierte Worker beauftragen,
- liefert Ergebnis plus Evidence, Unsicherheiten und offene Entscheidungen.

## Technische Zuordnung

| Baustein | Aufgabe |
|---|---|
| `ingest` | UI, Topic Wizard, Jobstatus, Review Queue, Receipts |
| `society` | Rollen, Skills, RACI, Owner und Verfügbarkeit |
| `orchestra` | Modell-/Agent-/Toolauswahl, Budget, Fallback, Laufstatus |
| `letta` | begrenztes Arbeits-/Agentengedächtnis je Scope; kein Gesamtdokumentenarchiv |
| `mcp` | kontrollierte Tool-Schnittstelle und Aktionen |
| `n8n` | Event-/Connector-Orchestrierung; weder Fachgehirn noch Datenbank |
| `knowledge registry` | strukturierte Quellen, Claims, Evidenz, Regeln, Entscheidungen |
| `rag` | freigegebenes semantisches Retrieval als Derivat |
| `work chat` | Dialog- und Command-Surface für Nutzer und Head-of-Module |

## AI Execution Contract

```yaml
run_id: uuid
intent: string
scope_type: system|organization|project|community|user
scope_id: uuid
data_class: public|internal|confidential|personal|health|secrets
head_of_module: role_id
task_class: local|nano|mini|reasoning|large_context|multimodal|human_only
allowed_tools: []
source_refs: []
budget:
  max_eur: 0
  max_tokens: 0
  max_runtime_seconds: 0
quality:
  evidence_level: quick|balanced|deep|audit
  verifier_count: 0
human_gate: none|risk_based|required
outputs: []
fallback_policy: []
```

## Modellregel

Workflows referenzieren Funktionsklassen (`nano`, `mini`, `reasoning`, `multimodal`, `local-private`), keine dauerhaft fest verdrahteten Modellnamen. Die Provider Registry mappt diese Klassen auf aktuell freigegebene Modelle und Versionen.

## P0 vor breitem Ingest

1. Scope/RLS und negative Cross-Scope-Tests.
2. Secret-/PII-Redaction und Quarantäne.
3. Provenienz und Revocation.
4. Review Queue und Conflict Objects.
5. Keine Raw-Secrets in Firestore/RAG/Logs.
6. Jeder Indexeintrag besitzt Canonical Pointer und Lösch-/Reindexweg.
