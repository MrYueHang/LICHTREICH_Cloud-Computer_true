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

## To-do (strategisch untersuchen/optimieren, one-by-one)
1. Letta-Instanz fixen (Schema jetzt bekannt) → 1 Interview-Agent auf gpt-4o-mini.
2. Rückfallkette (User-Key→Pool→Freemium→Notfall) als Broker (chat.mjs erweitern).
3. Ebenen-Budgets/Metering (pro uid) → society-Radar.
> ⚠️ 3-4 gleichzeitig = kaum handlungsfähig (deine Worte). One-by-one.
