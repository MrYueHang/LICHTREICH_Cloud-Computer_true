# 🟢 LIVE-STATUS — verifiziert per curl (2026-07-16)
> Echt geprüft, nicht behauptet. Für Studio + Chat: DAS läuft wirklich.

## Subdomains — 19/20 LIVE
| Subdomain | Code | Was |
|-----------|------|-----|
| api.lichtreich.info | 200 🟢 | Source-of-Truth |
| mcp.lichtreich.info | 200 🟢 | Orchester-Herz |
| briefkasten.lichtreich.info | 307 🟢 | BOB (Bauch) |
| herrkuenstler.lichtreich.info | 200 🟢 | Creator-Hub (Kopf) |
| rag.lichtreich.info | 200 🟢 | Wissen (2035 Chunks) |
| ingest.lichtreich.info | 200 🟢 | Ingestion |
| board.lichtreich.info | 200 🟢 | Office-Kit |
| society.lichtreich.info | 200 🟢 | HR-Radar |
| consult.lichtreich.info | 200 🟢 | Voice-Consulting |
| orchestra.lichtreich.info | 200 🟢 | Provider-Orchester |
| mandat.lichtreich.info | 200 🟢 | Rechte/Vollmacht |
| tickets.lichtreich.info | 200 🟢 | Melden-Widget |
| n8n.lichtreich.info | 200 🟢 | Workflow-Automation |
| setup.lichtreich.info | 307 🟢 | Setup/Onboarding |
| service.lichtreich.info | 307 🟢 | Service |
| subs.lichtreich.info | 200 🟢 | Hub/Projektübersicht |
| **me.lichtreich.info** | 200 🟢 | **User-Heimat (existiert schon!)** |
| nexus.lichtreich.info | 200 🟢 | Nexus-Hub |
| bob.lichtreich.info | 308 🟢 | BOB Studio |
| **cockpit**.lichtreich.info | 000 🔴 | **fehlt — DAS ist der Bauauftrag** |
| mcp.gezy.org | 200 🟢 | GEZy MCP |

## Dein Teil = 3 OK-Klicks (nicht 1200)
Du loggst dich ein + klickst OK. Rest macht Chrome-KI/Claude.
1. **Google Cloud Console** (Projekt 148598038525) → einloggen → APIs „Enable" (Firestore/Auth/Drive/Gmail/Calendar) → OAuth-Consent „Publish". → **1× Login + paar OK.**
2. **Firebase** → einloggen → Firestore „Create" + Auth-Provider „Enable". → **1× OK.**
3. **Anthropic Console** → API-Key bestätigen. → **1× Klick.**
→ Danach greifen Studios Integrations + der Loop nutzt Batches/Cache. Details: `docs/KONSOLEN-SETUP.md`.

## Wer macht was (kurz)
- **Du:** die 3 Logins + OK oben.
- **Chrome-KI:** klickt die Details in beiden Consoles durch (Auftrag in KONSOLEN-SETUP).
- **Studio:** baut Frontend (Firebase-Integrations).
- **Claude:** Backend/Verdrahtung/git.
