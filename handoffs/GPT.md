# Hand-off → GPT (Recherche- & Draft-Loop, asynchron)

**Rolle im Loop:** GPT macht die **„smarten Auslesen"** + **Live-Recherche für Temps/Drafts** (Vorlagen,
Entwürfe, Marktdaten). Läuft als eigener Loop, blockiert nichts. Ergebnisse werden modulfähig zurückgereicht.

## Aufgabenkatalog (GPT-Loop)
1. **Temps/Drafts:** Recherchiere + entwirf wiederverwendbare Vorlagen (Briefe, Formulare, FAQ-Antworten)
   passend zur Betriebskette. Output = strukturiertes Markdown/JSON, kein Fließtext-Brei.
2. **Smarte Auslesen:** Aus rohen Dokumenten/Chats die Essenz ziehen (Typ, Frist, Betrag, Beteiligte) —
   dieselbe Struktur wie `schemas/bob-briefweg.json`.
3. **Live-Recherche:** Markt/Wettbewerb/Rechtsrahmen als kurze belegte Notizen (mit Quelle).

## Paste-Prompt (in GPT)
```
Kontext: LICHTREICH Cloud-Computer, eine orchestrierte Fall-/Aktenmaschine (kein generischer Agent).
Betriebskette: Eingang→Analyse→Interview→Briefe→Akte. Rollentrennung Public/User/Admin/System.
Deine Rolle: Recherche + Draft-Erzeugung, IMMER als strukturierte Ausgabe (Markdown-Tabellen oder JSON),
nie als Fließtext. Bei Unklarheit: rückfragen, nicht raten.
Erste Aufgabe: <hier konkreten Task einsetzen, z.B. „Entwirf 3 Vorlagen für Widerspruch/Fristverlängerung/
Akteneinsicht als JSON mit Feldern slug,title,anlass,textbausteine[]">.
Am Ende: liste, was davon modulfähig ist (in welchen Dokumentpfad/Akte es gehört).
```

## Rückkanal
Strukturierte Outputs → `rag-ingest/` oder als `_true`-Modul-Repo → System zieht nach `rag`.
