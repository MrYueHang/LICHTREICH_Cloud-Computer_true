# LICHTREICH Cloud-Computer - Aufgaben & Backlog

Dieser Backlog basiert auf der Evidenzmatrix, dem aktuellen Plattformstand und der strategischen Neuausrichtung (GitHub-Loop & Rollentrennung).

## 🔴 Kritische Priorität
- [x] **GitHub-Sync-Loop (Multi-Repo) etablieren**: Den "Ping-Pong" Prozess (AI Studio <-> GitHub <-> Claude Terminal) für alle Module/Subdomains standardisieren. Dies spart Anthropic-Token und ermöglicht paralleles Bauen.
- [x] **Rollentrennung (Public / Admin / System / User)**: Harte strukturelle Trennung der Sichten und Zugriffsrechte.
  - **Public**: Landingpages (wie diese), Erklärungen, Pricing, Warteliste.
  - **User**: Das Cockpit, `briefkasten` (Eingang), `datei-manager` (Werkbank), `me.lichtreich.info` (Heimat).
  - **Admin**: Connectoren-Setup (`einrichtungs-assistent`), Abrechnung, Rechtemanagement (`mandat`).
  - **System**: n8n Prozess-Board, RAG-Ingest, Orchestrator (headless).
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

---

# 🔴 NÄCHSTER AUSFÜHRUNGSPASS — TAKTØR STORY-FIRST v03

## Status

Dies ist der einzige gültige TAKTØR-Backendauftrag. Die frühere Langformfassung in PR #28 ist eine verworfene technische Vorstufe und darf nicht deployt oder gemergt werden.

## Vom Nutzer bereitgestelltes Paket

`TAKTOR_STORY-FIRST_PILOT_v03_COMPLETE.zip`

Das ZIP ist dem Claude-Terminal-Dialog als Anlage zu übergeben. Es enthält die quellengetreue Story Engine, Track Story Bible, Narrative-to-Music-Map, OpenAI-Director-/Worker-/Judge-Prompts, Pilotjob, Fail-closed Runner, QA-Regeln, Storagevertrag und Deploy-Handoff.

## Harte Product-Truth

- Kein öffentlicher Tracktitel ist festgelegt.
- `ERFOLG LAUT SYSTEM`, `OFFENER KREIS` und `BARFUSS TROTZ STAHLKAPPE` sind keine Tracktitel.
- Der erste Musikpilot bleibt instrumental.
- Keine Referenzaudios werden an den Renderer gesendet oder in den Track kopiert.
- Die Storybewegung lautet: getrennte Pulse → wirkliche tragende Koordination → koordinierte Vielheit → verführerische Geschlossenheit → richtige Antwort aus nicht erlaubter Verbindung → Körper-/Beziehungsveto → offene Rückkehr.
- Es entstehen vier vollständige 8–12-Minuten-Kandidaten, keine Snippet-Kette.
- Höchstens zwei bestandene Kandidaten werden dem Nutzer zur einmaligen Hörentscheidung gezeigt.

## Claude-Auftrag

1. Vor Änderungen aktuellen Repo-Stand pullen und `AGENTS.md` beachten.
2. ZIP vollständig prüfen; keine Story oder Titel neu erfinden.
3. Backend-/Orchestratorcode ausschließlich im dafür vorgesehenen Claude-/Backendbereich implementieren; bestehende Frontenddateien nicht überschreiben.
4. TAKTØR als asynchrones LICHTREICH-Modul verdrahten:
   - Vercel/Frontend: Auftrag, Status, Review
   - LICHTREICH VPS/MCP oder n8n: Auth, Queue, Projektpfad, Status, Budget, Audit
   - OpenAI Responses API: Director und Final Judge
   - OpenAI Batch API: zwölf schmale Audit-Worker
   - ACE-Step 1.5 oder kompatibler lizenzgeprüfter GPU-Worker: vollständiger Musikrender
   - `dateien.lichtreich.info` bzw. S3-kompatibler Storage: WAV/MP3/Manifeste
5. Secretwerte niemals committen. Vorhandenen Einrichtungs-Assistenten und Secret-Store nutzen.
6. Kanonischen Pfad anlegen:
   `creative-society/msjuehang/track-pilot-01/{run_id}/`
7. Fail-closed QA aus dem ZIP übernehmen:
   - Clipping auf Originalkanälen vor Downmix messen
   - Stereo/Full-band statt Sub-only-Kollaps
   - kein dauerhaftes Noise-Bed
   - keine Vocals; fehlender Vocal-Detector blockiert Erfolg
   - höchstens vier große Strukturbrüche
   - zeitfensterbasierte BPM-Prüfung außerhalb deklarierter Übergänge
   - atomare Run-Ordner; kein alter READY-Status nach Fehlerlauf
8. Einen echten End-to-End-Probelauf starten.
9. Nur bei real vorhandenen, vollständigen Dateien `READY_FOR_ONE_HUMAN_REVIEW` setzen.
10. Ergebnis liefern als:
    - `_SYNC-REPORT.md`
    - Deploy-/Healthstatus
    - Zielpfad
    - verwendete Modelle/Versionen/Lizenzen
    - gemessene API-/GPU-Kosten
    - Links oder Pfade zu höchstens zwei vollständigen Review-MP3s und WAVs
    - klare Blockerliste, falls kein Audio gerendert wurde

## Erwartete Nutzerinteraktion

Keine Zwischenfragen zu Promptvarianten, keine Snippet-Auswahl und kein manuelles Klicken. Nur notwendige Secret-/Infrastrukturentscheidung erfragen, falls sie nicht aus der Umgebung auflösbar ist. Danach selbstständig bis zum End-to-End-Resultat arbeiten.
