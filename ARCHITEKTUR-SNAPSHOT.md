# Architektur-Snapshot — 4 Ebenen, die existieren aber nicht verbunden sind
> Stefans strategische Einordnung (16.07). Der Loop läuft an 3 unverbundenen Orten.

| Ebene | Ort | Rolle | Zustand |
|-------|-----|-------|---------|
| **Vision/Spec** | claude.ai-Artefakte | was sein soll (Schaubild, Handbuch, Pipeline-Status, Landing) | Kopf/Idee |
| **Orchestrierung/Monitoring** | n8n Cloud-Computer Live-Karte | weiß was lebt (Puls alle 5 Min, Organe real) | Rückgrat |
| **Ausführung** | n8n Brief-Weg + RAG | tut die Arbeit (Doku-Pipeline, Wissen/Memory/Reranker/Query) | Muskel |
| **Präsentation** | board.lichtreich.info | zeigt Zustand | nur DEMO-Daten, keine echte Quelle |

**Kern:** Teile sind einzeln echt, aber nicht verdrahtet → fühlt sich „angedeutet" statt „fertig" an.
(Bestätigt durch n8n-Check: Webhooks `warteliste`/`bob-briefweg` = 404, existieren nicht.)

## Kernlücken nach Hebelwirkung → Phasen-Mapping
1. **Board ↔ n8n** — Health/Projektstatus fließt nicht ins Board (bleibt DEMO). → Phase 1/4, höchster Hebel.
2. **Persistenz** — Whiteboard-Anordnung verschwindet, kein DB-Layer (Neon nur „andockbar"). → Phase 4.
3. **Branchen-Sub-Module** — Labels ohne Workflow-Trigger, Brücke zu n8n-Flows fehlt. → Phase 3/5.
4. **Brief-Weg-Bugs** — OCR ignoriert Fotos, Hinweise nicht in Strategie-Stufe (#1,#2). → Phase 3, blockt Skalierung.
5. **Entscheidungs-Instanz** — Stufe „Assistent/Entscheiden" nirgends als eigene Logik; Mensch routet manuell. → Phase 3/4.
6. **Auth/Rollen** — Board-API offen, keine Zugriffskontrolle. → Phase 2, vor Multi-User.

## Empfehlung (höchster Hebel zuerst)
**Lücke 1 (Board↔n8n)** macht aus „angedeutet" → „fertig": Board zieht echte Daten aus api/n8n statt DEMO.
Danach 4 (Bugs, sonst skaliert Müll), dann 6 (Auth) vor Multi-User.
