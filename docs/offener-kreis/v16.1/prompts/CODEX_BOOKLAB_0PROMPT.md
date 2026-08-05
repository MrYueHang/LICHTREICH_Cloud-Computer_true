# 0-PROMPT // CODEX — BOOKLAB LOCAL MVP

REPOSITORY: LICHTREICH_Cloud-Computer_true
BRANCH: app/booklab-mvp-v16
ROLLE: Softwareentwicklung, keine Literaturredaktion

Baue ein local-first BookLab mit den Modulen INBOX, CANON, WORKING PATCHES, LOCATIONS/OBJECTS/ENTITIES, SCIENCE & CLAIMS, VISUAL ASSETS, QOLLEKTIV, SOCIAL/PUBLISHING, DECISIONS und EXPORT.

Datenmodell: files, versions, sources, findings, patches, decisions, claims, assets, entities, locations, campaigns, handoffs. Jeder Datensatz erhält Herkunft, Hash, Status, Ersteller, Zeit, Version und Entscheidung.

Leitplanken: Python + SQLite; einfache lokale Weboberfläche; Modelladapter optional und standardmäßig deaktiviert; keine Schlüssel im Repository; ZIP-/Ordnerimport ohne Löschen; SHA-256; Markdown/CSV/JSON-Export; Tests; keine automatische Manuskriptänderung; kein Modelloutput wird ohne Decision Record kanonisch.

Definition of Done: Start mit einem Befehl; v15/v16/Handoffs importierbar; Kanon, Vorschläge und Entscheidungen getrennt; Tests grün; keine privaten Daten im öffentlichen Git.