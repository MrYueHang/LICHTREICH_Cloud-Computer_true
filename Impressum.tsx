import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Impressum() {
  return (
    <div className="min-h-screen flex flex-col bg-bauhaus-white text-bauhaus-black">
      <header className="border-b-8 border-bauhaus-black p-6">
        <Link to="/" className="font-display font-bold uppercase hover:text-bauhaus-red transition-colors flex items-center gap-2">
          <span>← Zurück</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl mb-12 uppercase border-b-8 border-bauhaus-black pb-4">Impressum</h1>
        <div className="font-sans space-y-6 text-lg font-medium">
          <p>
            <strong>Angaben gemäß § 5 TMG:</strong><br />
            LICHTREICH Cloud-Computer<br />
            (Dies ist ein Platzhalter. Bitte echte Unternehmensdaten eintragen.)<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
          <p>
            <strong>Vertreten durch:</strong><br />
            Max Mustermann
          </p>
          <p>
            <strong>Kontakt:</strong><br />
            Telefon: +49 (0) 123 44 55 66<br />
            E-Mail: info@lichtreich.info
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
