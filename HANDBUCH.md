# Dynamisches Handbuch: LICHTREICH Cloud-Computer

Dieses Handbuch basiert nicht auf statischen Texten, sondern auf serialisierten Metadaten der tatsächlichen Workflows. Diese Struktur dient als gemeinsame Quelle für öffentliche FAQs, interne Betriebsdokumentation und maschinenlesbare n8n-JSON-Bibliotheken.

## Standard-Workflow-Struktur

Jeder Workflow im System (z. B. Onboarding-Assistent, RAG-Datenfutter, Vertragsvergleich) folgt dieser Metastruktur. Ein Workflow gilt erst als Produktfunktion ("grün"), wenn er die Happy Paths und Fehlerfälle (Tests) besteht.

### Beispiel: BOB-Briefweg

```json
{
  "slug": "bob-briefweg",
  "title": "Brief von Eingang bis Entwurf",
  "purpose": "Eingehende Post analysieren und in einen bearbeitbaren Entwurf überführen",
  "inputs": [
    "PDF", 
    "Foto", 
    "Scan", 
    "Hinweise/Kommentare/Strategie"
  ],
  "dependencies": [
    "briefkasten", 
    "orchestra", 
    "rag", 
    "mandat", 
    "n8n"
  ],
  "steps": [
    "upload", 
    "ocr", 
    "classify", 
    "strategy", 
    "draft", 
    "finalize"
  ],
  "outputs": [
    "Analyse", 
    "Dossier", 
    "Entwurf", 
    "Final", 
    "Akte"
  ],
  "tests": [
    "mehrseitiges PDF", 
    "Foto-only", 
    "mehrere Teil-Dokumente", 
    "Hinweis-Einspeisung"
  ],
  "known_gaps": [
    "Foto->PDF", 
    "Hinweise ignoriert", 
    "PDF/Druck"
  ],
  "owner": "briefkasten",
  "status": "alpha"
}
```

## Workflow-Katalog (Entwurf)

Die erste öffentliche Menükarte an standardisierten Flows (Pilotworkflows bis zur vollen QA-Freigabe):

1. **BOB-Briefweg** (Status: Alpha) - Dokumentkette von Eingang bis Entwurf.
2. **Vertragsvergleich** (Status: Pilot) - Gegenüberstellung von Vertragswerken mit dem RAG-Layer.
3. **Onboarding-Assistent** (Status: Pilot) - Geführtes Interview für die Mandats- und Rollenanlage.
4. **RAG-Datenfutter** (Status: Live) - Ingest→Embedding-Pipeline für System- und Referenzdokumente.

*Weitere Workflows werden nach dem Prinzip `Status: Pilot` → QA/Doppel-Review → `Status: Live` in dieses Handbuch aufgenommen.*
