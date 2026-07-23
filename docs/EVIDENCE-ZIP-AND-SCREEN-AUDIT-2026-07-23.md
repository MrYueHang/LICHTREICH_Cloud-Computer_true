# Evidence ZIP and Screen Audit - 2026-07-23

**Status:** `CURRENT EVIDENCE DELTA`  
**Authority:** `docs/SOURCE-OF-TRUTH-v04.md`

## Geprüfte Pakete

| Datei | SHA-256 | Ergebnis | Einordnung |
|---|---|---|---|
| `LICHTREICH_Cloud-Computer_true-main.zip` | `8ad73d81971b6aff4219ae14e81140666cefd2145f41c2fc33e0ea52bc69b625` | 39 Einträge, ZIP/CRC fehlerfrei | `SUPERSEDED_REFERENCE`; Snapshot vom 2026-07-16, ersetzt durch aktuellen Repo-Stand und Control Plane v04 |
| `MSJUEHANG_CREATIVE-SOCIETY_MASTER-ARTIFACT_v01(1).zip` | `1dd71cd0fc387d95f0f307f52ea875fb6927f9d524715091f3819c792b75afc1` | 21 Einträge, ZIP/CRC fehlerfrei | `CURRENT_DOMAIN_REFERENCE`; vertiefende Bibliothek unter Canonical Memory v10, kein Produktiv-Deployment |

## Was im alten LICHTREICH-ZIP tatsächlich steckt

- Vite/React-Landingpage,
- README, Handbuch, TODO und Sync-Report,
- Workflow-Schema und `bob-briefweg`-Instanz,
- vorbereiteter RAG-Ingest-Text,
- keine lauffähige Control-Plane-API,
- kein Desktop-Installer,
- kein Head-of-Module-Client,
- keine produktive n8n-Workflowbibliothek.

Der Snapshot ist als Historie brauchbar, seine Live-Aussagen sind aber nicht mehr autoritativ. Insbesondere dokumentiert `_SYNC-REPORT.md`, dass `ingest.lichtreich.info/api/health` und `/api/ingest` damals `404` lieferten. Das widerspricht pauschalen `live`-Labels im damaligen README und auf der Landingpage.

## Geprüfte Screens

### Landingpage

Datei: `LANDING.00.screencapture-lichtreich-info-2026-07-16-13_39_05.PDF`  
SHA-256: `eea5447878ce161ec5ef5ec59ca09a2588b7c8fb31ffd319c237977cd9e82e08`  
Umfang: 11 Seiten, visuell gerendert und geprüft.

Stärken:

- klare Bauhaus-/Brutalismus-Identität,
- starke Prozessdarstellung,
- Module, Head of Board, Zielgruppen, Connectoren und Preislogik sind visuell verständlich,
- gute Wiedererkennbarkeit und klare Typohierarchie.

Harte Fehler:

1. `Modules.tsx` nennt `briefkasten` live, die spätere Statusmatrix nennt es beta.
2. `rag/ingest` wird live dargestellt, obwohl der ältere Sync-Report 404 dokumentiert und keine aktuelle API-Evidence im Snapshot liegt.
3. `SYSTEM LIVE ALPHA` vermischt Systemerreichbarkeit und Funktionsreife.
4. Ein erreichbarer Link wird visuell wie eine getestete Produktfunktion behandelt.
5. Der reale Desktop als zentrale Shell ist im ersten Entscheidungsweg nicht sichtbar genug.

Erforderliche Statusdimensionen:

| Dimension | Bedeutung |
|---|---|
| `ROUTE` | Domain/Link erreichbar |
| `UI` | Oberfläche rendert |
| `API` | Backend-Health und Kernroute geprüft |
| `WORKFLOW` | Happy Path plus Fehlerfall geprüft |
| `RIGHTS` | Scope, Rollen und negative Tests geprüft |
| `LIVE` | alle für das Modul verpflichtenden Dimensionen grün |

Empfohlene öffentliche Reihenfolge:

```text
Hero + Desktop öffnen
→ Kernprozess
→ belegter IST-Status
→ Desktop/Head of Board
→ Module und Alltagswerkzeuge
→ Zielgruppen/Gold Cases
→ Connectoren
→ Preis/Freigabeweg
→ FAQ/Rechtliches
```

### daedalOS / GitHub

Datei: `screencapture-github-MrYueHang-daedalOS-2026-07-23-00_31_08.pdf`  
SHA-256: `3a528fd7743aa7396f84fcbef5a5e3a087101ac2e691b012af70a46caaa03972`  
Umfang: 5 Seiten, visuell gerendert und gegen den Quellcode geprüft.

Ergebnis:

- `MrYueHang/daedalOS` ist bereits ein Fork; ein weiterer Fork-Klick war nie erforderlich.
- README und `contexts/process/directory.ts` belegen 32 Prozesse, davon 27 nutzbare Apps.
- Die 140.000 GitHub-/Hacktoberfest-Repositories sind kein installierter OS-App-Katalog.
- Der Desktop besitzt bereits lokale KI-Pfade, aber noch keinen Modul-/Capability-Contract.

### GitHub Actions

Bilddateien:

- `Bildschirmfoto 2026-07-23 um 00.25.55.png` - SHA-256 `10ad0c1f7a23fc7a30ad7eb1ff923dd648f6a7e0ede466e04dc9d0a4ead450e4`
- `Bildschirmfoto 2026-07-23 um 00.29.40.png` - SHA-256 `3d268bbc67b0c16b3afe7f94d136a68e35a0890884f2375f00519cf7d7c094e7`

Ergebnis:

- Actions sind aktiviert; drei Läufe waren sichtbar.
- Zwei graue Läufe wurden durch `cancel-in-progress` korrekt abgebrochen.
- Der rote Lauf scheiterte nicht am OS, sondern am zu frühen ESLint vor Erzeugung der `public/.index/*.json`-Dateien.
- Fix-Commit `1d0aba72e7f6c45527f7e3188d80f2f6ca9e5795` erzeugt die Runtime-Indizes vor ESLint.

### Briefkasten / BOB

Vier valide Screenshot-PDFs zeigen echte UI-Flächen für Aktenübersicht, Feststellungsbescheid, Strategie und Dokumentansicht. Sie sind visuelle Produkt-Evidence, aber kein Beweis für Backend-, Rechte- oder End-to-End-Funktion.

`screencapture-briefkasten-lichtreich-info-2026-06-30-00_14_59.pdf` ist technisch beschädigt: ungültige XRef-/Trailer-Struktur. Die anderen Screens bleiben nutzbar; die defekte Datei wird nicht als unabhängige Evidence gezählt.

## Konsequenz

1. Kein weiterer Fork-Schritt.
2. daedalOS bleibt Shell; kein zweites Desktop-System.
3. Native Apps werden als Capability Registry erfasst.
4. Head-of-Module-Aktionen laufen nur über geprüfte Command Receipts.
5. Landingpage trennt Erreichbarkeit, UI, API, Workflow und Rechte.
6. Alte ZIPs bleiben Evidence, werden aber nicht mehr als aktive Produktwahrheit geladen.
