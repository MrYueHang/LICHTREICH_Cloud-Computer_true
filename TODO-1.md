# LICHTREICH Cloud-Computer - Aufgaben & Backlog

Dieser Backlog basiert auf der Evidenzmatrix, dem aktuellen Plattformstand und der strategischen Neuausrichtung (GitHub-Loop & Rollentrennung).

## 🔴 Kritische Priorität
- [ ] **GitHub-Sync-Loop (Multi-Repo) etablieren**: Den "Ping-Pong" Prozess (AI Studio <-> GitHub <-> Claude Terminal) für alle Module/Subdomains standardisieren. Dies spart Anthropic-Token und ermöglicht paralleles Bauen.
- [ ] **Rollentrennung (Public / Admin / System / User)**: Harte strukturelle Trennung der Sichten und Zugriffsrechte.
  - **Public**: Landingpages (wie diese), Erklärungen, Pricing, Warteliste.
  - **User**: Das Cockpit, `briefkasten` (Eingang), Aktenansicht.
  - **Admin**: Connectoren-Setup, Abrechnung, Rechtemanagement (`mandat`).
  - **System**: n8n, RAG-Ingest, Orchestrator (headless).
- [x] **Foto/Scan/PDF-Vereinheitlichung im Briefkasten**: Foto-Input und Scan-Stapel müssen sauber in denselben Dokumentpfad und asynchron in den BOB-Briefweg gebracht werden.

## 🟠 Hohe Priorität
- [x] **Asynchroner GPT/Claude-Einsatz im Briefkasten**: Der Nutzer lädt im Frontend (`briefkasten`) Dokumente hoch. Das LLM antwortet *nicht* blockierend im Frontend, sondern das Dokument wird an den `BOB-Briefweg` (n8n/Backend) übergeben. Die KI arbeitet asynchron, das Resultat wird in der Akte abgelegt.
- [ ] **Setup-Branding und Public Entry**: `setup.lichtreich.info` muss als eigenständige, saubere Produkttür fungieren.
- [ ] **Plattform-SSO**: Den bestehenden SSO nachweislich auf alle zentralen Apps erweitern.
- [ ] **Storage-/Mail-Connectoren**: Produktive Anbindung von Drive/Dropbox/Box sowie Implementierung der IMAP-Integration.

## 🟡 Mittlere Priorität
- [ ] **Skill-Katalog für AI Studio**: Dokumentation der Arbeitsweise (wie diese Syncs) als wiederverwendbaren Skill/Agenten-Anweisung in `AGENTS.md` ablegen, damit AI Studio "without head" und token-sparend orchestriert werden kann.
- [ ] **orchestra Rollen**: Live-Seite mit echten, demonstrierbaren Rollen befüllen.
- [ ] **Hinweis-/Kommentarlogik im BOB-Loop**: User-Hinweise steuern Strategie und Präzisierung noch nicht zuverlässig.

## ⚪ Strategische & QA-Aufgaben
- [ ] **Workflow-Landkarte in Code gießen**: n8n-JSON-Vorlagen mit der Metastruktur für das dynamische Handbuch verknüpfen.
- [ ] **Datenraum/Vault-Plan**: Konzept für sensible Daten ausarbeiten.
