import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Plus, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Job {
  job_id: string;
  owner_id: string;
  akte_hint: string | null;
  source: string;
  status: 'empfangen' | 'ocr' | 'analyse' | 'entwurf' | 'fertig' | 'fehler';
  hints: string[];
  fileName: string;
  createdAt: any;
}

export default function Briefkasten() {
  const { user, loading: authLoading } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [hints, setHints] = useState<string[]>(['']);
  const [akteHint, setAkteHint] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'jobs'),
      where('owner_id', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData: Job[] = [];
      snapshot.forEach((doc) => {
        jobsData.push(doc.data() as Job);
      });
      setJobs(jobsData);
    });
    return unsubscribe;
  }, [user]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'text/plain': []
    },
    maxFiles: 1
  });

  const handleAddHint = () => setHints([...hints, '']);
  const handleHintChange = (index: number, value: string) => {
    const newHints = [...hints];
    newHints[index] = value;
    setHints(newHints);
  };
  const handleRemoveHint = (index: number) => {
    const newHints = hints.filter((_, i) => i !== index);
    if (newHints.length === 0) newHints.push('');
    setHints(newHints);
  };

  const onSubmit = async () => {
    if (!file || !user) return;
    setUploading(true);
    
    try {
      const jobId = crypto.randomUUID();
      const validHints = hints.filter(h => h.trim() !== '');
      const finalAkteHint = akteHint === 'new' ? null : (akteHint || null);
      
      const storageRef = ref(storage, `uploads/${user.uid}/${jobId}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await setDoc(doc(db, 'jobs', jobId), {
        job_id: jobId,
        owner_id: user.uid,
        akte_hint: finalAkteHint,
        source: file.type.startsWith('image/') ? 'foto' : file.type === 'application/pdf' ? 'scan' : 'txt',
        status: 'empfangen',
        hints: validHints,
        fileName: file.name,
        createdAt: serverTimestamp()
      });

      const payload = {
        job_id: jobId,
        owner_id: user.uid,
        akte_hint: finalAkteHint,
        source: file.type.startsWith('image/') ? 'foto' : file.type === 'application/pdf' ? 'scan' : 'txt',
        document: {
          storage_url: downloadURL,
          mime: file.type
        },
        hints: validHints,
        callback: {
          status_url: `https://n8n.lichtreich.info/webhook/bob-status/${jobId}`,
          webhook: null
        },
        meta: {
          app: 'briefkasten',
          ts: new Date().toISOString()
        }
      };

      fetch("https://n8n.lichtreich.info/webhook/bob-briefweg", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(console.error);

      setFile(null);
      setHints(['']);
      setAkteHint('');
    } catch (error) {
      console.error("Upload error:", error);
      alert("Fehler beim Upload. Bitte erneut versuchen.");
    } finally {
      setUploading(false);
    }
  };

  const statusColors: Record<string, string> = {
    'empfangen': 'bg-bauhaus-gray text-bauhaus-black',
    'ocr': 'bg-bauhaus-yellow text-bauhaus-black',
    'analyse': 'bg-bauhaus-blue text-bauhaus-white',
    'entwurf': 'bg-bauhaus-blue text-bauhaus-white',
    'fertig': 'bg-green-500 text-white',
    'fehler': 'bg-bauhaus-red text-bauhaus-white'
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-bauhaus-white text-bauhaus-black font-display text-2xl uppercase">Lade System...</div>;

  return (
    <div className="min-h-screen bg-bauhaus-white text-bauhaus-black font-sans selection:bg-bauhaus-yellow selection:text-bauhaus-black">
      <header className="border-b-8 border-bauhaus-black p-6 md:p-8 flex justify-between items-center bg-bauhaus-white sticky top-0 z-50">
        <Link to="/" className="text-3xl font-display font-black uppercase tracking-tighter hover:text-bauhaus-blue transition-colors">
          LICHTREICH <span className="font-light">Cloud</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs uppercase hidden md:block">Rolle: User</div>
          <div className="px-4 py-2 border-4 border-bauhaus-black font-display font-bold uppercase text-sm bg-bauhaus-yellow shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
            Briefkasten
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-5 flex flex-col gap-8">
          <div className="border-8 border-bauhaus-black bg-bauhaus-white p-8 shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] relative">
            <h2 className="text-3xl font-display font-bold uppercase mb-6 border-b-4 border-bauhaus-black pb-4">Dokument Eingang</h2>
            
            <div 
              {...getRootProps()} 
              className={`border-4 border-dashed border-bauhaus-black p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[200px] bg-bauhaus-gray ${isDragActive ? 'bg-bauhaus-yellow/20' : 'hover:bg-bauhaus-yellow/10'}`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-bauhaus-blue text-bauhaus-white flex items-center justify-center rounded-full">
                    <FileText size={32} />
                  </div>
                  <div className="font-mono text-sm font-bold truncate max-w-[200px]">{file.name}</div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-bauhaus-red font-bold uppercase text-xs hover:underline mt-2 flex items-center gap-1"
                  >
                    <X size={14} /> Entfernen
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="mb-4 opacity-50" />
                  <p className="font-display font-bold text-xl uppercase mb-2">Drag & Drop</p>
                  <p className="font-sans font-medium text-sm opacity-70">oder klicken für Datei-Picker / Foto</p>
                  <p className="font-mono text-xs opacity-50 mt-4 uppercase">PDF, JPG, PNG, TXT</p>
                </>
              )}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="block font-display font-bold uppercase text-sm mb-2">Akte Zuordnung</label>
                <div className="relative">
                  <select 
                    value={akteHint}
                    onChange={(e) => setAkteHint(e.target.value)}
                    className="w-full border-4 border-bauhaus-black p-3 font-mono text-sm uppercase appearance-none bg-bauhaus-white rounded-none outline-none focus:bg-bauhaus-yellow/10"
                  >
                    <option value="">✨ KI schlägt Akte vor</option>
                    <option value="new">🆕 Neue Akte anlegen</option>
                    <option value="A-2026-001">A-2026-001 (Steuern)</option>
                    <option value="A-2026-042">A-2026-042 (Verträge)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-bauhaus-black pl-2 h-full flex items-center">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-display font-bold uppercase text-sm mb-2 flex justify-between items-end">
                  Hinweise & Strategie
                  <button onClick={handleAddHint} className="text-bauhaus-blue flex items-center gap-1 text-xs hover:underline">
                    <Plus size={14} /> Hinzufügen
                  </button>
                </label>
                <div className="space-y-3">
                  {hints.map((hint, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text" 
                        value={hint}
                        onChange={(e) => handleHintChange(idx, e.target.value)}
                        placeholder="Was soll beachtet werden?"
                        className="flex-1 border-4 border-bauhaus-black p-3 font-sans text-sm rounded-none outline-none focus:border-bauhaus-blue"
                      />
                      <button 
                        onClick={() => handleRemoveHint(idx)}
                        className="p-3 border-4 border-bauhaus-black hover:bg-bauhaus-red hover:text-bauhaus-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onSubmit}
                disabled={!file || uploading}
                className="w-full bg-bauhaus-blue text-bauhaus-white font-display font-bold text-xl uppercase py-4 border-4 border-bauhaus-black shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
              >
                {uploading ? 'Verarbeite...' : 'An n8n Übergeben'}
              </button>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-bauhaus-yellow border-8 border-bauhaus-black -z-10 mix-blend-multiply" />
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="mb-8 flex items-end justify-between border-b-8 border-bauhaus-black pb-4">
            <div>
              <h2 className="text-4xl font-display font-black uppercase">Live Jobs</h2>
              <p className="font-mono text-sm mt-2 font-bold uppercase text-bauhaus-blue">Asynchrone Verarbeitung</p>
            </div>
            <div className="bg-bauhaus-gray border-4 border-bauhaus-black px-4 py-2 font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
              Owner: {user?.uid.substring(0,6)}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {jobs.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="border-4 border-dashed border-bauhaus-black p-12 text-center text-bauhaus-black/50 font-display font-bold uppercase text-xl"
                >
                  Keine aktiven Vorgänge
                </motion.div>
              ) : (
                jobs.map((job) => (
                  <motion.div 
                    key={job.job_id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    layout
                    className="border-4 border-bauhaus-black bg-bauhaus-white shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]"
                  >
                    <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-bauhaus-black">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center border-4 border-bauhaus-black ${statusColors[job.status] || statusColors['empfangen']}`}>
                          {job.status === 'fehler' ? <AlertCircle /> : job.status === 'fertig' ? <CheckCircle2 /> : <BrainCircuit className={job.status !== 'empfangen' ? 'animate-pulse' : ''} />}
                        </div>
                        <div>
                          <div className="font-display font-bold uppercase truncate max-w-[200px] md:max-w-xs">{job.fileName}</div>
                          <div className="font-mono text-xs uppercase opacity-70 mt-1">ID: {job.job_id.split('-')[0]} • {job.source}</div>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-2 border-4 border-bauhaus-black font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] ${statusColors[job.status] || statusColors['empfangen']}`}>
                        {job.status}
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6 bg-bauhaus-gray grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-mono text-xs uppercase font-bold mb-2">Akte</div>
                        <div className="font-sans font-medium">{job.akte_hint || 'KI Vorschlag ausstehend...'}</div>
                      </div>
                      <div>
                        <div className="font-mono text-xs uppercase font-bold mb-2">Strategie-Hinweise</div>
                        {job.hints.length > 0 ? (
                          <ul className="list-disc list-inside font-sans text-sm">
                            {job.hints.map((h, i) => <li key={i} className="truncate">{h}</li>)}
                          </ul>
                        ) : (
                          <div className="font-sans text-sm opacity-50 italic">Keine Hinweise</div>
                        )}
                      </div>
                    </div>
                    
                    {job.status === 'fertig' && (
                      <div className="p-4 bg-bauhaus-yellow border-t-4 border-bauhaus-black flex justify-between items-center">
                        <div className="font-display font-bold uppercase text-sm">Entwurf bereit zur Prüfung</div>
                        <button className="bg-bauhaus-black text-bauhaus-white px-6 py-2 font-mono text-xs uppercase font-bold hover:bg-bauhaus-blue transition-colors">
                          In Akte ansehen →
                        </button>
                      </div>
                    )}
                    {job.status === 'analyse' && (
                      <div className="p-4 bg-bauhaus-blue text-bauhaus-white border-t-4 border-bauhaus-black flex justify-between items-center">
                        <div className="font-display font-bold uppercase text-sm">KI Vorschlag: Akte A-2026-042</div>
                        <div className="flex gap-2">
                          <button className="bg-bauhaus-white text-bauhaus-black px-4 py-2 font-mono text-xs uppercase font-bold hover:bg-bauhaus-yellow transition-colors">
                            ✓ Ja
                          </button>
                          <button className="bg-bauhaus-black text-bauhaus-white px-4 py-2 font-mono text-xs uppercase font-bold hover:bg-bauhaus-red transition-colors">
                            Ändern
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
