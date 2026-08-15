export type Project = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  result: string;
  accent: string;
  linkLabel: string;
  linkHref: string;
};

export const portfolioContent = {
  meta: {
    title: 'Stefan Busse | Immersive Frontend Engineering & WebGL',
    description:
      'Stefan Busse entwickelt immersive digitale Produkte: klare Interfaces, bewegte Systeme und WebGL-Erlebnisse mit Substanz.',
  },
  profile: {
    name: '[PLATZHALTER: Name einsetzen]',
    role: 'Senior Creative Frontend Engineer · WebGL · UX',
    location: '[PLATZHALTER: Standort einsetzen]',
    intro:
      'Ich baue digitale Räume, die sich nicht wie Folien anfühlen. Systeme werden verständlich, wenn Struktur, Bewegung und Sprache dieselbe Richtung haben.',
    bio:
      '[PLATZHALTER: 3 bis 5 Sätze zur Biografie, Spezialisierung und Arbeitsweise einsetzen.]',
    email: 'replace-before-launch@example.com',
    availability: '[PLATZHALTER: Verfügbarkeit einsetzen]',
  },
  process: [
    { number: '01', title: 'Orientieren', text: 'Ziel, Kontext und Reibung sichtbar machen.' },
    { number: '02', title: 'Verdichten', text: 'Komplexität in eine belastbare Struktur übersetzen.' },
    { number: '03', title: 'Inszenieren', text: 'Interaktion so einsetzen, dass sie Bedeutung trägt.' },
    { number: '04', title: 'Verankern', text: 'Performance, Accessibility und Content zuerst fertig machen.' },
  ],
  skills: [
    { label: 'Interface systems', detail: 'React · TypeScript · responsive architecture', tone: 'coral' },
    { label: 'Spatial web', detail: 'WebGL · CSS 3D · shaders · motion language', tone: 'cyan' },
    { label: 'Experience design', detail: 'UX flows · editorial hierarchy · prototyping', tone: 'lilac' },
    { label: 'Delivery craft', detail: 'performance budgets · QA · resilient fallbacks', tone: 'acid' },
  ],
  projects: [
    {
      id: 'lichtreich', index: '01', eyebrow: 'Orchestrated case work', title: 'LICHTREICH Cloud-Computer',
      summary: 'Eine modulare Arbeitsumgebung für komplexe Akten, Vorgänge und Projekte.',
      problem: 'Wissen, Dokumente, Rollen und nächste Schritte liegen oft in verschiedenen Werkzeugen und verlieren unterwegs ihren Zusammenhang.',
      solution: 'Eine visuelle Betriebskette macht aus Eingang, Analyse, Interview, Dokument und Ausgang einen nachvollziehbaren Arbeitsraum.',
      role: 'Product direction · UX · frontend architecture', stack: ['React', 'TypeScript', 'Vite', 'Workflow thinking'],
      result: 'Ein eigenständiger Einstieg in ein System, das Komplexität nicht versteckt, sondern navigierbar macht.', accent: 'coral', linkLabel: 'System ansehen', linkHref: '#contact',
    },
    {
      id: 'context-atlas', index: '02', eyebrow: 'Knowledge interface concept', title: 'Context Atlas',
      summary: 'Ein sinnstiftender Layer für unsortierte Dokumente, Entscheidungen und offene Fäden.',
      problem: 'Relevante Notizen existieren, aber niemand sieht sofort, was Quelle, Entscheidung, Idee oder nächster Schritt ist.',
      solution: 'Dokumente werden als lesbare Fäden inszeniert: Quelle, Status, Beziehung und Handlung bleiben zusammen sichtbar.',
      role: 'Information architecture · interaction concept · content model', stack: ['Content graph', 'Traceability', 'Progressive disclosure'],
      result: 'Aus losem Material entsteht ein klarer Anker für weitere Produkt- und Redaktionsarbeit.', accent: 'cyan', linkLabel: 'Kontext öffnen', linkHref: '#context',
    },
    {
      id: 'future-atelier', index: '03', eyebrow: 'Creative technology lab', title: 'Future Atelier',
      summary: 'Experimentelle Webräume zwischen Skizze, Bauhaus-Geometrie und lebender Oberfläche.',
      problem: 'Visuelle Experimente sehen schnell spektakulär aus, bleiben aber ohne klare Aufgabe austauschbar.',
      solution: 'Jede Bewegung bekommt eine semantische Rolle: Orientierung, Fokus, Übergang oder Atmosphäre.',
      role: 'Creative frontend · motion direction · prototyping', stack: ['WebGL studies', 'Motion systems', 'Sketch language'],
      result: 'Eine visuelle Sprache, die handgemacht wirkt, ohne Lesbarkeit und robuste Nutzung zu opfern.', accent: 'lilac', linkLabel: 'Werkstatt öffnen', linkHref: '#contact',
    },
  ] satisfies Project[],
  contextThreads: [
    { label: 'Quelle', value: 'Dokumente und Notizen', mark: 'A' },
    { label: 'Kanon', value: 'Entscheidungen und Begriffe', mark: 'B' },
    { label: 'Build', value: 'Oberflächen und nächste Schritte', mark: 'C' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/MrYueHang', note: '[PLATZHALTER: Profil prüfen]' },
    { label: 'LinkedIn', href: '#contact', note: '[PLATZHALTER: URL einsetzen]' },
    { label: 'Instagram / Are.na', href: '#contact', note: '[PLATZHALTER: URL einsetzen]' },
  ],
};
