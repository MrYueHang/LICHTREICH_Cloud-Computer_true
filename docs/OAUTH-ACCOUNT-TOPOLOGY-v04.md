# OAuth & Account Topology v04

## Kurzentscheidung

Nicht 300 Google-Cloud-Projekte und nicht ein OAuth-Client pro Subdomain.

LICHTREICH verwendet einen zentralen Connector-/Consent-Broker. Module fragen Fähigkeiten an; der Broker verwaltet OAuth-Clients, Scopes, Tokens, Widerruf und Status.

## Empfohlene Projektgrenzen

```text
Google Cloud
├── lichtreich-dev
├── lichtreich-staging
└── lichtreich-prod
```

Optional später getrennte Projekte nur bei echter Vertrauensgrenze:

- andere juristische Organisation/Marke,
- vollständig eigener Betreiber/Tenant,
- abweichende Consent-/Privacy-Dokumente,
- isolierte Hochrisiko-/Health-Umgebung,
- getrennte Abrechnung/Quota/Incident-Domain.

Eine Subdomain, ein Modul oder ein Vault allein erzeugt kein neues Google-Cloud-Projekt.

## Clients innerhalb eines Projekts

Pro Plattformtyp ein eigener OAuth-Client, nicht pro Modul:

- Web Server Client: zentraler Callback auf `auth.lichtreich.info` oder `service.lichtreich.info`.
- Local Development Web Client: localhost-Redirects.
- Native/Desktop Client: nur wenn später eine echte native App entsteht.
- Mobile Clients: je Plattform erst bei tatsächlicher App.

Mehrere Module derselben logischen Anwendung können im selben Cloud-Projekt organisiert werden. Der zentrale Callback nutzt `state`/PKCE und eine serverseitige Pending-Grant-Registry, um Nutzer, Scope und anforderndes Modul wieder zuzuordnen.

## Zentrale Route

```text
Modul verlangt capability: google.drive.read_selected
→ Connector Broker prüft vorhandenen Grant
→ falls nötig Kontext-Erklärung und inkrementeller Consent
→ Google OAuth
→ zentraler Callback
→ Token serverseitig verschlüsselt speichern
→ credential_ref + gewährte Scopes an Modul
→ Modul ruft Broker/API-Adapter, nie Raw Refresh Token
```

## Beispiel-Fähigkeiten

```text
google.identity.login
google.drive.read_selected
google.drive.write_selected
google.gmail.read_selected
google.gmail.send
google.calendar.read
google.calendar.write
```

Briefkasten, Social, Projekte oder File Commander besitzen keine eigenen Raw-Tokens. Sie erhalten capabilities über den Broker.

## Incremental Authorization

Scopes werden erst angefragt, wenn der Nutzer die Funktion auswählt:

- Login benötigt keine Drive-/Gmail-Vollmacht.
- Drive wird beim Verbinden eines Ordners angefragt.
- Gmail-Lesen und Gmail-Senden bleiben getrennte Fähigkeiten.
- Kalender-Lesen und Kalender-Schreiben bleiben getrennt.
- abgelehnte Scopes deaktivieren nur die betroffene Funktion.

## Datenmodell

```yaml
connector_account:
  id: uuid
  owner_scope_type: system|organization|project|community|user
  owner_scope_id: uuid
  provider: google
  environment: dev|staging|prod
  credential_ref: secret-store-pointer
  granted_scopes: []
  capabilities: []
  status: connected|partial|expired|revoked|error
  expires_at: timestamp|null
  last_tested_at: timestamp|null
  last_error_code: string|null
  consent_version: string
```

## Vaults und Projekte

Ein Health-, Legal-, Wallet- oder persönlicher Vault erhält:

- eigenen Daten-/Verschlüsselungs-/RAG-Scope,
- eigene Rollen und Freigaben,
- gegebenenfalls einen eigenen Connector-Account,
- aber nicht automatisch ein eigenes Google-Cloud-Projekt.

Beispiel: Ein Nutzer kann zwei Google-Drive-Verbindungen besitzen — privat und Firma — innerhalb derselben LICHTREICH-OAuth-Anwendung. Die Trennung erfolgt über Connector Account, Scope und Mount, nicht über 300 OAuth-Projekte.

## Ausnahmen

Ein separates Cloud-Projekt ist sinnvoll, wenn ein externer Kunde seinen eigenen Google-OAuth-Brand, seine Verifizierung, Quotas und Incident-Verantwortung kontrolliert. Das ist Enterprise/BYO-OAuth, nicht Standard-Freemium.

## P0-Sicherheitsregeln

- Client Secret, Refresh Token und Access Token niemals in Browser-State, Firestore-UI-State, Logs oder RAG.
- Callback und Token-Exchange serverseitig.
- exakte Redirect URIs; keine Wildcard-Callbacks.
- minimale, inkrementelle Scopes.
- Revocation, Reconnect und Connector-Export/Löschung.
- environment-getrennte Clients und Secrets.
- Audit: Nutzer, Scope, Consent-Version, Aktion und Ergebnis; niemals Tokenwert.
