import { motion } from 'motion/react';

const workflows = [
  { 
    slug: "bob-briefweg", 
    title: "BOB-Briefweg", 
    status: "alpha", 
    purpose: "Kern-Loop der Fall- und Aktenmaschine. Übernimmt die Verarbeitungskette mit OCR, Klassifikation & Entwurf.",
    schema: "schemas/bob-briefweg.json",
    color: "bg-bauhaus-red",
    textColor: "text-bauhaus-white"
  },
  { 
    slug: "rag-datenfutter", 
    title: "RAG-Datenfutter", 
    status: "live", 
    purpose: "Ingest→Embedding Routine. Saubere Referenz-Vorlage für Wissensspeisung.",
    schema: "schemas/workflow.schema.json",
    color: "bg-bauhaus-yellow",
    textColor: "text-bauhaus-black"
  },
  { 
    slug: "vertragsvergleich", 
    title: "Vertragsvergleich", 
    status: "pilot", 
    purpose: "Juristische Due-Diligence und Abgleich zweier Dokumentenstände.",
    schema: "schemas/workflow.schema.json",
    color: "bg-bauhaus-blue",
    textColor: "text-bauhaus-white"
  }
];

export default function WorkflowCards() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase">n8n-Workflow-Landschaft</h2>
          <p className="text-xl font-medium border-l-8 border-bauhaus-black pl-6">
            Live-Instanzen der orchestrierten Vorgänge, basierend auf der Product-Truth Metastruktur.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflows.map((wf, i) => (
            <motion.div 
              key={wf.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-4 border-bauhaus-black shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex flex-col group cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] transition-all bg-bauhaus-gray"
            >
              <div className={`p-6 border-b-4 border-bauhaus-black flex justify-between items-start ${wf.color} ${wf.textColor}`}>
                <h3 className="text-2xl font-display font-bold uppercase truncate pr-4">{wf.title}</h3>
                <span className={`text-[10px] uppercase font-mono font-bold px-2 py-1 border-2 ${wf.textColor === 'text-bauhaus-white' ? 'border-bauhaus-white' : 'border-bauhaus-black'}`}>
                  {wf.status}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="font-sans font-medium mb-6 text-lg">{wf.purpose}</p>
                <div className="border-t-2 border-bauhaus-black pt-4 font-mono text-xs uppercase opacity-70">
                  SCHEMA: {wf.schema}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
