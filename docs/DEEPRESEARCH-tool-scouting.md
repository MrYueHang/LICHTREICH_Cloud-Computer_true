# 🔭 Deep-Research: OSS-Tool-Scouting (fertige Bausteine andocken statt bauen)
> Ziel: laufend fertige, free/OSS-Tools finden, die man deploy-ready andockt (wie daedalOS/copyparty).
> Ergebnis → ingest → RAG „Ideen-Bank". Immer MIT Lizenz (dürfen wir's nutzen?) + Preview/Demo.

## Muss-Kriterien je Tool
- **Lizenz** (MIT/Apache = frei · GPL/AGPL = Copyleft, Auflagen · proprietär = raus) — IMMER erfassen.
- **Maintained** (letzter Commit < 12 Mon), Sterne/Community.
- **Self-hostable / deploy-ready** (Docker oder Static-Build wie daedalOS).
- **Demo/Preview** vorhanden (Screenshot/Live-URL) → für Visualisierung.

## Erfassungs-Felder (pro Tool, für die Liste)
`Name · Repo-URL · Lizenz · Branche/Kategorie · Stack · Deploy(Docker/Static/1-Klick?) · Demo-Link · 1-Satz-Nutzen · Einbindung(link/embed/stub/klau)`

## Branchen/Themen (die „vorne runterrattern"-Liste)
Office/PM · Datei/Storage (copyparty) · Webtop/OS (daedalOS) · Recht/Legal (Urteile, Due-Diligence) ·
Immo/Makler (Grundriss, Exposé) · Finance/Konto/Buchhaltung · Healthcare · HR/Recruiting ·
CRM/Kontakte · Collaboration/Email/Chat · Knowledge/RAG/Notebook · Digital-Twin/Life-OS ·
Forms/Docs/Signatur · Kalender/Fristen · Automation (n8n-artig) · Whiteboard/Diagram · Auth/SSO · Analytics/Dashboard

## Output-Format
Markdown-Tabelle (Felder oben), gruppiert nach Branche. → `rag-ingest/` → RAG. Regelmäßig (seriell) neu laufen.

## Anker-Beispiele (Format-Vorlage)
- **daedalOS** — MIT — Webtop/OS — Next.js/static — Deploy: static (Node 20 + openssl-legacy) — Demo: dustinbrett.com — voller Browser-Desktop — Einbindung: link (desktop.lichtreich.info).
- **copyparty** — Lizenz PRÜFEN (vermutl. MIT) — Datei/Storage — Python — Docker/portable — Fileserver mit Upload — Einbindung: Backend hinter Datei-Manager.

## Paste-Prompt für Deep-Research (bash/perplexity/gpt-deep-research)
```
Finde 10–15 gepflegte, frei nutzbare Open-Source-Tools pro Branche (Liste s.u.), die deploy-ready sind
(Docker oder Static-Build). Für JEDES: Name, Repo-URL, LIZENZ (MIT/Apache/GPL/AGPL/proprietär),
Branche, Stack, Deploy-Weg, Demo/Preview-Link, 1-Satz-Nutzen, wie einbindbar (link/embed/stub).
Branchen: Office/PM, Datei/Storage, Webtop/OS, Recht/Due-Diligence, Immo/Makler, Finance, Healthcare,
HR, CRM, Collaboration/Email, Knowledge/RAG, Digital-Twin/LifeOS, Forms/Signatur, Kalender, Automation,
Whiteboard, Auth. Gib das als Markdown-Tabelle je Branche zurück. Copyleft-Lizenzen markieren.
```

## Bezug: Ingest-Steuerung (eigener Task)
Das ingest-Tool soll steuerbar sein: **nach Thema · Prio · Token-Budget · Zeit · Doc-Anzahl · ganze-Seite/Thema**.
Aktuell schwer nutzbar → Session „ingest steuerbar machen" (rechte/urteile/tools thematisch einspeisen).

## 📚 Quellen-Fundgruben (Listen, die schon kuratiert sind)
- **DustinBrett/awesome-OS** (MIT) — alle OS-Clones + Software. Screenen → viele deploy-ready Tools.
- **DustinBrett/awesome-web-desktops** — Web-Desktop-Apps.
- Weitere von ihm nutzbar (trustable, MIT/Apache): web-llm, web-stable-diffusion, BrowserFS, vanta, html-to-image, darkreader.

## 🏆 Top-Fundgruben (18.07, via Stefan)
- **awesome-selfhosted** (github.com/awesome-selfhosted/awesome-selfhosted) — DIE kuratierte Liste selbst-hostbarer OSS. Genau unsere Schatzkarte.
- ✅ REIHE DEPLOYED 18.07 (VPS, Muster `/opt/andock.sh SUB PORT`): Stirling-PDF→pdf · docassemble→formulare · Twenty→crm · Metabase→metabase. j-lawyer = Desktop-Client, KEIN Browser-Modul → nur Klau-Quelle. OpenProject verschoben (VPS voll, 1,4 GB frei).
- **github.com/topics/hacktoberfest** — ~147k Projekte (breit, via GPT filtern).
- **Excalidraw** — ✅ DEPLOYED 18.07 → whiteboard.lichtreich.info (offizielles Docker-Image auf VPS).
- **paperless-ngx** — ✅ DEPLOYED 18.07 → dms.lichtreich.info (Docker /opt/dms, deu-OCR, Login in SECRETS.local.txt).
- josh's Rechner (hit-me.media/community-page) im Desktop steuerbar — Funktionalität festhalten.
