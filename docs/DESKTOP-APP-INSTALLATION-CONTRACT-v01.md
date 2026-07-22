# Desktop App Installation Contract v01

**Status:** DRAFT CONTRACT  
**Shell:** `desktop.lichtreich.info` / `MrYueHang/daedalOS`  
**Schema:** `schemas/app-manifest.v01.schema.json`

## Ziel

LICHTREICH-Module werden über einen autorisierten App-Katalog im Desktop sichtbar. Der Desktop bleibt Experience-Shell; Module, Daten und Agenten laufen weiterhin in ihren zuständigen Services.

## Heutiger kompatibler Zustand

daedalOS liefert Systemverknüpfungen als `public/Users/Public/Desktop/*.url` aus:

```ini
[InternetShortcut]
BaseURL=Browser
URL=https://briefkasten.lichtreich.info
Comment=BOB Legal-DMS
IconFile=https://example.invalid/icons/briefkasten.png
```

Dieser Mechanismus bleibt der Bootstrap-Adapter. Ein Manifest wird so abgebildet:

| AppManifest | `.url` |
|---|---|
| `launch_mode=browser_window` | `BaseURL=Browser` |
| `launch_url` | `URL` |
| `description` | `Comment` |
| `icon_url` | `IconFile` |

Eigene versionierte Icon-Assets sind externen Favicon-Diensten vorzuziehen.

## API-Vertrag

Alle Endpunkte ermitteln den User aus der verifizierten Session; eine frei übergebene User-ID ist nicht autoritativ.

### Katalog

`GET /api/v1/apps/catalog`

Filtert serverseitig nach Audience, Scope, Capability, Mandant, Status und Installationsrichtlinie.

Antwort:

```json
{
  "schema_version": "1.0",
  "catalog_version": "2026-07-22.1",
  "apps": [],
  "evidence_at": "2026-07-22T00:00:00Z"
}
```

### Installation

`POST /api/v1/apps/{app_id}/install`

Header: `Idempotency-Key`

Der Server prüft Manifest, Status, Signatur/Checksum, erlaubte Audience und erforderliche Capabilities. Gespeichert werden nur Manifest-ID, Version, User-Scope, gewünschte Oberfläche und Audit-Receipt.

### Deinstallation

`DELETE /api/v1/apps/{app_id}/install`

Entfernt die nutzerspezifische Verknüpfung. Der Dienst, seine Daten und System-Defaults werden nicht gelöscht.

### Installationszustand

`GET /api/v1/apps/installations`

Liefert die wirksamen System-Defaults und nutzerspezifischen Installationen samt Version und Health-Ampel.

## Desktop-Boot

1. Statische Public-Desktop-Links als sicheren Bootstrap laden.
2. Nach Authentifizierung den erlaubten Katalog abrufen.
3. Signatur/Checksum und Schema prüfen.
4. Installationen mit lokalem IndexedDB-Dateisystem abgleichen.
5. Fehlende oder aktualisierte Verknüpfungen atomar materialisieren.
6. Entfernte User-Apps reversibel ausblenden.
7. Fehler als Rot/Unbekannt zeigen; niemals Erfolg simulieren.

## Sicherheitsgrenzen

- Keine Provider- oder Plattform-Keys im Manifest, Browser-State oder IndexedDB.
- Installation ist keine Capability-Vergabe.
- Modulaktionen laufen über Backend-Gateway beziehungsweise freigegebene n8n-Workflows.
- `head_of_module_agent` ist eine Routing-Identität, kein Admin-Token.
- Interne Apps erscheinen nur für passende Audience und Scope.
- `health_url` darf keine sensitiven Daten liefern.
- Externe Manifest-URLs werden nicht ungeprüft als Code ausgeführt.
- Jede Änderung erzeugt Audit mit Actor, App-ID, Version, Scope und Correlation-ID.

## Projektanalyse-App

Katalog-ID: `system.project-analysis`

Zweck:

- Repository-/Domain-/Modul-Inventar lesen,
- Dubletten und veraltete Branches sichtbar machen,
- Source-of-Truth-Konflikte erklären,
- Evidence und offene Entscheidungen verlinken,
- Claude/Codex-/NotebookLM-Handoffs aus kanonischen Quellen erzeugen.

Nicht erlaubt:

- Repos automatisch löschen, archivieren, mergen oder umbenennen,
- Produktionsstatus ohne Evidence setzen,
- private Repo-Namen in öffentliche Reports schreiben,
- Project Memory oder Registry still überschreiben.

Aktueller Status: `DOCUMENTED`, nicht installierbar. Aktivierung erst nach belegter UI-Route, Healthcheck, Auth-/Scope-Test und eigenem daedalOS-PR.

## Acceptance Tests

1. Nicht angemeldete Nutzer sehen keine internen Apps.
2. Installation ohne erforderliche Capability endet mit `403`.
3. Dasselbe Idempotency-Key erzeugt keine doppelte Installation.
4. `installable=false` kann nicht installiert werden.
5. Ungültige Manifest-Signatur erzeugt Rot und keine Verknüpfung.
6. Bestehende Public-Desktop-Links funktionieren ohne Registry weiter.
7. Deinstallation einer User-App löscht weder Dienst noch Daten.
8. Raw-Secrets tauchen in API-Antwort, Browser-State, Audit und IndexedDB nicht auf.
9. Ein grüner Healthstatus braucht eine echte, zeitgestempelte Server-Evidence.
10. Projektanalyse trennt öffentliche Aggregate von privaten Detaildaten.
