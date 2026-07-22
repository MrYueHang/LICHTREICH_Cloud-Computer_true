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
