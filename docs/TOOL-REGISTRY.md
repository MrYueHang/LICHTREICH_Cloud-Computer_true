# 🗂️ TOOL-REGISTRY — was existiert schon (CHECK BEFORE BUILD!)
> Gegen „aneinander vorbei reden + Vorhandenes nachbauen". Namensregel: **KÜRZEL · Mini-Beschreib · Datum · Live?**
> Regel: BEVOR irgendwer (Claude/Studio) ein Tool baut → HIER nachsehen. Wächst via `system-inventur`.

| Kürzel | Tool | Mini-Beschreib | Live-URL | Canonical-Pfad/Repo | Status |
|--------|------|----------------|----------|---------------------|--------|
| **ING** | SCHLEUE·Ingestion | Wissen→wissen_vektoren, Console+Datei+Entwürfe-Review+Suche | ingest.lichtreich.info | CLOUD-COMPUTER/ingestion | ✅ canonical/live |
| ING-x | BOB-Ingest | Ingest INNERHALB der BOB-App | briefkasten.lichtreich.info/ingest | briefkasten/app/ingest | ⚠️ Dublette (im Kontext ok) |
| **RAG** | RAG-Schleue | pgvector semant. Suche, 2035 Chunks | rag.lichtreich.info | CLOUD-COMPUTER/rag | ✅ |
| **BOB** | Briefkasten | Legal-DMS, 17 Routen, TIEF | briefkasten.lichtreich.info | briefkasten | ✅ canonical |
| **HUB** | LICHTREICH Shell | Landing+Launcher, Navi→tiefe Apps | lichtreich.info | LICHTREICH_Cloud-Computer_true | ✅ |
| **OS** | daedalOS | Webtop-Desktop (MIT) | desktop.lichtreich.info | daedalOS (Fork) | ✅ live |
| **CPY** | copyparty | Fileserver (MIT), frei nutzbar | (VPS:3923) | copyparty | 🟡 andockbar |
| **BRD** | Office-Kit/Board | PM·Funnel·Whiteboard·Stylebook(CI-Mgr) | board.lichtreich.info | CLOUD-COMPUTER/office-kit | ✅ |
| **HK** | Herrkünstler | Creator-Hub | herrkuenstler.lichtreich.info | herrkuenstler…_01a | ✅ |
| **N8N** | n8n | Workflow-Automation | n8n.lichtreich.info | (VPS) | ✅ |
| **SOC** | Society-Radar | 31 Entitäten, Abteilungen | society.lichtreich.info | CLOUD-COMPUTER/society-radar | ✅ |
| **DMS** | Paperless-ngx | Dokumenten-Management: Scan/OCR(deu)/Tags, selfhosted (GPL) | dms.lichtreich.info | VPS:/opt/dms (Docker) | ✅ live 18.07 |
| **WBD** | Excalidraw | Whiteboard (MIT), offizielles Docker-Image | whiteboard.lichtreich.info | VPS: Container `excalidraw` | ✅ live 18.07 |

## Naming-Regel (für ALLES Neue)
`KÜRZEL_mini-beschreib_YYYY-MM-DD` — z.B. `ING_schleue-wissens-ingest_2026-07-07`.
Kürzel 2–4 Buchstaben, eindeutig. So sieht man auf einen Blick: was · wann · welche Version.

## Anti-Dublette-Reflex (Claude/Studio)
1. Tool gewünscht? → **erst hier + `system-inventur` prüfen.**
2. Existiert (canonical)? → dort ERWEITERN/verlinken, NICHT neu bauen.
3. Nur wenn's WIRKLICH fehlt → neu, mit Namensregel, hier eintragen.

## Bekannt: es gibt noch ~1 Dutzend weitere (GEZy/OS-Cluster, v0-*, community-ai-*) → siehe SCHAETZE-nicht-verlieren.md + system-inventur füttert diese Tabelle.
