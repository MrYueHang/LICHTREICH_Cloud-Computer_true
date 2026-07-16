import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, serverTimestamp, setDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, FileText, Search, Globe, Edit2, Paperclip, FolderInput, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentDoc {
  id: string;
  owner_id: string;
  name: string;
  mime: string;
  storage_url: string;
  ocr_text?: string;
  analyse?: {
    typ?: string;
    relevanz?: string;
    frist?: string;
    betrag?: string;
  };
  akte_id?: string;
  tags?: string[];
  versions?: any[];
  status?: string; // e.g. 'idle', 'analysiere', 'übersetze'
  createdAt: any;
}

export default function DateiManager() {
  const { user, loading: authLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For rename action
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  // For board ping
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [pingMessage, setPingMessage] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'documents'),
      where('owner_id', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: DocumentDoc[] = [];
      snapshot.forEach((d) => {
        docs.push({ id: d.id, ...d.data() } as DocumentDoc);
      });
      setDocuments(docs);
    });

    return unsubscribe;
  }, [user]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0 || !user) return;
    setUploading(true);
    setError(null);

    try {
      for (const file of acceptedFiles) {
        const docId = crypto.randomUUID();
        const storageRef = ref(storage, `documents/${user.uid}/${docId}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await setDoc(doc(db, 'documents', docId), {
          owner_id: user.uid,
          name: file.name,
          mime: file.type,
          storage_url: downloadURL,
          status: 'idle',
          createdAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.error(err);
      setError('Fehler beim Upload.');
    } finally {
      setUploading(false);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const triggerAction = async (docId: string, action: string, payload: any = {}) => {
    if (!user) return;
    // Update local status for optimism
    await updateDoc(doc(db, 'documents', docId), { status: action });
    
    // Fire and forget to n8n
    const n8nPayload = {
      doc_id: docId,
      owner_id: user.uid,
      action: action,
      ...payload,
      meta: {
        app: 'datei-manager',
        ts: new Date().toISOString()
      }
    };

    fetch("https://n8n.lichtreich.info/webhook/datei-aktion", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(n8nPayload)
    }).catch(console.error);
  };

  const handleRename = async (docId: string) => {
    if (!newName.trim()) {
      setRenamingId(null);
      return;
    }
    await updateDoc(doc(db, 'documents', docId), { name: newName });
    setRenamingId(null);
    setNewName('');
  };

  const handlePing = async (docId: string) => {
    if (!pingMessage.trim()) return;
    await triggerAction(docId, 'board_ping', { message: pingMessage });
    setPingingId(null);
    setPingMessage('');
  };

  if (authLoading) return <div className="p-8 font-mono font-bold uppercase">Lade System...</div>;
  
  if (!user) {
    return (
      <div className="min-h-screen bg-bauhaus-white flex items-center justify-center p-8">
        <div className="bg-bauhaus-red border-8 border-bauhaus-black p-8 text-bauhaus-white max-w-md w-full shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
          <h1 className="font-display font-black text-4xl mb-4 uppercase">Zugriff verweigert</h1>
          <p className="font-mono text-sm font-bold mb-8">Authentifizierung erforderlich. Bitte über das Cockpit anmelden.</p>
          <Link to="/cockpit" className="bg-bauhaus-black text-bauhaus-white px-6 py-3 font-bold uppercase inline-block border-2 border-transparent hover:bg-bauhaus-yellow hover:text-bauhaus-black hover:border-bauhaus-black transition-colors">
            Zum Cockpit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bauhaus-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b-8 border-bauhaus-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <Link to="/cockpit" className="inline-block bg-bauhaus-black text-bauhaus-white font-mono text-xs font-bold px-3 py-1 mb-4 uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors">
              ← Zurück zum Cockpit
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase leading-none">
              Datei<br/>Manager
            </h1>
          </div>
          <div className="bg-bauhaus-blue text-bauhaus-white border-4 border-bauhaus-black px-6 py-4 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]">
            <div className="font-mono text-xs font-bold uppercase mb-1 opacity-80">Dokument-Werkbank</div>
            <div className="font-display font-bold text-xl uppercase">Online</div>
          </div>
        </header>

        <section className="mb-16">
          <div 
            {...getRootProps()} 
            className={`border-8 border-bauhaus-black p-12 text-center cursor-pointer transition-all ${
              isDragActive ? 'bg-bauhaus-yellow' : 'bg-bauhaus-gray hover:bg-gray-100'
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-16 h-16 mb-4 animate-spin text-bauhaus-blue" />
                <p className="font-display font-bold text-2xl uppercase">Lade hoch...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-16 h-16 mb-4 text-bauhaus-black" />
                <p className="font-display font-bold text-2xl uppercase mb-2">
                  {isDragActive ? 'Dokumente hier fallen lassen' : 'Dokumente hier ablegen'}
                </p>
                <p className="font-mono text-sm font-bold opacity-60 uppercase">Oder klicken zum Auswählen</p>
              </div>
            )}
            {error && (
              <div className="mt-4 bg-bauhaus-red text-bauhaus-white inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold border-2 border-bauhaus-black uppercase">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-display font-black uppercase mb-8 border-l-8 border-bauhaus-red pl-4">Ihre Dokumente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-bauhaus-white border-4 border-bauhaus-black shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex flex-col"
                >
                  <div className="p-4 border-b-4 border-bauhaus-black bg-bauhaus-gray flex justify-between items-start">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-bauhaus-black text-bauhaus-white p-2">
                        <FileText size={24} />
                      </div>
                      <div className="min-w-0">
                        {renamingId === doc.id ? (
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={newName} 
                              onChange={(e) => setNewName(e.target.value)}
                              className="w-full px-2 py-1 font-sans font-bold text-sm border-2 border-bauhaus-black focus:outline-none focus:bg-bauhaus-yellow"
                              autoFocus
                              onKeyDown={(e) => e.key === 'Enter' && handleRename(doc.id)}
                            />
                            <button onClick={() => handleRename(doc.id)} className="bg-bauhaus-blue text-bauhaus-white px-2 py-1 font-mono text-xs font-bold border-2 border-bauhaus-black uppercase">OK</button>
                          </div>
                        ) : (
                          <h3 className="font-sans font-bold text-lg truncate" title={doc.name}>{doc.name}</h3>
                        )}
                        <p className="font-mono text-xs opacity-60 uppercase">{doc.mime.split('/')[1] || doc.mime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-grow bg-bauhaus-white relative">
                    {doc.status && doc.status !== 'idle' && (
                      <div className="absolute top-2 right-2 bg-bauhaus-yellow text-bauhaus-black font-mono text-[10px] font-bold px-2 py-1 uppercase border-2 border-bauhaus-black flex items-center gap-2 z-10">
                        <Loader2 size={12} className="animate-spin" />
                        {doc.status}
                      </div>
                    )}
                    
                    {doc.analyse ? (
                      <div className="space-y-2 font-mono text-xs mb-4">
                        {doc.analyse.typ && <div className="flex justify-between border-b-2 border-bauhaus-gray pb-1"><span className="opacity-60 uppercase">Typ:</span><span className="font-bold">{doc.analyse.typ}</span></div>}
                        {doc.analyse.relevanz && <div className="flex justify-between border-b-2 border-bauhaus-gray pb-1"><span className="opacity-60 uppercase">Relevanz:</span><span className="font-bold">{doc.analyse.relevanz}</span></div>}
                        {doc.analyse.frist && <div className="flex justify-between border-b-2 border-bauhaus-gray pb-1"><span className="opacity-60 uppercase">Frist:</span><span className="font-bold">{doc.analyse.frist}</span></div>}
                        {doc.analyse.betrag && <div className="flex justify-between border-b-2 border-bauhaus-gray pb-1"><span className="opacity-60 uppercase">Betrag:</span><span className="font-bold">{doc.analyse.betrag}</span></div>}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-bauhaus-black/40 font-mono text-sm uppercase font-bold border-2 border-dashed border-bauhaus-gray mb-4">
                        Keine Analyse
                      </div>
                    )}

                    {pingingId === doc.id && (
                      <div className="mt-4 p-3 bg-bauhaus-gray border-2 border-bauhaus-black">
                        <textarea 
                          value={pingMessage}
                          onChange={(e) => setPingMessage(e.target.value)}
                          placeholder="Frage an die KI..."
                          className="w-full h-20 p-2 font-sans text-sm border-2 border-bauhaus-black focus:outline-none focus:bg-bauhaus-white mb-2 resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setPingingId(null)} className="px-3 py-1 font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors">Abbrechen</button>
                          <button onClick={() => handlePing(doc.id)} className="bg-bauhaus-blue text-bauhaus-white px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-bauhaus-black hover:bg-bauhaus-yellow hover:text-bauhaus-black transition-colors">Senden</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 border-t-4 border-bauhaus-black">
                    <button onClick={() => triggerAction(doc.id, 'analysieren')} title="Analysieren" className="p-3 border-r-4 border-bauhaus-black flex justify-center items-center hover:bg-bauhaus-yellow transition-colors group">
                      <Search className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button onClick={() => triggerAction(doc.id, 'übersetzen', { target: 'en' })} title="Übersetzen" className="p-3 border-r-4 border-bauhaus-black flex justify-center items-center hover:bg-bauhaus-blue hover:text-bauhaus-white transition-colors group">
                      <Globe className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button onClick={() => { setRenamingId(doc.id); setNewName(doc.name); }} title="Umbenennen" className="p-3 flex justify-center items-center hover:bg-bauhaus-red hover:text-bauhaus-white transition-colors group">
                      <Edit2 className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 border-t-4 border-bauhaus-black">
                    <button onClick={() => triggerAction(doc.id, 'akte_anhängen')} title="An Akte anhängen" className="p-3 border-r-4 border-bauhaus-black flex justify-center items-center hover:bg-bauhaus-yellow transition-colors group">
                      <Paperclip className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button onClick={() => triggerAction(doc.id, 'verschieben')} title="Verschieben/Hinladen" className="p-3 border-r-4 border-bauhaus-black flex justify-center items-center hover:bg-bauhaus-blue hover:text-bauhaus-white transition-colors group">
                      <FolderInput className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button onClick={() => { setPingingId(doc.id); setPingMessage(''); }} title="Am Board anpingen" className="p-3 flex justify-center items-center hover:bg-bauhaus-black hover:text-bauhaus-white transition-colors group">
                      <MessageSquare className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {documents.length === 0 && !uploading && (
              <div className="col-span-full py-12 text-center border-4 border-dashed border-bauhaus-black">
                <p className="font-display font-bold text-2xl uppercase text-bauhaus-black/50">Keine Dokumente gefunden</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
