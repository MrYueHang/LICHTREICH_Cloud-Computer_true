import { motion } from 'motion/react';

const modules = [
  { name: "briefkasten", desc: "Dokumenteingang, OCR, Suche, Tags, Multi-User-Rechte", status: "live", tag: "DMS Kern" },
  { name: "rag", desc: "pgvector, OpenAI-Embeddings, semantische Wissenssuche", status: "live", tag: "Wissensschicht" },
  { name: "orchestra", desc: "Modellpluralität, Provider-Fallback, LLM-Routing", status: "live", tag: "KI-Orchestrierung" },
  { name: "mandat", desc: "Rollen-/Mandatssteuerung, Form, Freiwilligkeit, Laufzeit", status: "rollout", tag: "Rechte" },
  { name: "n8n", desc: "Workflow-Automation, Execution-Layer für Dossiers", status: "live", tag: "Automation" },
  { name: "setup", desc: "Plattform-SSO, Connectoren, API-Key Verwaltung", status: "rollout", tag: "Infrastruktur" },
  { name: "dms", desc: "Papiere-Archiv: Scan, deutsche OCR, Tags, Volltext (Paperless-ngx)", status: "live", tag: "Selfhosted-Reihe" },
  { name: "whiteboard", desc: "Excalidraw-Zeichenbrett für Boards und Skizzen", status: "live", tag: "Selfhosted-Reihe" },
  { name: "pdf", desc: "PDF-Werkbank: teilen, drehen, komprimieren, signieren (Stirling)", status: "live", tag: "Selfhosted-Reihe" },
  { name: "formulare", desc: "Geführte Interviews werden fertige Dokumente (docassemble)", status: "live", tag: "Selfhosted-Reihe" },
  { name: "crm", desc: "Kontakte, Firmen, Pipelines (Twenty)", status: "live", tag: "Selfhosted-Reihe" },
  { name: "metabase", desc: "Zahlen-Boards direkt auf der Neon-Datenbank", status: "live", tag: "Selfhosted-Reihe" },
];

export default function Modules() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-8 border-bauhaus-black pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl mb-4">Modul-Architektur</h2>
            <p className="text-xl max-w-2xl font-mono">Die modulare Subdomain-Landschaft unter *.lichtreich.info</p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4 font-mono text-sm font-bold uppercase">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-bauhaus-yellow border-2 border-bauhaus-black"></span> Live</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-bauhaus-blue border-2 border-bauhaus-black"></span> Rollout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, i) => (
            <motion.a
              key={mod.name}
              href={`https://${mod.name}.lichtreich.info`}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`p-8 border-4 border-bauhaus-black shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex flex-col justify-between no-underline text-inherit hover:bg-bauhaus-yellow/40 ${mod.status === 'live' ? 'bg-bauhaus-yellow/20' : 'bg-bauhaus-blue/10'}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-display uppercase tracking-tight">{mod.name}</h3>
                  <span className={`px-2 py-1 text-xs font-mono font-bold uppercase border-2 border-bauhaus-black ${mod.status === 'live' ? 'bg-bauhaus-yellow' : 'bg-bauhaus-blue text-white'}`}>
                    {mod.status}
                  </span>
                </div>
                <p className="font-sans font-medium mb-6">{mod.desc}</p>
              </div>
              <div className="font-mono text-xs uppercase font-bold border-t-2 border-bauhaus-black pt-4">
                {mod.tag}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
