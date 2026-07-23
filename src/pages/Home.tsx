import Header from '../components/Header';
import Hero from '../components/Hero';
import Workflow from '../components/Workflow';
import WorkflowCards from '../components/WorkflowCards';
import Modules from '../components/Modules';
import HeadOfBoard from '../components/HeadOfBoard';
import Personas from '../components/Personas';
import StatusMatrix from '../components/StatusMatrix';
import GTM from '../components/GTM';
import Connectors from '../components/Connectors';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Workflow />
      <WorkflowCards />
      <StatusMatrix />
      <HeadOfBoard />
      <Modules />
      <Personas />
      <Connectors />
      <Pricing />
      <GTM />
      <FAQ />
      <Footer />
    </main>
  );
}
