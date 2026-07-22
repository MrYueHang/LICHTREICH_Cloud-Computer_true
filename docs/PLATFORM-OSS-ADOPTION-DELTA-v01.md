# LICHTREICH Platform OSS Adoption Delta v01

Stand: 2026-07-22  
Status: Entscheidungsgrundlage, nicht implementiert und nicht deployed

## Ziel

Diese Delta-Recherche beantwortet eine enge Frage: Welche vorhandenen Open-Source-Werkzeuge sollten für Repository-Inventur, Sicherheits-Evidence, Dokument-Ingest, Knowledge/RAG, Developer-Portal und App-Übersicht übernommen, gekapselt, nur als Muster verwendet oder bewusst verworfen werden?

Sie ersetzt keine Registry, keine LICHTREICH-Source-of-Truth und keine menschliche Freigabe. Externe Werkzeuge liefern Evidence oder Fachfunktionen; die Bedeutung, Freigabe und der aktuelle Systemstatus bleiben im Control Plane.

## Entscheidungslogik

- `ADOPT`: als gepinnte CLI oder klar begrenzter Worker einsetzen.
- `WRAP`: isoliert über einen LICHTREICH-Vertrag betreiben; niemals eigene Wahrheit erlauben.
- `PILOT`: mit wenigen nichtkritischen Repositories/Dokumenten und messbaren Kriterien prüfen.
- `REFERENCE`: Datenmodell, UX oder Integrationsmuster übernehmen, aber das Produkt vorerst nicht betreiben.
- `WATCH`: aktuell keine Einführung; Reife, Sicherheit oder Betriebslast weiter beobachten.
- `REJECT`: für den benannten Zweck nicht einführen, weil vorhandene LICHTREICH-Komponenten die Funktion bereits tragen oder eine Parallelarchitektur entstünde.

## Ergebnis-Matrix

| Bereich | Kandidat | Entscheidung | Nutzen für LICHTREICH | Harte Grenze |
|---|---|---|---|---|
| Repository-Sicherheitslage | OpenSSF Scorecard | `ADOPT` | reproduzierbare Security-Heuristiken für Repository-Evidence | Score ist Signal, kein automatisches Archiv-/Löschurteil |
| Secret-Erkennung | Gitleaks CLI | `ADOPT` | scannt Git-Historie, Dateien und Eingaben auf mögliche Secrets | Treffer nur maskiert speichern; Fund bedeutet Rotation/Prüfung, nicht bloß Datei löschen |
| SBOM | Syft | `ADOPT` | SPDX/CycloneDX-SBOM für Repo, Dateisystem und Image | Binärversion plus Digest pinnen; SBOM ist Evidence, keine Freigabe |
| Vulnerabilities | Grype | `ADOPT` | scannt Syft-SBOMs und Artefakte auf bekannte Schwachstellen | Datenbankstand und Scanzeit mitführen; False Positives reviewen |
| All-in-one Scanner | Trivy | `WATCH / WRAP` | breite Abdeckung wäre nützlich | nach Supply-Chain-Vorfall keine Floating Tags/Actions; nur separat revalidierte, digest-gepinnte Ausführung |
| Dokument-Ingest | Docling / Docling Serve | `PILOT` | lokale, strukturierte Konvertierung vieler Formate, OCR, Layout und Tabellen | Original unverändert behalten; Seiten-/Chunk-Provenienz und Qualitätswarnungen verpflichtend |
| Knowledge/RAG | RAGFlow | `REFERENCE / PILOT LATER` | gute Chunk-Inspektion, Quellenansicht und RAG-Workflows | hohe Betriebslast; darf weder Canonical Memory noch Registry ersetzen; Code-Executor nur in echter Sandbox |
| Daten-/Kontextkatalog | OpenMetadata | `REFERENCE / PILOT LATER` | Ownership, Lineage, Glossar, Policies, Contracts, MCP und viele Connectoren passen fachlich stark | als vollständige Plattform aktuell zu groß; erst gegen Registry-Schema und Betriebskosten testen |
| Developer Portal | Backstage | `REFERENCE` | Software-Catalog-, Template- und Docs-as-Code-Muster sind wertvoll | kein zweiter LICHTREICH-Desktop/Control Plane; höchstens späterer interner Adapter |
| Engineering Analytics | Apache DevLake | `PILOT READ-ONLY` | GitHub-/Jira-/CI-Ingest und DORA-/Grafana-Ansichten ohne Eigenbau | Beta-Releases; nur abgeleitete Metrics, keine Projekt- oder Repo-Wahrheit |
| App Dashboard | Homepage | `REJECT AS SHELL / REFERENCE UX` | Widgets, Service-Discovery und schnelle Übersicht sind gute UX-Muster | GPL-3.0 und Funktionsduplikat: daedalOS bleibt LICHTREICH-Shell |

## Was nicht selbst gebaut werden sollte

1. Kein eigener Secret-Scanner.
2. Kein eigener CVE-/SBOM-Resolver.
3. Keine eigene PDF-/Office-Layout-Engine.
4. Kein zweites Dashboard-Betriebssystem neben daedalOS.
5. Kein zweiter kanonischer Software-/Datenkatalog neben der LICHTREICH Registry.
6. Keine eigene DORA-Metrikberechnung, bevor DevLake im kleinen Pilot widerlegt wurde.

Der eigene LICHTREICH-Anteil bleibt bewusst dünn: Orchestrierung, Capability- und Rechteprüfung, normalisierte Evidence-Verträge, Provenienz, Review und verständliche Projektionen in Desktop/Vertical/Cockpit.

## Sichere Aktivierungsreihenfolge

### P0 — lokale/reproduzierbare Evidence

Auf drei repräsentativen Repositories, zunächst ohne autonome Reparatur:

- Scorecard CLI,
- Gitleaks CLI,
- Syft SBOM,
- Grype Scan gegen das erzeugte SBOM.

Jeder Lauf schreibt nur normalisierte Evidence:

```yaml
tool: string
tool_version: string
tool_digest: string
target_repo: owner/name
target_ref: immutable_commit_sha
started_at: timestamp
database_or_ruleset_version: string|null
summary: object
artifact_pointer: string
redacted: true
review_status: OPEN|REVIEWED|FALSE_POSITIVE|REMEDIATION_REQUIRED
```

Keine privaten Findings in öffentliche PRs schreiben. Keine automatische Archivierung oder Branch-Löschung.

### P1 — Dokument-Ingest-Worker

Docling Serve mit exakt gepinntem Image/Artefakt in einem isolierten Worker testen:

- born-digital PDF,
- Scan/Fotodokument,
- Tabelle,
- DOCX/PPTX,
- E-Mail-Anhang.

Messwerte: Lesereihenfolge, Tabellenqualität, OCR-Konfidenz, Seitenanker, Laufzeit, RAM, Wiederholbarkeit. Das Original bleibt unverändert; jeder abgeleitete Text verweist auf Hash, Seite und Konverterversion.

### P1 — Engineering-Metrics

DevLake nur read-only mit höchstens drei Repositories verbinden. Erfolgskriterium ist, ob bestehende GitHub-/Deployment-Daten ohne eigene ETL in brauchbare DORA-/Flow-Sichten gelangen. Keine Schreibrechte, keine Projektsteuerung und keine Übernahme als Source of Truth.

### P2 — Kontext- und Portal-Piloten

OpenMetadata, Backstage und RAGFlow erst bewerten, wenn Registry, AppManifest, Dokument-Provenienz und Identity-Grenze stabil sind. Jeder Pilot muss beweisen, dass er die bestehende Wahrheit konsumiert und nicht dupliziert.

## Besondere Sicherheitsentscheidung: Trivy

Das Trivy-Projekt dokumentiert für März 2026 einen Supply-Chain-Vorfall: Ein Angreifer verwendete kompromittierte Zugangsdaten, um bösartige `trivy`, `trivy-action`- und `setup-trivy`-Releases zu veröffentlichen. Das Projekt empfahl konkrete sichere Pins und bei möglicher Ausführung kompromittierter Versionen eine Rotation aller Pipeline-Secrets.

Daraus folgt für LICHTREICH:

- kein `latest`, kein schwebender Major-/Minor-Tag,
- keine Aktivierung als GitHub Action im ersten Security-Slice,
- falls später genutzt: Binär-/Image-Digest, isolierte Ausführung, minimale Tokenrechte, ausgehendes Netzwerk begrenzen und Provenienz protokollieren,
- Syft + Grype sind für den ersten SBOM-/Vulnerability-Slice die einfachere, klarer trennbare Wahl.

## Produktbezogene Einordnung

### Backstage und OpenMetadata

Beide lösen echte Probleme, aber auf verschiedenen Ebenen. Backstage organisiert Software, Templates und technische Dokumentation. OpenMetadata organisiert Daten-/AI-Kontext, Ownership, Lineage, Policies, Glossare und Verträge. LICHTREICH braucht diese Konzepte, aber nicht sofort zwei zusätzliche Vollplattformen. Zunächst werden ihre bewährten Entitäts- und Ownership-Muster gegen das vorhandene Registry-/Node-Modell gemappt.

### Docling und RAGFlow

Docling ist der klarere erste Baustein: Konvertierung ist eine begrenzte Worker-Funktion und lässt sich mit unveränderlichem Original, Hashes und Seitenankern kontrollieren. RAGFlow bringt zusätzlich Knowledge Base, Retrieval, Agenten und UI mit; das ist nützlich, erhöht aber Überschneidung und Betriebslast. Deshalb zuerst Docling plus LICHTREICH-Provenienz, später ein RAGFlow-Pilot gegen dieselben kanonischen Dokumentobjekte.

### Homepage und daedalOS

Homepage ist ein starkes Anwendungsdashboard, aber LICHTREICH besitzt mit daedalOS bereits die Shell, Fensterlogik und lokale Desktop-Schicht. Homepage wird nicht als zweite Shell eingeführt. Service-Widget-, Health- und Discovery-Muster können in AppManifest/Control Plane zurückfließen.

## Offene menschliche Entscheidungen

- Welche drei Repositories dürfen als erster Security-Evidence-Pilot dienen?
- Darf ein isolierter Docling-Worker vertrauliche Dokumente verarbeiten, und in welcher Datenzone?
- Welche Evidence darf öffentlich aggregiert werden?
- Soll OpenMetadata später Datenkatalog oder nur Schema-/MCP-Referenz sein?
- Wird für private Repositories GitHub Advanced Security bezahlt oder bleibt alles lokal/self-hosted?

## Primärquellen

- OpenSSF Scorecard: https://github.com/ossf/scorecard
- Gitleaks: https://github.com/gitleaks/gitleaks
- Syft: https://github.com/anchore/syft
- Grype: https://github.com/anchore/grype
- Trivy Incident 2026-03-19: https://github.com/aquasecurity/trivy/discussions/10425
- Docling: https://github.com/docling-project/docling
- Docling Serve: https://github.com/docling-project/docling-serve
- RAGFlow: https://github.com/infiniflow/ragflow
- OpenMetadata: https://github.com/open-metadata/OpenMetadata
- Backstage: https://github.com/backstage/backstage
- Apache DevLake: https://github.com/apache/devlake
- Homepage: https://github.com/gethomepage/homepage

## DoD für eine spätere Implementierung

- Version und kryptografischer Digest jedes externen Artefakts dokumentiert.
- Lizenz und Modell-/Datenlizenz geprüft.
- minimale Berechtigungen und Datenzone festgelegt.
- Originale, Evidence und abgeleitete Daten getrennt.
- Provenienz bis Commit/Dateihash/Seite zurückverfolgbar.
- kein Tool darf selbst FINAL, Rechtefreigabe, Deployment oder Repository-Löschung entscheiden.
- Pilot besitzt messbare Erfolgs- und Abbruchkriterien.

