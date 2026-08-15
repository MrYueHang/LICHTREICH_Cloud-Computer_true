# LICHTREICH WebGL / Cloud-Computer Orchestrationsreport

**Stand:** 16. August 2026  
**Status:** RESEARCH + PLAN, nicht Produktionsfreigabe  
**Scope:** ITom-Referenzanalyse, LICHTREICH-Übersetzung, WebGL-Welt, Entitäten, Tools, lokale/VPS-MCP-Orchestrierung und Meilensteine

## 1. Kurzentscheidung

Ja, wir sollten jetzt einen Recherche- und Meilenstein-Workflow einrichten, bevor wir weitere visuelle Komplexität bauen. Der nächste sinnvolle Schritt ist kein Production-Build, sondern ein überprüfbarer vertikaler Schnitt:

`Referenz verstehen → LICHTREICH-Kanon mappen → Szene als Weltmodell beschreiben → kleiner 3D-Prototyp → lokale/VPS-Agenten prüfen → unabhängige QA → erst dann Ausbau`.

Die Portfolio-Seite und der WebGL-Hero sind ein **funktionierender Code-Stand im GitHub-Repository**, aber kein verifizierter lokaler Build oder Live-Deployment. GitHub-Dateizugriff ist vorhanden; ein lokaler Terminal-, Browser- und VPS-Dateizugriff ist in dieser Umgebung nicht vorhanden.

## 2. Was an ITom tatsächlich relevant ist

Die Recherche zeigt keine einzelne „magische“ Bibliothek, sondern eine konsequente Experience-Architektur:

- Ein 2D-Papiermoment führt in eine räumliche 3D-Welt über.
- Ein Korridor ersetzt die klassische Seitenliste und führt zu mehreren Räumen.
- Gallery, Studio, Contact und About sind nicht bloß Sektionen, sondern begehbare Inhaltsräume.
- Skizzen, Texturen und farbige Zustände sind Teil der Navigation.
- Scrollen, Zeigen, Klicken und Raumwechsel bilden eine gemeinsame Sprache.
- Die Oberfläche besitzt zusätzlich eine semantische DOM-/SEO-Ebene, damit der Canvas nicht die einzige Informationsquelle ist.
- Die veröffentlichte Architektur nennt React, R3F, Three.js, GSAP, Drei, Postprocessing, adaptive Device-Tiering, Shader-Kompilierung und Performance-Optimierung.
- Das Repository steht unter MIT-Lizenz. Persönliche Assets, Texturen, Bilder und Copy sind laut README nicht zur Wiederverwendung freigegeben.

**Wichtig:** Wir übernehmen keine Assets, Texte, Räume oder identische Dramaturgie. Wir übernehmen nur das Muster „Inhalt wird Raum“.

## 3. Eigenständige LICHTREICH-Übersetzung

ITom erzählt eine Person und ihre Projekte als Galerie. LICHTREICH erzählt ein verknüpftes Arbeitsuniversum als kleinen Stadtteil:

| ITom-Muster | LICHTREICH-Übersetzung |
|---|---|
| Papier reißt auf | Eingang öffnet den Cloud-Computer |
| Korridor | zentrale Kontext- und Navigationsachse |
| Gallery | Projekte, Cases, Module und Ergebnisse |
| Studio | Werkstatt für Build, Code, Prompts, Skills und Experimente |
| About | Herkunft, Prinzipien, Entscheidungen und Rollen |
| Contact | Übergabe, Anfrage, Briefkasten und nächste Handlung |
| Map | sichtbare Karte der Ebenen, Module und Beziehungen |
| Skizzen werden farbig | Konzept wird durch Status, Evidenz oder Interaktion lebendig |

Arbeitstitel der Welt: **LICHTREICH QUARTIER**, nicht als endgültige Produktmarke festschreiben.

## 4. Ebenen, Module und Entitäten als Stadtmodell

### Ebenen

- **Systemebene:** Identität, Registry, Policy, Audit, Datenklassen, Events und Betriebszustand.
- **Arbeitsraumebene:** Projekt, Community, Fachmodul, Akte, Workflow und Kontext.
- **Nutzerebene:** Person, Rolle, Aufgabe, Präferenz, persönlicher Arbeitsraum und Freigabe.
- **Experience-Ebene:** Desktop, Karte, Korridor, Räume, 2D-Fallback und semantische Navigation.

Diese Achsen dürfen nicht zu einer einzigen Hierarchie verschmolzen werden. Ein Projekt ist keine Rolle, ein Agent ist keine Abteilung und eine Karte ist kein System-of-Record.

### Primäre Entitäten

`Person · Organisation · Projekt · Akte · Dokument · Aufgabe · Prozess · Workflow · Agent · Skill · Tool · Modul · Datenprodukt · Event · Entscheidung · Freigabe · Asset · Standort`

### Weltregeln

- Jede Entität erhält eine kanonische ID und einen Owner.
- Jede sichtbare 3D-Entität verweist auf eine fachliche Datenquelle oder ist als `CONCEPT — NICHT IMPLEMENTIERT` markiert.
- Ein 3D-Raum ist eine Projektion, niemals automatisch die Datenwahrheit.
- Module dürfen andere Module aufrufen, aber deren Logik nicht heimlich duplizieren.
- Irreversible, finanzielle, rechtliche, personenbezogene oder produktive Aktionen bleiben außerhalb autonomer 3D-Interaktion.

## 5. Benötigte technische Bausteine

### Erste Ausbaustufe

- React + TypeScript + Vite als bestehender Frontend-Rahmen.
- React Three Fiber + Three.js für die räumliche Szene.
- Drei nur dort, wo Loader, Controls oder Hilfsobjekte wirklich gebraucht werden.
- GSAP oder Motion für DOM-/Scroll-Übergänge, nicht für fachliche Prozesslogik.
- Shader-Materialien für wenige zentrale Zustände, nicht für jede Oberfläche.
- semantische HTML-Navigation parallel zum Canvas.
- zentrale typisierte Content-/Entity-Konfiguration.
- WebGL-, Reduced-Motion- und Light-Mode-Fallbacks.

### Später, nur nach Nachweis

- echte Raumwechsel und Kamerawege.
- Map-/Teleportationsoberfläche.
- progressive Asset-Ladung und Room-Level-of-Detail.
- ggf. Postprocessing, Audio, volumetrische Effekte oder Physik.
- Backend-Adapter für Registry, Dokumente und Agenten.
- lokaler oder VPS-basierter MCP-Gateway mit Allowlist und Audit.

### Geeignete Open-Source-Kandidaten für den Gesamtcomputer

Diese Kandidaten sind Architektur-Shortlist, keine beschlossene Produktwahl:

- **PostgreSQL:** Registry, Read Models und eigene Modul-Daten.
- **Flowable:** BPMN/CMMN/DMN und Human Tasks als offene Prozess-Control-Plane.
- **Temporal:** langlebige technische Orchestrierung und Retry-/Compensation-Logik.
- **NATS JetStream:** schlanker Event-Spine für Pilotgrößen.
- **Keycloak oder ZITADEL:** Identity-Pilot, jeweils mit Lifecycle- und SCIM-Prüfung.
- **OPA und OpenFGA:** Policy- und Beziehungsrechte.
- **OpenProject:** ein möglicher primärer Work-/Project-Anchor, nicht parallel zu mehreren gleichwertigen Systemen.
- **Paperless-ngx:** Intake/OCR, aber nicht automatisch Records Management.
- **GLPI:** ITSM/IT-Asset-Pilot.
- **OpenTelemetry:** technische Observability, kein Ersatz für Fach-Audit.
- **n8n oder Activepieces:** Connector-/Automation-Lane, nicht die fachliche Wahrheit.

## 6. Asynchroner Orchestrationsloop

### Loop A: Research

1. Referenz, Repository oder Dokument read-only erfassen.
2. Stack, Interaktionen, Assets, Lizenzen und Behauptungen getrennt inventarisieren.
3. Fakten, Annahmen, Inspiration und offene Punkte markieren.
4. Ergebnis als Research-Note mit Quellenlinks und Hash/Commitstand speichern.

### Loop B: Canon

1. Referenzmuster auf LICHTREICH-Ebenen mappen.
2. Nicht-Ziele und Lizenzgrenzen dokumentieren.
3. Entitäten, IDs, Owner und Datenquellen festlegen.
4. 3D-Projektionen von fachlichen Wahrheiten trennen.

### Loop C: Build

1. Einen kleinen Raum beziehungsweise eine Szene bauen.
2. Semantische DOM-Navigation parallel implementieren.
3. Content zentral konfigurieren.
4. Light-Mode, Reduced Motion und WebGL-Fallback zuerst mitbauen.
5. Assets lazy laden und GPU-/Bundle-Limits dokumentieren.

### Loop D: Local Agent

1. Lokaler Agent liest Repository und aktuellen Branch.
2. Er erstellt einen kleinen Patch, keine Großmigration.
3. Er führt Install, Typecheck, Build und Smoke Test aus.
4. Er liefert Diff, Testausgabe, offene Risiken und Rückgabe an den Orchestrator.

### Loop E: VPS-MCP Agent

1. VPS-Agent darf nur explizit erlaubte Services und Pfade lesen.
2. Er prüft Deployment, Health, Logs, DNS und Runtime-Evidenz.
3. Produktionsänderungen bleiben hinter einem separaten Freigabegate.
4. Keine Secrets in Chat, Git oder Logs.
5. Jeder Lauf erhält `run_id`, Zweck, Scope, Toolversion, Ergebnis und Abschaltweg.

### Loop F: Independent QA

1. Zweite Instanz prüft gegen Repository, Buildausgabe und sichtbare Runtime.
2. Sie testet Navigation, Tastatur, Reduced Motion, WebGL-Fallback und mobile Breite.
3. Bei Dissens bleibt der Status `CONFLICT` oder `OPEN`.
4. Erst nach QA wird ein Milestone als erledigt markiert.

## 7. Meilensteinfolge

### M0: Corpus und Referenz-Freeze

**Ergebnis:** ITom, LICHTREICH-Repo, Designquellen und vorhandene Dokumente sind mit Status, Lizenz und Beweiskraft erfasst.  
**Stop-Kriterium:** Keine weitere Szene bauen, solange Quelle und Konzept nicht getrennt sind.

### M1: LICHTREICH-Weltmodell

**Ergebnis:** Ebenen, Module, Entitäten, Räume, Datenquellen und Nicht-Ziele sind als Map-Spezifikation beschrieben.  
**Abnahme:** Jede Map-Zone hat Owner, Zweck, Status und semantischen Fallback.

### M2: Navigation-Spike

**Ergebnis:** 2D-Einstieg → 3D-Korridor → zwei Räume → zurück zur Map.  
**Abnahme:** Keyboard-, Touch- und reduzierte Darstellung funktionieren ohne Mauspflicht.

### M3: Shader- und Raumprototyp

**Ergebnis:** ein LICHTREICH-eigenes Kernobjekt mit Raumzustand, Fokus, Pointer-Interaktion und Content-Anker.  
**Abnahme:** Full, Light, Reduced und WebGL-Fallback sind sichtbar unterscheidbar und stabil.

### M4: Entitäten- und Kontextbindung

**Ergebnis:** Projekt, Dokument, Prozess und Agent werden als verknüpfte, aber getrennte Objekte dargestellt.  
**Abnahme:** keine hardcodierte fachliche Wahrheit im 3D-Code.

### M5: Orchestrations-Sandbox

**Ergebnis:** lokaler Agent und VPS-MCP-Agent liefern getrennte Evidenzpakete für denselben kleinen Build-Schritt.  
**Abnahme:** Diff, Test, Laufzeitstatus und Rollbackpfad sind nachvollziehbar.

### M6: Vertical Slice

**Ergebnis:** ein kompletter kleiner Weg, etwa `Dokumenteingang → Kontext → Aufgabe → Ergebnis`, als 2D/3D-Projektion.  
**Abnahme:** Nutzer versteht den Zweck ohne Produkt-Handbuch; keine autonome fachlich wirksame Aktion.

### M7: Report und Entscheidungs-Gate

**Ergebnis:** Report, offene Entscheidungen, Lizenzprüfung, Tool-Shortlist, Kostenklassen und nächste 3 Schritte.  
**Abnahme:** Entscheidung für Ausbau, Vereinfachung oder Abbruch eines Weltteils.

## 8. Entknoten statt alles verbinden

Die Cloud-Computer-Idee wird nur tragfähig, wenn wir Knoten aktiv aus dem ersten Weltmodell fernhalten:

- nicht relevante Legacy-Repositories.
- historische Prompts ohne aktuelle Entscheidung.
- Finanz-, HR-, Gesundheits- und Rechtsmodule ohne aktuellen Pilotbezug.
- experimentelle Agenten ohne Owner, Scope oder Exit.
- doppelte Projekt-, Dokument- oder Workflow-Systeme.
- visuelle Easter Eggs, bevor die Grundnavigation funktioniert.

Die Map zeigt im ersten Prototyp maximal **sechs bis acht aktive Zonen**. Alles andere bleibt im Katalog als `planned`, `reference`, `historical`, `blocked` oder `out of scope`.

## 9. Was Stefan jetzt liefern muss

**Noch nichts nachwerfen.** Der vorhandene Kontext reicht für M0/M1. Erst wenn ein konkreter Widerspruch nicht entscheidbar ist, brauchen wir gezielt eine Datei, ein Repo oder einen kurzen Ausschnitt.

Für den nächsten lokalen Lauf werden später gebraucht:

- lokaler Repo-Pfad oder ZIP des aktuellen Branches.
- Node-/npm-Version.
- Ergebnis von `npm install`, `npm run lint` und `npm run build`.
- optional ein Browser-Screenshot oder kurze Screenaufnahme.
- VPS-/MCP-Informationen nur über sichere, redigierte Statusdaten, niemals Secrets.

## 10. ZIP und Build-Status

Eine ZIP des vollständigen Repositories kann ich aus dieser Umgebung nicht verlässlich erzeugen, weil ich keinen lokalen Checkout und kein Archivierungs-/Downloadwerkzeug für das gesamte GitHub-Repo habe. Die Änderungen liegen einzeln im Repository; für eine saubere ZIP sollte lokal oder in GitHub der Commitstand archiviert werden.

Der aktuelle Lockfile-Stand ist **nicht synchron** zu den später ergänzten R3F-/Three-Abhängigkeiten. Das ist kein inhaltlicher Designfehler, aber vor einem Build muss lokal `npm install` laufen und der aktualisierte Lockfile committed werden.

## 11. Nächste Entscheidung

Empfehlung: Jetzt **eine Research-/Milestone-Klammer mit M0 bis M7** als ClickUp-Parent plus Subtasks anlegen und parallel diesen Report als Kanon-Entwurf nutzen. Noch keinen Production-Build, keine ZIP-Behauptung und keinen VPS-Deploy.
