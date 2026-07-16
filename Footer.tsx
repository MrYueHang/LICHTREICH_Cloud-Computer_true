import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bauhaus-black text-bauhaus-white py-16 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-6">
          <h2 className="text-4xl font-display uppercase tracking-tight mb-6">LICHTREICH<br/>Cloud-Computer</h2>
          <p className="font-mono text-sm max-w-sm mb-8 opacity-80">
            Wir bauen keinen generischen Agenten-Builder, sondern eine arbeitslogische Fall- und Aktenmaschine für komplexe Vorgänge.
          </p>
          <div className="w-16 h-4 bg-bauhaus-red border-2 border-bauhaus-white"></div>
        </div>

        <div className="md:col-span-3 font-mono text-sm uppercase">
          <h4 className="font-bold mb-6 text-bauhaus-yellow tracking-widest border-b-2 border-bauhaus-white/30 pb-2">Go-to-Market</h4>
          <ul className="space-y-4">
            <li className="line-through opacity-50">Warteliste</li>
            <li>Test-User</li>
            <li className="opacity-50">Design Partner</li>
            <li className="opacity-50">Pilotgruppe</li>
            <li className="opacity-50">Whitelabel</li>
          </ul>
        </div>

        <div className="md:col-span-3 font-mono text-sm uppercase">
          <h4 className="font-bold mb-6 text-bauhaus-blue tracking-widest border-b-2 border-bauhaus-white/30 pb-2">Dienste</h4>
          <ul className="space-y-4">
            <li>briefkasten.lichtreich.info</li>
            <li>rag.lichtreich.info</li>
            <li>orchestra.lichtreich.info</li>
            <li>mandat.lichtreich.info</li>
            <li>n8n.lichtreich.info</li>
          </ul>
        </div>

      </div>
      <div className="container mx-auto mt-16 pt-8 border-t-4 border-bauhaus-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-xs uppercase items-start">
        <div className="lg:col-span-2">© 2026 LICHTREICH Cloud-Computer</div>
        <div className="flex flex-col space-y-2">
          <span className="opacity-50 mb-2">Rechtliches</span>
          <Link to="/impressum" className="hover:text-bauhaus-yellow transition-colors hover:translate-x-1 inline-block">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-bauhaus-yellow transition-colors hover:translate-x-1 inline-block">Datenschutz</Link>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="opacity-50 mb-2">System</span>
          <a href="#betriebskette" className="hover:text-bauhaus-yellow transition-colors hover:translate-x-1 inline-block">Architektur</a>
          <a href="#" className="hover:text-bauhaus-yellow transition-colors hover:translate-x-1 inline-block">Status</a>
        </div>
      </div>
    </footer>
  );
}
