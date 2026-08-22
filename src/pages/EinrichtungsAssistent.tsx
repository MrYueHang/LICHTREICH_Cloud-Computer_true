import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Shield, Key, HardDrive, Mail, Calendar, CheckCircle2, AlertCircle, Loader2, Server, ArrowRight } from 'lucide-react';
import {
  INITIAL_CONNECTORS_STATE,
  containsUnsafeConnectorFields,
  fetchSetupCapabilities,
  fetchSystemConnectorStatuses,
  isSafePersistedConnectorsState,
  normalizeConnectorsState,
  toPersistedConnectorsState,
  verifyConnector,
  type ConnectorType,
  type ConnectorsState,
  type SafeConnectorStatus,
  type SystemConnectorStatus
} from '../lib/setupConnectors';

export default function EinrichtungsAssistent() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [adminView, setAdminView] = useState(false);
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [systemConnectors, setSystemConnectors] = useState<SystemConnectorStatus[]>([]);
  const [systemStatusError, setSystemStatusError] = useState('');
  const [persistenceWarning, setPersistenceWarning] = useState('');
  const [connectors, setConnectors] = useState<ConnectorsState>(INITIAL_CONNECTORS_STATE);
  const [aiProvider, setAiProvider] = useState('gemini');
  const aiKeyInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    const loadConnectors = async () => {
      try {
        const docRef = doc(db, 'users', user.uid, 'settings', 'connectors');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const rawState = snap.data();
          const safeState = normalizeConnectorsState(rawState);
          setConnectors(safeState);

          // Existing Studio builds may have persisted data.key. Overwrite that
          // legacy document immediately with the strict safe projection.
          if (containsUnsafeConnectorFields(rawState) || !isSafePersistedConnectorsState(rawState)) {
            await setDoc(docRef, toPersistedConnectorsState(safeState));
          }
        }
      } catch {
        // Firestore availability does not turn a connector green. The local
        // view remains safe and can be retried after rules/config are fixed.
      }
    };
    loadConnectors();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchSetupCapabilities(() => user.getIdToken()).then((result) => {
      setCapabilities(result.capabilities);
      if (!result.capabilities.includes('system.connectors.read')) setAdminView(false);
    });
  }, [user]);

  const saveConnectors = async (newState: ConnectorsState) => {
    if (!user) return;
    const safeState = normalizeConnectorsState(newState);
    setConnectors(safeState);
    try {
      await setDoc(
        doc(db, 'users', user.uid, 'settings', 'connectors'),
        toPersistedConnectorsState(safeState)
      );
      setPersistenceWarning('');
    } catch {
      setPersistenceWarning('Der sichere Status konnte nicht in Firestore gespeichert werden. Die aktuelle Anzeige gilt nur für diese Sitzung.');
    }
  };

  const testConnector = async (type: ConnectorType, provider: string, secret?: string) => {
    if (!user) return;
    setConnectors((current) => ({
      ...current,
      [type]: { provider, configured: false, lamp: 'testing' }
    }));

    const result = await verifyConnector({
      type,
      provider,
      secret,
      getIdToken: () => user.getIdToken()
    });
    await saveConnectors({ ...connectors, [type]: result });
  };

  const testAiConnector = () => {
    const secret = aiKeyInput.current?.value ?? '';
    if (aiKeyInput.current) aiKeyInput.current.value = '';
    void testConnector('ai', aiProvider, secret);
  };

  const toggleAdminView = async () => {
    if (!capabilities.includes('system.connectors.read')) return;
    if (adminView) {
      setAdminView(false);
      return;
    }

    setSystemStatusError('');
    setAdminView(true);
    try {
      setSystemConnectors(await fetchSystemConnectorStatuses(() => user.getIdToken()));
    } catch {
      setSystemConnectors([]);
      setSystemStatusError('System-Connectoren wurden serverseitig nicht freigegeben oder sind nicht erreichbar.');
    }
  };

  const renderLamp = (status: SafeConnectorStatus) => {
    if (status.lamp === 'idle') return <div className="w-8 h-8 rounded-full border-4 border-bauhaus-black bg-bauhaus-gray flex items-center justify-center font-bold text-xs">?</div>;
    if (status.lamp === 'testing') return <Loader2 className="w-8 h-8 text-bauhaus-blue animate-spin" />;
    if (status.lamp === 'green') return <CheckCircle2 className="w-8 h-8 text-[#00A36C]" />;
    if (status.lamp === 'red') return <AlertCircle className="w-8 h-8 text-bauhaus-red" />;
  };

  const renderConnectorMessage = (status: SafeConnectorStatus, success: string) => {
    if (status.lamp === 'red') {
      return (
        <div className="bg-bauhaus-red text-bauhaus-white p-4 font-mono text-sm font-bold border-4 border-bauhaus-black uppercase">
          Nicht verifiziert: {status.error ?? 'Verbindung fehlgeschlagen.'}
        </div>
      );
    }
    if (status.lamp === 'green') {
      return (
        <div className="bg-[#00A36C] text-bauhaus-white p-4 font-mono text-sm font-bold border-4 border-bauhaus-black uppercase">
          {success}
        </div>
      );
    }
    return null;
  };

  if (authLoading) return <div className="p-8 font-mono font-bold uppercase">Lade System...</div>;
  if (!user) {
    return (
      <div className="min-h-screen bg-bauhaus-white flex items-center justify-center p-8">
        <div className="bg-bauhaus-red border-8 border-bauhaus-black p-8 text-bauhaus-white max-w-md w-full shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
          <h1 className="font-display font-black text-4xl mb-4 uppercase">Login fehlt</h1>
          <p className="font-mono text-sm font-bold mb-8">Schritt 0: Bitte zuerst einloggen.</p>
          <Link to="/cockpit" className="bg-bauhaus-black text-bauhaus-white px-6 py-3 font-bold uppercase inline-block hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors">
            Zum Cockpit
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'KI (BYO-Key)', icon: <Key size={20} /> },
    { id: 2, title: 'Speicher', icon: <HardDrive size={20} /> },
    { id: 3, title: 'E-Mail', icon: <Mail size={20} /> },
    { id: 4, title: 'Kalender', icon: <Calendar size={20} /> },
    { id: 5, title: 'Abschluss', icon: <CheckCircle2 size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-bauhaus-white flex flex-col font-sans">
      <header className="bg-bauhaus-black text-bauhaus-white p-6 flex justify-between items-center border-b-8 border-bauhaus-blue z-10 shrink-0">
        <div>
          <h1 className="text-2xl font-display font-black uppercase tracking-tight flex items-center gap-3">
            <Shield className="text-bauhaus-blue" />
            Einrichtungs-Assistent
          </h1>
          <div className="font-mono text-xs uppercase mt-1 opacity-70">Schritt für Schritt (überspringbar)</div>
        </div>
        <button 
          onClick={() => void toggleAdminView()}
          disabled={!capabilities.includes('system.connectors.read')}
          title={capabilities.includes('system.connectors.read') ? 'Serverseitig freigegebener Systembereich' : 'Keine serverseitige System-Capability'}
          className={`px-4 py-2 border-2 font-mono text-xs font-bold uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${adminView ? 'bg-bauhaus-red border-bauhaus-red text-bauhaus-white' : 'border-bauhaus-white hover:bg-bauhaus-white hover:text-bauhaus-black'}`}
        >
          {adminView ? 'Systembereich: AN' : capabilities.includes('system.connectors.read') ? 'Systembereich' : 'Nur User-Bereich'}
        </button>
      </header>

      {/* Progress Bar */}
      <div className="bg-bauhaus-gray border-b-4 border-bauhaus-black p-4 flex gap-2 md:gap-4 overflow-x-auto">
        {steps.map(s => (
          <button 
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase whitespace-nowrap transition-colors border-2 ${
              step === s.id ? 'bg-bauhaus-black text-bauhaus-white border-bauhaus-black' : 
              step > s.id ? 'bg-[#00A36C] text-bauhaus-white border-[#00A36C]' : 
              'bg-bauhaus-white border-bauhaus-black text-bauhaus-black opacity-50 hover:opacity-100'
            }`}
          >
            {s.icon}
            {s.id}. {s.title}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          {persistenceWarning && (
            <div className="mb-6 bg-bauhaus-yellow text-bauhaus-black border-4 border-bauhaus-black p-4 font-mono text-xs font-bold uppercase">
              {persistenceWarning}
            </div>
          )}
          {adminView ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-bauhaus-red text-bauhaus-white border-8 border-bauhaus-black p-8 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
              <div className="flex items-center gap-4 mb-6">
                <Server className="w-12 h-12" />
                <h2 className="text-4xl font-display font-black uppercase leading-none">System<br/>Connectoren</h2>
              </div>
              <p className="font-mono text-sm mb-8 bg-bauhaus-black/20 p-4 border-l-4 border-bauhaus-white">
                Dieser Bereich wurde durch eine serverseitige Capability freigegeben. Status wird nie aus einem lokalen Schalter abgeleitet.
              </p>

              {systemStatusError && (
                <div className="bg-bauhaus-black text-bauhaus-white p-4 mb-4 border-4 border-bauhaus-white font-mono text-xs font-bold uppercase">
                  {systemStatusError}
                </div>
              )}

              <div className="space-y-4">
                {systemConnectors.map((connector) => (
                  <div key={connector.id} className="bg-bauhaus-white text-bauhaus-black p-4 border-4 border-bauhaus-black flex justify-between items-center gap-4">
                    <div>
                      <h3 className="font-bold uppercase text-lg">{connector.label}</h3>
                      <div className="font-mono text-xs opacity-60">
                        {connector.state === 'VERIFIED' ? 'Verifiziert' : `Unbekannt: ${connector.reasonCode ?? 'kein Healthcheck'}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {connector.consoleUrl && (
                        <a href={connector.consoleUrl} target="_blank" rel="noreferrer" className="bg-bauhaus-blue text-bauhaus-white px-4 py-2 font-mono text-xs font-bold uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors">Console öffnen</a>
                      )}
                      {connector.state === 'VERIFIED'
                        ? <CheckCircle2 className="w-8 h-8 text-[#00A36C]" />
                        : <AlertCircle className="w-8 h-8 text-bauhaus-red" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-bauhaus-white border-8 border-bauhaus-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-display font-black uppercase leading-tight">Schritt 1:<br/>KI Verbinden</h2>
                    {renderLamp(connectors.ai)}
                  </div>
                  <p className="font-sans text-lg mb-8 opacity-80 border-l-4 border-bauhaus-blue pl-4">
                    Bringen Sie Ihren eigenen Key (BYO-Key) oder nutzen Sie das Plattform-Freemium-Kontingent.
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-2">Provider wählen</label>
                      <select value={aiProvider} onChange={e => setAiProvider(e.target.value)} className="w-full p-4 border-4 border-bauhaus-black font-sans font-bold text-lg bg-bauhaus-gray focus:outline-none focus:bg-bauhaus-yellow cursor-pointer appearance-none rounded-none">
                        <option value="gemini">Google Gemini (Free/Paid)</option>
                        <option value="groq">Groq (Free)</option>
                        <option value="openai">OpenAI</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-2">API Key eingeben</label>
                      <input 
                        ref={aiKeyInput}
                        type="password" 
                        autoComplete="off"
                        placeholder="sk-..."
                        className="w-full p-4 border-4 border-bauhaus-black font-mono text-lg focus:outline-none focus:bg-bauhaus-yellow transition-colors"
                      />
                    </div>
                    <button 
                      onClick={testAiConnector}
                      disabled={connectors.ai.lamp === 'testing'}
                      className="w-full bg-bauhaus-blue text-bauhaus-white font-display font-bold text-xl uppercase py-4 border-4 border-bauhaus-black hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors disabled:opacity-50 shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
                    >
                      {connectors.ai.lamp === 'testing' ? 'Teste Verbindung...' : 'Ehrliche Lampe (Test)'}
                    </button>
                    {renderConnectorMessage(connectors.ai, 'Verbindung serverseitig verifiziert. Im Browser bleibt nur die maskierte Referenz.')}
                  </div>
                  
                  <div className="flex justify-between items-center pt-8 border-t-4 border-bauhaus-black">
                    <button onClick={() => setStep(2)} className="font-mono text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity">Schritt überspringen</button>
                    <button onClick={() => setStep(2)} className="bg-bauhaus-black text-bauhaus-white px-8 py-3 font-bold uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors flex items-center gap-2">Weiter <ArrowRight size={20} /></button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-bauhaus-white border-8 border-bauhaus-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-display font-black uppercase leading-tight">Schritt 2:<br/>Speicher</h2>
                    {renderLamp(connectors.storage)}
                  </div>
                  <p className="font-sans text-lg mb-8 opacity-80 border-l-4 border-bauhaus-yellow pl-4">
                    Wo sollen Dokumente permanent lagern? Firebase Storage ist aktiv. Optional: Drive/Dropbox verknüpfen.
                  </p>
                  
                  <div className="space-y-4 mb-12">
                    <button onClick={() => void testConnector('storage', 'drive')} className="w-full bg-bauhaus-white text-bauhaus-black font-display font-bold text-xl uppercase py-6 border-4 border-bauhaus-black hover:bg-bauhaus-blue hover:text-bauhaus-white transition-colors flex items-center justify-center gap-4">
                      <HardDrive size={24} /> Google Drive (OAuth)
                    </button>
                    {renderConnectorMessage(connectors.storage, 'Drive verifiziert. Der vereinbarte Testordner wurde gelesen.')}
                  </div>
                  
                  <div className="flex justify-between items-center pt-8 border-t-4 border-bauhaus-black">
                    <button onClick={() => setStep(1)} className="font-mono text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity">Zurück</button>
                    <button onClick={() => setStep(3)} className="bg-bauhaus-black text-bauhaus-white px-8 py-3 font-bold uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors flex items-center gap-2">Weiter <ArrowRight size={20} /></button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-bauhaus-white border-8 border-bauhaus-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-display font-black uppercase leading-tight">Schritt 3:<br/>E-Mail</h2>
                    {renderLamp(connectors.mail)}
                  </div>
                  <p className="font-sans text-lg mb-8 opacity-80 border-l-4 border-bauhaus-red pl-4">
                    E-Mail-Postfach für automatisierten Input (Briefkasten). IMAP oder Gmail OAuth.
                  </p>
                  
                  <div className="space-y-4 mb-12">
                     <button onClick={() => void testConnector('mail', 'imap')} className="w-full bg-bauhaus-white text-bauhaus-black font-display font-bold text-xl uppercase py-6 border-4 border-bauhaus-black hover:bg-bauhaus-red hover:text-bauhaus-white transition-colors flex items-center justify-center gap-4">
                      <Mail size={24} /> IMAP Login Testen
                    </button>
                    {renderConnectorMessage(connectors.mail, 'Postfach serverseitig mit minimalem Lesetest verifiziert.')}
                  </div>
                  
                  <div className="flex justify-between items-center pt-8 border-t-4 border-bauhaus-black">
                    <button onClick={() => setStep(2)} className="font-mono text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity">Zurück</button>
                    <button onClick={() => setStep(4)} className="bg-bauhaus-black text-bauhaus-white px-8 py-3 font-bold uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors flex items-center gap-2">Weiter <ArrowRight size={20} /></button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-bauhaus-white border-8 border-bauhaus-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-display font-black uppercase leading-tight">Schritt 4:<br/>Kalender</h2>
                    {renderLamp(connectors.calendar)}
                  </div>
                  <p className="font-sans text-lg mb-8 opacity-80 border-l-4 border-bauhaus-black pl-4">
                    Fristen und Termine automatisch in den Kalender synchronisieren.
                  </p>
                  
                  <div className="space-y-4 mb-12">
                     <button onClick={() => void testConnector('calendar', 'google_calendar')} className="w-full bg-bauhaus-white text-bauhaus-black font-display font-bold text-xl uppercase py-6 border-4 border-bauhaus-black hover:bg-[#00A36C] hover:text-bauhaus-white transition-colors flex items-center justify-center gap-4">
                      <Calendar size={24} /> Mit Google Calendar verbinden
                    </button>
                    {renderConnectorMessage(connectors.calendar, 'Kalender serverseitig mit minimalem Lesetest verifiziert.')}
                  </div>
                  
                  <div className="flex justify-between items-center pt-8 border-t-4 border-bauhaus-black">
                    <button onClick={() => setStep(3)} className="font-mono text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity">Zurück</button>
                    <button onClick={() => setStep(5)} className="bg-bauhaus-black text-bauhaus-white px-8 py-3 font-bold uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors flex items-center gap-2">Weiter <ArrowRight size={20} /></button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-bauhaus-yellow text-bauhaus-black border-8 border-bauhaus-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
                  <h2 className="text-4xl font-display font-black uppercase leading-tight mb-8">Setup<br/>Aktueller Stand</h2>
                  
                  <div className="bg-bauhaus-white border-4 border-bauhaus-black p-6 mb-8 space-y-4">
                    <div className="flex justify-between items-center border-b-2 border-bauhaus-gray pb-2">
                      <span className="font-mono font-bold uppercase">KI (LLM)</span>
                      {renderLamp(connectors.ai)}
                    </div>
                    <div className="flex justify-between items-center border-b-2 border-bauhaus-gray pb-2">
                      <span className="font-mono font-bold uppercase">Speicher</span>
                      {renderLamp(connectors.storage)}
                    </div>
                    <div className="flex justify-between items-center border-b-2 border-bauhaus-gray pb-2">
                      <span className="font-mono font-bold uppercase">E-Mail</span>
                      {renderLamp(connectors.mail)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold uppercase">Kalender</span>
                      {renderLamp(connectors.calendar)}
                    </div>
                  </div>
                  
                  <p className="font-sans font-bold text-lg mb-8">
                    Fehlende (rote) Connectoren blockieren nicht. Sie können diese jederzeit später über die Einstellungen nachholen.
                  </p>

                  <div className="flex justify-between items-center">
                    <button onClick={() => setStep(4)} className="font-mono text-xs font-bold uppercase border-2 border-bauhaus-black px-4 py-2 hover:bg-bauhaus-white transition-colors">Zurück</button>
                    <Link to="/briefkasten" className="bg-bauhaus-blue text-bauhaus-white px-8 py-4 font-display font-bold text-xl uppercase hover:bg-bauhaus-black transition-colors shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                      Jetzt Loslegen →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
