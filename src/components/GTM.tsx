import { motion } from 'motion/react';

const funnelSteps = [
  { step: "1", title: "Warteliste", desc: "Sichern Sie sich den Zugang zum Alpha-Start." },
  { step: "2", title: "Test-User", desc: "Geschlossene Testphase für ausgewählte Profile." },
  { step: "3", title: "Design Partner", desc: "Enge Zusammenarbeit bei der Entwicklung von Spezialmodulen." },
  { step: "4", title: "Bezahlte Pilotgruppe", desc: "Erster produktiver Einsatz im Basis- und Pro-Tarif." },
  { step: "5", title: "Partner & Affiliate", desc: "Offenes Programm für Multiplikatoren und Berater." },
  { step: "6", title: "Whitelabel", desc: "Eigener Namespace und dedizierte Architektur für Enterprise." },
  { step: "7", title: "Investor Layer", desc: "Skalierung der Infrastruktur und Markterschließung." }
];

export default function GTM() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-white overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase">Der Weg zur Freigabe</h2>
          <p className="text-xl font-medium max-w-2xl">
            Unser Go-To-Market Funnel. Wir bauen transparent und skalieren in klaren Stufen, von der Warteliste bis zum Whitelabel-Einsatz.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical line connecting steps on desktop */}
          <div className="hidden md:block absolute left-[3.5rem] top-0 bottom-0 w-2 bg-bauhaus-black"></div>
          
          <div className="space-y-8 relative z-10">
            {funnelSteps.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="w-16 h-16 shrink-0 bg-bauhaus-black text-bauhaus-white font-display font-bold text-2xl flex items-center justify-center border-4 border-bauhaus-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] z-10">
                  {item.step}
                </div>
                <div className="flex-1 border-4 border-bauhaus-black p-6 bg-bauhaus-gray shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                  <h3 className="font-display font-bold text-2xl uppercase mb-2">{item.title}</h3>
                  <p className="font-sans font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
