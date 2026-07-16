# 🪄 studioAI.zauberSPEC — MOVE #1: User-Auth + Freemium-Token (BYO-Key, 1-Klick)

> ⭐ **DER ERSTE MOVE.** Ohne das kein Freemium. MUSS echt funktionieren (nicht pseudo) — genau wie im
> Briefkasten-Tool (M17 `eigene_api_keys` + „ehrliche Lampe"). Ebene: User. Firebase Auth.

## Der Flow (max automatisch, 1 Klick)
1. **Login** (Firebase Auth) → User ist da.
2. **Onboarding „Verbinde deine KI"** (1 Schritt): der User bringt **seine eigenen Freemium-Token** —
   - Feld je Provider (Gemini free · Groq free · OpenAI · …), ODER „✨ Plattform-Freemium nutzen" (Gratis-Kontingent).
   - **1 Klick „Verbinden"** speichert alles.
3. **Speichern pro User** in Firestore `users/{uid}/keys` (verschlüsselt, NIE im Frontend-State loggen).
4. **Ehrliche Lampe** (echt-Test): sofort ein Mini-Call je Key → 🟢 gültig / 🔴 falsch. Kein Blind-Speichern.
5. **Fertig:** ab jetzt laufen ALLE KI-Aktionen des Users über **seine** Token (sein Kontingent, seine Kosten).

## Warum „mit seinem User-Auth abgreifen"
Der Schlüssel gehört an die `uid` (Firebase Auth). So sieht/nutzt nur der User seine Token, und die
Plattform verbrennt keine zentralen Tokens für ihn. = tragfähiges Freemium (0€ eigener Key → Plus/Pro Quota).

## MUSS-Kriterien (sonst pseudo)
- [ ] Key wird real getestet (ehrliche Lampe), nicht nur gespeichert.
- [ ] Key an `uid` gebunden, verschlüsselt, nur serverseitig entschlüsselt für Calls.
- [ ] Eine echte KI-Aktion (z.B. Briefkasten-Analyse) läuft nachweislich über den User-Key.
- [ ] Fallback: kein Key → Plattform-Freemium-Quota (gedeckelt) ODER klarer „bitte Key verbinden".

## Backend (Claude, nicht Studio)
- Provider-Broker liest `users/{uid}/keys`, routet cheap-first (groq→openai→gemini) mit **User-Key**.
- Metering pro uid (Quota/Kosten) → Firestore `users/{uid}/usage`.
- Verschlüsselung (KMS/Firebase) + Entschlüsselung nur im Call.

## Rollen
User verbindet/sieht nur eigene Keys. Admin sieht Quota-Übersicht. System nie Klartext.
