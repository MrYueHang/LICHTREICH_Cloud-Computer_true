import React from 'react';
import { motion } from 'motion/react';
import { Network, Database, Brain, Globe, Shield, Activity, Zap, Cpu, Server, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cockpit() {
  return (
    <div className="min-h-screen bg-bauhaus-black text-bauhaus-white font-sans selection:bg-bauhaus-yellow selection:text-bauhaus-black pb-24">
      {/* Header */}
      <header className="border-b-4 border-bauhaus-white/20 bg-bauhaus-black px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-display font-black uppercase tracking-tighter hover:text-bauhaus-yellow transition-colors">
          LICHTREICH <span className="font-light">Orchestra</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="font-mono text-xs uppercase opacity-50 hidden md:block">System Status: Nominal</div>
          <div className="px-4 py-2 border-2 border-bauhaus-white font-mono text-xs uppercase flex items-center gap-2 bg-bauhaus-white text-bauhaus-black">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Admin / System
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12">
        <div className="mb-16 border-l-8 border-bauhaus-yellow pl-8">
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-4">
            Das Orchester Board
          </h1>
          <p className="text-xl font-medium max-w-3xl opacity-80 leading-relaxed font-mono">
            Zentrale Übersicht aller LICHTREICH Cloud-Module, Agenten und Datenströme. 
            Hier laufen die Fäden aus den Subdomains zusammen.
          </p>
        </div>

        {/* The Multiverse Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Node 1: Me (User) */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-bauhaus-yellow transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-yellow opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Globe className="w-8 h-8 mb-6 text-bauhaus-yellow" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">me.lichtreich</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">User-Ebene / Heimat</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Einstiegstor für Mandanten und Nutzer. Zugriff auf Briefkasten, Herrkünstler und eigene Akten.
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-mono text-xs uppercase">Live</span>
              <Link to="/me" className="ml-auto font-mono text-xs font-bold uppercase hover:text-bauhaus-yellow">→ Öffnen</Link>
            </div>
          </div>

          {/* Node 2: Briefkasten */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-bauhaus-blue transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-blue opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Zap className="w-8 h-8 mb-6 text-bauhaus-blue" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">briefkasten</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">Input-Pipeline</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Dokumenteneingang, OCR und KI-Vorverarbeitung. Triggert n8n-Workflows.
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-mono text-xs uppercase">Live</span>
              <Link to="/briefkasten" className="ml-auto font-mono text-xs font-bold uppercase hover:text-bauhaus-blue">→ Öffnen</Link>
            </div>
          </div>

          {/* Node 2.5: Datei-Manager */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-bauhaus-yellow transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-yellow opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Folder className="w-8 h-8 mb-6 text-bauhaus-yellow" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">Datei-Manager</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">Werkbank</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Dokumente analysieren, übersetzen, verschieben und die KI anpingen.
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-mono text-xs uppercase">Live</span>
              <Link to="/datei-manager" className="ml-auto font-mono text-xs font-bold uppercase hover:text-bauhaus-yellow">→ Öffnen</Link>
            </div>
          </div>

          {/* Node 3: n8n */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-bauhaus-red transition-colors bg-bauhaus-white/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-red opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Network className="w-8 h-8 mb-6 text-bauhaus-red" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">n8n Prozess-Board</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">System-Ebene / Automation</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Das Herzstück. Orchestriert asynchrone Workflows, LLM-Calls (Claude/Gemini) und APIs.
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-mono text-xs uppercase">Live</span>
              <Link to="/prozess-board" className="ml-auto font-mono text-xs font-bold uppercase hover:text-bauhaus-red">→ Öffnen</Link>
            </div>
          </div>

          {/* Node 4: RAG */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-[#00A36C] transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00A36C] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Database className="w-8 h-8 mb-6 text-[#00A36C]" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">rag.lichtreich</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">Data-Ebene / Memory</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Wissensdatenbank, Embeddings und Vektor-Suche. Gefüttert von n8n und Akten.
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="font-mono text-xs uppercase text-yellow-500">Wait for Spec</span>
            </div>
          </div>

          {/* Node 5: Mandat */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-bauhaus-white transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Shield className="w-8 h-8 mb-6 text-bauhaus-white" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">mandat.lichtreich</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">Admin-Ebene / Security</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Rechte, Rollen, Mandatsverwaltung und Audit-Logs (Product-Truth Backend).
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="font-mono text-xs uppercase text-yellow-500">Wait for Spec</span>
            </div>
          </div>
          
          {/* Node 6: Hub */}
          <div className="border-4 border-bauhaus-white p-6 relative overflow-hidden group hover:border-purple-500 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
            <Server className="w-8 h-8 mb-6 text-purple-500" />
            <h2 className="text-2xl font-display font-bold uppercase mb-2">Einrichtungs-Assistent</h2>
            <div className="font-mono text-xs uppercase mb-6 opacity-60">Integration-Ebene</div>
            <p className="text-sm opacity-80 mb-8 min-h-[60px]">
              Verwaltung nativer Connectoren (Google Workspace, IMAP, etc.) mit ehrlicher Lampe.
            </p>
            <div className="flex gap-4 items-center mt-auto border-t-2 border-bauhaus-white/20 pt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-mono text-xs uppercase">Live</span>
              <Link to="/setup" className="ml-auto font-mono text-xs font-bold uppercase hover:text-purple-500">→ Öffnen</Link>
            </div>
          </div>

        </div>
        
        {/* Architecture Map Visualization */}
        <div className="mt-24 border-4 border-bauhaus-white p-8 bg-bauhaus-white/5">
          <h3 className="text-2xl font-display font-bold uppercase mb-8 border-b-4 border-bauhaus-white/20 pb-2">Architektur Flow</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-center">
            
            <div className="border-2 border-bauhaus-yellow p-4 w-full md:w-1/4">
              <Globe className="w-6 h-6 mx-auto mb-2 text-bauhaus-yellow" />
              <div className="font-bold text-bauhaus-yellow mb-1">FRONTEND</div>
              <div className="opacity-70">AI Studio (React/Tailwind)</div>
            </div>
            
            <div className="text-bauhaus-yellow">→</div>
            
            <div className="border-2 border-bauhaus-blue p-4 w-full md:w-1/4">
              <Database className="w-6 h-6 mx-auto mb-2 text-bauhaus-blue" />
              <div className="font-bold text-bauhaus-blue mb-1">STATE</div>
              <div className="opacity-70">Firebase (Firestore/Auth)</div>
            </div>
            
            <div className="text-bauhaus-red">→</div>
            
            <div className="border-2 border-bauhaus-red p-4 w-full md:w-1/4">
              <Network className="w-6 h-6 mx-auto mb-2 text-bauhaus-red" />
              <div className="font-bold text-bauhaus-red mb-1">BACKEND / WORKFLOWS</div>
              <div className="opacity-70">n8n.lichtreich.info</div>
            </div>
            
            <div className="text-[#00A36C]">→</div>
            
            <div className="border-2 border-[#00A36C] p-4 w-full md:w-1/4">
              <Brain className="w-6 h-6 mx-auto mb-2 text-[#00A36C]" />
              <div className="font-bold text-[#00A36C] mb-1">INTELLIGENCE</div>
              <div className="opacity-70">LLMs, RAG, Agents</div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
