# Konflikte nach Thema — kanonisch v04

| ID | Thema | Schwere | Status | Kanonische Entscheidung | Entscheidungsweg |
|---|---|---:|---|---|---|
| `CF-001` | Setup / Secrets | CRITICAL | `OPEN_VERIFIED` | Kein simuliertes Grün, keine Raw-Secrets in Browser/Firestore, nur serverseitige Capability und `credential_ref`. | Codex/Claude-Implementierung plus Security Review; menschliche Produktentscheidung nur für die Wahl des Credential Stores. |
| `CF-002` | Authority | HIGH | `DECIDED` | LOCK/Decision > canonical repo + ADRs > runtime registry > generated evidence > current domain PRD > current handoff > RAG > archive. | Automatisch anwenden; bei echter Gleichrangigkeit ADR. |
| `CF-003` | Creative PRD position | HIGH | `DECIDED` | Aktuelle Fachspezifikation für Creative/Social/TAKTØR; untergeordnet unter LICHTREICH-Plattformverträge; `SPEC_READY`, nicht implementiert/deployed. | Contracts selektiv mappen und in Slices umsetzen. |
| `CF-004` | Database | HIGH | `DECIDED_BASELINE` | Firebase Auth/UI-State bleibt aktuell; providerneutrale PostgreSQL-Verträge werden Neon-first gemappt. Supabase nur per Konsolidierungs-ADR mit Replacement/Scope/Exit. | Architektur-ADR vor Runtime-Änderung. |
| `CF-005` | Social Publisher | MEDIUM | `OPEN_SPIKE` | Postiz ist Adapter-Spike-Kandidat, niemals LICHTREICH Source of Truth. Publishing bleibt standardmäßig aus. | Sandbox-Spike plus Lizenz-/Betriebs-ADR. |
| `CF-006` | Branching | MEDIUM | `DECIDED` | `feat/control-plane-v04` enthält systemweite Contracts/Evidence. Runtime-Features folgen in kleinen OP-verknüpften Branches, etwa `feat/social-work-order-spine`. | Kein Konflikt nach Scope-Trennung. |
| `CF-007` | ChatGPT ingest/sync | MEDIUM | `OPEN_CAPABILITY` | Import-first Chat Knowledge Ingest. Export-ZIP und ausgewählte Conversations unterstützen; Live-Sync nur nach verifizierter API/OAuth/MCP-/Extension-Capability. | Ein-Klick-Exportimport zuerst; Live-Weg separat evaluieren. |
| `CF-008` | RAG scope | HIGH | `OPEN_IMPLEMENTATION` | RAG ist Derivat; Pflichtfilter, RLS/negative Tests, Provenienz und Review-Gates. | Vor breitem Import implementieren. |
| `CF-009` | ZIP cleanup | LOW | `DECIDED_SAFE_HOLD` | Duplikate markieren, nicht automatisch löschen. Cleanup erst nach Bestätigung lokaler Pfade/Backups. | Späterer expliziter Cleanup-Task. |
| `CF-010` | TAKTØR media state | HIGH | `OPEN_HUMAN_GATE` | v09 bleibt Candidate-Evidence. Kein Release ohne Timestamp-Review, technische Prüfung und MACAN-Rechtegate. | Human Review plus Decode/Hash plus Rechtebelege. |

## Arbeitsregel

Ein Coding-Agent öffnet nicht alle Konflikte erneut. `DECIDED` wird umgesetzt; `OPEN_IMPLEMENTATION` wird technisch bearbeitet; `OPEN_HUMAN_GATE` wird als konkrete Entscheidung mit Evidenz vorgelegt.
