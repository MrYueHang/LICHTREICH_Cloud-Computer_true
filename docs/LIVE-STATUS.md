# LICHTREICH Live- und Produktionsevidenz

**Geprüft:** 2026-07-23, echter Browseraufruf ohne Anmeldung<br>
**Ersetzt:** den eindimensionalen Curl-Snapshot vom 2026-07-16

Ein HTTP-Status oder eine sichtbare Seite bedeutet nur, dass eine Route antwortet. Ein Modul gilt erst als `PRODUCED`, wenn die gesamte Kette belegt ist:

1. `ROUTE` — DNS/TLS und Seite antworten.
2. `UI` — die beabsichtigte Oberfläche lädt und ist bedienbar.
3. `API/DATA` — echte Daten oder Health-Evidence statt Demo/Placeholder.
4. `WORKFLOW` — der erwartete Vorgang läuft Ende-zu-Ende.
5. `RIGHTS/OPS` — Identität, Rechte, Fehler- und Betriebsnachweis sind geprüft.

`PRODUCED` ist damit kein Synonym für Vercel `Production` und auch kein Synonym für „im Desktop liegt ein Icon“.

## Aktueller Browserbefund

| Ziel | Route/UI am 23.07. | Tiefe / offene Evidence | Einstufung |
|---|---|---|---|
| `lichtreich.info` | Landing lädt produktiv | Production zeigt noch `System Live Alpha`; die evidenzbasierten Labels liegen in PR #24 | `UI LIVE / UPDATE PREVIEW` |
| `desktop.lichtreich.info` | daedalOS lädt; 14 LICHTREICH-Shortcuts sichtbar | 27 native Nutzer-Apps; dynamischer Installer und Head-of-Module sind noch nicht Production | `SHELL LIVE / INTEGRATION PREVIEW` |
| `api.lichtreich.info` | API-Startseite mit Links zu Health/Context lädt | Health-Unterroute war in diesem Browser blockiert; keine E2E-Evidence daraus ableiten | `ROUTE+UI LIVE / API OPEN` |
| `board.lichtreich.info` | OFFICE-KIT UI lädt | Board↔n8n↔Datenquelle weiterhin nicht belegt | `UI LIVE / DEMO-RISK` |
| `briefkasten.lichtreich.info` | Login und Demo-Link laden | geschützte Hauptfunktion ohne Anmeldung nicht geprüft | `AUTH+UI LIVE / E2E OPEN` |
| `bob.lichtreich.info` | leitet auf Briefkasten-Login | kein eigenständiges aktives Produktziel sichtbar | `REDIRECT` |
| `setup.lichtreich.info` | leitet auf denselben BOB-Login | kein eigener Einrichtungsassistent sichtbar | `PLACEHOLDER/ALIAS` |
| `service.lichtreich.info` | leitet auf denselben BOB-Login | kein eigener Service-Flow sichtbar | `PLACEHOLDER/ALIAS` |
| `rag.lichtreich.info` | eigene Such-UI lädt | Suchresultat, Quellenbeleg und Rechte nicht ausgeführt | `UI LIVE / QUERY EVIDENCE OPEN` |
| `ingest.lichtreich.info` | Eingabe, Datei, Entwürfe und Suche sichtbar | frühere `/api/health`- und `/api/ingest`-404; heutige Schreib-/Review-Kette nicht ausgeführt | `UI LIVE / API+WORKFLOW OPEN` |
| `orchestra.lichtreich.info` | Provider-/Rollen-/Formation-UI lädt | echte Provider-Calls, Budget, Receipts und Fallback nicht ausgeführt | `UI LIVE / EXECUTION OPEN` |
| `mandat.lichtreich.info` | Rechte-/Mandat-UI lädt | `darfSehen`, Persistenz und juristische Freigabe nicht ausgeführt | `UI LIVE / RIGHTS EVIDENCE OPEN` |
| `consult.lichtreich.info` | Voice-/Text-UI lädt | Sitzungen bleiben `lädt…`; Foto-Upload ist als „kommt bald“ markiert | `UI LIVE / DATA+FEATURE OPEN` |
| `society.lichtreich.info` | Radar-UI lädt | Register blieb bei `Lade Register…` | `UI LIVE / DATA OPEN` |
| `herrkuenstler.lichtreich.info` | Portfolio/Galerie UI lädt | Daten-/Admin- und Packaging-Aktionen nicht geprüft | `UI LIVE / BACKEND OPEN` |
| `dms.lichtreich.info` | Paperless-ngx Login lädt | Dienst ist da; gemeinsame Identity und Briefkasten-Workflow offen | `TOOL+AUTH LIVE / INTEGRATION OPEN` |
| `pdf.lichtreich.info` | Stirling-PDF Login lädt | Dienst ist da; Dossier-/Briefkasten-Integration offen | `TOOL+AUTH LIVE / INTEGRATION OPEN` |
| `formulare.lichtreich.info` | docassemble lädt | zeigt noch `It works!`/Default Interview, keine LICHTREICH-Fachstrecke | `TOOL LIVE / PRODUCT NOT CONFIGURED` |
| `whiteboard.lichtreich.info` | Excalidraw-Shell lädt | blieb bei `Loading scene…`; Persistenz/Shared Board nicht belegt | `TOOL SHELL LIVE / SCENE OPEN` |
| `metabase.lichtreich.info` | Metabase lädt | konkrete Datenquelle, Dashboard und Rechte nicht geprüft | `TOOL LIVE / DATA+RIGHTS OPEN` |
| `dateien.lichtreich.info` | copyparty Login lädt | Dienst ist da; Identität, Dossiers und Desktop-Dateimanager offen | `TOOL+AUTH LIVE / INTEGRATION OPEN` |
| `projekte.lichtreich.info` | Login-Weiterleitung sichtbar, Navigation lief in Timeout | kein Down-Urteil; gesonderter Betriebscheck nötig | `UNKNOWN/TIMEOUT` |
| `crm.lichtreich.info` | Browsernavigation lief in Timeout | kein Down-Urteil; gesonderter Betriebscheck nötig | `UNKNOWN/TIMEOUT` |
| `n8n.lichtreich.info` | Browsernavigation lief in Timeout | kein Down-Urteil; Workflow-Runs müssen serverseitig geprüft werden | `UNKNOWN/TIMEOUT` |
| `me.lichtreich.info` | Seite sagt selbst „diese Subdomain schläft noch“ | Linkliste statt persönlichem Bereich | `PLACEHOLDER` |
| `subs.lichtreich.info` | Projektübersicht lädt | interne Zählung `6 LIVE / 2 IN ARBEIT / 4 GEPLANT` ist eine UI-Aussage, kein Health-Beleg | `UI LIVE / STATUS SOURCE OPEN` |
| `nexus.lichtreich.info` | Systemübersicht lädt | Oberfläche spricht von simuliertem Datenaustausch | `UI LIVE / SIMULATION` |
| `tickets.lichtreich.info` | Triage-Hub Route lädt | Funktion und Persistenz in diesem Audit nicht sichtbar | `ROUTE LIVE / FUNCTION OPEN` |
| `cockpit.lichtreich.info` | `502 Bad Gateway` | Upstream/Proxy reparieren | `BROKEN` |
| `mcp.lichtreich.info`, `mcp.gezy.org` | vom Prüf-Browser clientseitig blockiert | daraus weder live noch down ableiten; serverseitiger Healthcheck nötig | `UNVERIFIED` |

## Was bereits produziert ist

- Die öffentliche Landing, der daedalOS-Desktop und mehrere eigenständige Modul-UIs werden real ausgeliefert.
- Paperless-ngx, Stirling-PDF, docassemble, Metabase, copyparty und weitere OSS-Dienste sind als laufende Werkzeuge erkennbar.
- `rag`, `ingest`, `orchestra`, `mandat`, `consult`, `society` und `board` besitzen eigene Oberflächen.

## Was noch nicht als Gesamtprodukt produziert ist

- ein gemeinsamer Login und einheitliche Rechte über alle Module;
- ein Registry-gesteuerter Appstore/Installer im Produktionsdesktop;
- ein Head of Board, der Module mit bestätigten Receipts tatsächlich bedient;
- einheitliche Health-, Workflow-, Daten- und Fehler-Evidence;
- vorkonfigurierte Fachstrecken statt Default-/Login-/Placeholder-Seiten;
- eine belegte Ende-zu-Ende-Kette vom Dokumenteingang bis Akte, Entscheidung und Audit.

## Nächste Prüflogik

Ein automatischer Statusdienst soll pro Modul getrennte Felder führen: `route`, `ui`, `api`, `data`, `workflow`, `identity`, `rights`, `deployment`, `last_evidence_at`. Die Landing und der Desktop dürfen nur diese Registry anzeigen; kein Modul setzt seinen eigenen grünen Gesamtstatus.
