# Chat & Knowledge Ingest — Modul-PRD v04

## Ziel

Chatverläufe, einzelne Nachrichten, Projekt-Exporte, Dateien, Drive-/Dropbox-Ordner, Voice und reine Themenaufträge werden kontrolliert in Wissen, Entscheidungen, Tasks und Modulkontext überführt.

Nicht Ziel: alles automatisch in einen globalen RAG kippen oder ChatGPT als Source of Truth behandeln.

## Eingangsarten

1. ChatGPT-Datenexport-ZIP — vollständiger, userinitiierter Importlauf.
2. Ausgewählte Conversation-Datei/HTML/JSON/Markdown — projektbezogen.
3. Copy/Paste oder Share-Inhalt — einzelne Session.
4. Drive/Dropbox/Local Folder Delta.
5. Voice/Text Capture ohne Datei.
6. Neues Thema — Research-/Knowledge-Workspace aus Wizard.
7. Connected App/MCP — nur wenn Scope, API und Berechtigungen aktuell verifiziert sind.

## Ein-Klick ist ein Orchestrierungsprofil

Der Nutzer wählt:

- Nur archivieren
- Zusammenfassen und Entscheidungen extrahieren
- Projektwissen aktualisieren
- Tasks/Tickets vorschlagen
- Modul-PRD/Workflow aktualisieren
- Research-Thema anlegen

## Pipeline

```text
Receive
→ Hash/Dedupe
→ Parse
→ Secret/PII/Data-Class Scan
→ Scope Candidate
→ Thread/Artifact Segmentation
→ Fact/Decision/Assumption/Open-Question Extraction
→ Contradiction Check against canonical sources
→ Module Routing / Head-of-Module
→ Human Review Queue
→ Commit to canonical stores
→ optional RAG derivates
→ Receipt + rollback pointers
```

## Drei Passes

- Pass A billig/lokal: Struktur, Hash, Sprache, Metadaten, offensichtliche Secrets/PII, Themen.
- Pass B unabhängige Analyse: Entitäten, Aussagen, Entscheidungen, offene Fragen, Widersprüche, Scope und Relevanz.
- Pass C Fachmodul: Head-of-Module verarbeitet fachlich weiter.

## Budget/Wizard

```yaml
topic_id: uuid
title: string
scope_type: system|organization|project|community|user
scope_id: uuid
data_class_max: internal|confidential|personal|health
budget:
  currency: EUR
  max_amount: 5.00
  max_tokens: optional
  max_runtime_minutes: 30
quality:
  evidence_level: quick|balanced|deep|audit
  verifier_count: 0|1|2
engines:
  primary: local|nano|mini|large|named-provider
  fallback_order: []
outputs:
  - summary
  - decisions
  - conflicts
  - tasks
  - prd_delta
  - rag_candidates
human_gate: required|risk_based|none_for_archive_only
```

## Speicherausgänge

- Originalexport: Archiv/Object Storage, immutable.
- normalisierte Conversation: scoped knowledge store.
- Entscheidungen: Decision Registry/Repo ADR.
- Tasks: OpenProject/Tickets nur nach Review-Policy.
- RAG-Chunks: Derivate mit Quelle und Revocation.
- Chat-Digest: Projekt-/Modul-Handoff.

## Synchronisierungsfähigkeiten

`EXPORT_IMPORT`, `SOURCE_SYNC` und `LIVE_CONVERSATION_OUTBOUND_SYNC` sind getrennte Capabilities.

- Exportimport kann zuerst gebaut werden.
- Drive/Dropbox/App-Sync kann über vorhandene Connectoren/MCP erfolgen.
- Dauerhafte Synchronisierung eigener ChatGPT-Projekte/Chats nach außen wird erst als verfügbar markiert, wenn ein offizieller oder bewusst betriebener Connector/API-/Extension-Weg mit Berechtigungen, Delta-IDs, Löschungen und Revocation verifiziert ist.

## Verbote

- keine globale Chat-Vollindizierung,
- keine Secrets oder `.env`-Inhalte,
- kein stilles Überschreiben kanonischer Entscheidungen,
- keine Tasks, Veröffentlichungen oder Außenwirkung nur aufgrund einer Chat-Aussage.
