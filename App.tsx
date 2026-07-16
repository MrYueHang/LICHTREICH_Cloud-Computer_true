import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Briefkasten from './pages/Briefkasten';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/briefkasten" element={<Briefkasten />} />
      </Routes>
    </BrowserRouter>
  );
}
