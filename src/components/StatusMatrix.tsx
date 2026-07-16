import { motion } from 'motion/react';

const statusItems = [
  { topic: "Kernarchitektur", status: "Live", desc: "13 Dienste unter *.lichtreich.info sind definiert.", eval: "Verifiziert intern" },
  { topic: "RAG-Schicht", status: "Live", desc: "Ingest→Embedding→RAG-Loop mit pgvector und OpenAI.", eval: "Stark verifiziert" },
  { topic: "BOB-Workflow", status: "Beta", desc: "Reale Verarbeitungskette mit OCR, Klassifikation & Entwurf.", eval: "Funktional vorhanden" },
  { topic: "Auth/SSO", status: "Rollout", desc: "Google-OAuth und Rollen live; globaler SSO im teilweisen Rollout.", eval: "Teilweise verifiziert" },
  { topic: "Connectoren", status: "Offen", desc: "Eigene KI-Keys live; Drive/Dropbox OAuth und IMAP noch offen.", eval: "Teilweise verifiziert" },
  { topic: "Mandat/Rechte", status: "Alpha", desc: "Modelliert (Form, Freiwilligkeit), juristisches Review nötig.", eval: "Noch nicht freigabereif" }
];

export default function StatusMatrix() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-black text-bauhaus-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-6xl mb-12 uppercase text-center">Evidenz & Wahrheit</h2>
        
        <div className="border-4 border-bauhaus-white overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b-4 border-bauhaus-white font-display text-xl uppercase bg-bauhaus-white text-bauhaus-black">
                <th className="p-6">Bereich</th>
                <th className="p-6">Stand</th>
                <th className="p-6">Befund</th>
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
                    <span className={`px-3 py-1 border-2 border-bauhaus-white inline-block ${item.status === 'Live' ? 'bg-bauhaus-yellow text-bauhaus-black' : item.status === 'Beta' || item.status === 'Rollout' ? 'bg-bauhaus-blue' : 'bg-bauhaus-red'}`}>
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
            Harte Kommunikationsregel: Öffentlich belastbar sind die modulare Subdomain-Landschaft, der Dokumentkern, der RAG-Layer und Workflow-JSONs. Wir verzichten bewusst auf Marketing-Claims wie „ein Login für alles“ oder „juristisch fertig“, bis diese Ebenen vollständig freigegeben sind.
          </p>
        </div>
      </div>
    </section>
  );
}
