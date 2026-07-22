# Surface Composer, Desktop OS & Public Architecture v04

## Entscheidung

LICHTREICH besitzt nicht eine einzige Oberfläche für alle Zwecke. Es hat eine gemeinsame Registry und mehrere verständliche Oberflächen, die aus denselben Modulen, Verträgen und Zuständen erzeugt werden.

## Vier Oberflächenklassen

### 1. Public Front Door

`lichtreich.info` und öffentliche Vertical-/Projektseiten erklären Nutzen, Zielgruppen, Module, Preise, Testzugänge, Partner, Mitarbeit, Crowdfunding/Investor, Datenschutz, Impressum und Status.

Public sieht keine interne Infrastrukturkarte und keine unverständliche 2.000-App-Liste. Module werden als verständliche Arbeitswege erklärt, etwa:

```text
Brief kommt an
→ wird lesbar gemacht
→ Fristen und Aufgaben werden vorgeschlagen
→ landet in der richtigen Akte
→ kann mit Quellen befragt werden
```

### 2. Desktop OS

`desktop.lichtreich.info` ist Shell und persönlicher App-Arbeitsplatz:

- Launcher und Universal Search,
- Fenster, Tabs, Favoriten und Layouts,
- installierte Apps je Nutzer,
- File Commander und `lr://`-Mounts,
- Benachrichtigungen, Tasks, Kalender und täglicher Pulse,
- Head-of-Workspace-Dialog,
- App Catalog statt starrer Shortcut-Sammlung.

Apps können `native`, `embed`, `hosted`, `worker`, `connector` oder `reference` sein. Alle Apps sind registrierbar; nur freigegebene Apps sind installierbar.

### 3. Vertical/Project Composer

Eine Subdomain wie `herrkuenstler.lichtreich.info`, `immo.lichtreich.info` oder `gezy.org` ist eine komponierte Fachoberfläche, nicht zwangsläufig ein einzelnes Programm.

Beispiel HerrKünstler:

```text
HerrKünstler Workspace
├── KLARØNAUT / Head of Workspace
├── Werkarchiv / FUNDUSFUNK
├── Social Hub
├── TAKTØR
├── SYNTHÆSE
├── MACAN Rechte/Release
├── Projekte/OpenProject
├── Dateien/Assets
├── Kalender/Termine
├── CRM/Kontakte
└── SZENÆ Public Preview
```

Die Oberfläche zeigt fachliche Navigation und gemeinsame Statuswerte, während die tiefen Tools als Tabs, eingebettete Ansichten oder eigene Fenster geöffnet werden.

### 4. System/Internal Control

`cockpit`, `service`, `setup`, `registry`, `status`, `society`, `orchestra`, `n8n` und Adminansichten sind rollenbasiert. Sie erklären Betrieb, Konten, Connectoren, Workflows, Kosten, Fehler und Freigaben; sie gehören nicht ungefiltert auf die Marketingseite.

## Knotenmodell

Jeder sichtbare Knoten ist eine Registry-Projektion:

```yaml
node_id: string
display_name: string
node_type: module|submodule|app|workflow|workspace|project|role|dataset|view
scope_type: system|organization|project|community|user
scope_id: uuid
parent_node_id: string|null
app_id: string|null
route: string|null
integration_mode: native|embed|hosted|worker|connector|reference
required_capabilities: []
required_roles: []
data_zones: []
status: discovered|linked|integrated|staging|production|conflict
health_ref: string|null
preview_ref: string|null
head_of_module_role: string|null
```

Das gleiche Modul kann an mehreren Stellen erscheinen, ohne dupliziert zu werden. Beispiel: Kalender erscheint in `me`, Projekt, HerrKünstler und Social, bleibt aber derselbe Calendar Service mit unterschiedlichen gefilterten Views.

## Head-of-Module innerhalb der Oberfläche

Jede komponierte Oberfläche besitzt eine zuständige KI-Rolle:

- kennt Manifest, Rollen, Workflows, Datenobjekte und Qualitätsregeln,
- kann mit anderen Head-of-Module-Rollen über Orchestra sprechen,
- darf nur freigegebene Tools und Scopes verwenden,
- zeigt Plan, Kosten, Quellen und Freigabepunkte,
- erzeugt Tasks/Artefakte/Workflowvorschläge statt unsichtbar alles umzubauen.

Beispiel:

```text
„Bereite die Immobilien-Due-Diligence vor“
→ Head of Immo
→ prüft Lead/CRM und Projekt
→ fordert oder findet Excel-/DD-Template
→ legt OpenProject-Struktur und Datenraumvorschlag an
→ delegiert Dokumente an Briefkasten/DMS/Ingest
→ delegiert Finance-/Legal-/Technical-Checks
→ zeigt fehlende Daten, Annahmen, Risiken und nächsten Review
```

## Standard vor Eigenbau

Für grobe Orientierung werden bewährte Standardoberflächen verwendet:

- OpenProject für Arbeit und Termine,
- Excalidraw für freie visuelle Arbeit,
- Funnel-/Board-View für Prozessstadien,
- Kalenderstandard für Zeit,
- File Commander für Pfade und Mounts,
- Metabase für Kennzahlen,
- Registry-projizierte App-Karten für Desktop und Verticals.

Eigene UI wird nur gebaut, wenn sie mehrere Systeme sinnvoll zusammenführt oder eine fachliche Lücke schließt.

## Live-Synchronisation

```text
Registry/Events sind führend
→ Desktop, Vertical Workspace, Cockpit und Public Site abonnieren Views
→ Änderung an App/Status/Projekt erzeugt Event
→ betroffene Projektionen aktualisieren sich
→ Public erhält nur freigegebene Inhalte
→ persönliche Ansichten erhalten nur User-/Delegationsscope
```

Keine Oberfläche schreibt direkt in fremde App-Tabellen. Änderungen laufen über API, Events oder Workflow Contracts.

## Public Content Projection

Public Seiten werden aus freigegebenen Content Objects erzeugt:

```text
Module Definition
+ verständlicher Nutzen
+ Zielgruppe
+ Demo/Preview
+ freigegebener Status
+ Preis/Tier
+ CTA
+ Rechtstexte
→ SEO-/Marketingseite
```

Technische Interna, unverifizierte Claims, Konflikte und Adminlinks bleiben ausgeschlossen.

## Nächster UI-Slice

Nicht 140.000 Apps darstellen. Zuerst eine funktionsfähige Komposition:

```text
Desktop
→ App Catalog
→ installierte Apps
→ Projekt-/Vertical Workspace
→ Head-of-Module Panel
→ Tasks/Kalender/Dateien/Knowledge als gemeinsame Widgets
→ Deep Link in das jeweilige Fachtool
```

Danach kann der App-Katalog beliebig wachsen, ohne den Nutzer mit einer ungefilterten Masse zu überfordern.
