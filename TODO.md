# LICHTREICH Cloud-Computer - Aufgaben & Backlog

Dieser Backlog basiert auf der Evidenzmatrix und dem aktuellen Plattformstand.

## 🔴 Kritische Priorität
- [ ] **Hinweis-/Kommentarlogik im BOB-Loop**: User-Hinweise steuern Strategie und Präzisierung noch nicht zuverlässig. Dynamische Einspeisung von Kommentaren/Strategien in die nächste Schleife muss robuster werden.
- [ ] **Foto/Scan/PDF-Vereinheitlichung**: Foto-Input und Scan-Stapel müssen sauber in denselben Dokumentpfad und Verarbeitungsprozess (BOB-Briefweg) gebracht werden.

## 🟠 Hohe Priorität
- [ ] **Setup-Branding und Public Entry**: `setup.lichtreich.info` muss als eigenständige, saubere Produkttür fungieren und nicht nur in die BOB-Loginwelt weiterleiten.
- [ ] **Plattform-SSO**: Den bestehenden, teilweise ausgerollten SSO (Auth.js-Cookie-Overrides) nachweislich auf alle zentralen Apps (inkl. `briefkasten` und `setup`) erweitern. Public Wording präzisieren.
- [ ] **Storage-/Mail-Connectoren**: Produktive Anbindung von Drive/Dropbox/Box (Client-Credentials klären) sowie Implementierung der IMAP-Integration.
- [ ] **Mandat Rechtsreview**: Juristisches Review für das Mandatsmodul abschließen und Beleg-Upload-Funktion implementieren.

## 🟡 Mittlere Priorität
- [ ] **herrkuenstler Public Reife**: Öffentlichen Titel anpassen (weg von generischem "My Google AI Studio App").
- [ ] **orchestra Rollen**: Live-Seite mit echten, demonstrierbaren Rollen befüllen (aktuell "0 Rollen live").
- [ ] **Öffentliche Verifikation einzelner Module**: Sicherstellen, dass Domains wie `board`, `society`, `consult` und `ingest` zuverlässig erreichbar und verifiziert sind.

## ⚪ Strategische & QA-Aufgaben
- [ ] **Test-Infrastruktur aufbauen**: Dreistufige Prüfmethode etablieren (Public Front Door, Case Loop, Connector & Rights). Ein Workflow ist erst grün, wenn visuell im Browser, per API und von zwei Unabhängigen geprüft.
- [ ] **Workflow-Landkarte in Code gießen**: n8n-JSON-Vorlagen mit der Metastruktur für das dynamische Handbuch verknüpfen.
- [ ] **Datenraum/Vault-Plan**: Konzept für sensible Daten (Enterprise Governance) ausarbeiten.
