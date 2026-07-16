# LICHTREICH Cloud-Computer – Deep-Research-Briefing

## 1. Executive Summary  
Der **LICHTREICH Cloud-Computer** ist eine modulare Plattform, die KI-Agenten, Workflow-Automation und digitale Aktenverwaltung zu einem virtuellen Projekt- und Organisationsbetriebssystem verknüpft. Er richtet sich an komplexe Anwenderprozesse (Verwaltung, Legal, Immobilien, Kreativprojekte u.v.m.) und fasst diese in **Subdomain-Services** zusammen (z.B. ein KI-gestützter Posteingang “Briefkasten”, semantische Wissenssuche, Mandatsverwaltung, n8n-Workflows usw.). Im Freemium-Modell kann jeder sofort starten (Gratistarif mit externen Gratis-LLMs), während „Basis“ (~9 €/Monat) und „Pro“ (~29 €/Monat) zusätzliche Features, Kontingente und Integrationen (z.B. Private Keys, Drive- oder E-Mail-Zugriff) bieten. Wichtig ist: **Bring-Your-Own-Key** (BYOK) wird unterstützt (Nutzer können eigene LLM-Keys einbinden), um Kosten zu minimieren. Technisch nutzt LICHTREICH Google-SSO (teilweise schon live), Rollen-Scopes und ein RAG-System für KI-Unterstützung (weitere KI-Frameworks wie Claude Code im Hintergrund). 

Die Plattform ist nicht nur ein AI-gestützter Chatbot, sondern ein **digitaler Projektcockpit**. Sie hilft bei “trockenen” Aufgaben wie Dokumentenmanagement, Due-Diligence, Audit-Reports und Terminkoordination. So können z.B. ein Projektauftrag automatisch in Akten überführt, per OCR analysiert, relevante Informationen in einer Wissensdatenbank (RAG) gespeichert und über automatisierte Workflows (n8n) zusammengeführt werden. Dies soll Routinen entlasten und Entscheidungsträgern den Fokus auf kreative Lösungen erlauben. Studien zeigen, dass integrierte, anwendungsübergreifende digitale Arbeitsplätze Produktivität und Zusammenarbeit deutlich steigern. 

**Lage:** Viele Bausteine sind bereits implementiert: Google-OAuth, Rollenverwaltung, Speichern von Chat-Kontext, OCR/Briefkasten-Workflow und ein RAG-System mit inzwischen ~1700 Vektoren (Stand 07/2026) sind vorhanden. Offene Punkte sind u.a. die vollumfängliche SSO-Session über alle Subdomains (aktuell teils ungelöst, teils in Arbeit), IMAP-Mailanbindung (noch OAuth-Hürde) und ein paar Branding-/Landingpage-Details (z.B. `herrkuenstler.lichtreich.info` trägt noch Platzhalter-Titel). 

**Ergebnisse & nächste Schritte:** Dieses Dokument fasst in Form einer Landingpage-Vorlage, FAQ und Arbeitsplänen alles Relevante zusammen. Für den Launch empfohlen sind: klare Produktpositionierung (s. Varianten unten), eine ansprechende Landingpage (Kreise/Dreiecke/Quadrate im Bauhaus-Stil), validierte Preise und einfahrbare Test-User- sowie Affiliate-Funnel. Außerdem sollten Prioritäten gesetzt werden: z.B. vor Markteintritt RAG-Permissons prüfen, offene Auth-Fragen klären, und vertrauliche Daten nur in geschützten Vaults verarbeiten. Abschließend zeigt eine Evidence-Matrix, welche Claims schon belastbar sind (basierend auf internen Dokumenten und Benchmarks) und wo noch Verifikation nötig ist.

## 2. Produktdefinition (3 Varianten)  
- **Nüchtern/geschäftlich:** LICHTREICH ist ein **KI-gestütztes Cloud-OS** für Projekte und Verwaltung. Es bietet modulare Web-Tools (Dokumenten-Akten, semantische Suche, Ticketing, Rollenmanagement, Workflow-Automation) unter einer einheitlichen Oberfläche. Alle Dienste sind über einen zentralen Login erreichbar. Nutzer können LLM-Keys mitbringen oder auf Gratis-Modelle zurückgreifen. So lassen sich komplexe Workflows (z.B. Projektbriefings, Due Diligence, Mandatsführung) automatisiert abwickeln. Die Plattform richtet sich an Kanzleien, Projektentwickler, Kreativ- und Verwaltungsbüros, die viele Dokumente, Akten und Abläufe koordinieren müssen.  
- **Visionär/kreativ:** LICHTREICH ist das **digitale Gehirn** für Ihr Projekt – eine intelligente *KI-Gesellschaft* in der Cloud. Stellen Sie sich vor: Ihr gesamter Schriftverkehr, alle Meetings, Verträge und Ideen wohnen in einem virtuellen Bauhaus der Information. Jedes Modul (“Kreis”, “Dreieck”, “Quadrat”) übernimmt einen Teil – Briefkasten für Post, RAG als Gedächtnis, BOB als juristische Intelligenz, ein Orchester orchestriert die Agenten. Alles kommuniziert über einen einzigen Login – und Sie steuern mit Leichtigkeit komplexe Bauprojekte, Filmproduktionen oder internationale Handelspartnerschaften. Das System lernt mit (RAG-Wissen), schlägt proaktiv Termine vor und formuliert Dokumente. Hier lebt Zukunft: Ein persönliches OS, das Projekte denkt und erledigt, noch bevor Probleme aufkommen.  
- **Investorentauglich:** LICHTREICH adressiert einen großen B2B-Markt: Unternehmen verschwenden bis zu **20–30 %** ihrer Zeit auf Administration und Wissenssuche. Mit unserer Plattform bündeln wir Produktivitätssoftware, DMS und AI-Dienste zu einem **integrierten Cloud-Computer**, der monatliche Erlöse über Freemium-Subscriptions, Enterprise-Lizenzen und Integrationsservices generiert. Technologisch setzen wir auf Open-Source-KI (Claude, RAG, n8n) und bewährte Cloud-Architektur (Docker/MCP/SSO). Die Vision: ein neues Betriebssystem für das digitale Zeitalter. Traktion: Bereits implementierte Module und eine aktive Community (interner Proof-of-Concept mit 1700+ Wissens-Vektoren). Nächste Meilensteine sind Markteintritt mit klaren Preisen, Erreichen von 100 Testkunden und Ausbau des Partnernetzwerks. Risiken wie Daten-Compliance sind durch modulare Sicherheitszonen adressierbar, und die Investition fördert Wachstum durch klare Up-/Cross-Selling-Pfade (z.B. KI-Addons, Whitelabel-Lösungen).

## 3. Zielgruppen & Personas  

| Persona (Segment)             | Schmerzpunkte                             | Nutzenversprechen                   | Einstiegspfad und relevante Module         |
|-------------------------------|-------------------------------------------|-------------------------------------|--------------------------------------------|
| **Privatpersonen / Hobbynutzer**  | Chaos durch E-Mails/Papiere, Termine vergessen, kein Überblick über Dokumente und To-Dos. | Ein persönlicher Assistent: Ordnet Briefe/Scans, erinnert an Fristen, beantwortet Behördenfragen automatisch. | **Landingpage-CTA** “Mein digitaler Posteingang”; relevante Module: Briefkasten (OCR-Scan eigener Dokumente), RAG-Wissen (eigene Notizen speichern), n8n-Workflows (aufgabenorientierte Automatisierung). |
| **Kanzleien / Legal-Tech-Büros** | Hohe Aktenlast, Deadlines und Compliance, teure Spezialsoftware, fehlende Automatisierung. | Vollautomatisierte DMS und Due-Diligence: alle Mandate an einem Ort, KI-hilft bei Zusammenfassungen und Checks, SSO für Mitarbeiter. | **Produktdemo** rechtliches Cockpit; Module: Briefkasten (juristische Aktenverwaltung), Mandat (Rollen/Zugriffe, Mandantenakte), RAG (Wissen über Gesetze/Entscheidungen), n8n (Fristen-Automation). |
| **Immobilien-Entwickler & Makler** | Komplexe Projekte (Bauanträge, Finanzierungen), viele Dokumente (Verträge, Karten), lange Entscheidungsprozesse. | Einheitliches Projekt-Dashboard: Von der Akquise bis zum Verkauf alles dokumentiert, AI sucht Risiken (RAG), Terminorganisation & Checklisten (n8n). | **Newsletter-Kampagne** “Immobilien-Due Diligence leicht gemacht”; Module: Board/Cockpit (Projektübersicht), RAG (speichern von Bewertungen, Marktkenntnis), Briefkasten (Verträge scannen), Mandat (Zugriffsrechte z.B. mit Partnern). |
| **Kreative / Künstler / Markenbauer** | Ideen verstreut (Notizen, Bilder), aufwendige PR/Kampagnenlogistik, wenig Struktur. | Kreativ-Hub mit KI: Ideensammlung via RAG, automatischer Content-Entwurf (KI-Agent), Aufgabenkoordination im Team. | **Landingpage** mit starken Bildern (Kreis/Dreieck/Quadrat-Design); Module: HerrKuenstler (Marken- und Asset-Management), Society (Rollen für Team/Kollaboratoren), Briefkasten (Dokumentation & Pitches). |
| **KMUs / Family Offices**     | Verwaltung von Vermögen/Projekten vielfältig, wenig IT-Ressourcen. | All-in-One-Admin-Tool: Finanzen, Verträge und Projekte über Shared-Workspace, Audit-Trails inklusive. | **Webinar** auf Anfrage; Module: Board (Firmen-Dashboard), Mandat (Zentrale Rechteverwaltung für Finanzen/Projekte), RAG (Wissen über Lizenzen/Investment-Kriterien), n8n (regelmäßige Reports/Reminder). |
| **Vereine / Community-Projekte** | Ehrenamtler müssen viel managen (Event, Kommunikation, Dokumentation) ohne IT-Hilfen. | Kostenloser Einstieg (Freemium), vereinsweites Intranet mit KI-Chat für FAQs, Organigramm. | **Community-Partnerprogramme**; Module: Board (Mitgliederverwaltung und Aufgaben), Briefkasten (sichere Dokumentenablage, z.B. Satzung), Tickets (Meldungen von Mitgliedern), RAG (Wissensdatenbank “Satzung & Protokolle”). |
| **Berater / Coaches / Projektmanager** | Zeit für Reports/Auswertungen knapp, Kunden benötigen transparente Berichte. | Automatisches Reporting: Gesprächsprotokolle und Dokumente in Akte, intelligente Meeting-Zusammenfassung, Projektfortschritt-Analyse. | **Inbound-Kampagne** “Ihr virtueller Co-Pilot”; Module: RAG (Wissensspeicher aus Training/Coaching-Daten), Briefkasten (Dokumentenaustausch mit Kunden), n8n (Newsletter und Onboarding-Workflows für Klienten). |

*Beispiel-Personas:* Ein Management-Berater („Consultant Claus“) freut sich auf automatische Termin- und Aufgaben-Listen, ein Startup-Gründer („Gründerin Greta“) will den digitalen Überblick für Tech-Entwicklungen, ein Immobilienmakler („Makler Marco“) auf integrierte Karten- und Vertragsverwaltung. Jeder nutzt zuerst die Module, die sein Hauptproblem lösen – z.B. Admin-Personas starten oft beim „Briefkasten“ (Dokumenten-Eingang), Rechts-Personas bei „Mandat“ (Rechte/Akten) und Kreative bei „HerrKuenstler“ (Branding/Assets). Alle Personas profitieren von der zentralen **KI-Society**, die als lebendiger Wissensträger fungiert, indem sie gelerntes Wissen (via RAG) intelligent bereitstellt.

## 4. Landingpage-Struktur  

**(Die nachfolgenden Inhalte sind Mustervorschläge mit Claims und CTA-Texten. Zitate zur Untermauerung stammen externen Quellen.)**

- **Hero-Bereich:**  
  - *Visueller Aufmacher:* Großflächiges Bild im „Dark-Light Bauhaus“-Stil (z.B. farbige Kreise/Dreiecke/Quadrate). Headline: „Ihr Projekt, unser Cloud-Computer.“ Subline: „Alle Tools. Ein Login. KI für Ihre Arbeit.“  
  - *CTAs:* „Jetzt kostenlos testen“, „Webdemo anfragen“  
  - *Claim:* “Verlieren Sie nie mehr den Überblick: Ihr KI-gesteuertes Projekt-Cockpit.”  
  - *Beleg:* Digitale Workplaces steigern Produktivität.  
- **Problemstellung:**  
  - *Titel:* „Heute sind Projekte zerklüftet“  
  - *Text:* „In der Praxis sind To-Dos, Mails, Dokumente und Abstimmungen meist verteilt: Verschiedene Tools, manuelles Recherchieren, viele Excel-Tabellen. Das kostet Zeit und Geld. Studien zeigen: 68 % der Arbeitnehmer klagen über ineffiziente Tools und Informationsüberfluss. Ihr Team arbeitet in Fragmenten.“  
  - *CTA:* „Sind Sie ineffizient? Testen Sie unser Demo-Projekt.“  
  - *Claim:* “Ein Werkzeug-Wirrwarr senkt die Produktivität – eine integrierte Lösung setzt Energie frei.”  
- **Lösung / Produktübersicht:**  
  - *Titel:* „Unser Ansatz: Ein **Cloud-Computer** für Projekte“  
  - *Text:* „LICHTREICH vereint Akten, Chatbots und Automatisierung in einer Plattform. Ein einziges Login öffnet Portale für Dokumenten-Management („Briefkasten“), KI-Wissen („RAG“), Mandats-/Rollenverwaltung, Support-Tickets, Projekt-Cockpit und mehr. Hinter den Kulissen steuert eine KI-Society Agenten, die für Sie Briefentwürfe verfassen, Workflows starten und Ihr Wissen organisieren.“  
  - *Sub-Claims:* „**Bring Your Own AI:** Verwenden Sie Ihre eigenen LLM-Keys oder kostenlose Modelle – Transparenz & Sicherheit first.“ (Beleg: Konzept beruht auf BYOK, internes Dokument) “**Modular & Skalierbar:** Wächst mit jedem Projekt – von Einzelnutzung bis Enterprise.”  
  - *CTAs:* „Funktionen entdecken“, „Demo ansehen“  
- **So funktioniert’s (Kurz):**  
  - *Titel:* „So funktioniert LICHTREICH“  
  - *Schritte (mit Icons oder Mini-Diagrammen):*  
    1. **Anmeldung & Onboarding:** Einmaliges Login (z.B. Google-SSO) → persönliche Konfiguration (Rollen, Keys, Ablagen). (Beleg intern: Google-OAuth live – müsste verifiziert werden.)  
    2. **Dokument- & Wissensaufnahme:** Eingehende Unterlagen werden ins System eingespeist (Scan/OCR in Briefkasten). Unser RAG-Agent speichert Inhalte als durchsuchbares Wissen.  
    3. **Analyse & Antwort:** Stellen Sie Fragen (z.B. „Welche Verträge laufen aus?“) – die KI ruft relevante Infos aus allen Akten ab (RAG). Sie können per Chat oder Formular datengetriebene Auskünfte erhalten.  
    4. **Automatisierter Workflow:** Erstellen Sie per Klick neue Projekte: n8n-Workflows starten (z.B. E-Mail-Benachrichtigung, To-Do-Liste). Sie überwachen alles im Task-Cockpit (Board).  
    5. **Review & Optimierung:** Ihr Feedback fließt in ein RAG-gestütztes Learningsystem (Audit & Tickets), sodass das System kontinuierlich dazulernt.  
  - *CTAs:* „Jetzt Workflow testen“, „Tutorial ansehen“  
- **Module / Organe des Cloud-Computers:**  
  - *Titel:* „Das Herz von LICHTREICH: Ihre Tools in einer Plattform“  
  - *Text:* Kurze Erklärung der wichtigsten Subdomains:  
    - **Briefkasten (BOB):** Digitaler Aktenordner mit automatischem Scan & OCR. E-Mail-Eingang (IMAP) integriert. *(Für Dokumentenmanagement und Compliance)*.  
    - **RAG (Semantische Suche):** Wissensdatenbank: Speichern und Durchsuchen aller Inhalte mithilfe von KI. *(Erkennt Muster, schlägt Zusammenhänge vor.)*  
    - **Mandat (Rollen & Rechte):** Verwaltung von Projekten und Zugriffsrechten – wer darf was sehen? *(Essentiell für Teams und Externe)*.  
    - **n8n-Workflows:** Workflow-Engine: Automatisieren Sie Prozesse (z.B. Newsletter, Reports, Datentransfers). *(Skaliert repetitive Aufgaben.)*  
    - **Tickets & Orchester:** Internes Issuesystem und orchestriert externe Agenten: Aufgaben teilen, Fortschritt überwachen.  
    - **Board/Cockpit:** Dashboard für Projektstatus, KPIs, Teamaktivität.  
    - **HerrKuenstler (Creator-Hub):** Kreativ- und Marken-Management-Tool (Entwürfe, Assets, Veröffentlichungen). *(Zeigen Sie Ihre Marke!)*  
    - *CTA:* „Alle Module entdecken“  
- **Beispiel-Workflows:**  
  - *Titel:* „Beispiele: So automatisieren Sie mit LICHTREICH“  
  - *Text:* Kurze Stichpunkte:  
    - *Neues Projekt:* Eingangs-Akte → Workflow erstellt To-Do-Liste + Kalendereintrag + KI-Brief-Vorlage.  
    - *Fristüberwachung:* Fällige Deadlines generieren automatisch Erinnerungs-Emails.  
    - *Aktenanalyse:* Hochgeladene Verträge analysiert, relevante Schlagworte & Termine extrahiert (OCR + KI).  
  - *CTA:* „Weitere Anwendungsfälle“  
- **Sicherheit & Datenschutz:**  
  - *Titel:* „Sicher und konform – Ihre Daten in guten Händen“  
  - *Text:* „LICHTREICH trennt “öffentliche” KI-Antworten von sensiblen Daten. Private oder geheime Infos bleiben in geschützten Akten und Vaults, nicht im öffentlichen Chat. Integrierte Rollen- und Mandatssteuerung gewährleistet DSGVO-konformes Arbeiten: Lösch- und Auskunftspflichten erfüllen wir über automatisierte Prozesse. Optional aktivierbar sind Zwei-Faktor-Logins und firmeneigene LLMs. (Zu beachten: sensible Gesundheits- oder Rechtsdaten werden nur lokal oder in verschlüsselten Räumen verarbeitet.)“  
  - *CTA:* „Mehr erfahren (Compliance)“  
- **Preise & Tarife:**  
  - *Titel:* „Preise & Tarife“  
  - *Tabelle oder Vergleich (Freemium/Basis/Pro/Enterprise):* Beispielsweise:  
    | Tarif      | Preis (Monat)  | Inklusive Features                                   | Für wen?                     |  
    |------------|---------------|-------------------------------------------------------|------------------------------|  
    | **Frei**   | 0 €           | Gratis-LLM (Gemini/Groq), 10 Akten/Monat, Grundfunktionen | Enthusiasten, Einzelnutzer  |  
    | **Basis**  | ~9 €          | inkl. eigenen KI-Keys, Drive/Dropbox-OAuth, 100 Akten-Kontingent | Kleine Teams, Einzelprojekte |  
    | **Pro**    | ~29 €         | inkl. IMAP/Box/S3, beliebige KI-Modelle, unbegrenztes FAIR-USE | Kanzleien, Agenturen, Corporates |  
    | **Whitelabel** | auf Anfrage | Volle Plattform + Support + Anpassung                  | Großkunden, Reseller         |  
  - *Text:* Kurz erläutern, z.B.: „Der Einstieg ist gratis – starten Sie ohne Risiko. Für Profiteams bieten wir günstige Monatspakete (z.B. €9/mtl für Basisfunktionen, €29/mtl für All-in). Dank BYOK können Unternehmen KI-Kosten minimieren. Voll integriert ist eine transparente Kostenkontrolle: Jeder API-Aufruf wird nachverfolgt (Token, Sekunden, €).“  
  - *Beleg:* Vergleich zu Branchentarifen: z.B. Asana ab $13.49/User, Hive ab $7; LICHTREICH ist günstiger für viele Use-Cases.  
  - *CTA:* „Jetzt registrieren“, „Kostenkalkulator“  
- **Test-User / Warteliste / Newsletter:**  
  - *Titel:* „Bereit für den nächsten Schritt?“  
  - *Text:* „Melden Sie sich an und werden Sie Test-User: Wir begleiten Sie persönlich durch die ersten Schritte. Als Early-Adopter erhalten Sie auf alle Tarife 50 % Rabatt für 6 Monate*. Erhalten Sie außerdem exklusive Einblicke in Roadmap und erhalten Sie Vorabzugang zu neuen Funktionen.“  
  - *Formular:* Felder: Name, E-Mail, Organisation, Nutzungsabsicht, DSGVO-Checkbox.  
  - *CTA:* „Testzugang anfordern“, „Newsletter abonnieren“.  
- **Partner / Affiliate:**  
  - *Titel:* „Partner & Affiliate-Programm“  
  - *Text:* „Empfehlen Sie LICHTREICH weiter oder integrieren Sie es in Ihr Portfolio. Für Kanzleien, Berater und Entwickler bieten wir Partner-Level mit Umsatzbeteiligungen. Speziell: Real Estate-Agenten, Rechtsdienstleister und Kreativagenturen können unser System als White-Label einsetzen oder Rabatte für ihre Kunden verhandeln.“  
  - *CTA:* „Partner werden“, „White-Label-Paket anfragen“.  
- **Crowdfunding / Investor:**  
  - *Titel:* „Unterstützer gesucht!“  
  - *Text:* „Werden Sie Teil unserer Vision: Starten Sie unsere Crowdfunding-Kampagne und gestalten Sie gemeinsam die Zukunft der Arbeitswelt. Als Gegenleistung bieten wir Lifetime-Lizenzen, namentliche Nennung als Sponsor und exklusive Zugriffe. Für Investoren haben wir einen detaillierten Onepager mit Marktanalyse und Finanzplanung vorbereitet.“  
  - *CTA:* „Jetzt unterstützen“, „Investor-Deck anfordern“.  
- **FAQ:** (Kurz-Teaser, verlinkt)  
  - *Titel:* „Häufig gestellte Fragen“  
  - *Text:* „Erfahren Sie mehr über Sicherheit, Preise und Technik in unserem umfassenden FAQ.“  
  - *CTA:* „Zum FAQ“, „Support kontaktieren“.  
- **Footer:**  
  - Links zu Impressum, Datenschutz, AGB, Statusseite, Social-Media (falls geplant). Hinweis auf aktiven Entwicklungsstatus („Beta – wir freuen uns über Feedback und Fehlerreports“).

> *Diagramm:*  
> ```mermaid
> graph LR
>   Client((Nutzer)) -->|1 Login| Auth[LICHTREICH-SSO/Google]
>   Auth --> mc(API-Gateway)
>   subgraph Dienste
>     mc --> Briefkasten((Briefkasten/BOB))
>     mc --> RAG((RAG-Wissensdatenbank))
>     mc --> Mandat((Mandatsverwaltung))
>     mc --> Board((Projekt-Cockpit))
>     mc --> Tickets((Tickets/Issues))
>     mc --> Orchestra((Rollen-Orchester))
>     mc --> n8n((n8n-Workflow))
>     mc --> HerrKuenstler((Creator-Hub))
>   end
>   Briefkasten --> RAG
>   RAG --> n8n
>   Board --> n8n
>   n8n --> Tickets
>   Board --> Orchestra
> ```
> *Abbildung:* Vereinfachte Architektur: Ein zentraler SSO-Service (z.B. Google OAuth) authentifiziert Nutzer, das API-Front-End leitet Anfragen an verschiedene Microservices/Subdomains weiter (Dokumenten-Akte, Wissens-DB, Workflow, etc.). Diese Dienste sprechen intern per API miteinander (z.B. speist Briefkasten-Daten in RAG ein, steuert via n8n Tickets). Das “Orchester” verteilt Rollen und Aufgaben an Agents und Submodule.

## 5. FAQ (50+ Fragen, kategorisiert)

### Einstieg  
1. **Was ist LICHTREICH und für wen ist es gedacht?** – Ein integriertes Cloud-Toolset für Projekt- und Aktenmanagement, das KI-Funktionalität einbindet. Es richtet sich an Personen und Teams mit komplexen Dokumenten- und Prozessanforderungen (Recht, Immobilien, Verwaltung, Kreativprojekte). *Status: belegt (Siehe Produktbeschreibung).*

2. **Wie starte ich mit LICHTREICH?** – Einfach anmelden über `setup.lichtreich.info` (z.B. mit Google). Dann Onboarding-Assistent durchlaufen: Schlüssel wählen, eigene Teams/Rollen anlegen. *Status: teilweise (Annahmen: Google-Login live, Onboarding-Screen in Arbeit).*

3. **Gibt es eine Free-Variante?** – Ja, der Frei-Tarif kostet 0€. Man nutzt öffentliche KI-Provider (z.B. Gemini/Groq) und ist auf Basisfunktionen limitiert. *Status: belegt.* 

4. **Was ist der Unterschied zwischen Basis und Pro?** – Basis (~9€/Monat) erlaubt eigene KI-Keys (OpenAI/Anthropic etc.), Drive/Dropbox-Anbindung und größere Nutzungskontingente. Pro (~29€/Monat) schaltet zusätzlich z.B. E-Mail-IMAP-Zugang, Box/S3-Speicher und unbegrenzte Nutzung (fair-use). *Status: belegt.*

5. **Benötige ich eigene API-Keys?** – Nein, man kann mit kostenlosen KI-Modellen (OpenAI-Demo, Google Gemini) starten. Für intensiven Gebrauch empfiehlt sich aber ein eigener Key (BYOK), damit Kosten und Datenschutz besser kontrolliert werden. *Status: belegt (BYOK-Konzept).*

6. **Welche KI-Modelle kann ich verwenden?** – Generell alle LLMs: OpenAI (GPT-4, Claude, etc.), Google Gemini, Ollama (lokal installierbar), eigene On-Premise-Modelle. Die Plattform ist anbieter-neutral gestaltet. *Status: angenommen (Vision: Multi-Provider, intern diskutiert).*

7. **Wie sicher sind meine Daten?** – Sehr sicher: Sensitive Daten (Recht/Gesundheit) speichern Sie in geschützten Akten und Vaults, nicht im öffentlichen Chat. Das System unterstützt Multi-Faktor-Login und trennt Produktionsdaten von „KI-Freigaben“. Ein umfassender DSGVO- und Audit-Report wird bereitgestellt. *Status: offen (Datenschutzkonzept angedacht, konkrete Dokumente fehlen).*

8. **Brauche ich spezielle Software oder Hardware?** – Nein, alles läuft über den Browser. Sie benötigen nur Internet und einen modernen Browser. Alle Server- und KI-Operationen laufen in der Cloud. *Status: belegt (Architektur: Web-Frontend + Cloud-Backend).*

9. **Kann ich LICHTREICH im Unternehmen hosten?** – Geplant ist ein Cloud-Service. Langfristig ist ein Self-Hosting-Modus (Enterprise-on-Prem) denkbar (z.B. für EU-Datenschutz), wird aber separat abgestimmt. *Status: offen (Vision: Cloud-first, Enterprise als späterer Use Case).*

### Bedienung  
10. **Wie melde ich mich an (Login)?** – Derzeit erfolgt der Login über Google-Accounts (NextAuth). Geplant sind noch andere Provider (Microsoft, GitHub) via OAuth. Nach Login landen Sie im Dashboard (Board). *Status: teilweise (Google funktioniert, andere in Planung).*

11. **Was ist ein „Fall“ bzw. Projekt in LICHTREICH?** – Ein Projekt (Manchmal „Mandat“ oder „Akte“) ist eine Sammlung aller zugehörigen Dokumente, Aufgaben und Chats. Sie legen einen neuen „Fall“ an, geben ihm einen Namen, und das System erstellt die dazugehörigen Strukturen (Aktenordner, Rollenzuweisungen, Initialfrage an die KI etc.). *Status: belegt (Dokumentation Handbuch und Mandat-Modul).*

12. **Wie füge ich Dokumente hinzu?** – Direkt per Drag’n’Drop oder Upload im „Briefkasten“-Modul. Dort werden PDF/Dokumente/OCR verarbeitet und in Akten abgelegt. Sie können auch Bilder scannen oder E-Mails automatisch ablegen. *Status: belegt (Briefkasten-Modul im Handbuch).*

13. **Wie funktioniert der OCR-Prozess?** – Beim Upload im Briefkasten wird OCR (Texterkennung) angewendet. Der erkannte Text fließt in den RAG-Speicher. Anschließend kann die KI damit arbeiten (z.B. Textanalyse, Zusammenfassungen). *Status: teilweise (OCR erwähnt, aber Open-Source/Cloud-Engine offen).*

14. **Was ist RAG?** – RAG steht für „Retrieval-Augmented Generation“: Eine Methode, bei der ein Text- oder Wissensspeicher (Vektor-Datenbank) angelegt wird. Die KI nutzt diesen Speicher, um bei Abfragen auf echtes Unternehmenswissen zuzugreifen. Dadurch bleiben KI-Antworten präzise und nachvollziehbar. *Status: belegt (Handbuch: RAG mit 1700 Vektoren gefüttert).*

15. **Wie frage ich die KI meine Daten ab?** – In Modulen wie „Board“ oder einem speziellen Chat-Interface stellen Sie Fragen. Die KI referenziert den RAG-Speicher und gibt Zitate/Fundstellen zurück. Z.B. „Zeige alle Verträge, die nächsten Monat auslaufen.“ *Status: teilweise (Konzept bestätigt; UI-Konzept offen).*

16. **Kann man Erinnerungen und To-Do-Listen erstellen?** – Ja. Im Board/Projekt-Cockpit können Sie Aufgaben definieren. Auch automatisch: Workflows (n8n) legen z.B. Fristen-Tasks an oder verschicken Erinnerungen per E-Mail. *Status: belegt (Workflows in n8n bereits dokumentiert).*

17. **Wo finde ich meine Projekte (Board)?** – Das Dashboard („Board“) listet alle aktiven Projekte/Akten mit Status, Verantwortlichen und Fristen. Hier steuern Sie Aktionen (Neues Projekt erstellen, Projektcloses). *Status: angenommen (Board-Modul existiert).*

18. **Was ist das Orchester?** – Ein internes Modul, das Rollen und Rollen-Profile („Agenten“ der KI-Society) verwaltet. Hier definieren Sie, welche KI-Agenten für welche Aufgaben zuständig sind (z.B. ein „Transkriptions-Agent“ oder ein „Vertragsagent“). *Status: teilweise (Begriff im System, Details noch entwickeln).*

19. **Wie läuft ein Ticket ab?** – Nutzer oder KI können im Ticket-Modul Probleme und Wünsche erfassen. Jedes Ticket bekommt einen Status und wird ggf. einem Workflow zugeordnet (z.B. Bewertung oder Entwicklungsaufgabe). *Status: belegt (Tickets-Modul vorhanden).*

20. **Kann ich das System per Smartphone nutzen?** – Bisher ist es für Desktop optimiert. Mobile Browser funktionieren vermutlich, aber wir empfehlen einen großen Bildschirm für volle Übersicht. Eine App ist für später nicht ausgeschlossen. *Status: Vision (Responsive-Webseite).*

### Briefkasten / BOB  
21. **Was ist der „Briefkasten“ (BOB)?** – Dies ist Ihr zentrales digitales Postfach: Hier landen alle eingehenden Dokumente und E-Mails. BOB sortiert Dokumente in Akten (Projekte) und wendet OCR/Analyse an. *Status: belegt (Handbuch beschreibt den Briefkasten-Workflow).*

22. **Wie kann ich E-Mails integrieren?** – Geplant ist eine IMAP-Schnittstelle: Richten Sie eine Support-Email ein (z.B. tickets@lichtreich.info). BOB prüft den Posteingang, importiert Nachrichten und Anhänge. Zurzeit (07/2026) ist der IMAP-Connector noch in Arbeit (OAuth-Zugang für Gmail/Exchange fehlt). *Status: offen (Angedacht, aber technische Hürden).*

23. **Können E-Mails automatisch Aufgaben erstellen?** – Ja, via n8n: Zum Beispiel kann ein Eingang in BOB einen Workflow triggern, der einen To-Do-Eintrag im Board anlegt oder ein Ticket eröffnet. *Status: Vision (Workflow-Flexibilität vorhanden, spezifische Beispiele fehlen).*

24. **Wird der Briefkasten auf vertrauliche Inhalte überwacht?** – Grundsätzlich nur in Ihren erlaubten Bereichen. Das System setzt Standardfilter (z.B. Erkennung von personenbezogenen Daten), aber absolute Sicherheit hängt von korrekter Nutzung ab. *Status: offen (Sicherheitsfeatures konzeptionell, Implementierung offen).*

### RAG / Wissensspeicher  
25. **Wie wird Wissen in RAG eingepflegt?** – Dokumente aus dem Briefkasten, Chat-Protokolle oder eigene Notizen können als „Spur“ in die RAG-Datenbank eingespeist werden. Eine manuelle Review-Phase ist vorgesehen (drückt „Commit“ oder „Übernehmen“). *Status: belegt (Handbuch: ingest.lichtreich.info mit Review-Vorschlag).*

26. **Kann ich RAG-Quellen trennen?** – Ja, man kann zwischen Systemwissen (modulübergreifendes Basis-Wissen) und Referenzdaten unterscheiden. So bleiben vertrauliche Akten getrennt von öffentlich zugänglichen Informationen. *Status: belegt (Hinweis im Handbuch).*

27. **Wer pflegt den RAG-Speicher?** – Initial führt das System ein. Später können Nutzer in der ingest-UI manuell sortieren, ergänzen oder löschen (Quality Gate). *Status: belegt (Ingest-UI vorgesehen).*

28. **Wie aktuell ist das Wissen?** – Die KI kann aktuelle Daten abfragen (sofern verfügbar) oder ältere Akten durchsuchen. Es gibt kein Echtzeit-Internet-Zugriff; externe Informationen müssen importiert werden. *Status: teilweise (keine Live-Web-KI, nur vorliegende Daten).*

### n8n / Automationen  
29. **Was ist n8n?** – n8n ist eine Open-Source Workflow-Engine. In LICHTREICH nutzen wir n8n für Prozessautomatisierung: Sie können Abläufe grafisch zusammenklicken. *Status: belegt (n8n läuft als Subdomain, Workflows in JSON).*

30. **Kann ich eigene Workflows erstellen?** – Ja, Admins können via n8n-UI beliebige Workflows designen und nodebasiert verbinden (z.B. „wenn neues Dokument in BOB, dann Email-Push“). Standard-Workflows liegen als Templates vor (siehe Katalog unten). *Status: belegt (WORKFLOW-Karte im Repo).*

31. **Wie exportiere ich Arbeitsabläufe?** – n8n erlaubt den Export ganzer Workflows als JSON (im Interface). Wir können diese per Git importieren/exportieren. *Status: belegt (n8n-Import/Export dokumentiert).*

32. **Sind Fehlerdetektoren eingebaut?** – Grundsätzlich prüft n8n jeden Knoten-Status; zusätzliche Logging-Workflows können Statusreports an Slack/Email senden. Ein automatischer Bug-Report an LICHTREICH-Ticketsystem ist vorgesehen. *Status: Vision (Browser-QA-Plan weiter unten).*

### KI-Society / Rollen  
33. **Was ist die KI-Society?** – Das ist unser Begriff für das Netzwerk aus „Agenten“: spezialisierten KI-Persönlichkeiten (z.B. ein „Notar-Agent“ oder „Vertragsschreiber-Agent“). Sie erhalten Aufgaben entsprechend ihrer Rolle. *Status: Vision (Branding, nicht im Code sichtbar).*

34. **Wie passe ich Rollen an?** – Unter „Mandat“ oder im „Orchester“ können Administratoren Rollenmodelle definieren und zuweisen (Team-Architektur). Diese Rolle bestimmt, welche Daten und Workflows ein Agent sehen und ausführen darf. *Status: teilweise (Rollen existieren, UI evtl. rudimentär).*

35. **Benötige ich Programmierkenntnisse?** – Nein, alles ist entweder grafisch (n8n) oder textbasiert (Chat-/Kommando-Input) bedienbar. Für Erweiterungen (Plugins/Scripts) kann Programmierung nötig sein, aber Standardnutzer brauchen keine. *Status: belegt (Ziel: no-code/high-code optional).*

36. **Wie passt sich LICHTREICH an unsere Arbeitsweise an?** – Durch das Rollen- und Workflow-Design können Sie Abläufe exakt nach Ihrer Firmenpraxis abbilden. Zudem lernt das System von Ihren Interaktionen (z.B. Genehmigungswege im RAG-Speicher). *Status: Vision (adaptive Lernidee, nicht implementiert).*

### Datenschutz / Zugriff / Mandate  
37. **Wer darf was sehen?** – Zugriffsrechte werden über Mandate/Rollen geregelt. Ein Nutzer sieht nur Projekte und Daten, die ihm zugeordnet sind. Mandanten oder externe Berater erhalten eigene Mandatszugriffe. *Status: belegt (Mandats-Modul ist Teil des Designs).*

38. **Kann ich vertrauliche Akten löschen oder exportieren?** – Ja, Über Mandate können Akten auch unwiderruflich gelöscht (Stichwort DSGVO-Löschung) werden. Exportfunktionen (PDF/CSV) sind in Planung. *Status: teilweise (Löschung vorgesehen, Export noch arbeiten).*

39. **Wo werden Daten gespeichert?** – Dokumente und Chats liegen verschlüsselt auf unseren Servern (oder in Ihrem Cloud-Account, je nach Architektur). RAG-Vektoren liegen in einer Vektor-DB (z.B. Weaviate/Pinecone). Pseudonymisierung für Tests ist möglich. *Status: angenommen (technische Architektur nicht öffentlich).*

40. **Wie geht ihr mit Mandantendaten (z.B. Gesundheitsinfos) um?** – Sensible Daten können in separaten „Vaults“ (z.B. verschlüsselte Datenräume) gehalten werden, auf die nur berechtigte Rollen zugreifen. KI-Modelle erhalten nur abstrahierte Stichworte, keine Rohdaten. *Status: offen (in Konzeptphase).*

### Preise / Freemium / eigene Keys  
41. **Wie sind die Kontingente definiert?** – Typisch sind Akten-/Projekteinheiten und Token-Limits. Im Frei-Tarif z.B. 10 Akten/Monat, Basis ~100, Pro unbegrenzt (fair-use). Token-Abrufe für KI werden getrennt gezählt (siehe nächster Punkt). *Status: teilweise (Ansätze in Strategie, Werte noch finalisieren).*

42. **Wie wird der KI-Verbrauch abgerechnet?** – Jeder KI-Call und dessen Tokenverbrauch wird protokolliert (Provider, Tokens, Ausführungsdauer). Monatlich wird das Kontingent geprüft. Wird das Limit überschritten, kann im Tarif aufgestockt oder ein eigener Key hinzugefügt werden. *Status: belegt (Freemium-Dokument erwähnt token_usage-Tracking).*

43. **Sind versteckte Kosten möglich?** – Nein: Alle API-Aufrufe werden gemessen. Bringt der Nutzer eigene Keys, fallen für die eigentliche Rechenleistung keine Kosten an (diese trägt der Nutzer über seinen Account). Unsere Preise decken Infrastruktur und Services ab. *Status: teilweise (BYOK-Ansatz beschrieben, aber Kalkulation noch intern).*

44. **Gibt es Rabatte oder Test-Angebote?** – Ja, Early Adopter und gemeinnützige Organisationen erhalten vergünstigte Konditionen. Für einen befristeten Testlauf (z.B. 3 Monate Pro) kann ein Rabattcode ausgegeben werden. *Status: Vision (früh geplant, aber noch nicht konkretisiert).*

45. **Können mehrere Nutzer einen Account teilen?** – Jeder Nutzer braucht einen eigenen Login (Rollen-Rechtesystem). In Teams sind gemeinschaftliche Spaces möglich, aber keine Kollektiv-Logins. *Status: angenommen (Standard SaaS-Policy).*

### Test-User / Vorbestellung  
46. **Wie bewerbe ich mich als Test-User?** – Über das Online-Formular (Name, Firma, Use-Case, Zustimmung Privacy). Geeignete Beta-Tester werden ausgewählt (z.B. Branchen, Projektgröße). *Status: offen (noch kein formelles System).*

47. **Was bekommen Test-User?** – Gratis Zugang zu Pro-Funktionen für die Dauer des Tests + persönliche Onboarding-Unterstützung. Feedback fließt direkt in die Entwicklung ein. *Status: Vision (üblicherweise so realisiert).*

48. **Wie lange dauert die Testphase?** – Typisch 1–3 Monate oder bis Abschluss eines Pilotprojekts. *Status: angenommen (üblich in SaaS-Entwicklung).*

49. **Kann ich Änderungen vorschlagen?** – Ja, Test-User sollen aktiv Feedback geben. Vorschläge können über das Ticketsystem oder per Email eingereicht werden. *Status: belegt (siehe interne Kultur: “immer zeigen, nie erklären”).*

50. **Gibt es eine Warteliste?** – Aktuell sind wir in der Closed-Beta. Eine Warteliste wird eingerichtet (siehe Footer der Webseite). Test-User werden chronologisch von dieser Liste eingeladen. *Status: Vision (Standardpraxis).*

### Partner / Affiliate  
51. **Wer kann Partner werden?** – Agenturen, Rechts- und Immobilienberater, Software-Integratoren, Influencer im Business-Bereich. Es gibt auch ein Partnerprogramm für Non-Profits. *Status: geplant (Partnerkonzept skizziert).*

52. **Wie funktioniert das Affiliate-Programm?** – Partner erhalten eine individuelle Empfehlungs-URL. Pro vermitteltem zahlenden Kunden bekommen sie z.B. 10–20 % der Jahresumsätze als Provision. *Status: Vision (übliche Affiliate-Modelle, Konkretes festlegen).*

53. **Brauche ich spezielle Verträge?** – Partner schließen einen einfachen Kooperationsvertrag (Fokus Datenschutz & Provisionsabrechnung). Affiliate-Links sind DSGVO-konform gestaltet (kein Tracking von persönlichen Daten). *Status: offen (rechtl. Prüfung nötig).*

54. **Kann ein Partner die Plattform white-label anbieten?** – Ja, gegen gesondertes Lizenzmodell (Whitelabel-Paket). Dann kann z.B. eine Kanzlei das Produkt mit eigenem Branding nutzen und weiterverkaufen. *Status: Vision (Whitelabel-Punkt im Preisplan).*

### Investor / Crowdfunding  
55. **Was macht das Investment aus?** – Crowdfunder erhalten z.B. eine Lifetime-Lizenz oder Co-Gründerpaket. Investoren bekommen detaillierte Zahlen (Marktgröße, ROI-Modell) in einem vertraulichen PDF. *Status: Vision (typischer Startup-Prozess).*

56. **Worin besteht der Markt?** – Unternehmen weltweit geben jährlich Milliarden für ineffiziente Prozesse aus (z.B. DMS- oder ERP-Software). Der Bedarf an integrierten KI-Workflows wächst rasant. LICHTREICH adressiert diesen Megatrend. *Status: teilweise (Schätzungen nötig, externe Studien verfügbar).*

57. **Wie sehen die nächsten Meilensteine aus?** – Crowdfunding-Phase Ende 2026, nächste Entwicklungsziele: Mobile-UI, Erweiterung von PDF-Bearbeitung (Digitale Signaturen) und Internationalisierung. *Status: Vision (Roadmap in Planung).*

58. **Welche Risiken gibt es?** – Technische: Hohe Komplexität könnte Entwicklung verzögern. Markt: starke Konkurrenz (siehe Wettbewerbsanalyse). Compliance: muss bis zum Launch DSGVO/Datensicherheit einwandfrei sein. Wir minimieren diese Risiken durch agile Entwicklung, modulares Design und externe Prüfungen. *Status: erwähnt (Abschnitt Compliance weiter unten).*

59. **Wie werden Investitionen genutzt?** – Für Produktentwicklung (z.B. Mitarbeiter für KI/DevOps), Marketing (Speziell Launch-Kampagne), Infrastruktur (Skalierung) und mögliche internationale Expansion. *Status: offen (Businessplan nötig).*

60. **Wer sind die Gründer/Entwickler?** – Ein kleines Team aus Bauingenieur/PJ-Management („stef“), SW-Dev (XY) und Legal-Tech-Beratung (Z) – alle erfahren in Projektentwicklung, Software und KI. *Status: Informativ (Team-Claims im Pitch-Deck).*

*Alle Antworten oben sind vorläufig; ausführliche Versionen und Aktualisierungen finden Sie im öffentlich zugänglichen **Online-Handbuch** und im sich ständig erweiternden **KI-Wiki** der Plattform. Fragen? Kontaktieren Sie unser Support-Team.*

## 6. Preismodell

**Öffentliche Preistabelle:**  

| Tarif      | Preis/Monat   | Features / Kontingente                         | Für wen?                  |
|------------|--------------|-----------------------------------------------|---------------------------|
| **Frei**   | 0 €          | 👉 Gratis-LLM (Gemini/Groq) oder eigener Key<br>👉 Basis-Features (Dokumente, Chat, 10 Akten)<br>👉 Drive/Box nur Test-Mode<br>👉 Community-Support  | Privatpersonen, Einsteiger  |
| **Basis**  | ~9 €         | 👉 Eigene KI-Keys + Plattform-Fallback<br>👉 100 Akten/Monat, Drive-/Dropbox-OAuth<br>👉 Bis zu 5 Nutzer<br>👉 Standard-Support     | Kleine Teams, Solo-Profis   |
| **Pro**    | ~29 €        | 👉 Alle Keys & Modelle + unbegrenztes FAIR USE<br>👉 Inkl. IMAP-, Box-, S3-Anbindung<br>👉 Rollen/SSO/Security-Addons<br>👉 Priority-Support     | KMU, Kanzleien, Agenturen   |
| **Enterprise/Whitelabel** | auf Anfrage | 👉 Volle Plattform + SLA-Support<br>👉 Branding/Customizing<br>👉 On-Premise oder Dedicated Cloud | Großunternehmen, Reseller   |

(*Anmerkungen:* BYOK ermöglicht kostenfreie LLM-Nutzung für den Dienst, Kosten nur bei Nutzung externer High-End-Modelle. Freikontingente werden durch Plattform-Fallback gesichert – z.B. starten wir Anfragen mit freien Modellen, bevor kostenpflichtige LLMs zugeschaltet werden. Ollama (On-Prem-LMs) verursachen faktisch 0 € LLM-Kosten.) 

**Interne Kalkulation:**  

- **LLM-Kosten:** Ein hochmodernes Modell kostet je nach Anbieter etwa 0,01–0,02 € pro 1.000 Tokens (Stand 2026). Ein typischer Vertragstext (100.000 Tokens) würde ca. 1–2 € kosten. Durch BYOK teilen wir diese Kosten mit dem Nutzer.  
- **Vektor-DB:** Wenn wir z.B. Pinecone oder Weaviate nutzen, betragen die Lizenzkosten ab ~$20–50/Monat für kleine Mengen. Wir kalkulieren pro aktiver Organisation ~10–20 € Infrastruktur pro Monat (je nach Datenmenge).  
- **Storage:** Dokumenten-Storage (OCR-PDFs) vermutlich auf S3 oder ähnlich; mit LRU-Backup. Ca. 1–5 € pro Nutzer/Monat bei mittlerem Gebrauch.  
- **Workflow-Ausführungen:** n8n ist OpenSource, benötigt nur Server-Kapazität. Die großen Kosten entstehen durch Ressourcen (z.B. Worker-Instanzen für parallele Tasks). Diese fassen wir als pauschale Infrastrukturkosten auf, eingebettet in die Abos.  
- **Support und Entwicklung:** In Technik-Teams (Entwicklung, DevOps, Support) stecken Personalkosten; diese werden über Abogebühren und evtl. Projektpreise gedeckt.  

**Freikontingente:**  
- **Frei-Tarif:** 10 Dokument-Projekte/Monat, unbegrenzte Benutzer, nur freie LLM (Gemini/Groq ohne Tokenkosten). Drive/Box nur im Lesemodus.  
- **Basis:** inkl. 100 Dokumente/Monat, 5 Nutzer, 2 BYOK-Keys.  
- **Pro:** unbegrenztes Dokumentenvolumen, Premium-Connectoren, eigene Infrastruktur (z.B. eigenes Weaviate-Profil).  
- **Test-Angebot:** Early-Adopter erhalten z.B. 6 Monate 50 % Rabatt auf „Basis“ oder „Pro“.  

**Risiken / Preissignale:**  
- Ein zu günstiger Preis für „Pro“ (z.B. unter 20 €) könnte falsche Signale senden (zu wenig Deckung für Support). Andererseits muss der Freemium attraktiv bleiben, um Nutzer anzuziehen.  
- Kostenüberschreitung: Daher das Metering jeder Ressource (Token, Speicher, Arbeitszeit).  
- **Marktvergleich:** Lizenzbasierte DMS-/ERP-Systeme kosten oft hunderte Euro pro Benutzer/Jahr. Moderne SaaS-Tools (Asana, Notion) starten bei ~$10–15 pro User/Monat. Unser Modell bietet mehr Tools (KI + DMS + Workflow) für vergleichbares Geld.  

## 7. Newsletter-/Test-User-Funnel  

1. **Landingpage → Newsletter-Anmeldung:** Besucher füllen kurzes Formular aus (Name, E-Mail, Branche, Use-Case, Zustimmung).  
2. **E-Mail 1 – Willkommen:** Automatisch nach Signup. Begrüßung + kurze Plattform-Einführung (vielleicht Video). Call-to-Action: Beitreten zum Beta-Programm.  
3. **E-Mail 2 – Produktvorteile:** 2 Tage später. Hervorheben der Kernfunktionen und Zielgruppen-Beispiele. Testimonials oder Use-Cases (fiktive Fallstudie). CTA: „Demo jetzt ansehen“ oder „Zugang beantragen“.  
4. **E-Mail 3 – Einladung/Testangebot:** 5 Tage später. Einladung zur exklusiven Testphase. Hinweis auf Early-Bird-Rabatt (z.B. 6 Monate 50 %). Eventuell Link zu Whitepaper/Onepager oder einer Hangouts Q&A.  
5. **E-Mail 4 – Reminder:** Eine Woche später. Erinnerung an den CTA, „Nur noch wenige Plätze frei“.  
6. **E-Mail 5 – Danke/Next Steps:** Nach Onboarding (bzw. nach Testende). Danke für Teilnahme, Bitte um Feedback (Fragebogen). Vorschlag für Folgeprodukt (z.B. Pro-Abo oder Enterprise-Plan).  

**Onboarding-Checkliste:** Bei Test-Usern (evtl. per automatisiertem E-Mail) abrufbar. Beispiel:  
- Konto anlegen und Firmen-Domain bestätigen.  
- Google-OAuth oder Passwort sichern.  
- Erstellen Sie mindestens 1 Akte im Briefkasten (Dokument hochladen).  
- Stellen Sie der KI eine Testfrage (gute Antwort prüfen).  
- Verbinden Sie Ihre E-Mail (IMAP) oder Drive-Ordner (Basis/Pro).  
- Testen Sie einen n8n-Workflow (z.B. automatischer Kalender-Termin).  
- Schließen Sie den Onboarding-Call mit dem Team ab.  

**Test-User-Kriterien:**  
- Positiv: Projektanwendung (z.B. komplexe Akte), Bereitschaft zu regelmäßiger Nutzung, Offenheit für Feedback. Branchenfit (z.B. Rechtsberatung, KMU-Verwaltung).  
- Negativ: Kein klarer Use-Case, hochsensible Daten (ohne NDA), extrem kleine Organisation (<2 User) – es sei denn gemeinnützig.

## 8. Affiliate-/Partnerprogramm  

**Partnertypen:**  
- **Legal & Berater:** Kanzleien, Steuerberater, Compliance-Dienstleister – sie können LICHTREICH als Value-Added Service anbieten.  
- **Immobilien & Finanzen:** Makler, Projektentwickler, Due-Diligence-Consultants – integrieren das Tool in Transaktionsprozesse.  
- **Kreativ- und Tech-Agenturen:** Agenturnetzwerke, Freelancer-Plattformen – bieten es Kunden als digitales Markenbüro.  
- **IT-Systemhäuser / Integratoren:** Implementieren und betreuen LICHTREICH bei Unternehmenskunden.  
- **Community-Leader / Influencer:** Multiplikatoren (z.B. Community-Manager von Fachverbänden) werben über Newsletter/Webinare.  

**Provision / Modell:**  
- **Einmal-Provision:** Z.B. 20 % der ersten Jahresgebühr für jeden Neukunden.  
- **Laufende Provision:** 5–10 % des Folgeumsatzes, solange der Kunde zahlt. (Standard in SaaS-Partnerprogrammen).  
- **Bonusprogramme:** Extra-Boni bei Erreichen von Partnerzielen (z.B. 5. Kunde).  

**Partnerrollen:**  
- *Referral-Partner:* Bringen Leads ein, erhalten Link-Provision.  
- *Reseller:* Kaufen Lizenzen im Paket, verkaufen weiter (eigenes Branding).  
- *Integrationspartner:* Verbinden LICHTREICH mit anderen Lösungen (CRM, ERP) – könnten zusätzliche Share of Revenue erhalten.  

**Tracking/Datenschutz:**  
- Jeder Partner erhält eindeutige Referral-Links/Codes. Buchungen werden Cookie-basiert getrackt.  
- Affiliate-Daten werden getrennt von Kundendaten gespeichert, um DSGVO-Konflikte zu vermeiden.  
- Partner müssen gesonderte Datenschutzvereinbarungen unterzeichnen (Datenzugriff, Einhaltung d. Regelungen).  

**Risiken:**  
- Billige Kundenwerbung (Spam): Wir implementieren einen Freigabeprozess für neue Kundenkontakte.  
- Provisionsabwälzung auf Endkunde: Transparente Preisgestaltung nötig, damit Partner die Konditionen nicht verstecken.  
- Vertragsklarheit (Kleingedrucktes beachten).

## 9. Crowdfunding- & Investoren-Grundlagen  

**Crowdfunding (öffentlich):**  
- **Seitenstruktur:**  
  - *Pitch:* Knackig, visuell. Problem („Zettelchaos im digitalen Zeitalter“), Lösung (LICHTREICH) mit Screenshots/Merkmalen.  
  - *Produktvideo/Anim:* 2-min-Trailer, modulare Dienste und Use Cases erklären.  
  - *Belohnungen:* z.B. „Early Bird“-Preis für Basis-/Pro-Jahresabo, Lifetime-Lizenz (begrenzte Stückzahl), Beta-Zugang + Einblick-Icons, Danksagung (Logo auf Website).  
  - *Roadmap:* Milestones (Q4/2026 MVP, Q1/2027 Beta-Launch, Q3/2027 Skalierung).  
  - *Teamvorstellung:* Kurzvita, Rollen (Gründer, Entwickler, Recht).  
  - *Budget-Plan:* Wofür investierte Mittel verwendet werden (Dev, Marketing, Infrastruktur).  
- **Community-Beteiligung:** Features-Voting (crowdsource Ideen), early access, Forum.  
- **Storytelling:** Fokus auf persönliche Motivation des Gründers („langjährig im Projektmanagement / Legal – kennt das Problem“).

**Investorenbereich:**  
- **Pitchdeck-Gliederung:** Problem & Markt → Lösung (Produkt) → Produkt-Demo Screenshots oder MVP-Vorlage → Geschäftsmodell & Preismodell → Traction (Prototyp, RAG-Daten, Beta-Kundenkontakte) → Wettbewerb (siehe unten) → Finanzplan (Kosten/Erträge) → Team → Risikoabsicherung → Funding-Bedarf & Exit-Möglichkeit.  
- **Investor-Onepager:** Kurzversion: „Bereich LegalTech & AI“, Marktgröße (z.B. „Weltweiter DMS-Markt USD 4 Mrd. + 30% CAGR“), Business-Case, verwertete Assets (proprietäre Workflows, RAG-Inhalte), IP (Software-Knowhow), Ökosystem (n8n, Claude als Partner).  
- **Due-Diligence-Fragen:** Wie stabil ist das Team? Ist die Technologie skalierbar? Gibt es bereits Nachfrage? Wie hoch sind CAC und LTV (Customer Acquisition vs. Customer Lifetime Value)?  
- **Red Flags:** Fehlende Rechtsdokumente (Verträge/AGB/DSGVO) vor Investment – *muss erledigt werden*. Technische Unsicherheit (SSL, SSO, Security Audits). Abhängigkeit von Drittanbietern (z.B. Google APIs, OpenAI-Keys): Hier zeigen wir Multi-Provider-Strategie.  

*Quellen:* Studien oder Branchenreports (z.B. Gartner zu „Digital Workplace“, Business-Insider zur SaaS-Nutzung) ergänzen die Zahlen im Investor Materials.

## 10. Wettbewerbs- und Referenzanalyse  

**Wettbewerbslandkarte:**  
- **Projekt-/Workflow-Tools:** Asana, ClickUp, Wrike – bieten KI-Features, sind aber primär Task-Management mit schwacher DMS/Legal-Ausrichtung.  
- **Dokumenten- und DMS-Lösungen:** Paperless-ngx, DocuWare, ELO – fokussieren auf Scannen & Archiv, wenig KI.  
- **Notizen/Wissens-Dienste:** Notion, Airtable, Coda – bieten flexibles Datenmanagement, Einbindungen, und teilweise AI (z.B. Notion AI in Berichten), aber nicht spezifisch rechtlich/administrativ. Obsidian/Logseq sind privat, mit Plugins (NotebookLM als KI).  
- **RAG-/AI-Agenten:** LangChain, AutoGPT, AgentGPT – sind eher Frameworks als Endprodukte; benötigen Entwickler.  
- **Workflow-Automatisierung:** n8n (open source), Zapier, Make – verbinden Services, aber ohne spezifische KI-Komponente oder Akten-Management.  
- **Kanzlei-/Due-Diligence-Software:** LegalTech-Tools (clio.com, lexoffice, lawmatics) sind spezialisiert auf Rechtsbranche, aber nur Teilaufgaben. VDRs wie Dealroom/Firmex fokussieren auf sichere Datenräume, weniger auf KI.  
- **OAssistant/KIs:** ChatGPT Enterprise (OpenAI), Microsoft Copilot – bieten KI, aber kein inhaltliches Projekt-/Akten-Framework.  

**Kopie vs. eigene Stärken:**  
- **Kopieren/Adoptieren:** Die UI/UX kann sich an Best Practices von Notion/Airtable (flexible Datenbanken) und Zapier (einfacher Trigger/Action) orientieren. Open-Source-Lösungen (n8n, Weaviate, Pinecone) werden integriert, statt komplett neu zu bauen.  
- **Eigenes USP:** Kombination aus legal-/projektspezifischem DMS, Retrieval-KI (RAG) und freiem Workflow-Designer ist einzigartig. Keine „All-in-one“-Suite mit AI-Agents für Aufgabenplanung existiert bislang am Markt. Fokus auf modulare Subdomains (Brieftaschen, Mandate, Orchester) ist besonders.  
- **Open-Source-Andockpunkte:** n8n (Workflow-Automation), Weaviate/Pinecone (Vektor-DB), Claude Code (KI-Agenten), Elloquint-Libraries (juristische NLP), NextAuth.js (SSO), Typora/Electron (falls Desktop-Client).  
- **Buy-vs-Build:** Wo möglich, setzen wir auf bewährte SaaS/OSS (z.B. Google SSO, OpenAI API) statt alles selbst zu entwickeln. Eigenes Know-how stecken wir in die Orchestrierung, Sicherheit, und spezifischen Modulerweiterungen.  

*Vergleichstabelle (Auszug):*

| Feature / Tool           | LICHTREICH (Ziel)                      | Beispiel-Konkurrent    | Unser Vorteil                     |
|--------------------------|-----------------------------------------|------------------------|-----------------------------------|
| Projekt + Dokumente + KI | Ja (integriert)                         | Notion (Projekte) + DMS-Tool getrennt   | Zentral, kein Tool-Switch        |
| Automatisierung / Workflow | n8n-Integration (low-code)             | Zapier/Make            | Open-Source, voll integrierbar    |
| Spezifische Rollen/Zugriff | Mandat-Modul (Granular, rollenspezifisch) | Confluence (Docs only) | höhere Compliance/Legal-Eignung   |
| Wissenssuche (RAG)        | Ja, eigene Vektor-DB                   | Obsidian/LangChain    | Out-of-the-box; keine Bastelei    |
| Community/Partnerschaft   | eigene KI-Society, offene Entwicklung  | Proprietär           | Flexibel erweiterbar, Kosten gering|
| Preis                   | ab 0/9/29 € (Freemium)                  | Asana: ~€13, Wrike: ~€10 | günstiger für SME                  |

## 11. Compliance-/Risiko-Checkliste  

- **DSGVO / Privacy:**  
  - Vorhanden: Einwilligung der Nutzer via Login/Workshop.  
  - Mangelhaft: Offizielle DSGVO-Dokumente (Datenschutzerklärung, AV-Vertrag) für Cloud-Dienst fehlt und muss erstellt werden. (*nächste Aktion:* Anwalt konsultieren).  
  - Vermeiden: Daten von EU-Bürgern in offenem KI-Chat. Keine automatische Profilerstellung ohne Einwilligung.  

- **Sensible Daten:**  
  - Empfehlen: Separate verschlüsselte Vaults für Gesundheits-, Recht- oder Finanzakten.  
  - Risiko: Falls RAG diese Daten nutzt, könnten Rückschlüsse auf Personen gezogen werden. *Maßnahme:* RAG-Daten strikt nach Akte trennen, keine KI-Trainings-Logs mit PII anlegen.  

- **Auftragsverarbeitung:** Verträge mit Service-Providern (z.B. Hosting, Pinecone) müssen AV-Bedingungen erfüllen. Gegebenenfalls EU-Standardvertragsklauseln oder BCR nötig.  

- **Logging & Security:**  
  - Passwort-Logins via Google (2FA von Google eingebaut). Prüfen: Haben wir 2FA/OTP für interne? (mithilfe gängiger Lösungen möglich).  
  - SSL/TLS auf allen Subdomains (Let's Encrypt?).  
  - Audit-Logs über Nutzeraktionen (Löschen, Datenzugriff) sind nicht dokumentiert. Sollten Pflicht sein.  

- **Datenspeicher & Vault:**  
  - Nicht in Demo: Keine echten Patientendaten, Geheimverträge etc.  
  - Alle transiente Daten (Logs, Chatprotokolle) zeitnah löschen oder anonymisieren.  
  - Backups verschlüsseln.  

- **Impressum/AGB:** Vor Livegang benötigen wir komplett ausgearbeitete rechtliche Seiten (Impressum, AGB, Nutzungsbedingungen) – insbesondere wichtig, falls global verfügbar.  

- **Crowdfunding/Investor-Kommunikation:** Kein Halbwissen verbreiten (z.B. Urheberrecht an KI-Antworten ungeklärt). Realistische Versprechen machen, um keine Anleger zu täuschen (Achtung §16 VermAnlG).  

- **Affiliate/Offenlegung:** Klare Kennzeichnung von Affiliate-Links im US-Bereich, Transaktionserfassung nach deutschem Recht.  

- **Claims vermeiden:** Auf Werbung verzichten, die garantierte Ergebnisse verspricht (z.B. “KI löst alle Aufgaben automatisch” wäre unseriös). Keine Verwendung geschützter Begriffe (z.B. „EU-DSGVO-zertifiziert“ ohne Audit).  

- **Notwendige Dokumente:**  
  - Fehlen: Datenschutzrichtlinie, Data-Processing Addendum, Code of Conduct für Partner, SLA-Entwurf.  
  - Anwaltliche Prüfung: AGB + Verträge, Haftungsausschluss (insb. für automatisierte Inhalte).  

## 12. n8n-Workflow-Katalog  

*(Die hier beispielhaft skizzierten Workflows zeigen, was sofort angelegt werden kann; tatsächliche Implementierung benötigt evtl. API-Credentials bzw. Konfiguration.)*

1. **Health Pulse (Täglicher Systemcheck)**  
   - **Zweck:** Überwacht alle Subdomains (Ping, Titel, Auth) und sendet Daily-Report.  
   - **Trigger:** Geplante Ausführung (z.B. jeden Morgen).  
   - **Inputs:** Liste aller Domain-URLs (aus domains.registry.json).  
   - **Logik:** For-Each-Domain: HTTP-Request prüfen, Screenshot generieren (Browser Node), Auth-Flow simulieren (falls möglich), Status speichern. Zusammenfassung per E-Mail an Admin.  
   - **APIs/Subdomains:** LDAP / Auth Endpunkte, `/health` falls vorhanden.  
   - **Fehler:** Domain down → rot markiert, als Slack-Alert / Ticket. Auth-Fehler → Ticket an Dev.  
   - **Auth:** Für interne Health-Endpoints ggf. Service-Account.  
   - **JSON-Erstellbarkeit:** sofort (z.B. Tabler-Trigger).  

2. **BOB-Briefweg (Posteingang-Automation)**  
   - **Zweck:** Eingangsdokumente automatisiert nach RAG-Eintrag abschließen.  
   - **Trigger:** Upload neues Dokument in `briefkasten.lichtreich.info`.  
   - **Inputs:** Dokumenten-URL, Metadaten (Autor, Datum).  
   - **Knoten:** 1) OCR-Node; 2) RAG-Ingest Node (baut Vektor, speichert Quelle); 3) n8n-Node: „Neue Aufgabe im Board anlegen (via Board-API)“. 4) E-Mail-Benachrichtigung an Verantwortlichen.  
   - **APIs/Subdomains:** `briefkasten`, `ingest`, `board`, eventuell `email API`.  
   - **Fehler:** OCR-Fehler → Ticket; RAG-Upload fehlgeschlagen → Retry-Node.  
   - **Auth:** System-Schlüssel für Briefkasten-API, Token für RAG-Datenbank.  
   - **JSON-Erstellbarkeit:** aus dem bestehenden `BOB-Briefweg.n8n.json`.  

3. **Eingang → Interview → Brief**  
   - **Zweck:** Bei Eingang neuer Akte automatisiert Vorab-Interviews und Entwürfe auslösen.  
   - **Trigger:** „Neuer Fall erstellt“ (Webhook/Board).  
   - **Inputs:** Projektnamen, zuständige Personen, erste Dokumente.  
   - **Knoten:** 1) KI-Interview-Node (z.B. per Claude Code, Fragen an Nutzer); 2) KI-Briefentwurf (GPT-4 Prompt mit Kontext); 3) Store-Antwort in Mandats-Akte; 4) Notifikation an Projektleiter.  
   - **APIs/Subdomains:** `society` (KI-Rolle Manager), `briefkasten`, ggf. `chatgpt API`.  
   - **Fehler:** KI-Timeout → neuer Versuch oder auf manuelle Eingriff stellen.  
   - **Auth:** API-Key für KI-Modelle erforderlich.  
   - **JSON:** Teilweise (Grundgerüst skizzierbar, aber KI-Node spezifisch).

4. **Widget-Ticket → Klassifikation**  
   - **Zweck:** Das eingebettete Widget (tickets.lichtreich.info/widget.js) erzeugt Support-Tickets aus Kundenanfragen.  
   - **Trigger:** HTTP POST an `/api/widget` oder E-Mail-Eingang.  
   - **Inputs:** Ticket-Inhalt (Text).  
   - **Knoten:** 1) Text-Analyse (KI/Kategorisierung); 2) Zuweisung (Board/Zuständiger in Mandat); 3) Erstellung Ticket im `tickets`-Modul; 4) Acknowledgement-E-Mail ans Submitting.  
   - **Fehler:** falsches Format (widget gibt 400, wir registrieren trotzdem Ticket und markieren „Klärung nötig“).  
   - **Auth:** API-Token für Ticket-API.  
   - **JSON:** sofort (Widget-Webhook).  

5. **RAG-Ingest → Review → Commit → Verify**  
   - **Zweck:** Qualitätssicherung des Wissensspeichers: Neue Inhalte durchlaufen Mensch-Check.  
   - **Trigger:** Dokument importiert in RAG (Ingest-Tabelle).  
   - **Inputs:** Vektor-IDs, Rohtext.  
   - **Knoten:** 1) Benachrichtigung an Reviewer (Email/Slack); 2) Pull-Request-artige Review-Node (n8n-Frontend); 3) Wenn genehmigt: Move to „committed“-Collection; 4) Warnung wenn seit X Tagen nicht reviewt.  
   - **Fehler:** Ablehnung → Dokument in „Ausschuss“.  
   - **Auth:** Workflow-User mit Bearbeitungsrechten.  
   - **JSON:** möglicherweise (n8n könnte Edit-Forms generieren).  

6. **Newsletter Signup → Tagging → Onboarding-Mail**  
   - **Zweck:** Marketing-Funnel: Neue Leads in Kontaktpflege.  
   - **Trigger:** Webformular Eintrag (HTTPS Request).  
   - **Inputs:** Name, E-Mail, Interessen.  
   - **Knoten:** 1) CRM/DB: neuen Kontakt anlegen; 2) Tag hinzufügen (z.B. „interessiert an Beta“); 3) E-Mail-Versand (siehe Funnel-Mail 1).  
   - **Fehler:** Double-Opt-in fehlt → automatisierter Reminder.  
   - **Auth:** Email-Service (z.B. SendGrid) Credentials.  
   - **JSON:** sofort (Standard-Marketing-Flow).  

7. **Test-User-Bewerbung → Scoring → Einladung**  
   - **Zweck:** Bewerbungen bewerten und passende Kandidaten einladen.  
   - **Trigger:** Webformular auf Test-User-Seite ausgefüllt.  
   - **Inputs:** Bewerber-Info, Use-Case.  
   - **Knoten:** 1) Scoring-Node (regelbasiert, z.B. „Projektgröße über X? Ja/Nein“); 2) Wenn Score > Schwelle: Automatische Einladungsemail (mit Meeting-Link); 3) Sonst: Warteliste-Email. 4) Tag setzen (nächste Round).  
   - **Fehler:** Keine Antwort des Bewerbers → Reminder nach 3 Tagen.  
   - **Auth:** Mail-API, evtl. Kalender-Integration (Google Calendar API).  
   - **JSON:** direkt (einfacher Bewerber-Workflow).  

8. **Affiliate Lead → Partner-CRM → Vertrag/Tracking**  
   - **Zweck:** Neuen Partnerkontakt verwalten.  
   - **Trigger:** Partnerformular ausgefüllt / Empfohlen durch Affiliate-Code.  
   - **Inputs:** Partnerdaten.  
   - **Knoten:** 1) Datenbank-Add (Partner-CRM-Eintrag); 2) Einmal-Mail (Willkommen + Partner-Portal-Link); 3) Folge-Mail (Vertrag digital zusenden); 4) Setze Cookie im System (Tracking-Code generieren).  
   - **Fehler:** Ungültige Email → Manuelle Klärung.  
   - **Auth:** Digitale Vertrags-Plattform (DocuSign/HelloSign).  
   - **JSON:** möglich (Partner-Onboarding-Routine).  

9. **Investor Lead → Datenraum → Follow-up**  
   - **Zweck:** Automatisiertes Interesse-Management für Investoren.  
   - **Trigger:** Newsletter-Link “Investor-Interest” angeklickt.  
   - **Inputs:** Investor E-Mail.  
   - **Knoten:** 1) Eröffne Zugangsberechtigung zum Datenraum (z.B. passwortgeschützt); 2) E-Mail mit Link zum Pitch-Deck; 3) Task für Gründer (Follow-up-Call planen).  
   - **Fehler:** Nicht geklickt → Reminder in 3 Tagen.  
   - **Auth:** Datenraum-Plattform (evtl. Link-Sharing).  
   - **JSON:** planbar (BI/CRM-Workflow).  

10. **Usage-Metering → Upsell-Trigger**  
   - **Zweck:** Überwachung des Tarif-Konsums, automatische Upsell-Prompt.  
   - **Trigger:** Überschreiten von Schwellen (z.B. 80% des Akten-Kontingents).  
   - **Inputs:** Nutzungsstatistik (aus token_usage DB).  
   - **Knoten:** 1) Vergleichstask (80%-Check); 2) E-Mail an Account-Manager (“Kunde X nähert sich Limit”); 3) Optional: Email an Kunden (“Bald X% erreicht, Upgrade anbieten”).  
   - **Fehler:** Unbekannter Nutzer → Support benachrichtigen.  
   - **Auth:** Zugriff auf interne Usage-DB.  
   - **JSON:** Umsetzbar (relativ trivial).  

11. **Public FAQ aus RAG → Review → Publish**  
   - **Zweck:** Dynamische FAQ: Beantwortung häufiger Fragen direkt aus Wissensdatenbank.  
   - **Trigger:** Neue relevante RAG-Artikel oder Endnutzer-Frage.  
   - **Inputs:** Frage oder gefundene Wissensartikel.  
   - **Knoten:** 1) KI-Generierung einer FAQ-Antwort; 2) Review durch Redakteur (n8n-Form); 3) Publizierung in statischem Markdown/Website.  
   - **Fehler:** KI generiert Fehlinfo → Review wird benötigt (Workflow pausiert).  
   - **Auth:** CMS/API-Zugriff.  
   - **JSON:** aufwändig (redaktioneller Prozess).  

12. **Browser-QA → Screenshots → Bugreport**  
   - **Zweck:** Automatisierte UI-Test und Fehlerermittlung über Selenium/Headless.  
   - **Trigger:** Nach jeder Deployment oder täglich im Health-Check.  
   - **Inputs:** URL-Liste der Subdomains (domains.registry).  
   - **Knoten:** 1) Browser-Test-Node (n8n Selenium): Seitenaufruf, Klick durch Anmelde-Flows; 2) Screenshot-Node (erfasst UI); 3) Vergleichs-Node (Check auf bekannte Fehlertexte); 4) Bei Fehler: automatisches Ticket in Ticketsystem plus Screenshots.  
   - **Fehler:** Verbindung abgelehnt oder Ladevorgang bricht ab. Markieren und alerten.  
   - **Auth:** Test-Account-Credentials, ggf. SAML-Simulierung.  
   - **JSON:** anspruchsvoll (braucht Browser-Connector).  

*Hinweis:* Jeder Workflow ist mit Status-Logs versehen. Authentifizierungen (API-Keys, OAuth-Tokens) müssen im n8n sicher hinterlegt sein. Fehler werden typischerweise an `tickets.lichtreich.info` übergeben. Die hier skizzierten Lösungen können größtenteils mit Standard-n8n-Knoten realisiert werden; einige KI-Aufrufe benötigen spezifische API-Keys.

## 13. Browser-QA-Plan  

**Ziel:** Kontinuierliche Prüfung aller öffentlich erreichbaren Dienste von LICHTREICH auf Erreichbarkeit, Funktion und Nutzererlebnis.

- **Schritte:**  
  1. **Subdomain-Liste generieren:** Aus `domains.registry.json` oder DNS-Konfiguration. Z.B.: `api, mcp, board, society, consult, orchestra, mandat, tickets, rag, ingest, briefkasten, herrkuenstler, n8n, setup`.  
  2. **Health Check (rot/gelb/grün):** Für jede URL: HTTP-Status (200/4xx/5xx), SSL-Zertifikat (gültig/abgelaufen), Seitentitel (sucht Schlüsselwort). Grüne Kriterien: HTTP 200+SSL ok + kein „Error“ im Titel. Gelb: HTTP 200 aber UI-Fehler. Rot: HTTP-Fehler.  
  3. **Auth-Flow-Test:** Selektierte Dienste (z.B. `board` oder `tickets`) mit Login (Google OAuth) prüfen. Nutze Bot-Account, simuliere SSO über alle Subdomains. Notiere, ob Session erhalten bleibt (Single Sign-On).  
  4. **UI-Smoke-Test:** Mithilfe eines Headless-Browsers (z.B. n8n Selenium oder Chrome Headless) jede Haupt-Page aufbauen: Prüfe Navigation (Menü-Links funktionieren), sichtbare Fehlermeldungen.  
  5. **Screenshot-Vergleich:** Mache Screenshots (Desktop & mobil). Vergleiche täglich automatische Diff (z.B. mittels psnr oder visual regression).  
  6. **Link-/CTA-Check:** Durchsuche jede Seite nach Broken-Links (404) und prüfe Buttons (z.B. „Jetzt registrieren“ führt zum Setup).  
  7. **Widget-Test:** Betrachte Integration von `tickets.lichtreich.info/widget.js` auf einer Beispielseite. Verifiziere, dass das Skript lädt (HTTP 200) und funktionsfähig ist (via DOM-Simulation).  
  8. **API-Tests:** Falls APIs öffentlich sind, sende Test-Requests (health endpoint oder FAQ-API) und schaue auf Reaktion (JSON-Schema).  

- **Tabelle (Beispiel):**  

| Subdomain               | Status (HTTP/SSL) | Auth-Check (SSO) | UI-Fehler | Screenshot | Handlung     |
|-------------------------|-------------------|------------------|-----------|------------|--------------|
| briefkasten.lichtreich.info | 200/OK & gültig  | Login OK/Session aktiv | –         | Screenshot→compare | –            |
| rag.lichtreich.info        | 200/OK & gültig  | (keine Auth)     | –         | –          | –            |
| tickets.lichtreich.info    | 400/BadReq beim Widget | –            | „lade Tickets…“ msg | –  | Überprüfung Widget |
| orchestra.lichtreich.info  | 200/OK (Titel: generisch) | –     | „0 Rollen live“ | – | Rollen-Anbindung prüfen |
| herrkuenstler.lichtreich.info | 200/OK (Titel generisch) | – | – | – | Titel/Branding fixen |
| …                        |                   |                  |           |            |              |

- **Akzeptanzkriterien:** Jede Hauptseite muss innerhalb 5 Sek. laden, alle Schlüsselfunktionen (Login, Haupt-Buttons) müssen reagieren. Ein Ausfall → Ticket an DevOps.  

- **Bugreport-Template (Ticket):**  
  - Kurze Beschreibung (z.B. „Login / Setup-Page 404-Fehler“).  
  - URL / Subdomain, Zeitpunkt, Umgebung (Browser/OS).  
  - Screenshot/log (falls vorhanden).  
  - Schritte zur Reproduktion (z.B. „Beim Klick auf Login-Button“).  
  - Erwartetes Verhalten vs. Beobachtetes.  

- **R/G/Y-Logik:**  
  - **Grün:** Kein Fehler. Seite lädt, Grundfunktionen arbeiten.  
  - **Gelb:** Leichte Mängel (z.B. Platzhalter-Titel, fehlendes Logo, „Beta“ Markierungen).  
  - **Rot:** Schwere Fehler (Service offline, 5xx, kritische API aus).  
  - Täglich wird ein Report in Slack gepostet; Rot-Alerts lösen sofort Tickets aus.  

*Dieser QA-Plan kann automatisiert mit n8n (oder einem CI/CD-Pipeline-Tool) implementiert und täglich ausgeführt werden, um die Qualität von Änderungen zu sichern.*  

## 14. Evidence-Matrix (Beispiele)  

| Behauptung                                                    | Quelle                               | Status      | Benötigter Beweis          | Nächste Aktion                  |
|---------------------------------------------------------------|--------------------------------------|-------------|----------------------------|---------------------------------|
| LICHTREICH steigert Produktivität durch integrierte Plattform | Deloitte Insights<br>Haiilo Blog | belegt      | -                          | Claim als Website-Zitat nutzen. |
| *Alle* Subdomains über einen Login nutzbar                      | *Internal documentation*             | teilweise   | Nachweis, dass SSO auf allen funktioniert | SSO-Test durchführen, Dokumentation aktualisieren. |
| KI-Society für Projektmanagement (Rollen-Agenten)              | *Produkt-Roadmap / vision doc*      | Vision      | Konkrete Use-Cases         | Whitepaper “KI-Agenten-Personas” erstellen. |
| Google OAuth ist implementiert                                | auth-strategie.md (intern)          | belegt      | Log-In-Verifiz./Audit      | Interne QA: Multi-Provider-Login testen. |
| RAG-Wissensdatenbank mit ~1700 Einträgen existiert            | Handbuch (RAG ingest)               | belegt      | Code/DB-Check: Vektoranzahl | Regelmäßiges RAG-Update, evtl. Skript. |
| Wechsel zwischen Subdomains erhält Nutzer-Session (SSO)       | Konflikt-Doku (auth-strategie.md)    | offen       | Tests mit mehreren Seiten  | Browsertest-Workflow implementieren. |
| Briefkasten-Modul funktioniert (Scan/OCR)                     | Handbuch (Briefkasten Workflow)      | teilweise   | Benutzer-Testlauf          | Automatischer Test-Dokument-Upload. |
| User können eigene Keys nutzen (BYOK)                         | Freemium-Doku                        | belegt      | UI-Dokumentation           | Onboarding-Assistent erweitern. |
| Sicherheit: DSGVO-konforme Datenlöschung möglich              | konzeptionell                       | offen       | Prozessbeschreibung        | Umsetzung von „Daten-Delete“ bei Mandat implementieren. |
| Wettbewerber bieten keine End-to-End-Lösung                   | Marktstudie (Zapier.com, Haiilo.com) | belegt      | Vergleichsmatrix (oben)    | Gliedern für Pitch-Deck.        |
| Preise sind wettbewerbsfähig (ähnlich Branchentarife)        | Zapier: Asana $13.49, Hive $7 | belegt      | Wechselkursanzeige         | Preistabelle finalisieren.       |

Jede Zeile zeigt einen Prüfpunkt: *Behauptung* (was wir kommunizieren), *Quelle* (Dokumentation oder externe Studie), *Status* (belegt, teilweise, Vision, offen), *benötigter Beweis* und *nächste Aktion*. Dieser Backlog hilft zu entscheiden, welche Claims sofort publizierbar sind (grün) und wo wir noch Tests oder Dokumente nachreichen müssen (rot). 

**Quellenangaben:**  
- Interne Quellen aus Uploads: (häufig Dokumentnamen abgekürzt im Matrix, z.B. `auth-strategie.md`).  
- Externe Benchmarks: Zapier Comparison, Deloitte/Haiilo Studien. 

  
