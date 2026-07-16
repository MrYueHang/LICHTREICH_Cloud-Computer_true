import { motion } from 'motion/react';

const personas = [
  {
    role: "Kanzleien / Legal",
    problem: "Hohe Aktenlast, Deadlines, teure Spezialsoftware.",
    solution: "Vollautomatisierte DMS und Due-Diligence. Mandate an einem Ort, KI hilft bei Zusammenfassungen.",
    color: "border-bauhaus-red",
    bg: "bg-bauhaus-red text-bauhaus-white"
  },
  {
    role: "Immobilien / Makler",
    problem: "Komplexe Projekte, viele Dokumente, lange Entscheidungsprozesse.",
    solution: "Projekt-Dashboard von der Akquise bis zum Verkauf. KI sucht Risiken, Terminorganisation.",
    color: "border-bauhaus-yellow",
    bg: "bg-bauhaus-yellow text-bauhaus-black"
  },
  {
    role: "Kreative / Agenturen",
    problem: "Ideen verstreut, wenig Struktur, aufwendige Kampagnenlogistik.",
    solution: "Kreativ-Hub mit KI. Ideensammlung via RAG, automatischer Content-Entwurf, Marken-Management.",
    color: "border-bauhaus-blue",
    bg: "bg-bauhaus-blue text-bauhaus-white"
  },
  {
    role: "KMUs / Verwaltung",
    problem: "Verwaltung vielfältig, wenig IT-Ressourcen.",
    solution: "All-in-One-Admin-Tool. Finanzen, Verträge und Projekte über Shared-Workspace, Audit-Trails.",
    color: "border-bauhaus-black",
    bg: "bg-bauhaus-black text-bauhaus-white"
  }
];

export default function Personas() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase">Für wen bauen wir das?</h2>
          <p className="text-xl font-medium max-w-2xl">
            Vom Management-Berater über den Startup-Gründer bis zum Immobilienmakler. 
            Jeder nutzt die Module, die sein Hauptproblem lösen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personas.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`border-4 border-bauhaus-black flex flex-col shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]`}
            >
              <div className={`p-6 border-b-4 border-bauhaus-black ${p.bg}`}>
                <h3 className="text-2xl font-display uppercase tracking-tight">{p.role}</h3>
              </div>
              <div className="p-6 bg-bauhaus-gray flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  <div className="font-mono text-xs uppercase opacity-60 mb-2">Schmerzpunkt</div>
                  <p className="font-sans font-medium">{p.problem}</p>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase opacity-60 mb-2">Lösung (Betriebskette)</div>
                  <p className="font-sans font-bold">{p.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
