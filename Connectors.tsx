import { useState } from 'react';

const connectors = [
  { id: 'drive', name: 'Google Drive', type: 'Storage', envVar: 'GOOGLE_DRIVE_CLIENT_ID', status: 'missing' },
  { id: 'dropbox', name: 'Dropbox', type: 'Storage', envVar: 'DROPBOX_APP_KEY', status: 'missing' },
  { id: 'box', name: 'Box', type: 'Storage', envVar: 'BOX_CLIENT_ID', status: 'missing' },
  { id: 'imap', name: 'E-Mail (IMAP)', type: 'Mail', envVar: 'IMAP_HOST', status: 'missing' }
];

export default function Connectors() {
  const [testState, setTestState] = useState<Record<string, 'testing' | 'failed' | 'success'>>({});

  const handleTest = (id: string) => {
    setTestState(prev => ({ ...prev, [id]: 'testing' }));
    setTimeout(() => {
      setTestState(prev => ({ ...prev, [id]: 'failed' }));
    }, 1500);
  };

  return (
    <section className="py-24 px-6 md:px-12 border-b-8 border-bauhaus-black bg-bauhaus-white">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase">Connectoren</h2>
          <p className="text-xl font-medium max-w-2xl">
            Zentrale Konfiguration für externe Speicher- und E-Mail-Dienste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {connectors.map(c => (
            <div key={c.id} className="border-4 border-bauhaus-black p-6 bg-bauhaus-gray shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display font-bold uppercase text-2xl mb-1">{c.name}</h3>
                  <div className="font-mono text-xs uppercase opacity-70 border-b-2 border-bauhaus-black inline-block pb-1">{c.type}</div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase">
                  <span>Status:</span>
                  <div className={`w-3 h-3 rounded-full border border-bauhaus-black ${testState[c.id] === 'success' ? 'bg-[#00ff00]' : 'bg-bauhaus-red'}`} />
                </div>
              </div>

              <div className="space-y-4 mb-6 flex-1">
                <div>
                  <label className="block font-mono text-xs uppercase mb-1">{c.envVar}</label>
                  <input type="password" placeholder="••••••••••••" disabled className="w-full border-2 border-bauhaus-black px-3 py-2 bg-bauhaus-white/50 opacity-50 cursor-not-allowed" />
                  <div className="mt-1 text-[10px] font-mono text-bauhaus-red uppercase">Wert fehlt in .env</div>
                </div>
              </div>

              <button 
                onClick={() => handleTest(c.id)}
                disabled={testState[c.id] === 'testing'}
                className="w-full bg-bauhaus-black text-bauhaus-white font-bold uppercase py-3 border-4 border-bauhaus-black hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testState[c.id] === 'testing' ? 'Prüfe Verbindung...' : 'Verbindung Testen'}
              </button>
              
              {testState[c.id] === 'failed' && (
                <div className="mt-3 text-xs font-mono text-bauhaus-red font-bold uppercase text-center border-t-2 border-bauhaus-red pt-2">
                  Test fehlgeschlagen. Bitte Secrets in .env eintragen.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
