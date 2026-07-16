import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Briefkasten from './pages/Briefkasten';
import Cockpit from './pages/Cockpit';
import Me from './pages/Me';
import DateiManager from './pages/DateiManager';
import ProzessBoard from './pages/ProzessBoard';
import EinrichtungsAssistent from './pages/EinrichtungsAssistent';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/briefkasten" element={<Briefkasten />} />
          <Route path="/cockpit" element={<Cockpit />} />
          <Route path="/me" element={<Me />} />
          <Route path="/datei-manager" element={<DateiManager />} />
          <Route path="/prozess-board" element={<ProzessBoard />} />
          <Route path="/setup" element={<EinrichtungsAssistent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
