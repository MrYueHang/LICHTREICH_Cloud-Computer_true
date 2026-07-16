# 🔧 Konsolen-Setup — system-seitig robust verdrahten
> Was in den beiden Admin-Consoles AN muss, damit der Workflow trägt. Zwei Wege je Schritt:
> **[CHROME]** = Claude-in-Chrome klickt es · **[CLI]** = Terminal-Befehl. Stefan macht nur den Login.
> Status ehrlich: nichts hiervon ist bisher konfiguriert — das ist die „halbe Miete", die noch fehlt.

---

## A) Google Cloud / Firebase Console  (Projekt-Nr **148598038525**, europe-west2)
Das schaltet die **AI-Studio-Integrations** frei (Firebase Auth/Firestore, Gmail, Calendar, Drive) → löst Persistenz (#2), Auth (#6), Connectoren.

### Einmal-Voraussetzung (Terminal)
```bash
# gcloud installieren (fehlt aktuell):
brew install --cask google-cloud-sdk
gcloud auth login          # ← interaktiv: als "! gcloud auth login" in der Session tippen
gcloud config set project 148598038525
```

### Schritte (je [CHROME] Web-Console oder [CLI])
1. **APIs aktivieren** — für unsere Integrations:
   `[CLI]` `gcloud services enable firestore.googleapis.com identitytoolkit.googleapis.com drive.googleapis.com gmail.googleapis.com calendar-json.googleapis.com sheets.googleapis.com`
   `[CHROME]` console.cloud.google → „APIs & Services" → jede aktivieren.
2. **Firestore-DB anlegen** (Persistenz-Layer):
   `[CLI]` `gcloud firestore databases create --location=europe-west2`
   `[CHROME]` Firebase → Firestore → „Create database" (Native mode, europe-west2).
3. **Firebase Auth** (eigener Bereich/Login): Firebase Console → Authentication → Google-Provider aktivieren.
4. **OAuth Consent Screen** (das „Enable OAuth manually" aus AI Studio):
   console.cloud.google → „OAuth consent screen" → App-Name „LICHTREICH", Scopes: `drive.file`, `gmail.readonly`, `calendar`, Testnutzer = deine Mail, dann veröffentlichen.
5. **OAuth-Client-ID** (Web): Credentials → „Create OAuth client ID" → Web → Redirect-URIs:
   die run.app-URL + `https://briefkasten.lichtreich.info` + `https://board.lichtreich.info`.
   → Client-ID/-Secret landen in AI-Studio-Integrations bzw. `.env` (Namen kennst du aus Inventar).

**Chrome-KI-Auftrag (Copy für Claude-in-Chrome):**
```
Öffne console.cloud.google.com, Projekt 148598038525. Aktiviere die APIs Firestore, Identity Toolkit,
Drive, Gmail, Calendar, Sheets. Lege eine Firestore-DB (Native, europe-west2) an. Richte den OAuth
Consent Screen ein (App "LICHTREICH", Scopes drive.file/gmail/calendar, Testnutzer stefan@busse.in) und
erstelle eine Web-OAuth-Client-ID mit Redirect-URIs briefkasten/board.lichtreich.info + der run.app-URL.
Zeig mir am Ende Client-ID (Secret NICHT in den Chat, nur bestätigen dass erstellt).
```

---

## B) Anthropic Console  (platform.claude.com)
Das bringt den **system-seitigen Teil des Workflows** (Stefans Kernpunkt: „halbe Workflow gehört hierher, synchron mit Gedächtnis"). Meist API-Features, wenig Klicken.

1. **Workspace-API-Key** anlegen (`.../workspaces/default` → API Keys) → in `.env` als `ANTHROPIC_API_KEY` (hast du schon in briefkasten/.env). Basis für alles Weitere.
2. **Batches** (`/batches`) — Massen-Jobs async, ~50 % günstiger. Nutzen für: 100-md-Sort, Draft-Serien, RAG-Vorverarbeitung. → via API (Message Batches), kein UI-Toggle nötig.
3. **Prompt-Caching** (`/usage/cache`) — großen Kontext (Repo/Product-Truth/RAG) einmal cachen → billige Wiederhol-Calls. → API-Param `cache_control`, Metriken in der Console sichtbar.
4. **Memory-Stores** (`/memory-stores`) — persistentes System-Gedächtnis über Calls hinweg. Kandidat, um lokale MEMORY.md + RAG server-seitig zu spiegeln → Eingriff/Sicht in der Console.
5. **Agents** (`/agents`) — managed Agents server-seitig (statt nur lokale Loops).

**Nächster Schritt hier:** Workspace-Key bestätigen, dann kann Claude-Terminal Batches + Caching in den Loop bauen (spart laufend Token). Memory-Stores/Agents = eigener Evaluierungs-Schritt.

---

## Reihenfolge (Hebel)
1. Google: APIs + Firestore + Auth AN → **AI-Studio-Integrations funktionieren** (größter Unblock).
2. Google: OAuth-Client → Drive/Gmail/Calendar-Connectoren live.
3. Anthropic: Workspace-Key → Batches + Caching in den Loop (Token-Ersparnis system-seitig).
4. Anthropic: Memory-Stores/Agents evaluieren.

→ Danach ist beides „ineinander sichtbar": Studio-Integrations ziehen aus Google, Claude-Loop nutzt Anthropic-Batches/Cache, Gedächtnis synchron.
