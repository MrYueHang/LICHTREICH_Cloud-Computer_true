# LICHTREICH BookLab Local · Bootstrap v01

Lokaler, dependency-freier Projektkern für Buchprojekte mit vielen ZIPs, Versionen, Chat-Handoffs und Assets.

## Zweck

- Roharchive sicher entpacken und unverändert bewahren
- SHA-256-Manifest und Versionsübersicht erzeugen
- Kanon, Vorschlag, Historie, Referenzen und Assets trennen
- Dubletten und Namenskollisionen sichtbar machen
- Sprachfundstellen zu `Nichts`, offenen Kreisen, Grenzen, Tragen/Dürfen sowie Gegensatz/Koexistenz sammeln
- lokales Dashboard ohne Cloud starten

## OFFENER-KREIS-Regel

```text
v15.0-canon                 = eingefrorener Romanmaster
v16 editorial preproduction = Vorschlagsschicht
Chats / Agenten              = Handoffs und Patches
Decision Record              = einzige Kanonänderung
```

## Start auf macOS

```bash
cd modules/booklab-local
chmod +x start.command
./start.command "/PFAD/ZUM/ORDNER_MIT_ALLEN_ZIPS"
```

Danach öffnet sich `http://127.0.0.1:8765`.

## Datenschutz

Dieses öffentliche Modul enthält nur Code, Schemas und künstliche Tests. Manuskripte, private Erinnerungen, DOCX/PDF/ZIP, Assets und API-Schlüssel bleiben lokal beziehungsweise in einem privaten Datenraum.

## Dateien

- `booklab.py` – Import, Hashing, Klassifikation, Ledgers, Dashboard
- `start.command` – Ein-Klick-Start für macOS
- `test_booklab.py` – lokaler Smoke-Test
- `.gitignore` – blockiert private Projektordner und Großdateien
