import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, setDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Network, Plus, Settings, Play, CheckCircle2, AlertCircle, MessageSquare, GripHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Workflow {
  slug: string;
  title: string;
  steps: string[];
}

interface NodeLayout {
  id: string; // e.g. bob-briefweg_upload
  workflow_slug: string;
  step: string;
  x: number;
  y: number;
}

interface Execution {
  id: string;
  workflow_slug: string;
  step: string;
  status: 'running' | 'ok' | 'error';
  message?: string;
}

const INITIAL_WORKFLOWS: Workflow[] = [
  { slug: 'bob-briefweg', title: 'BOB Briefweg', steps: ['upload', 'ocr', 'classify', 'strategy', 'draft', 'finalize'] },
  { slug: 'datei-analyse', title: 'Datei Analyse', steps: ['upload', 'classify', 'relevanz', 'frist'] },
];

export default function ProzessBoard() {
  const { user, loading: authLoading } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [layout, setLayout] = useState<Record<string, NodeLayout>>({});
  const [executions, setExecutions] = useState<Record<string, Execution>>({});
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [pingMessage, setPingMessage] = useState('');
  const boardRef = useRef<HTMLDivElement>(null);

  // Seed workflows and load
  useEffect(() => {
    if (!user) return;
    
    const seedAndLoad = async () => {
      const wfSnap = await getDocs(collection(db, 'workflows'));
      if (wfSnap.empty) {
        // Seed
        for (const wf of INITIAL_WORKFLOWS) {
          await setDoc(doc(db, 'workflows', wf.slug), wf);
        }
      }
      
      const unsubscribeWf = onSnapshot(collection(db, 'workflows'), (snap) => {
        const wfs: Workflow[] = [];
        snap.forEach(d => wfs.push(d.data() as Workflow));
        setWorkflows(wfs);
      });
      return unsubscribeWf;
    };
    
    const unsubPromise = seedAndLoad();
    return () => {
      unsubPromise.then(unsub => unsub && unsub());
    };
  }, [user]);

  // Load layout
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'board_layout'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const newLayout: Record<string, NodeLayout> = {};
      snap.forEach(d => {
        const data = d.data() as NodeLayout;
        newLayout[data.id] = data;
      });
      setLayout(newLayout);
    });
    return unsubscribe;
  }, [user]);

  // Load executions
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(collection(db, 'executions'), (snap) => {
      const newExecs: Record<string, Execution> = {};
      snap.forEach(d => {
        const data = d.data() as Execution;
        // Key by workflow_slug + step for easy lookup
        newExecs[`${data.workflow_slug}_${data.step}`] = data;
      });
      setExecutions(newExecs);
    });
    return unsubscribe;
  }, [user]);

  // Initialize node layout if missing
  useEffect(() => {
    if (!user || workflows.length === 0) return;
    
    workflows.forEach((wf, wfIndex) => {
      wf.steps.forEach((step, stepIndex) => {
        const nodeId = `${wf.slug}_${step}`;
        if (!layout[nodeId]) {
          // Add default layout
          setDoc(doc(db, 'board_layout', nodeId), {
            id: nodeId,
            workflow_slug: wf.slug,
            step,
            x: 100 + stepIndex * 250,
            y: 100 + wfIndex * 200
          });
        }
      });
    });
  }, [workflows, layout, user]);

  const handleDragEnd = async (nodeId: string, info: any) => {
    if (!layout[nodeId] || !user) return;
    
    // Calculate new position relative to current state
    const newX = layout[nodeId].x + info.offset.x;
    const newY = layout[nodeId].y + info.offset.y;
    
    // Update local state optimistically to prevent jump
    setLayout(prev => ({
      ...prev,
      [nodeId]: { ...prev[nodeId], x: newX, y: newY }
    }));
    
    // Save to firestore
    await updateDoc(doc(db, 'board_layout', nodeId), {
      x: newX,
      y: newY
    });
  };

  const handlePing = async (nodeId: string) => {
    if (!pingMessage.trim() || !user) return;
    
    // Fire and forget to n8n webhook
    fetch("https://n8n.lichtreich.info/webhook/board-ping", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        node_id: nodeId,
        message: pingMessage,
        owner_id: user.uid,
        meta: { app: 'prozess-board', ts: new Date().toISOString() }
      })
    }).catch(console.error);

    // Optimistic status update
    const [wf_slug, step] = nodeId.split('_');
    await setDoc(doc(db, 'executions', `ping_${nodeId}`), {
      workflow_slug: wf_slug,
      step: step,
      status: 'running',
      message: 'KI antwortet...'
    });

    setPingMessage('');
    setSelectedNode(null);
  };

  // Generate edges
  const edges = [];
  for (const wf of workflows) {
    for (let i = 0; i < wf.steps.length - 1; i++) {
      const fromId = `${wf.slug}_${wf.steps[i]}`;
      const toId = `${wf.slug}_${wf.steps[i+1]}`;
      if (layout[fromId] && layout[toId]) {
        edges.push({
          id: `${fromId}-${toId}`,
          from: layout[fromId],
          to: layout[toId]
        });
      }
    }
  }

  if (authLoading) return <div className="p-8 font-mono font-bold uppercase">Lade System...</div>;
  if (!user) return <div className="p-8 font-mono font-bold uppercase">Bitte anmelden</div>;

  return (
    <div className="h-screen w-full flex flex-col bg-bauhaus-white overflow-hidden">
      <header className="border-b-8 border-bauhaus-black bg-bauhaus-white px-6 py-4 flex justify-between items-center z-50 shadow-sm shrink-0">
        <div className="flex items-center gap-6">
          <Link to="/cockpit" className="inline-block bg-bauhaus-black text-bauhaus-white font-mono text-xs font-bold px-3 py-1 uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors">
            ← Cockpit
          </Link>
          <h1 className="text-2xl font-display font-black uppercase flex items-center gap-3">
            <Network className="text-bauhaus-red" />
            N8N-STYLE PROZESS-BOARD
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 border-2 border-bauhaus-black font-mono text-xs uppercase flex items-center gap-2 bg-bauhaus-yellow text-bauhaus-black font-bold">
            <div className="w-2 h-2 bg-bauhaus-black rounded-full animate-pulse" />
            Live Sync
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Library */}
        <aside className="w-64 border-r-8 border-bauhaus-black bg-bauhaus-gray p-6 flex flex-col shrink-0 z-40">
          <h2 className="font-display font-black uppercase mb-6 text-xl">Bibliothek</h2>
          <div className="space-y-4">
            {workflows.map(wf => (
              <div key={wf.slug} className="border-4 border-bauhaus-black bg-bauhaus-white p-3 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] transition-all cursor-grab">
                <div className="font-display font-bold uppercase text-sm">{wf.title}</div>
                <div className="font-mono text-[10px] opacity-60 uppercase">{wf.steps.length} Steps</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1 relative overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]" ref={boardRef}>
          {/* SVG for Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map(edge => {
              const startX = edge.from.x + 100; // rough center of 200px node
              const startY = edge.from.y + 40;
              const endX = edge.to.x + 100;
              const endY = edge.to.y + 40;
              // Draw simple curve
              const path = `M ${startX} ${startY} C ${startX + 100} ${startY}, ${endX - 100} ${endY}, ${endX} ${endY}`;
              return (
                <path 
                  key={edge.id}
                  d={path}
                  fill="none"
                  stroke="#111"
                  strokeWidth="4"
                  className="animate-dash"
                  strokeDasharray="10, 10"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {Object.values(layout).map(node => {
            const exec = executions[`${node.workflow_slug}_${node.step}`];
            let statusColor = 'bg-bauhaus-white';
            if (exec?.status === 'running') statusColor = 'bg-bauhaus-yellow';
            if (exec?.status === 'ok') statusColor = 'bg-[#00A36C] text-bauhaus-white';
            if (exec?.status === 'error') statusColor = 'bg-bauhaus-red text-bauhaus-white';

            return (
              <motion.div
                key={node.id}
                drag
                dragMomentum={false}
                onDragEnd={(e, info) => handleDragEnd(node.id, info)}
                initial={{ x: node.x, y: node.y }}
                animate={{ x: node.x, y: node.y }}
                className={`absolute w-[200px] border-4 border-bauhaus-black p-3 cursor-grab active:cursor-grabbing shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] z-10 ${statusColor}`}
                style={{ top: 0, left: 0 }}
              >
                <div className="flex justify-between items-center mb-2 border-b-2 border-bauhaus-black/20 pb-2">
                  <span className="font-mono text-[10px] uppercase font-bold opacity-80 flex items-center gap-1">
                    <GripHorizontal size={12} />
                    {node.workflow_slug}
                  </span>
                  {exec?.status === 'running' && <Play size={12} className="animate-pulse" />}
                  {exec?.status === 'ok' && <CheckCircle2 size={12} />}
                  {exec?.status === 'error' && <AlertCircle size={12} />}
                </div>
                <h3 className="font-display font-black uppercase text-lg leading-tight mb-2">{node.step}</h3>
                
                {exec?.message && (
                  <div className="font-mono text-[10px] mt-2 border-t-2 border-dashed border-bauhaus-black/30 pt-1">
                    {exec.message}
                  </div>
                )}

                <div className="mt-3 flex justify-end">
                  <button 
                    onPointerDown={(e) => e.stopPropagation()} // prevent drag
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                    className="p-1 hover:bg-black/10 rounded transition-colors"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>

                <AnimatePresence>
                  {selectedNode === node.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="absolute top-full left-0 mt-4 w-64 bg-bauhaus-white border-4 border-bauhaus-black p-4 z-50 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] text-bauhaus-black"
                    >
                      <h4 className="font-mono text-xs font-bold uppercase mb-2 flex items-center gap-2">
                        <MessageSquare size={14} /> KI am Knoten anpingen
                      </h4>
                      <textarea 
                        value={pingMessage}
                        onChange={e => setPingMessage(e.target.value)}
                        placeholder="Was macht dieser Step?"
                        className="w-full h-20 p-2 border-2 border-bauhaus-black font-sans text-sm mb-2 resize-none focus:outline-none focus:bg-bauhaus-yellow"
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setSelectedNode(null)} className="px-2 py-1 font-mono text-xs uppercase font-bold hover:bg-gray-200">Abbruch</button>
                        <button onClick={() => handlePing(node.id)} className="bg-bauhaus-blue text-bauhaus-white px-3 py-1 font-mono text-xs uppercase font-bold border-2 border-bauhaus-black hover:bg-bauhaus-yellow hover:text-bauhaus-black">Fragen</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-dash {
          animation: dash 20s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}} />
    </div>
  );
}
