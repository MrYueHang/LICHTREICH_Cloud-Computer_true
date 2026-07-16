import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layout, User, Shield, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b-8 border-bauhaus-black bg-bauhaus-white sticky top-0 z-50 shadow-[0px_8px_0px_0px_rgba(17,17,17,1)]">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-3xl font-display font-black uppercase tracking-tighter hover:text-bauhaus-blue transition-colors">
          LICHTREICH <span className="font-light">Cloud</span>
        </Link>
        
        {/* Modul-Navi — die ganze Reihe */}
        <nav className="flex flex-wrap gap-2 font-mono text-xs font-bold uppercase justify-center">
          <Link to="/me" className="px-3 py-1 flex items-center gap-2 border-2 border-bauhaus-black bg-bauhaus-yellow hover:bg-[#E5C100] transition-colors shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            <User className="w-4 h-4" /> Mein Bereich
          </Link>
          <Link to="/briefkasten" className="px-3 py-1 flex items-center gap-2 border-2 border-bauhaus-black bg-bauhaus-white hover:bg-bauhaus-yellow transition-colors">
            📮 Briefkasten
          </Link>
          <Link to="/datei-manager" className="px-3 py-1 flex items-center gap-2 border-2 border-bauhaus-black bg-bauhaus-white hover:bg-bauhaus-yellow transition-colors">
            🗂️ Datei-Manager
          </Link>
          <Link to="/prozess-board" className="px-3 py-1 flex items-center gap-2 border-2 border-bauhaus-black bg-bauhaus-white hover:bg-bauhaus-yellow transition-colors">
            <Globe className="w-4 h-4" /> Prozess-Board
          </Link>
          <Link to="/setup" className="px-3 py-1 flex items-center gap-2 border-2 border-bauhaus-black bg-bauhaus-white hover:bg-bauhaus-yellow transition-colors">
            <Shield className="w-4 h-4" /> Einrichten
          </Link>
          <Link to="/cockpit" className="px-3 py-1 flex items-center gap-2 border-2 border-bauhaus-black bg-bauhaus-black text-bauhaus-white hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            <Layout className="w-4 h-4" /> Cockpit
          </Link>
        </nav>

        {/* Mobile / Direct Login */}
        <Link to="/me" className="lg:hidden px-4 py-2 border-4 border-bauhaus-black font-display font-bold uppercase text-sm bg-bauhaus-yellow shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          Login / User
        </Link>
      </div>
    </header>
  );
}
