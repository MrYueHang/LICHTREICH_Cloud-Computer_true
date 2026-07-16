import { motion } from 'motion/react';

const steps = [
  { id: "01", title: "Eingang", desc: "Post verstehen und klassifizieren.", color: "bg-bauhaus-white" },
  { id: "02", title: "Analyse", desc: "Nichts Wichtiges übersehen.", color: "bg-bauhaus-yellow" },
  { id: "03", title: "Interview", desc: "Rückfragen strukturieren.", color: "bg-bauhaus-red", textColor: "text-bauhaus-white" },
  { id: "04", title: "Entwurf", desc: "Aus Dokumenten Akten machen.", color: "bg-bauhaus-blue", textColor: "text-bauhaus-white" },
  { id: "05", title: "Ausgang", desc: "Versionieren und Automatisieren.", color: "bg-bauhaus-white" },
];

export default function Workflow() {
  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-gray relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase">Nicht „KI für alles“.<br/>Sondern orchestrierte Vorgänge.</h2>
          <p className="text-xl md:text-2xl font-medium border-l-8 border-bauhaus-black pl-6">
            Jeder Vorgang wird zur Akte, und jede Akte durchläuft dieselbe Kette. 
            Eine echte Differenzierung durch arbeitslogische Architektur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border-4 border-bauhaus-black p-6 flex flex-col justify-between min-h-[250px] ${step.color} ${step.textColor || 'text-bauhaus-black'} ${index !== 0 ? 'md:-ml-1' : ''} relative group hover:z-10 hover:shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-all`}
            >
              <div className="font-mono text-3xl font-bold border-b-4 border-current pb-2 mb-4">
                {step.id}
              </div>
              <div>
                <h3 className="text-2xl mb-2 uppercase">{step.title}</h3>
                <p className="font-sans font-medium text-sm leading-tight">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
