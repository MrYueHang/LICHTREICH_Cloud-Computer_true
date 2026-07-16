import Hero from './components/Hero';
import Workflow from './components/Workflow';
import Modules from './components/Modules';
import StatusMatrix from './components/StatusMatrix';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Workflow />
      <Modules />
      <StatusMatrix />
      <Pricing />
      <Footer />
    </main>
  );
}
