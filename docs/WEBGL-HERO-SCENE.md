# WebGL Hero Experiment

## Szene

**Objekt:** ein schwebender „Shader Reliquary“, eine niedrig aufgelöste Icosaeder-Kapsel als lebender Kern. Die Oberfläche wird im Vertex-Shader durch zwei Wellenfelder und einen Fokusimpuls verformt. Zwei dünne Torusbahnen markieren seine räumliche Umgebung, ein kleiner Partikelring gibt Tiefe ohne ein schweres Modell oder externe Assets.

**Bedeutung:** Der Kern steht für die Verbindung von Struktur und Bewegung. Die Bahnen sind keine Dekoration, sondern eine visuelle Übersetzung von Kontext, Beziehungen und Arbeitsfluss.

## Farben

- **Ink:** tintiges Dunkelblau für Raum und Kontrast.
- **Cyan:** kühles Leuchten für Orientierung und Datenfluss.
- **Coral:** warmer Gegenimpuls für Handlung und Fokus.
- **Acid:** gelbgrünes Signal für aktive Zustände und Fokus-Rim.

Die Shader-Farben bleiben bewusst begrenzt. Kein Farbverlaufstext, keine externen Texturen, keine fremden Assets.

## Interaktion

- **Pointer X/Y:** verändert weich die Gruppenrotation und speist die Pointer-Koordinate in die Oberflächenwellen ein.
- **Click / Pointer down:** toggelt den Fokuszustand. Der Kern expandiert leicht und der Shader verstärkt den Rim-Impuls.
- **Reduced motion:** setzt die zeitbasierte Shaderbewegung und Kernrotation auf null, Pointer-Orientierung bleibt als statische Szene lesbar.
- **Light field:** reduziert Partikel, Geometrieauflösung und Device Pixel Ratio.
- **Keyboard:** Die Szene ist als visuelles Objekt mit verständlicher Beschriftung eingebunden; alle primären Navigations- und Inhaltsaktionen der Seite bleiben außerhalb des Canvas tastaturbedienbar.

## Performance-Limits

- Keine externen 3D-Modelle, HDRIs oder Texturen.
- Ein Shader-Kern mit maximaler Icosaeder-Detailstufe `4` im Full-Modus.
- Zwei einfache Torus-Geometrien.
- Maximal **180 Partikel** im Full-Modus, **90** im Light-Modus.
- Device Pixel Ratio auf **1 bis 1.65** begrenzt, Light-Modus maximal **1.2**.
- Antialiasing bewusst deaktiviert, `powerPreference: high-performance` gesetzt.
- Keine Postprocessing-Pipeline im ersten Schnitt. Bloom, Noise und volumetrische Effekte bleiben außerhalb des ersten Performance-Budgets.
- Keine eigene Render-Schleife außerhalb von React Three Fiber.

## Fallbacks und Grenzen

- Vor dem Canvas wird WebGL-Verfügbarkeit geprüft.
- Bei fehlendem WebGL erscheint eine statische 2D-Darstellung mit `FORM / FLOW`.
- Die vorhandene CSS-3D-Szene bleibt als separate historische Alternative im Repository erhalten, wird aber nicht mehr als primärer Hero gerendert.
- Produktionswerte für FPS, Bundle-Größe und GPU-Auslastung sind noch nicht gemessen und dürfen erst nach lokalem Build und Browserprofiling behauptet werden.
