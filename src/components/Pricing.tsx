import { motion } from 'motion/react';

const plans = [
  {
    name: "Frei",
    price: "0 €",
    desc: "Akte testen, eigener Key oder Gratis-Provider, lokaler/Pfad-basierter Output.",
    limits: "Begrenzt auf wenige Akten/Briefe pro Monat. Keine teuren Provider-Fallbacks.",
    color: "bg-bauhaus-white"
  },
  {
    name: "Basis",
    price: "~9 €",
    period: "/Monat",
    desc: "Erstes produktives Arbeiten mit Plattform-Fallback und einfachen Connectoren.",
    limits: "Klare Quoten für Token, Speicher und Automationsläufe.",
    color: "bg-bauhaus-yellow"
  },
  {
    name: "Pro",
    price: "~29 €",
    period: "/Monat",
    desc: "Voller Fall-Loop, kollaborative Rechte, E-Mail-/Storage-Integration, priorisierte Ausführung.",
    limits: "Fair-Use sauber definiert, teure Modelle optional zuschaltbar.",
    color: "bg-bauhaus-red",
    textColor: "text-bauhaus-white"
  },
  {
    name: "Whitelabel",
    price: "Individuell",
    desc: "Eigener Namespace, eigenes Kostenmodell, eigene Secrets und eigene Governance.",
    limits: "Enterprise Governance, dedizierte Architektur.",
    color: "bg-bauhaus-black",
    textColor: "text-bauhaus-white"
  }
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-white">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl md:text-7xl mb-6 uppercase">Bring your own key.<br/>Oder Plattform-Fallback.</h2>
          <p className="text-xl font-medium">
            Ein belastbares Preismodell, das Einstiegshürde, Kostenkontrolle und Partnerfähigkeit vereint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`p-8 border-4 border-bauhaus-black flex flex-col justify-between hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] ${plan.color} ${plan.textColor || 'text-bauhaus-black'}`}
            >
              <div>
                <h3 className="text-3xl font-display uppercase tracking-tight mb-2 border-b-4 border-current pb-4">{plan.name}</h3>
                <div className="my-6">
                  <span className="text-5xl font-bold font-display tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="font-mono text-sm ml-2">{plan.period}</span>}
                </div>
                <p className="font-sans font-medium mb-8 leading-snug">{plan.desc}</p>
              </div>
              <div className={`p-4 border-2 ${plan.textColor ? 'border-bauhaus-white' : 'border-bauhaus-black'} font-mono text-xs`}>
                <span className="block font-bold mb-1 uppercase">Begrenzungen:</span>
                {plan.limits}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
