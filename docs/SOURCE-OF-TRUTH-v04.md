# Kanonisches Autoritätsmodell v04

## Rangfolge

1. Explizite, versionierte `LOCK`-/`DECISION`-Aussage mit Scope, Datum und Entscheider.
2. Akzeptierte ADRs/Contracts im kanonischen Repo `MrYueHang/LICHTREICH_Cloud-Computer_true/main`.
3. Runtime Registry: tatsächlich ausgerollte Version, Domain, Datenbank, Tenant und Health.
4. Generierte Evidence: Browser/API/TLS/Auth/Test/Restore mit Timestamp und Commit-SHA.
5. Aktuelle, scope-spezifische PRD/Canonical Memory, wenn sie der Plattformebene nicht widerspricht.
6. Aktueller Session-Handoff/Arbeitsbranch.
7. RAG als abgeleitete, zitierbare Sicht.
8. Ältere ZIPs, Drive-Dokumente, Proofs und Repos als Archiv/Referenz.

## Konfliktregel

- **Offensichtlich durch Hierarchie lösbar:** automatisch markieren und kanonische Entscheidung übernehmen.
- **Technisch verifizierbar:** Evidence-Lauf durch Codex/Claude/CI; keine Meinungsfrage.
- **Produkt-/Architekturentscheidung:** ADR mit Optionen, Auswirkungen, Rückfallweg.
- **Rechte, Freigabe, irreversible Außenwirkung:** menschliches Gate.
- **Unvollständige Evidenz:** `OPEN`, nicht überzeugend ergänzen oder simulieren.

## Statuswerte

`CURRENT`, `CURRENT_DOMAIN_SPEC`, `CURRENT_REFERENCE`, `SUPERSEDED`, `EXACT_DUPLICATE`, `OPEN`, `CONFLICT`, `QUARANTINE`, `ARCHIVE`.

## One Source of Truth bedeutet nicht eine einzige Datenbank

Es bedeutet eine eindeutige führende Quelle pro Objektart und Scope:

- Code/Contracts/ADRs: Git
- Runtime/Deployments/Health: Registry + Evidence
- Projektarbeit: OpenProject
- Dokumentakte: Paperless
- Dateien/Medien: Storage mit Pointer/Hash
- Rechte/Consent/Release: MACAN/append-only Decisions
- KI-Abruf: RAG-Derivat
- persönliche Daten: User-Vault


## Aktualisierung und Supersession

Eine Quelle wird nicht still überschrieben. Jede neue Fassung erhält einen stabilen `source_id`, Hash, Scope, Status, Ersetzungsbeziehung und Prüfdatum.

1. Neue Quelle als `DISCOVERED` registrieren.
2. Scope und Autorität gegen dieses Modell prüfen.
3. Konflikte ausdrücklich als `CONFLICT` oder `SUPERSEDED_CONFLICT` markieren.
4. Erst nach belegter Entscheidung auf `CURRENT*` setzen.
5. Ersetzte Artefakte unverändert archivieren und mit `superseded_by` verlinken.
6. Abgeleitete Sichten neu erzeugen; niemals aus ihnen zurück in die Wahrheit schreiben.

Beispiel 2026-07-22:

- `PROJECT MEMORY CANONICAL v10` ist `CURRENT_DOMAIN_SPEC`.
- `SMART-CONTEXT_CONFIG v05` ist wegen seines internen Verweises auf Canonical v05 sowie veralteter Audio-/Voice-Zustände `SUPERSEDED_CONFLICT`.
- Es darf weiterhin als historische Evidence erhalten bleiben, aber kein Agent darf es ohne Konflikthinweis als aktiven Kontext laden.

## Projektgedächtnis und technische Registry

Beide werden verlinkt, nicht vermischt:

| Quelle | Führt |
|---|---|
| Project Memory Canonical | Identität, fachliche Locks, kreative Regeln, aktueller Domain-Meilenstein |
| Git/ADRs/Contracts | technische Soll-Verträge und akzeptierte Entscheidungen |
| Runtime Registry + Evidence | aktuelles technisches IST: Repo, Branch, Deployment, Domain, Version, Health |
| Projektanalyse/Inventur | Discovery, Klassifikation, Dubletten- und Reifehinweise |
| NotebookLM/RAG/Handbuch | abgeleitete Erklärung und Recherche mit Quellenzeigern |

Ein Projektanalyse-Tool darf Vorschläge und Befunde liefern, aber weder `CURRENT` setzen noch Repos löschen, mergen oder archivieren.

## Veröffentlichungs- und Datenschutzregel

Das vollständige Repository-Inventar bleibt in einem privaten Audit-Scope. Das öffentliche kanonische Repo enthält nur:

- Schema und Methodik,
- aggregierte Zählwerte,
- öffentliche beziehungsweise bereits veröffentlichte Evidence,
- keine privaten Repo-Namen, Pfade, Secrets oder personenbezogenen Daten.

## Abgeleitete Dialoge und Handbücher

Claude, Codex, NotebookLM und interaktive Handbücher erhalten einen kompakten, generierten Kontext aus kanonischen Quellen. Jeder Export nennt:

- Erzeugungszeit,
- Quell-IDs und Hashes,
- Scope,
- bekannte Konflikte,
- Gültigkeitsgrenze,
- Rücksprunglinks zu den führenden Quellen.

Ein solcher Export ist `DERIVED_VIEW`, nie eine neue Parallelarchitektur.


## Implementierungsledger Desktop-App-Katalog

Stand 2026-07-22:

| Eintrag | Autoritativer Pointer | Status |
|---|---|---|
| Next.js-Sicherheitsblocker daedalOS | `MrYueHang/daedalOS#1` | Preview `READY`, Draft, nicht Production |
| Desktop-Sync-Kern | `MrYueHang/daedalOS:feat/lichtreich-app-sync-v01` | Implementiert, gestapelte Preview ausstehend |
| Manifest-/Installationsvertrag | `docs/DESKTOP-APP-INSTALLATION-CONTRACT-v01.md` | CURRENT_CONTRACT_CANDIDATE |
| Runtime-Katalog/API | noch kein akzeptierter Backend-PR | OPEN |
| Projektanalyse-App | `registry/app-catalog.bootstrap.v01.json` | DOCUMENTED, nicht installierbar |

Dieses Ledger ersetzt keine Runtime-Evidence. Nach Merge oder Deployment werden Branch-Pointer durch unveränderliche Commit-SHAs und Deployment-Evidence ergänzt; bis dahin darf kein abgeleitetes Handbuch einen Produktionsstatus behaupten.
