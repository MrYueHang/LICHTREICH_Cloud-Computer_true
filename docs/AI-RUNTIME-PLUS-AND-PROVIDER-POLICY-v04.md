# AI Runtime, ChatGPT Plus & Provider Policy v04

## Entscheidung

ChatGPT Plus ist eine wertvolle interaktive Entwicklungs-, Analyse- und Review-Oberfläche. Es ist aber kein eingebetteter Runtime-Tarif für `*.lichtreich.info`.

Für Assistenten innerhalb des Cloud-Computers wird die OpenAI API oder ein anderer freigegebener Provider serverseitig verwendet. ChatGPT- und API-Abrechnung bleiben getrennt.

## Drei Nutzungswege

### A. ChatGPT Plus als Operator Console

Geeignet für:

- Architektur- und PRD-Arbeit,
- Datei-/Repo-/Connectoranalyse,
- Review von PRs, Logs, Screenshots und Reports,
- manuell bestätigte Aktionen über verfügbare Apps,
- Dialog mit dem Menschen während Entwicklung und Betrieb.

Nicht geeignet als:

- API-Key-Ersatz,
- unsichtbarer Backend-Worker,
- embedded ChatGPT in der LICHTREICH-Webseite,
- garantierte automatisierte 24/7-Runtime.

### B. OpenAI API als Produkt-Runtime

Geeignet für:

- Head-of-Module-Läufe,
- Klassifikation, Extraktion, Planung und Artefakte,
- Voice/Audio/Multimodal nach Policy,
- reproduzierbare Modell-/Version-/Kostenlogs,
- serverseitige Tools, Budgets, Fallbacks und Evaluierungen.

API-Keys liegen ausschließlich serverseitig im Credential Store. Nutzer können später BYOK oder Plattformkontingente nutzen.

### C. ChatGPT App/MCP als Brücke

Kann später LICHTREICH-Daten und kontrollierte Aktionen in ChatGPT verfügbar machen. Diese Brücke ist optional und plan-/region-/berechtigungsabhängig. Sie ersetzt weder die API-Runtime noch die kanonischen LICHTREICH-Daten- und Rechteverträge.

## Provider Router

Workflows benutzen stabile Taskklassen:

| Alias | Zweck | Standardanforderung |
|---|---|---|
| `local-private` | sensible Vorverarbeitung, PII/Secret Scan | lokal/offline, kein externer Fallback |
| `nano` | Routing, Klassifikation, kurze Extraktion | billig, schnell, strukturiert |
| `mini` | Standardzusammenfassung, Entwurf, Toolplanung | gutes Preis-/Qualitätsverhältnis |
| `reasoning` | Konflikte, Architektur, komplexe Fachplanung | höhere Qualität, begrenzte Nutzung |
| `large-context` | Dossiers, Repos, lange Sessions | Kontext- und Quellenfähigkeit |
| `multimodal` | Scan, Bild, Audio, Video | modalitätsspezifisch |
| `human-only` | Freigabe, Rechte, irreversible Entscheidung | kein automatischer Ersatz |

Die Provider Registry mappt Aliase auf aktuelle Modelle. Keine Fachlogik hängt fest an `gpt-4o-mini`, `gpt-5-mini` oder einem einzelnen Gemini-Namen.

## Vorgeschlagene Startpolicy

```yaml
routes:
  public_low_risk:
    primary: openai:nano
    fallback: [gemini:free-approved]
  standard_work:
    primary: openai:mini
    fallback: [gemini:approved, local:approved]
  complex_reasoning:
    primary: openai:reasoning
    fallback: [anthropic:approved, human_queue]
  confidential:
    primary: local-private
    fallback: [approved-api-zero-retention, human_queue]
  health_secrets_wallet:
    primary: local-private
    fallback: [human_queue]
```

Konkrete Provider/Fallbacks werden erst aktiviert, wenn Datenschutz, Vertrag, Kosten, Region, Logging und Datenklasse passen. Kein stiller Wechsel auf einen kostenlosen Provider.

## Letta

Letta sitzt nicht „über allen Daten“, sondern verwaltet begrenzte Memory Blocks je Agent und Scope:

- Persona/Role Contract,
- aktueller Arbeitsstand,
- bestätigte Präferenzen,
- relevante Pointer auf kanonische Quellen,
- offene Aufgaben/Entscheidungen.

Keine vollständigen Drive-/DMS-/RAG-Kopien in Agent Memory. Memory muss widerrufbar, exportierbar, versioniert und scope-gefiltert sein.

## Kosten- und Qualitätslog

Jeder Lauf speichert:

```text
run_id · task_class · provider · model/version · auth_mode · scope · data_class
input/output usage · duration · estimated cost · sources · tools · fallback
quality checks · human gate · result pointer · error/rollback state
```

## Entwicklungsmodus jetzt

1. ChatGPT Plus bleibt die gemeinsame Strategie-/Review-Konsole.
2. Vorhandene OpenAI-API-Credits werden mit hartem Budgetlimit für Entwicklungs-/Stagingläufe genutzt.
3. Runtime startet mit `nano`, `mini`, `reasoning` als Aliase.
4. Gemini oder andere Provider werden als explizit freigegebene Fallbacks registriert, nicht im Code verteilt.
5. Nach Evidence/Evals werden Modelle und Grenzen aktualisiert, ohne Workflows umzubauen.
