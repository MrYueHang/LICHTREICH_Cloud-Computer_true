# LICHTREICH Control Plane v04

**Status:** Arbeits- und Übergabepunkt für ChatGPT → Codex/Claude Code → Studio AI → Staging/Production  
**Branch:** `feat/control-plane-v04`  
**Grundsatz:** Kein ZIP-Raten, kein Big-Bang, keine erfundenen Deployments. Das Repo ist der gemeinsame Arbeitsraum.

## 1. Was dieses Dokument ersetzt

Dieses Dokument ersetzt den zu generischen Auftrag „lies mehrere Dateien und arbeite RUN 1 ab“.

Der nächste Coding-Agent soll nicht überlegen müssen, was LICHTREICH ist. Er bekommt:

1. eine konkrete Systemkarte,
2. eine Domain-Registry,
3. einen echten Browser-/Screenshot-Audit,
4. klare Zuständigkeiten,
5. ein serielles Abnahmeverfahren,
6. explizite Stop-Bedingungen.

## 2. Reale Ausgangslage

Der Cloud-Computer existiert bereits als verteiltes System. Dokumentiert beziehungsweise teilweise verifiziert sind unter anderem:

- `desktop.lichtreich.info` als daedalOS-basierte Experience-Shell,
- `briefkasten.lichtreich.info` als BOB-/Dokumenten- und Akteneingang,
- `dms.lichtreich.info` mit Paperless-ngx,
- `pdf.lichtreich.info`,
- `formulare.lichtreich.info`,
- `projekte.lichtreich.info` mit OpenProject,
- `whiteboard.lichtreich.info` mit Excalidraw,
- `crm.lichtreich.info` mit Twenty,
- `metabase.lichtreich.info`,
- `rag.lichtreich.info`,
- `ingest.lichtreich.info`,
- `n8n.lichtreich.info`,
- `society.lichtreich.info`,
- `orchestra.lichtreich.info`,
- `tickets.lichtreich.info`,
- `me.lichtreich.info`,
- weitere eigene, Referenz- und Lab-Module.

Der Engpass ist deshalb nicht „noch eine App installieren“, sondern:

- Module eindeutig benennen,
- Zustand beweisen,
- Source of Truth festlegen,
- Rechte und Datenräume trennen,
- Apps über gemeinsame Verträge verbinden,
- Desktop-Shortcuts zu einem echten App-Katalog ausbauen,
- Workflows sichtbar und testbar machen.

## 3. Wer macht was

### 3.1 ChatGPT in diesem Projekt

ChatGPT übernimmt:

- Architektur- und Konfliktanalyse,
- Zusammenführung von Drive-, Dropbox-, GitHub- und Chat-Kontext,
- Registry-, Schema-, Workflow- und Vertragsentwürfe,
- öffentliche Web-/URL-Prüfungen, soweit ohne Login erreichbar,
- Texte, Produktlogik, UX-Flows, Handbücher und Abnahmekriterien,
- nicht-destruktive GitHub-Branches, Dateien, Issues und Draft-PRs,
- Review von Commits, PRs, Logs und Testergebnissen.

ChatGPT kann in diesem Chat **keinen authentifizierten lokalen Browser fernsteuern**, keine lokalen `.env`-Werte sehen und keinen VPS-Terminalzugriff erfinden.

### 3.2 Codex oder Claude Code lokal

Der lokale Coding-Agent übernimmt:

- das echte Repository vollständig lesen,
- lokale Dateien und vorhandene Arbeitsordner inventarisieren,
- `.env.local`, Secret Store und bestehende CLI-Logins verwenden, ohne Werte auszugeben,
- Playwright mit einer echten Browser-Session ausführen,
- DNS-, Vercel-, Cloudflare-, VPS-, Docker- und Datenbankzustände prüfen,
- Tests, Builds, Migrationen und Screenshots erzeugen,
- kleine, überprüfbare Commits erstellen,
- Staging deployen und Rollback testen.

### 3.3 Studio AI

Studio AI ist die UI-/Preview-Werkstatt, nicht die technische Source of Truth.

- UI-Ideen und Ansichten werden dort iteriert.
- Exporte gehen auf einen eigenen Integrationsbranch.
- Backend-, Daten-, Rechte- und Workflow-Verträge bleiben im kanonischen Repo.
- Studio-Exporte dürfen keine verifizierten Backenddateien oder Agentenverträge überschreiben.

## 4. DNS und die Screenshot-Frage

### 4.1 Was DNS lösen kann

DNS kann öffentliche Erreichbarkeit herstellen oder korrigieren:

- A/AAAA auf einen Server,
- CNAME auf Vercel oder einen anderen Host,
- Proxy-/TLS-Verhalten über Cloudflare,
- Wildcard-Subdomains,
- Redirects und Custom-Domain-Zuordnung.

### 4.2 Was DNS nicht lösen kann

DNS kann nicht:

- einer isolierten Chat-Sandbox Zugriff auf deinen lokalen Browser geben,
- Login-Cookies übertragen,
- 2FA umgehen,
- private Admin-Seiten sichtbar machen,
- lokale `.env`-Werte bereitstellen.

Die frühere Aussage „Sandbox ohne DNS-/Internetzugriff“ war zu pauschal. Korrekt ist:

- öffentliche Seiten können hier teilweise textuell geprüft werden,
- die lokale Ausführungsumgebung löst `*.lichtreich.info` derzeit nicht zuverlässig auf,
- dieses Chat-Werkzeug besitzt keinen allgemeinen Webseiten-Screenshot-Befehl,
- echte öffentliche und authentifizierte Screenshots werden daher seriös über Playwright lokal oder in CI erzeugt.

## 5. Seriöser Screenshot-/Evidence-Lauf

Der Audit ist kein hübsches Thumbnail-Script, sondern ein Abnahmelauf.

Für jede Registry-Domain werden erfasst:

- DNS-Auflösung,
- HTTP-Status und Redirect-Kette,
- finale URL,
- TLS-/Zertifikatszustand,
- Seitentitel und primäre Überschrift,
- Desktop- und Mobile-Screenshot,
- Console Errors,
- fehlgeschlagene Requests,
- Login-/Logout-Zustand,
- erwartete Kernselektoren,
- Commit-/Deployment-Referenz,
- Zeitstempel.

Ausgaben:

```text
artifacts/subdomain-audit/<timestamp>/
  public/
  authenticated/
  admin/
  report.json
  report.md
  gallery.html
```

Öffentliche Prüfung kann in GitHub Actions laufen. Authentifizierte Prüfung läuft lokal oder auf einem selbst gehosteten Runner mit verschlüsseltem Playwright-`storageState`. Cookies und Tokens werden niemals committed.

## 6. Kanonische Systemrollen

| Oberfläche | Verbindliche Rolle |
|---|---|
| `lichtreich.info` | öffentliche Landingpage, Produktverständnis, Einstieg |
| `desktop.lichtreich.info` | Betriebssystem-Shell, App-Launcher, Suche, Fenster, Kontext |
| `me.lichtreich.info` | persönliche Heimat, Profil, private Daten, installierte Apps |
| `cockpit.lichtreich.info` | systemübergreifende Lage, Blocker, Entscheidungen und Aktionen |
| `projekte.lichtreich.info` | OpenProject als Arbeits-/Work-Package-Source-of-Truth |
| `tickets.lichtreich.info` | Eingang für Bug, Idee, Wunsch, Feedback und Blocker |
| `board.lichtreich.info` | visuelle Arbeits- und Funnelansicht |
| `whiteboard.lichtreich.info` | konkrete Excalidraw-Zeichenfläche |
| `society.lichtreich.info` | Menschen, KI-Rollen, Teams, Fähigkeiten, Zuständigkeit |
| `orchestra.lichtreich.info` | Modell-, Agenten-, Tool- und Fallback-Ausführung |
| `setup.lichtreich.info` | einmalige Ersteinrichtung |
| `service.lichtreich.info` | laufende Konten-, Plan-, Connector- und Exportverwaltung |
| `dateien.lichtreich.info` | freundlicher File Commander und Mount-Übersicht |
| `archiv.lichtreich.info` | unveränderliche/read-only Abschluss- und Beweiszone |
| `dms.lichtreich.info` | Paperless-Dokumentakte, OCR und Klassifikation |
| `rag.lichtreich.info` | gescopter semantischer Abruf |
| `ingest.lichtreich.info` | kontrollierte Aufnahme, Provenienz, Review und Budget |

## 7. Gemeinsame Systemverträge

Jedes Modul muss dieselben Verträge erfüllen:

1. **Identity Contract** – User, Organisation, Projekt, Community, Rolle, Service Account.
2. **App Manifest** – Domain, Repo, Version, Tier, App-Typ, Health, Preview, Owner.
3. **Scope Contract** – System-, Branchen-, Organisation-, Projekt-, Community- oder Userebene.
4. **Data Contract** – Datenklasse, Quelle, Besitzer, Retention, Löschung, RAG-Freigabe.
5. **Event Contract** – versionierte Ereignisse mit Correlation- und Idempotency-ID.
6. **Permission/Consent Contract** – wer darf lesen, verändern, ausführen, veröffentlichen.
7. **AI Execution Contract** – Modell, Budget, Fallback, Tools, Outputformat, Review-Gate.
8. **Health/Evidence Contract** – Status, Test, Screenshot, Commit, Backup und Rollback.

Ohne diese Verträge bleibt eine App ein Link, kein harmonischer Bestandteil des Cloud-Computers.

## 8. Daten- und Wissensprinzip

### 8.1 Eine logische Objektwelt, mehrere Schutzräume

Gemeinsame Kernobjekte:

```text
Person · Organisation · Rolle · Projekt · Akte · Dokument · Datei · Nachricht
Aufgabe · Frist · Entscheidung · Behauptung · Quelle · Erkenntnis · Workflow
Agent · Tool · Credential-Referenz · Zustimmung · Report · Asset · Veröffentlichung
```

Jedes Objekt trägt mindestens:

```text
scope_type
scope_id
data_class
owner_id
source_pointer
provenance
status
retention_policy
rag_policy
created_at
updated_at
```

### 8.2 RAG ist ein Derivat

RAG ist niemals alleinige Wahrheit. Es indiziert nur freigegebene Quellen und muss immer filtern nach:

- System,
- Organisation/Branche,
- Projekt/Community,
- User,
- Datenklasse,
- Freigabestatus,
- Relevanz und Aktualität.

Gesundheit, Secrets, private Vaults und nicht freigegebene Akten sind standardmäßig ausgeschlossen.

## 9. Voice und Head-of-Module

Eine Spracheingabe darf nicht direkt unkontrolliert „alles machen“.

Verbindlicher Ablauf:

```text
Voice/Text
→ Transkript + Original-Pointer
→ Absicht und betroffene Scopes erkennen
→ zuständige Head-of-Module-Rolle
→ fehlende Pflichtdaten prüfen
→ Arbeitsplan und Budget
→ erlaubte Tools/Workflows ausführen
→ Zwischenergebnisse speichern
→ Qualitäts- und Rechteprüfung
→ menschliche Freigabe bei sensiblen/irreversiblen Schritten
→ Output + Audit + Rückmeldung
```

Die persönliche User-KI koordiniert; Fachentscheidungen bleiben beim Fachmodul und dessen Regeln.

## 10. Nicht „nur sechs Apps“

Alle gefundenen Module werden registriert. Aktiviert wird seriell nach Reife und Bedarf.

Statusklassen:

```text
DISCOVERED
DOCUMENTED
LINKED
INTEGRATED
STAGING
PRODUCTION
CONFLICT
SUPERSEDED
QUARANTINE
```

„Nicht sofort aktiv“ bedeutet nicht „vergessen“.

## 11. Branch- und Arbeitsmodell

```text
main                    verifizierte Produktwahrheit / Production Candidate
feat/control-plane-v04  aktuelle nicht-destruktive Integrationsarbeit
studio-sync             Studio-AI-Import/Export und UI-Preview
claude-safe             verifizierter Snapshot für Agenten-/Studio-Schutz
feat/OP-<id>-<slug>      kleine fachliche Umsetzung
fix/OP-<id>-<slug>       kleine Korrektur
```

Regeln:

- vor Arbeit immer fetch/pull und Branchzustand prüfen,
- keine direkten Studio-Exports nach `main`,
- pro PR ein verständlicher Zweck,
- Änderungen an Datenmodellen brauchen Migration und Rückfallweg,
- keine Medienbinaries oder Secrets in Git,
- nichts löschen, bevor Repo-/Domain-/Daten-Owner und Nachfolger geklärt sind.

## 12. Exakter nächster lokaler Lauf

Der lokale Agent arbeitet nicht an „dem gesamten System“, sondern erzeugt zuerst eine belastbare Zustandsbasis.

### Schritt A — Arbeitskopie

```bash
cd ~/Briefkasten/LICHTREICH_Cloud-Computer_true
git fetch --all --prune
git checkout feat/control-plane-v04
git pull --ff-only
code .
```

### Schritt B — Secret-Schutz

- vorhandene `.env`/`.env.local` nur referenzieren,
- keine Werte in Chat, Report, Screenshot oder Git ausgeben,
- bekannte Klartext-Secret-Dateien aus KI-/RAG-Suchpfaden ausschließen,
- Rotation als eigenes Ticket führen, nicht nebenbei Werte ändern.

### Schritt C — Evidence-Audit

```bash
cd tools/subdomain-audit
npm ci
npx playwright install chromium
npm run audit:public
```

Für authentifizierte Ansichten wird lokal einmalig ein verschlüsselter/ignorierter `storageState` erzeugt und anschließend verwendet.

### Schritt D — Ergebnis statt Vermutung

Danach werden ausschließlich aus dem Audit aktualisiert:

- Domainstatus,
- Preview-Galerie,
- Blocker,
- Redirect-/Branding-Konflikte,
- OpenProject-Work-Packages,
- nächster umsetzbarer PR.

## 13. Danach folgende Umsetzungsreihenfolge

1. Domain-/Repo-/Modul-Registry gegen Realität abgleichen.
2. Public/User/Internal/Testuser-Trennung sichtbar machen.
3. Desktop-App-Katalog aus Manifesten statt fester `.url`-Dateien.
4. File Commander über Drive/Dropbox/copyparty/Projektpfade.
5. Setup/Service/Settings sauber trennen und Connectorstatus zeigen.
6. Society → Orchestra → Head-of-Module-Rollen synchronisieren.
7. Ingest-Themenassistent mit Budget, Scope, Quellen- und Evidenzregeln.
8. n8n-Metaboard und Workflow-Registry, ohne n8n zur Datenbank zu machen.
9. Social Hub als Vertical Pack mit Content Studio, Freigabe, Publishing und Analytics.
10. ein komplexer Gold Case über Dokumente, Projekte, RAG, Society, Workflows und Archiv.

## 14. Definition of Done für v04

v04 ist erst abgeschlossen, wenn:

- jede Registry-Domain einen aktuellen Evidence-Datensatz besitzt,
- echte Desktop-/Mobile-Screenshots als CI-/lokale Artefakte vorliegen,
- öffentliche und authentifizierte Ansicht getrennt sind,
- kein Secret in Repo oder Audit-Artefakten liegt,
- Desktop-Links und reale Services abgeglichen sind,
- Konflikte als konkrete Tickets/Work Packages vorliegen,
- der nächste Coding-PR klein, testbar und rollbackfähig ist.

## 15. Stop-Bedingungen

Der Agent stoppt und dokumentiert, statt zu improvisieren, wenn:

- Domainziel oder kanonisches Repo unklar ist,
- eine Migration Daten verlieren könnte,
- Lizenz oder kommerzielle Nutzung ungeklärt ist,
- ein Login/2FA menschliche Bestätigung verlangt,
- Scope-/Rechteprüfung fehlt,
- Backup oder Rollback für eine datenführende Änderung fehlt,
- zwei Dokumente widersprüchliche Produktionswahrheiten behaupten.
