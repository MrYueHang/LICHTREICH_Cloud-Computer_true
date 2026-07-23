# Creative Society PRD — Integrationskarte v04

## Bewertung

Das Paket ist strukturell stark und intern validiert. Es umfasst 9 PRDs, OpenAPI, SQL, RBAC, Events, Agenten, n8n-Blueprints, BDD und Workboard. Der Paketmanifest-Check wurde erneut ausgeführt: 37/37 manifestierte Quelldateien stimmen in Größe und SHA-256.

Status bleibt: `SPEC_READY_NOT_IMPLEMENTED_NOT_DEPLOYED`.

## Einordnung

| PRD/Capability | Kanonischer Platz | Integration | Status |
|---|---|---|---|
| TAKTØR MVP | `taktor` Vertical/Creator Pack | Browser UI + Worker + Registry | CURRENT_DOMAIN_SPEC |
| FUNDUSFUNK | Shared media/asset ingest capability | Registry, storage pointers, provenance | CURRENT_DOMAIN_SPEC |
| Review Cockpit | Shared review capability | reusable UI/API, first TAKTØR | CURRENT_DOMAIN_SPEC |
| SAME-ALLES | TAKTØR submodule | planning/validation contract | CURRENT_DOMAIN_SPEC |
| SYNTHÆSE | derivative pipeline | creator/social outputs | CURRENT_DOMAIN_SPEC |
| Social Hub | `social.lichtreich.info` main module | Work Orders, campaigns, review, adapters | CURRENT_DOMAIN_SPEC |
| MACAN | rights/consent/release gate | append-only decision capability | CURRENT_DOMAIN_SPEC |
| SZENÆ | public projection only | redacted immutable snapshots | CURRENT_DOMAIN_SPEC |
| Setup extension | existing setup/service platform | security fix + connector gateway | P0_REQUIRED |

## Nicht ungeprüft übernehmen

- SQL wird nicht blind migriert; es wird gegen vorhandene Neon-Schemata gemappt.
- OpenAPI wird als Zielvertrag versioniert, nicht als Beweis laufender Endpunkte.
- n8n-Blueprints werden nicht automatisch aktiviert.
- Postiz bleibt Adapter-Spike.
- Agent Definitions erhalten Capability-/Scope-/Budget-/Approval-Contracts.
- Medien bleiben außerhalb Git.

## Erste Integrationsfolge

0. Setup-P0 beheben.
1. Actor/Workspace/Project + DB-ADR.
2. Audit/Outbox/Capability Spine.
3. Social Work Order ohne Außenwirkung.
4. Credential Gateway mit genau einem read-only Connector.
5. Postiz Sandbox-Spike.
6. MACAN Gate.
7. Publication Sandbox.
8. FUNDUSFUNK/TAKTØR Slice.
9. Public Snapshot erst nach Freigaben.
