# 🗂️ TOOL-REGISTRY — was existiert schon (CHECK BEFORE BUILD!)
> Gegen „aneinander vorbei reden + Vorhandenes nachbauen". Namensregel: **KÜRZEL · Mini-Beschreib · Datum · Live?**
> Regel: BEVOR irgendwer (Claude/Studio) ein Tool baut → HIER nachsehen. Wächst via `system-inventur`.
> `Live` in alten Zeilen bedeutete oft nur „Route antwortet“. Die belastbare, mehrdimensionale Einstufung steht in `docs/LIVE-STATUS.md` und hat Vorrang.

| Kürzel | Tool | Mini-Beschreib | Live-URL | Canonical-Pfad/Repo | Status |
|--------|------|----------------|----------|---------------------|--------|
| **ING** | SCHLEUE·Ingestion | Wissen→wissen_vektoren, Console+Datei+Entwürfe-Review+Suche | ingest.lichtreich.info | CLOUD-COMPUTER/ingestion | UI live · API/E2E offen |
| ING-x | BOB-Ingest | Ingest INNERHALB der BOB-App | briefkasten.lichtreich.info/ingest | briefkasten/app/ingest | ⚠️ Dublette (im Kontext ok) |
| **RAG** | RAG-Schleue | pgvector semant. Suche, 2035 Chunks | rag.lichtreich.info | CLOUD-COMPUTER/rag | UI live · Query/Evidence offen |
| **BOB** | Briefkasten | Legal-DMS, 17 Routen, TIEF | briefkasten.lichtreich.info | briefkasten | Auth/UI live · E2E offen |
| **HUB** | LICHTREICH Shell | Landing+Launcher, Navi→tiefe Apps | lichtreich.info | LICHTREICH_Cloud-Computer_true | Production-UI · Statuskorrektur in PR #24 |
| **OS** | daedalOS | Webtop-Desktop (MIT) | desktop.lichtreich.info | daedalOS (Fork) | Shell live · Installer/Head Preview |
| **CPY** | copyparty | Fileserver (MIT), frei nutzbar | (VPS:3923) | copyparty | 🟡 andockbar |
| **BRD** | Office-Kit/Board | PM·Funnel·Whiteboard·Stylebook(CI-Mgr) | board.lichtreich.info | CLOUD-COMPUTER/office-kit | UI live · Daten/n8n offen |
| **HK** | Herrkünstler | Creator-Hub | herrkuenstler.lichtreich.info | herrkuenstler…_01a | UI live · Backend offen |
| **N8N** | n8n | Workflow-Automation | n8n.lichtreich.info | (VPS) | Browser-Timeout · Ops-Evidence nötig |
| **SOC** | Society-Radar | 31 Entitäten, Abteilungen | society.lichtreich.info | CLOUD-COMPUTER/society-radar | UI live · Register lud nicht fertig |
| **DMS** | Paperless-ngx | Dokumenten-Management: Scan/OCR(deu)/Tags, selfhosted (GPL) | dms.lichtreich.info | VPS:/opt/dms (Docker) | Dienst/Auth live · Integration offen |
| **WBD** | Excalidraw | Whiteboard (MIT), offizielles Docker-Image | whiteboard.lichtreich.info | VPS: Container `excalidraw` | Shell live · Scene/Persistenz offen |
| **PDF** | Stirling-PDF | PDF-Werkbank: teilen/drehen/komprimieren/signieren (MIT) | pdf.lichtreich.info | VPS: Container `stirling-pdf` :8094 | Dienst/Auth live · Integration offen |
| **FORM** | docassemble | Geführte Rechts-Interviews→Dokumente (MIT) | formulare.lichtreich.info | VPS: Container `docassemble` :8095 | Dienst live · nur Default-Interview |
| **CRM** | Twenty | Modernes CRM (AGPL), Kontakte/Vermittler-Linse | crm.lichtreich.info | VPS:/opt/crm (Compose) :8097 | Browser-Timeout · Ops-Evidence nötig |
| **MTB** | Metabase | Dashboards auf DBs (AGPL), Neon verbunden (68 Tab.) | metabase.lichtreich.info | VPS: Container `metabase` :8098 | Dienst live · Daten/Rechte offen |
| **OPRJ** | OpenProject | PM mit Gantt (GPL) | projekte.lichtreich.info | Hetzner 65.108.50.103: Container `openproject` :8099 | Login-Redirect/Timeout · Ops-Evidence nötig |
| **DAT** | copyparty | Netzwerklaufplatte (Login stefan), /data auf Hetzner | dateien.lichtreich.info | Hetzner: Container `copyparty` :3923 + /root/copyparty-cfg | Dienst/Auth live · Integration offen |

## Naming-Regel (für ALLES Neue)
`KÜRZEL_mini-beschreib_YYYY-MM-DD` — z.B. `ING_schleue-wissens-ingest_2026-07-07`.
Kürzel 2–4 Buchstaben, eindeutig. So sieht man auf einen Blick: was · wann · welche Version.

## Anti-Dublette-Reflex (Claude/Studio)
1. Tool gewünscht? → **erst hier + `system-inventur` prüfen.**
2. Existiert (canonical)? → dort ERWEITERN/verlinken, NICHT neu bauen.
3. Nur wenn's WIRKLICH fehlt → neu, mit Namensregel, hier eintragen.

## Bekannt: es gibt noch ~1 Dutzend weitere (GEZy/OS-Cluster, v0-*, community-ai-*) → siehe SCHAETZE-nicht-verlieren.md + system-inventur füttert diese Tabelle.
