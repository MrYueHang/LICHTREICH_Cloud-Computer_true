# LICHTREICH Master Topic Graph v04

**Status:** `ACTIVE ROUTER`

Ein einziger Einstiegsknoten über alle Architektur-, Modul-, Agenten-, Daten-, UI- und Handbuchthemen. Dieses Dokument enthält keine zweite Fachspezifikation. Es verweist auf genau eine kanonische Quelle je Thema und zeigt Lücken, Konflikte und den nächsten Schritt.

## Pflichtregel

Vor jeder neuen Datei: Topic-ID suchen, kanonische Datei öffnen und Neues als `DELTA`, `ADR`, `EVIDENCE`, `CONFLICT`, `TASK` oder `REFERENCE` einordnen. Nur ohne passenden Knoten entsteht eine neue Fachdatei.

## Hauptknoten

| ID | Thema | Kanonische Quelle | Status |
|---|---|---|---|
| `T00` | Autorität / Source of Truth | `docs/SOURCE-OF-TRUTH-v04.md` | `DECIDED` |
| `T01` | Konflikte | `docs/CONFLICTS-BY-TOPIC-v04.md` | `ACTIVE` |
| `T02` | Gesamtsteuerung | `docs/CONTROL-PLANE-v04.md` | `ACTIVE` |
| `T03` | Kontextinventur | `docs/PROJECT-CONTEXT-AUDIT-2026-07-22.md` | `CURRENT EVIDENCE` |
| `T04` | ZIP-/Source-Pakete | `registry/source-packages.v04.json` | `ACTIVE REGISTRY` |
| `T05` | Ingest → Knowledge → RAG | `docs/KNOWLEDGE-PIPELINE-AND-HEAD-OF-MODULE-v04.md` | `SPEC_READY` |
| `T06` | Chat-/Knowledge-Import | `docs/CHAT-KNOWLEDGE-INGEST-v04.md` | `SPEC_READY` |
| `T07` | AI Runtime / Provider Router | `docs/AI-RUNTIME-PLUS-AND-PROVIDER-POLICY-v04.md` | `DECIDED_BASELINE` |
| `T08` | OAuth / Connector Broker | `docs/OAUTH-ACCOUNT-TOPOLOGY-v04.md` | `DECIDED_BASELINE` |
| `T09` | Setup / Secrets | Konflikt `CF-001` + PR #25 | `P0 IN IMPLEMENTATION` |
| `T10` | Desktop / Public / Verticals | `docs/SURFACE-COMPOSER-AND-PUBLIC-ARCHITECTURE-v04.md` | `SPEC_READY` |
| `T11` | Neue Apps im Desktop | `docs/DESKTOP-APP-INSTALLATION-CONTRACT-v01.md` | `CONTRACT_READY` |
| `T12` | App-Katalog | `registry/app-catalog.bootstrap.v01.json` | `DOCUMENTED` |
| `T13` | Creative Society / Social / TAKTØR | `docs/CREATIVE-SOCIETY-PRD-INTEGRATION-v04.md` | `SPEC_READY` |
| `T14` | TAKTØR OSS | `docs/TAKTOR-OSS-RESEARCH-DELTA-v02.md` | `CURRENT DELTA` |
| `T15` | Plattformweite OSS-Adoption | `docs/PLATFORM-OSS-ADOPTION-DELTA-v01.md` | `CURRENT DELTA` |
| `T16` | Society / Rollen / RACI | Plattformverträge + PRDs | `SPEC_READY_FRAGMENTED` |
| `T17` | Orchestra / Toolausführung | `T05` + `T07` | `SPEC_READY_DISTRIBUTED` |
| `T18` | n8n / Workflow-Metaboard | Control Plane + Work Mode v03 | `OPEN_IMPLEMENTATION` |
| `T19` | Letta Agent Runtime | `T05` + `T07` enthalten heutige Grenze | `OPEN GAP` |
| `T20` | lokale Browser-/Device-KI + Desktop-Aktionen | `docs/DESKTOP-HEAD-OF-MODULE-EXECUTION-v01.md` | `CONTRACT_READY / CLIENT_OPEN` |
| `T21` | NotebookLM / Handbuch | keine kanonische Fachdatei | `OPEN GAP` |
| `T22` | OpenProject / Tasks / Kalender | Control Plane + Surface Composer | `DECIDED_BASELINE` |
| `T23` | Files / Mounts / Archiv | Control Plane + Datenzonen | `SPEC_READY_DISTRIBUTED` |
| `T24` | Due-Diligence Gold Case | Surface Composer | `PLANNED` |
| `T25` | Public Landing / Testuser | Public Projection | `SPEC_READY` |
| `T26` | ZIP-/Screenshot-Evidence 2026-07-23 | `docs/EVIDENCE-ZIP-AND-SCREEN-AUDIT-2026-07-23.md` | `CURRENT EVIDENCE` |

## Beziehungen

```text
T00 gilt für alle
T05 → T06/T07/T16/T17/T18/T19/T20 → RAG/Search
T10 → T11/T12/T22/T23/T24/T25
T03/T04 → T26 → T00/T01/T10/T20
T21 erklärt kuratierte Versionen aller Knoten, ist aber nie Source of Truth
```

## Keine neue Parallel-PRD nötig

Desktop-App-Installation, AppManifest, Ingest-Grundstrecke, Modellrouting, OAuth-Topologie, Public/Desktop/Vertical-Trennung und Creative/Social/TAKTØR sind bereits beschrieben.

## Echte Lücken

1. Letta-Capability-Matrix und Agent Lifecycle.
2. Head-of-Module-Profile und Command-Receipt-Client auf die belegte lokale Browser-KI aufsetzen.
3. NotebookLM-Handbuch mit kuratiertem Quellenpaket und Update-Receipt.
4. `lr://`-Mountvertrag.
5. konsolidierte Society-/RACI-Registry.

## Ergebnisweg

```text
Topic Graph → P0-Sicherheit → Evidence/Registry → Knowledge Spine
→ Desktop/App Catalog → DD-Gold-Case → NotebookLM-Handbuch
→ weitere Module seriell aktivieren
```

Ein Agent darf keine neue Master Architecture, Gesamt-PRD oder Source of Truth anlegen, wenn `T00–T26` das Thema bereits besitzen.
