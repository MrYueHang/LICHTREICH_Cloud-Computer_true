# Desktop Head-of-Module Execution v01

**Status:** `CLIENT_IMPLEMENTED_IN_DRAFT_PR / PRODUCTION_NOT_MERGED`  
**Shell:** `desktop.lichtreich.info` / `MrYueHang/daedalOS`  
**Native registry:** `registry/daedalos-native-capabilities.v01.json`  
**Command schema:** `schemas/desktop-command-receipt.v01.schema.json`

## Ergebnis der Quellprüfung

daedalOS ist kein leerer Link-Desktop. Der reale Prozesskatalog enthält 32 registrierte Prozesse:

- 27 nutzbare Apps,
- 5 Systemdialoge,
- Datei- und URL-Start über `/?app=<process_id>&url=<argument>`,
- interner Start über `useProcesses().open(process_id, { url })`.

Darunter sind bereits File Explorer, Browser, PDF, TinyMCE, Marked, Monaco, Terminal, Paint, Photos, Video Player, Webamp, Messenger, lokale Stable Diffusion sowie mehrere WASM-Emulatoren.

Die oft genannte Größenordnung von rund 140.000 GitHub-Projekten ist dagegen ein **Quell- und Kandidatenpool**, kein installierter App-Bestand. Ein Repository wird erst nach Lizenz-, Sicherheits-, Build-, Rechte- und Integrationsprüfung zur LICHTREICH-App.

## Bereits vorhandene lokale KI

Der Taskbar-AI-Code besitzt zwei lokale Ausführungspfade:

1. Chrome Prompt API, wenn sie im Browser verfügbar ist.
2. WebLLM mit `DeepSeek-R1-Distill-Llama-8B-q4f32_1-MLC` als Browser-/WebGPU-Fallback.

Zusätzlich läuft die vorhandene Stable-Diffusion-Funktion lokal im Browser. Für diese lokalen Pfade werden keine OpenAI-, Anthropic- oder Gemini-API-Tokens verbraucht. Der Preis ist ein großer erster Modelldownload, GPU-/RAM-Bedarf und je Gerät unterschiedliche Geschwindigkeit.

Der geprüfte Ausgangscode verwendete nur den statischen Systemprompt:

```text
You are a helpful AI assistant.
```

In `MrYueHang/daedalOS` PR #2 ist Slice A inzwischen implementiert:

- sechs auswählbare Modulrollen mit getrenntem Systemprompt,
- 27 native daedalOS-Prozesse in einer festen Allowlist,
- 23 kanonische LICHTREICH-Module in einem festen URL-Katalog,
- `/apps`, `/modules`, `/module <id>`, `/open` und `/help`,
- ausschließlich sichtbare, reversible Öffnungsaktionen,
- keine Ausführung freien Modelltexts, keine Shellbefehle, keine Secrets.

Capability-Receipts, zentrale Identität und schreibende Modulaktionen bleiben Slice B/C und sind nicht als produktiv behauptet.

## Zielbild

```text
User / Voice / Datei
        ↓
Desktop AI Surface
        ↓
Head-of-Module Profile
Rolle · Scope · Regeln · erlaubte Prozesse · Datenklasse
        ↓
AI erzeugt Vorschlag, niemals Direktbefehl
        ↓
Control Plane prüft Capability und erzeugt Command Receipt
        ↓
Desktop validiert Schema · Ablaufzeit · Checksum · Prozess-Allowlist
        ↓
useProcesses().open(process_id, { url })
        ↓
App öffnet sichtbar im daedalOS-Fenster
```

Der Head of Module arbeitet damit **im** Desktop und kann eine erlaubte App sichtbar öffnen. Er erhält aber weder Adminrechte noch Secrets und darf keine Modellantwort als JavaScript oder Shellbefehl ausführen.

## Rollenaufteilung

### Local Desktop AI

- Navigation, Zusammenfassung lokaler Dokumente, einfache Entwürfe.
- Modulprofil und erlaubte Prozessliste im Prompt.
- Keine externe Wirkung ohne Receipt und Gate.
- Fallback, wenn Provider nicht erreichbar oder nicht gewünscht ist.

### Orchestra / Provider Router

- große Kontexte, anspruchsvolle Fachanalyse, Multimodalität und Verifikation.
- Budget-, Modell- und Datenschutzrouting.
- Nutzer- oder Plattform-Key nach Provider Policy.

### Head of Module

- Fachregeln, Qualitätskriterien, Scope und Tool-Allowlist.
- erzeugt Plan und Aktionsvorschläge.
- besitzt keinen Provider-Key und kein pauschales Desktop-Adminrecht.

### Desktop Process Adapter

- führt nur gültige, nicht abgelaufene Receipts aus.
- öffnet registrierte Prozesse und erlaubte Argumente.
- meldet Ergebnis oder Fehler als Evidence zurück.

## Minimaler Command-Satz v01

| Action | Prozess | Verhalten | Gate |
|---|---|---|---|
| `open_process` | Registry-Prozess | App ohne Argument öffnen | bei lokaler Navigation optional |
| `open_url` | ausschließlich `Browser` | freigegebene HTTPS-URL öffnen | externe Domain nach Policy |
| `open_file` | passender Viewer/Editor | vorhandenen IndexedDB-/Mount-Pfad öffnen | Schreibmodus braucht Bestätigung |
| `reveal_path` | `FileExplorer` | Dateiordner sichtbar machen | read-only möglich |

Noch nicht enthalten: Terminalkommandos, Git-Push, Upload, E-Mail, Publishing, Löschen, Rechteänderung oder Secretzugriff. Diese Aktionen bleiben Backend-/n8n-/MCP-Workflows mit eigenem Vertrag.

## Setup-Assistent

Der Einrichtungsassistent muss nicht tausende Tools auf einmal anbieten. Er arbeitet in drei Ebenen:

1. **System-Basis:** Browser, File Explorer, PDF, Editor, Terminal, AI Surface.
2. **Modulpaket:** z. B. TAKTØR, Social, Legal, Immobilien oder System Registry.
3. **Optionale Fremdtools:** erst nach Registry-/Lizenz-/Health-Prüfung installieren.

Pro Modulpaket zeigt der Assistent:

- Head-of-Module-Rolle,
- installierte/fehlende Apps,
- lokale oder Provider-KI,
- benötigte Connectoren,
- Datenklasse und Speicherziel,
- Rechte und externe Wirkungen,
- Teststatus und Kostenpfad.

## Implementierungsslices

### Slice A - lokale, reversible Basis — implementiert in Draft-PR #2

- Native Capability Registry im Control Plane bereitstellen.
- Head-Profil im Desktop auswählbar machen.
- Systemprompt dynamisch aus lokalem, versioniertem Profil bilden.
- deterministische `/apps`, `/modules`, `/module`, `/open`- und `/help`-Navigation ohne LLM-Ausführung.
- ausschließlich read-only/open-Aktionen.

### Slice B - autorisierte Receipts

- `GET /api/v1/desktop/capabilities`.
- `POST /api/v1/desktop/commands/propose`.
- signiertes/checksummengeprüftes Receipt.
- Client-Validator und Ablaufzeitprüfung.
- Audit mit Actor, Scope, Head, Prozess und Ergebnis.

### Slice C - Modulaktionen

- n8n/MCP-Aktionsverträge pro Modul.
- Human Gate für Schreiben und Außenwirkung.
- Result Receipt zurück in Work Chat und Knowledge Registry.

## Definition of Done für Slice A

1. Prozessnamen kommen aus der geprüften Registry, nicht aus freiem Modelltext.
2. Modulwechsel startet eine neue lokale AI-Session mit sichtbarer Rolle.
3. `/open PDF /Users/.../datei.pdf` öffnet genau den PDF-Prozess.
4. Unbekannte Prozesse und fremde URL-Schemes werden abgelehnt.
5. Ohne Control Plane funktioniert die bisherige Desktop-Basis weiter.
6. Kein API-Key, Cookie oder Secret gelangt in Prompt, Receipt oder IndexedDB.
7. Tests decken Allowlist, Scope, abgelaufene Receipts und Bestätigungspflicht ab.

## Harte Einordnung

Der technische Kern ist bereits vorhanden. Es fehlt keine neue Desktop-Plattform, sondern eine kleine, überprüfbare Brücke zwischen Modulrolle, lokaler/remote KI, Capability Registry und der vorhandenen `open()`-Funktion. Genau dort wird weitergebaut.
