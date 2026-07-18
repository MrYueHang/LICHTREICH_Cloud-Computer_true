# 🏦 Ebenen · Konten · Freemium-Token (Strategie, zu optimieren)
> Klare Trennung System/Community/User über echte Konten + tragfähiges Token-Modell. NICHT Free-Tiers austricksen (AGB/Bann).

## Konten je Ebene (echte Zweck-Trennung)
| Ebene | Konto | Keys | Zweck |
|-------|-------|------|-------|
| **System** | msjuehang | SYS_* (zentral, high-security) | Orchestrator, RAG-Ingest, Infra |
| **Community/Projekt** | mrjuehang | COM_* (gedeckelt) | geteilte Projekt-Ressourcen |
| **User** | eigenes (BYO-Key) ODER Plattform-Freemium | user_* | Nutzung, sieht nur Eigenes |

## Freemium-Token (der eine User-Klick über alle Ebenen)
- User loggt 1× ein → System routet seine Calls: **eigener Key → Community-Pool → Plattform-Freemium (gedeckelt) → NOTFALL bezahlt**.
- Das ist die **orchestrator-Rückfallkette**, nur mit Ebenen-/Budget-Grenzen.
- **Sparflamme:** die immer-präsente KI arbeitet token-effizient (kleiner Kontext, gpt-4o-mini, Caching), NOTFALL-API nur wenn nötig.

## Token-Realität (ehrlich)
- Free-Tiers haben Cooldowns/Limits → **wir haben Zeit** (async, nicht alles auf einmal).
- **Nicht** viele Konten NUR fürs Free-Tier-Multiplizieren (AGB-Verstoß). Konten = echte Ebenen-Trennung.
- Dauerhaft billig = gpt-4o-mini (Cent) + Prompt-Caching, NICHT Konten-Tricks.

## Letta je Ebene?
EINE Letta-Instanz reicht → **Agenten je Ebene/Abteilung** mit **geteilten Memory-Blocks** (Letta kann Blocks zwischen Agenten teilen = Society). Keine 4 Letta-Server nötig.

## Wissens-DB-Trennung (Anti-Vermengung, Stand 18.07 — VORSCHLAG, via db-strategie festzurren)
- **Ist:** EINE Neon `neondb` (68 Tabellen) + `wissen_vektoren` gemeinsam → System-, Projekt- und User-Wissen können sich vermengen.
- **Zug:** Trennung nach Ebene — erst NICHT 3 Server, sondern: **Pflicht-Spalten `ebene` + `projekt_id` in `wissen_vektoren`** + getrennte Schemas; jede RAG-Anfrage filtert IMMER nach Ebene/Projekt (kein Überlauf möglich = Defense-in-Depth). Ausbaustufe: je Ebene eigenes Neon-Projekt (system/community/user), Sensibles → Supabase (= Datenzug D).
- **Letta bleibt EINE Instanz** — Agenten je Ebene/User mit geteilten Memory-Blocks (s. oben); Google-Auth entscheidet, welcher User-Agent + welche Ebenen-Blocks aufgehen. Freemium↔Plus ist dann nur ein Flag am User, kein DB-Umzug.

## Einrichtungsassistent (setup.lichtreich.info) — Auto-Einsammeln statt Formular-Wüste
1. **Google-Login zuerst** → daraus automatisch einsammeln, was am Konto hängt: **Gemini-Key** (AI-Studio-Free-Tier), **Drive** (Speicher + Pfad-Management), **Gmail** (statt IMAP-Gefummel), Calendar. Ein Consent-Klick, der Rest läuft.
2. **Konto-Erkennung:** existiert schon ein Konto beim Dienst → **Log-in statt Sign-up** anbieten.
3. **Manuelle Keys** (OpenAI, DeepSeek, Groq …): geführter Abhol-Flow — Deeplink direkt zur Key-Seite, Einfüge-Feld, sofort **ehrliche-Lampe-Test** (M17). User kann nichts vergessen/falsch machen.
4. **Power-User-Feinjustierung:** hat er schon höheren Plan (z. B. eigener OpenAI-Key/GPT-Plus) → sein Key wird in der Rückfallkette BEVORZUGT (BYO-first), einstellbar pro Dienst.
5. **Nicht-Gmail:** IMAP/SMTP-Fallback mit Provider-Presets.
6. **Beim Onboarding entsteht der User-Letta-Agent** — Gedächtnis ab Tag 1.
- **Kandidaten-Quelle:** `~/Documents/Claude/Projects/TRUE-Synch_ALL.mac.Ki.claude.all.all/07_FREEMIUM_KI_SERVICES_UND_CONNECTOR_MATRIX.md` (70 Freemium-Services, 13.03.) — je Service markieren: 🟢 auto via Google-Auth · 🟡 manueller Key (Abhol-Flow) · 🔵 self-hosted schon live (Selfhosted-Reihe).

## To-do (strategisch untersuchen/optimieren, one-by-one)
1. Letta-Instanz fixen (Schema jetzt bekannt) → 1 Interview-Agent auf gpt-4o-mini.
2. Rückfallkette (User-Key→Pool→Freemium→Notfall) als Broker (chat.mjs erweitern).
3. Ebenen-Budgets/Metering (pro uid) → society-Radar.
> ⚠️ 3-4 gleichzeitig = kaum handlungsfähig (deine Worte). One-by-one.
