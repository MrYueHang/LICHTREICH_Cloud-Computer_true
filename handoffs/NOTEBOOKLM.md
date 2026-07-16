# Hand-off → NotebookLM (Live-Handbuch, „andersrum")

**Rolle im Loop:** NotebookLM erklärt das System sich selbst und visualisiert das **lebende Handbuch**.
Nicht Frontend, nicht Backend — die **Erklär-/Schnittebene**. Braucht nur saubere Quellen + Anleitung.

## Quellen reinladen (aus dem Repo)
`README.md · HANDBUCH.md · _SYNC-REPORT.md · LIESMICH-loop-agent.md · docs/MULTI-REPO-MATRIX.md ·
docs/OUTLOOK-synthesizer.md · schemas/*.json · docs/research/*` (+ später die ~100 sortierten .md).

## Paste-Prompt (in NotebookLM)
```
Du bist das Live-Handbuch des LICHTREICH Cloud-Computer. Nutze NUR die hochgeladenen Quellen.
Erkläre in dieser Reihenfolge, jeweils knapp und mit Verweis auf die Quelle:
1. WAS IST (Ist-Stand): Welche Module/Subdomains existieren, welcher Status (alpha/pilot/beta/live)?
2. WAS ES SOLL (Ziel): Die Betriebskette (Eingang→Analyse→Interview→Briefe→Akte) + Rollentrennung
   (Public/User/Admin/System) + der GitHub-Ping-Pong-Loop.
3. WHAT'S NEW: Was hat sich im letzten Sync-Pass geändert (aus _SYNC-REPORT.md)?
4. SCHNITTEBENE: Wo greift der Nutzer ein? Zeig die Dialog-Punkte (vorschlag→✓→ausgeführt).
Erzeuge daraus: (a) eine Kurz-Selbsterklärung (1 Absatz), (b) eine Modul-Landkarte als Gliederung,
(c) offene Fragen. Halte alles maschinell aktualisierbar — bei neuen Quellen neu synthetisieren.
```

## Rückkanal
Ergebnis (Selbsterklärung + Landkarte) → als `docs/HANDBUCH-live.md` zurück ins Repo (Copy-Paste oder Export),
damit der nächste Loop es kennt.
