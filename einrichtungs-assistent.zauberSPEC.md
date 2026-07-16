# 🪄 studioAI.zauberSPEC — EINRICHTUNGS-ASSISTENT (erweitert)

> Erweitert M17 (/setup · Connect-UI · „ehrliche Lampe"). **Kernidee:** Einrichten ist ein PRODUKT-FEATURE,
> kein manuelles Console-Gefummel. Der User klickt sich geführt durch — jeder Schritt wird **echt getestet**
> (ehrliche Lampe, nie Pseudo-Grün). Ebene: User (eigene Connectoren) + Admin (System-Connectoren).
> Baut auf `specs/user-auth-byokey.zauberSPEC.md`. Speicher: Firestore `users/{uid}/connectors`.

## Der Assistent — geführter Flow (Schritt für Schritt, überspringbar, fortsetzbar)
Fortschrittsbalken oben. Jeder Schritt: **Verbinden → 🔎 ehrliche Lampe (echter Test-Call) → 🟢/🔴 → weiter**.

### Schritt 0 · Login
Firebase Auth (Anonymous/Google). Ab hier gehört alles an die `uid`.

### Schritt 1 · KI verbinden (BYO-Key / Freemium) ⭐ Move #1
- Provider-Felder (Gemini free · Groq free · OpenAI · …) **oder** „✨ Plattform-Freemium".
- 1 Klick „Verbinden" → **ehrliche Lampe** = echter Mini-Call je Key → 🟢 gültig / 🔴 + Fehlertext.
- Speichert verschlüsselt an `users/{uid}/keys`. (Detail: user-auth-byokey Spec.)

### Schritt 2 · Speicher verbinden
- Google Drive / Dropbox / Box / S3-MinIO. **OAuth (Google Picker)** statt Key-Paste wo möglich.
- ehrliche Lampe = Test-List eines Ordners → 🟢/🔴.

### Schritt 3 · Mail verbinden
- Gmail (OAuth) oder IMAP (Host/User/App-Passwort).
- ehrliche Lampe = Test-Login / 1 Header abrufen → 🟢/🔴.

### Schritt 4 · Kalender/Fristen (optional)
- Google Calendar (OAuth) → für Fristen-Sub-Tool. ehrliche Lampe = 1 Event lesen.

### Schritt 5 · Fertig
- Übersicht aller Connectoren mit Lampe-Status. „Jetzt loslegen → Briefkasten".
- Fehlende/rote → klar markiert („später nachholen"), blockieren nicht.

## „Ehrliche Lampe" — die Regel (nie Pseudo)
Grün NUR nach echtem Call. Kein „gespeichert = grün". Rot zeigt den echten Fehler + Fix-Hinweis.
(Das war Stefans wiederkehrender Schmerz: es sah eingerichtet aus, war es aber nicht.)

## Admin-Modus (dein Bereich)
Gleicher Assistent, aber **System-Connectoren** (Neon, n8n, Cloudflare, Service-Accounts). Zeigt, was
plattform-seitig fehlt — statt dass du in fremden Consoles Nummern suchst. Deep-Links werden aus der
**echten Config** generiert (projectId etc.), nie geraten.

## 3 Ebenen (jetzt trennen — später verfeinern)
| Ebene | Was der Assistent einrichtet |
|-------|------------------------------|
| **System** | zentrale Connectoren (Neon, n8n, Cloudflare, Service-Accounts) — nur Admin |
| **Community/Projekt** | geteilte, gedeckelte Ressourcen · **Community-API** (gemeinsamer Provider-Pool) |
| **User** | eigene BYO-Keys · **Freemium-Rückfall** (kein Key → gedeckeltes Gratis-Kontingent) |

**Später (abgegrenzt):** der User-Assistent regelt sauber **Freemium-Rückfall** (User-Key → sonst Community-Pool →
sonst Plattform-Freemium, gedeckelt). Die **Community-API** (Ebene 2) ist eigener Pfad mit eigener Deckelung/Abrechnung.
Jetzt: die 3 Ebenen im Assistenten strukturell trennen; die Rückfall-Logik ist Backend (Broker) + kommt schrittweise.

## Backend (Claude, nicht Studio)
- Test-Endpoints je Connector (der „Lampe"-Call), serverseitig mit dem gespeicherten Key.
- Verschlüsselung/Entschlüsselung nur im Call. Metering pro uid.
- OAuth-Callbacks (Drive/Gmail/Calendar) → Token an `users/{uid}/connectors`.

## Definition of Done
- [ ] Geführter Wizard mit Fortschritt, überspringbar, fortsetzbar
- [ ] Jeder Connector hat eine ECHTE Test-Lampe (kein Pseudo-Grün)
- [ ] Schritt 1 (BYO-Key) funktioniert nachweislich end-to-end
- [ ] Rote Connectoren blockieren nicht, sind klar markiert
- [ ] Admin-Modus zeigt System-Connectoren mit echten Deep-Links
- [ ] neuer CLAUDE_SYNC.txt-Block
