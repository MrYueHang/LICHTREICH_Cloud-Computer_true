# 🧭 Bau-Prinzip: Stub-Linse vs. Volle Tiefe (ein Datensatz · N Sichten)

## Die Regel
- **Daten + Logik = EINMAL tief** (Firestore/API/BOB-Kern). Nie duplizieren.
- **Stub = dünne Sicht/Linse** auf denselben Kern — kuratierter Ausschnitt, liest/schreibt dieselben Daten.
- **Volle Tiefe = komplettes Tool** (alle Routen), für Power-Nutzung, per Link/SSO.

## Wann was
| Kontext | Sicht |
|---|---|
| „Öffne mein Briefkasten" | **volle Tiefe** (briefkasten.lichtreich.info) |
| Branchen-Modul (makler/immo/anwalt) | **Kompositionen aus Stub-Linsen** + „→ volle Tiefe"-Link |
| Landing/Shell | Launcher → Tiefe verlinken |

## Branchen-Konvolut = Komposition
Bsp. **Makler** = [Exposé-Upload-Stub] + [Fristen-Kalender-Stub] + [Kontakte-Stub] + [→ volle Akte].
Jeder Stub = Linse auf denselben BOB/Firestore-Kern, in Branchen-Kontext gerahmt. KEINE eigene Datenhaltung/Logik.

## Anti-Pattern (der Fehler vom 18.07)
Ein Stub mit EIGENER flacher Logik = zweite Wahrheit = Doppelarbeit + Datensplit. Verboten.
Stub darf NUR Sicht sein. Test: „Schreibt der Stub in denselben Store wie das tiefe Modul?" → muss JA sein.
