# 🚂 FAHRPLAN — der eine Zug (Phasen · Module · Repos · Use)

> Lebende, rasch abhakbare TODO. Ein kleiner Engine-Agent (AI Studio/GPT) kann das abfahren.
> Regel: Stefan sagt **ok/ja** → ein ganzer Zug-Abschnitt läuft. Reihenfolge = zum Eingreifen/Nachjustieren.
> Tracking = GitHub-Milestones „Phase 1–5" + Issues. Designs erstmal lassen; Substanz + Verknotung zuerst.

## 🔗 Connect-Map — welche Repos gehören in den Zug
| Repo | Ebene | Rolle im Zug |
|------|-------|--------------|
| **LICHTREICH_Cloud-Computer_true** | Public | Landing + Bindegewebe (Hub) |
| **api-lichtreich** | System | Source-of-Truth (/projects,/context,/schemas) |
| **briefkasten** | User | BOB-App (Upload→Akte) |
| **subs-lichtreich** / **qollektive** | Public | Projektübersicht/Hub (mit Hub mergen prüfen) |
| **herrkuenstler…** | User | Creator-Hub (eigener Loop) |
| **HSM-MCP-MAIN-brain** | System | MCP/Tool-Routing (Nervensystem) |
| **gez-os / community-ai-*** | Public | GEZy-Governance (später eigener Zug) |
| Archiv: LICHTREICH-Cloud-Computer, v0-*, bob.1.studioAi, …manus.v2 | — | Referenz, nicht kanonisch |

## 🎨 Assets aus letzter Session → in die Pipe einbasteln
- lifeos-cockpit.html (lokal) + Artefakte: `806a2c9c` (lichtreich.info-Landing?), `b5c819cb`, `a1d46c60`,
  `6e50b64b`, `b3863a78`, `0aa6467f`, `bfea0a88` → als UI-Bausteine für Phase 1/2 sichten & angleichen.
- n8n Live-Karten: `mdZOV2H5` (bob-briefweg), `lKTENoLZ`, `NhFgVKV3` → Phase 3/4.

---

## PHASE 1 — Public: lichtreich.info Landing  `[Milestone: Phase 1]`
- [x] Bauhaus-Landing (Hero/Matrix/HeadOfBoard/Personas/GTM/FAQ) — AI Studio ✅
- [x] Impressum + Datenschutz als echte Seiten ✅ (Debug-Fix)
- [ ] Waitlist-Backend live (n8n-Webhook `warteliste`) verdrahten
- [ ] Preis-Kanon festlegen (0/9/29/WL **vs** 0/29/Ent) → dann Pricing final
- [ ] Landing auf **lichtreich.info** deployen (nicht nur Hub-Preview)
- [ ] geile Artefakte sichten → beste UI-Teile angleichen (Bauhaus-CI)

## PHASE 2 — User: Auth + interner Bereich + Demo-Antrag  `[Milestone: Phase 2]`
- [ ] „Apply for Demo / Test-User" → Antrag-Formular → n8n → Freigabe-Flow  *(neu)*
- [ ] Plattform-SSO nachweislich auf alle Apps (#4)
- [ ] setup.lichtreich.info als eigene Produkttür (#3)
- [ ] interner Bereich: User sieht nur eigene Akten (owner_id, pseudonym)
- [ ] Admin-Ebene: Connector-Setup getrennt (#5)

## PHASE 3 — Briefkasten async (Upload→n8n→Akte)  `[Milestone: Phase 3]`
- [ ] briefkasten User-Frontend bauen (`specs/briefkasten.zauberSPEC.md`) — AI Studio
- [ ] n8n `bob-briefweg` verdrahten (#13): Webhook→202→OCR→classify→strategy→draft→Akte
- [ ] Foto/Scan/PDF → ein Dokumentpfad (#2)
- [ ] Hinweis-/Kommentarlogik wirkt in der Schleife (#1)
- [ ] status_url-Endpoint + Blob-Upload-Route

## PHASE 4 — System: RAG/Orchestra/n8n verknoten  `[Milestone: Phase 4]`
- [ ] ~100 .md sortieren → NotebookLM-Quelle + `rag` (Skill `wissens-ingest`, cheap/lokal)
- [ ] Ingest-Write-Endpoint klären → product-truth in `rag` pushen (aktuell 🟡)
- [ ] orchestra echte Rollen live (#8)
- [ ] Workflow-Landkarte ↔ Metastruktur in Code (#11)
- [ ] Public-Verifikation board/society/consult/ingest (#9)

## PHASE 5 — Multi-Tool-Synthesizer + Messaging  `[Milestone: Phase 5]`
- [ ] NotebookLM Live-Handbuch (`handoffs/NOTEBOOKLM.md`)
- [ ] GPT Recherche-/Draft-Loop (`handoffs/GPT.md`)
- [ ] Telegram-Agent + Board → parsen in Loop (#14)
- [ ] Browser-KI (Claude-in-Chrome) + chat.online (#15)
- [ ] live.dev.synthesizer + Artefakt-Import/Remix (#16)
- [ ] Instanzen-Manager (Git-Branch je Instanz/Modul)

---
**So fährst du:** Phase 1 zuende → „ok" → Phase 2 usw. An jedem `[ ]` kannst du eingreifen/umsortieren.
Der Terminal-Claude ist Manager (verdrahtet/verifiziert), AI Studio/GPT/NotebookLM sind die Waggons.
