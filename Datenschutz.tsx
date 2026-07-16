import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col bg-bauhaus-white text-bauhaus-black">
      <header className="border-b-8 border-bauhaus-black p-6">
        <Link to="/" className="font-display font-bold uppercase hover:text-bauhaus-red transition-colors flex items-center gap-2">
          <span>← Zurück</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl mb-12 uppercase border-b-8 border-bauhaus-black pb-4">Datenschutz</h1>
        <div className="font-sans space-y-6 text-lg font-medium">
          <p>
            <strong>Allgemeiner Hinweis und Pflichtinformationen</strong><br />
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p>
            Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen für die Warteliste) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
          </p>
          <p>
            <strong>Datenerfassung auf unserer Website</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
          </p>
          <p>
            <strong>Warteliste</strong><br />
            Wenn Sie sich für unsere Warteliste eintragen, speichern wir die von Ihnen angegebene E-Mail-Adresse, um Sie über Neuigkeiten und den Start unserer Dienste zu informieren. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
