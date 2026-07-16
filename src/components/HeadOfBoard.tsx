import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Project {
  subdomain: string;
  title: string;
  status: string;
  tags?: string[];
}

export default function HeadOfBoard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('board'); // 'board' or 'whiteboard'

  useEffect(() => {
    fetch('https://api.lichtreich.info/api/v1/projects')
      .then(r => r.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-gray overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase">Head of Board</h2>
          <p className="text-xl font-medium">
            Live-Übersicht der Systemlandschaft und freies Whiteboard.
          </p>
        </div>

        <div className="flex gap-4 mb-8 font-display uppercase font-bold text-xl">
          <button 
            onClick={() => setActiveTab('board')}
            className={`px-8 py-4 border-4 border-bauhaus-black transition-colors ${activeTab === 'board' ? 'bg-bauhaus-black text-bauhaus-white' : 'bg-bauhaus-white hover:bg-bauhaus-yellow text-bauhaus-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]'}`}
          >
            System Reiter
          </button>
          <button 
            onClick={() => setActiveTab('whiteboard')}
            className={`px-8 py-4 border-4 border-bauhaus-black transition-colors ${activeTab === 'whiteboard' ? 'bg-bauhaus-black text-bauhaus-white' : 'bg-bauhaus-white hover:bg-bauhaus-yellow text-bauhaus-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]'}`}
          >
            Whiteboard
          </button>
        </div>

        {activeTab === 'board' && (
          <div className="bg-bauhaus-white border-4 border-bauhaus-black p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]">
            {loading ? (
              <div className="font-mono uppercase animate-pulse">Lade Projekte...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <motion.div 
                    key={p.subdomain}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-2 border-bauhaus-black p-4 bg-bauhaus-gray flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-display font-bold uppercase text-xl truncate pr-2">{p.title}</h3>
                        <div className={`w-3 h-3 rounded-full shrink-0 border border-bauhaus-black ${p.status === 'live' ? 'bg-[#00ff00]' : p.status === 'wip' ? 'bg-bauhaus-yellow' : 'bg-bauhaus-red'}`} title={`Status: ${p.status}`} />
                      </div>
                      <div className="font-mono text-xs mb-4 uppercase opacity-70 break-all">
                        {p.subdomain}.lichtreich.info
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.tags?.map(t => (
                          <span key={t} className="px-2 py-1 bg-bauhaus-white border border-bauhaus-black text-[10px] font-mono uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto border-t-2 border-bauhaus-black pt-4">
                      <div className="font-mono text-[10px] uppercase mb-2">Dialog (KI-Loop)</div>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Vorschlag..." className="flex-1 border-2 border-bauhaus-black px-2 py-1 text-sm focus:outline-none focus:bg-bauhaus-yellow" />
                        <button className="bg-bauhaus-black text-bauhaus-white px-3 py-1 font-bold hover:bg-bauhaus-red transition-colors text-sm">✓</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'whiteboard' && (
          <div className="bg-[#f0f0f0] border-4 border-bauhaus-black h-[600px] shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] relative overflow-hidden flex items-center justify-center bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:20px_20px]">
            <motion.div 
              drag
              dragMomentum={false}
              className="absolute top-20 left-20 bg-bauhaus-yellow border-4 border-bauhaus-black p-6 w-64 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] cursor-grab active:cursor-grabbing"
            >
              <h4 className="font-display font-bold uppercase mb-2 border-b-2 border-bauhaus-black pb-2">Notiz</h4>
              <p className="font-sans text-sm font-medium">Dies ist ein freies Whiteboard (Drag & Drop). Später wird dies an Akten & Tasks gekoppelt.</p>
            </motion.div>
            
            <motion.div 
              drag
              dragMomentum={false}
              className="absolute top-40 right-40 bg-bauhaus-white border-4 border-bauhaus-black p-6 w-64 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] cursor-grab active:cursor-grabbing"
            >
              <h4 className="font-display font-bold uppercase mb-2 border-b-2 border-bauhaus-black pb-2 text-bauhaus-red">Architektur</h4>
              <p className="font-sans text-sm font-medium">Head of Board ist die lebende Landkarte.</p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
