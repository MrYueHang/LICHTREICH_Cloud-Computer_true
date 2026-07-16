# 🧩 MODUL- & SUB-MODUL-KATALOG — LICHTREICH Cloud-Computer
> Vollständige Liste. Ebenen: 🟦 System · 🟨 Community/Projekt · 🟩 User. Stand 2026-07-16.

## A) Kern-Module (BOB, M01–M20)
| # | Modul | Sub-Elemente |
|---|-------|--------------|
| M01 | Auth/Zugang | Login, Firebase Auth, SSO *.lichtreich.info |
| M02 | Identität/Rollen | superadmin/revisor/principal/user, Vertretung |
| M03 | Pseudonymisierung | owner_id-Alias (DSGVO), Klarname↔M-xxxx |
| M04 | Akten | Fall-Klammer, Auto-Akte-Vorschlag, Unter-Akten |
| M05 | Eingang/Briefe | Upload, Auto-Gruppierung (Absender) |
| M06 | Scan/OCR-Dialog | Foto/Scan/PDF→ein Pfad, Mehrseiten/Rückseite/Anlage |
| M07 | Stapel-Ingest | Stapel-KI (ordnet/benennt, findet Doks) |
| M08 | Dokument-Ebene | Typ/Relevanz/Themen, FEHLT-Anzeige |
| M09 | Pfad/Storage | Blob/Firebase Storage, „Original öffnen" |
| M10 | KI-Werkzeuge | Ton-Modi, Mini-Prompt, „nie raten→nachfragen" |
| M11 | Strategie-Engine | rel. Relevanz, best/worst-case, Fall-Kohärenz |
| M12 | Dialog/Notizen | Thread je Brief/Akte, Hinweise→Strategie |
| M13 | Kontakte | CRUD, Gegenseite/Behörde/Bank |
| M14 | Mandate/Freigabe | Vollmacht/Betreuung, Akten-Freigabe, Widerruf |
| M15 | Cockpit | Akte-scoped Graph, Head-of-Board |
| M16 | Fristen/Aufgaben | berechnet/überwacht, aufgaben_schritte |
| M17 | Connectoren/Keys | ehrliche Lampe, eigene_api_keys |
| M18 | Architektur-Map | €/Token-KPI |
| M19 | Wissen/RAG | pgvector, Ingest→Embed→RAG (2035 Chunks) |
| M20 | Public/Marketing | Landing, Pricing, Warteliste |

## B) Dienst-Module (Subdomains, 19/20 live)
🟦 api · mcp · rag · ingest · orchestra · society · tickets · n8n
🟩 briefkasten · herrkuenstler · me · consult · board · setup · service · bob
🟨 subs (Hub) · nexus · mandat
⬜ **cockpit** (fehlt — Bauauftrag #19)

## C) Branchen-Linsen (dieselbe Pipe, N Tools)
Briefkasten(Bürger) · Jura/Anwalt(beA) · Makler(Exposé/Grundbuch) · Investor(DD/Portfolio) ·
Hausverwaltung(Mieter/WEG) · Finanz(Konto/Beleg) · Kontakte-Vermittler(CRM/Matching)

## D) Branchen-Sub-Tools (→ native Google-Integrations statt Deko)
| Sub-Tool | Integration |
|----------|-------------|
| Fristen-Kalender | Google Calendar |
| Redaktionsplan | Google Sheets / Tasks |
| Akte-Graph | Firestore + Whiteboard |
| Posteingang | Gmail (IMAP) |
| Datei-Ablage | Drive / Picker |
| Vertragsvergleich | Docs + RAG |

## E) Daten-Kern (ein Datensatz, N Sichten)
Person · Kontakt · Akte/Fall · Dokument · Frist · Konto · Task · Job(status)

## F) System-Ebene (headless)
Cloudflare-DNS · Subdomain-Registry · Domänen · Publish/Graduation (User→eigene Subdomain) ·
Orchestrator · RAG-Ingest · Health-Live-Karte · PRIVATE_Unterlagen (nur System)

## G) Ausblick-Module (geparkt)
Messaging-Agenten (Telegram/WhatsApp) · GPT-Loop · NotebookLM-Handbuch · live.dev.synthesizer ·
Instanzen-Manager · Voice (Groq-Whisper) · Stripe/Billing · Whitelabel
