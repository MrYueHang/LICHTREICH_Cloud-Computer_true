import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    q: "Was ist LICHTREICH und für wen ist es gedacht?",
    a: "Ein integriertes Cloud-Toolset für Projekt- und Aktenmanagement, das KI-Funktionalität einbindet. Es richtet sich an Personen und Teams mit komplexen Dokumenten- und Prozessanforderungen."
  },
  {
    q: "Benötige ich eigene API-Keys?",
    a: "Nein, man kann mit kostenlosen Modellen starten. Für intensiven Gebrauch empfiehlt sich aber ein eigener Key (Bring Your Own Key), damit Kosten und Datenschutz besser kontrolliert werden."
  },
  {
    q: "Wie sicher sind meine Daten?",
    a: "Sensitive Daten speichern Sie in geschützten Akten und Vaults, nicht im öffentlichen Chat. Das System unterstützt Multi-Faktor-Login und trennt Produktionsdaten von 'KI-Freigaben'."
  },
  {
    q: "Gibt es eine Free-Variante?",
    a: "Ja, der Frei-Tarif kostet 0€. Man nutzt öffentliche KI-Provider und eigene Keys, und ist auf Basisfunktionen limitiert (lokaler Output)."
  },
  {
    q: "Wie unterscheidet sich LICHTREICH von ChatGPT oder Claude?",
    a: "Wir bauen keine 'KI für alles' und keinen generischen Chatbot. LICHTREICH ist eine orchestrierte Fall- und Aktenmaschine. Die KI ist nur der Motor für eine feste Betriebskette: Eingang → Analyse → Interview → Briefe → Akte."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-gray">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-6xl mb-12 uppercase text-center">Häufige Fragen (FAQ)</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-4 border-bauhaus-black bg-bauhaus-white shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-bauhaus-yellow transition-colors"
              >
                <span className="font-display font-bold text-xl uppercase pr-8">{faq.q}</span>
                <span className="font-mono text-2xl font-bold">{openIndex === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 font-sans font-medium text-lg border-t-4 border-bauhaus-black">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
