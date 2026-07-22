import { motion } from 'motion/react';

const statusItems = [
  { topic: "briefkasten", status: "beta", desc: "Foto/PDF, Hinweise brüchig", eval: "Issue #1+#2 grün → live" },
  { topic: "rag/ingest", status: "evidence offen", desc: "Route, Ingest und Retrieval nicht gemeinsam belegt", eval: "Health + Ingest + Retrieval-Test" },
  { topic: "orchestra", status: "pilot", desc: "0 Rollen live", eval: "Echte Rollen aus Society (Issue #8)" },
  { topic: "mandat", status: "alpha", desc: "Rechtsreview + Beleg-Upload (Issue #6)", eval: "Juristisches Review nötig" },
  { topic: "setup", status: "beta", desc: "Eigene Produkttür + SSO (Issue #3+#4)", eval: "Rollout" },
  { topic: "n8n", status: "verknüpft", desc: "Execution-Layer vorhanden; Workflow-Evidence getrennt", eval: "Flow für Flow prüfen" }
];

export default function StatusMatrix() {
  return (
    <section id="status" className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-black text-bauhaus-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-6xl mb-12 uppercase text-center">IST → SOLL (Live)</h2>
        
        <div className="border-4 border-bauhaus-white overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b-4 border-bauhaus-white font-display text-xl uppercase bg-bauhaus-white text-bauhaus-black">
                <th className="p-6">Modul</th>
                <th className="p-6">IST</th>
                <th className="p-6">SOLL (Kriterium für live)</th>
              </tr>
            </thead>
            <tbody>
              {statusItems.map((item, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="border-b-2 border-bauhaus-white/30 last:border-0 hover:bg-bauhaus-white/10 transition-colors"
                >
                  <td className="p-6 font-display text-xl uppercase">{item.topic}</td>
                  <td className="p-6 font-mono text-sm font-bold">
                    <span className={`px-4 py-2 border-4 inline-flex items-center justify-center uppercase tracking-widest ${
                      item.status === 'live' 
                        ? 'bg-bauhaus-yellow text-bauhaus-black border-bauhaus-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]' 
                        : item.status === 'beta' || item.status === 'pilot' || item.status === 'verknüpft'
                        ? 'bg-bauhaus-blue text-bauhaus-white border-bauhaus-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' 
                        : 'bg-bauhaus-red text-bauhaus-white border-bauhaus-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="mb-1 font-medium">{item.desc}</div>
                    <div className="text-xs font-mono opacity-70 uppercase tracking-widest">{item.eval}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center max-w-3xl mx-auto border-l-4 border-bauhaus-yellow pl-6 text-left">
          <p className="font-mono text-sm leading-relaxed">
            Harte Kommunikationsregel: „live wird" heißt: Tests grün (Happy Path + Fehlerfall) + Doppel-Review.
          </p>
        </div>
      </div>
    </section>
  );
}
