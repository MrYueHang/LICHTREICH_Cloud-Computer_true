# Multi-Repo-Matrix — welches Repo ↔ welche Subdomain

> Prinzip: **ein Modul = ein kleines, klares Repo** (`<name>_true`), alle im selben Ping-Pong-Loop.
> Dieses Hub-Repo (`LICHTREICH_Cloud-Computer_true`) ist die **Public-Landing + Bindegewebe** (Schemas,
> Specs, Hand-offs). Code der Module lebt in eigenen Repos; Verträge/Specs routen über das Hub.

## Ebenen-Zuordnung (Rollentrennung aus AGENTS.md)
`Public` = Landing/Pricing · `User` = Nutzung (briefkasten/Cockpit) · `Admin` = Connectoren/Rechte · `System` = n8n/RAG/Orchestrator (headless).

## Matrix
| Subdomain | Ebene | GitHub-Repo (Ist) | SOLL-Repo | Status |
|-----------|-------|-------------------|-----------|--------|
| (Landing/Hub) | Public | **LICHTREICH_Cloud-Computer_true** | = | ✅ kanonisch |
| briefkasten | User | **briefkasten** | briefkasten_true | 🟢 live, Loop andocken |
| api | System | **api-lichtreich** | = | 🟢 Source-of-Truth |
| subs / hub | Public | **subs-lichtreich** | in Hub aufgehen? | 🟡 prüfen |
| herrkuenstler | User | **herrkuenstler…Family-Back-Office** | herrkuenstler_true | 🟢 |
| setup | Admin | — (noch keins) | setup_true | ⚪ neu |
| board | User | — (CLOUD-COMPUTER-monorepo) | board_true | ⚪ splitten |
| mandat | Admin | — (monorepo) | mandat_true | ⚪ splitten |
| orchestra | System | — (monorepo) | orchestra_true | ⚪ splitten |
| society | System | — (monorepo) | society_true | ⚪ splitten |
| consult | User | — (monorepo) | consult_true | ⚪ splitten |
| ingest/rag | System | — (monorepo) | rag_true | ⚪ splitten |
| tickets | System | — (monorepo) | tickets_true | ⚪ splitten |

**Archiv-Kandidaten (Dubletten):** `LICHTREICH-Cloud-Computer` (ohne `_true`), `v0-briefkasten-operator-app`,
`briefkasten-operator-bob.manus.v2.01`, `bob.1.studioAi` → als Referenz archivieren, nicht kanonisch.

## Doc-/Spec-Routing zwischen den Repos
- **Verträge** (JSON-Schemas) leben zentral hier in `schemas/` → jedes Modul-Repo referenziert per URL:
  `https://api.lichtreich.info/schemas/workflow.schema.json`.
- **Hand-off**: Hub schreibt `specs/<modul>.zauberSPEC.md` → wird in das Modul-Repo als `studioAI.zauberSPEC.md` kopiert.
- **Meta-Loop**: `LIESMICH-loop-agent.md` (Hub) → in jedes Repo als `AGENTS.md`.
- **Wissen**: alle Repos speisen `rag-ingest/` → System zieht es nach `rag` (System-Ebene).

## Nächste Schritte
1. `briefkasten`-Repo in den Loop nehmen (AGENTS.md + zauberSPEC rein).
2. Monorepo-Module schrittweise in `*_true`-Repos splitten (nach Bedarf, nicht auf einmal).
3. Dubletten archivieren (`gh repo archive`).
