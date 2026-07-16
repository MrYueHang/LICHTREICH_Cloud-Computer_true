# 🪄 studioAI.zauberSPEC — App: me.lichtreich.info (User-Heimat)

> Für AI Studio. **Ebene: USER.** Der eingeloggte persönliche Bereich — die Tür, die zu den User-Modulen
> führt (briefkasten, herrkuenstler). Bauhaus-CI. Firebase Auth (Integration-first).

## Die 3 Ebenen sauber trennen (gilt überall)
| Ebene | Wer/Was | Sichtbar für |
|-------|---------|--------------|
| **System** | n8n, RAG-Ingest, Orchestrator, Health-Karte, PRIVATE_Unterlagen | niemand (headless) |
| **Community/Projekt** | geteilte Akten, Gruppen, Board-Projekte | Projektmitglieder |
| **User** | **me.lichtreich.info**, briefkasten, herrkuenstler | nur der User selbst |

## Was me.lichtreich.info ist
Die **persönliche Startseite nach Login** (Firebase Auth). Zeigt „meine Welt", nicht die System-Registry:
- **Meine Module** als Kacheln: **📮 Briefkasten** (Post/Akten) · **🎨 Herrkünstler** (Creator/Back-Office) · (später mehr).
- **Mein Status:** offene Fristen, laufende Jobs (aus Firestore `jobs`, gefiltert `owner_id`), letzte Akten.
- **Meine Adressen/Identität** (User-Linse): sieht nur „meine", nicht die System-Subdomain-Registry.
- Einstieg-CTA: „→ In den Briefkasten" / „→ Herrkünstler öffnen".

## Bauen
- Firebase Auth Login (wie briefkasten) → nach Login = diese Heimat.
- Kachel-Grid (Bauhaus), jede Kachel = Link auf die Modul-Subdomain.
- Live-Widgets aus Firestore (eigene Jobs/Fristen), keine System-Daten.
- Rollen-Guard: User sieht nur Eigenes; keine Admin/System-Settings.

## Definition of Done
- [ ] Login → persönliche Heimat mit Modul-Kacheln (Briefkasten, Herrkünstler)
- [ ] Live-Widget „meine offenen Jobs/Fristen" aus Firestore (owner_id)
- [ ] Klare Trennung: keine System-Registry sichtbar
- [ ] neuer CLAUDE_SYNC.txt-Block

## Backend (Claude, nicht Studio)
- me-Heimat liest dieselbe Firestore `jobs`/`akten` wie briefkasten (ein Datensatz, N Sichten).
- herrkuenstler.lichtreich.info als User-Modul in denselben Auth-Kontext bringen (SSO/Firebase).
