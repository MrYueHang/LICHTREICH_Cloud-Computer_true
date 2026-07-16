import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Inbox, Paintbrush, Clock, CheckCircle2, AlertCircle, FileText, Loader2, ArrowRight } from 'lucide-react';

interface Job {
  job_id: string;
  owner_id: string;
  status: 'empfangen' | 'ocr' | 'analyse' | 'entwurf' | 'fertig' | 'fehler';
  fileName: string;
  createdAt: any;
}

export default function Me() {
  const { user, loading: authLoading } = useAuth();
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'jobs'),
      where('owner_id', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData: Job[] = [];
      snapshot.forEach((doc) => {
        jobsData.push(doc.data() as Job);
      });
      setActiveJobs(jobsData);
    });
    return unsubscribe;
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bauhaus-gray flex items-center justify-center font-display">
        <Loader2 className="w-12 h-12 animate-spin text-bauhaus-black" />
      </div>
    );
  }

  const getStatusDisplay = (status: Job['status']) => {
    switch (status) {
      case 'empfangen': return { color: 'bg-bauhaus-gray text-bauhaus-black', label: 'EMPFANGEN', icon: Inbox };
      case 'ocr': return { color: 'bg-bauhaus-blue text-bauhaus-white', label: 'OCR', icon: FileText };
      case 'analyse': return { color: 'bg-bauhaus-yellow text-bauhaus-black', label: 'ANALYSE', icon: Loader2 };
      case 'entwurf': return { color: 'bg-bauhaus-white text-bauhaus-black border-2 border-bauhaus-black', label: 'ENTWURF', icon: Clock };
      case 'fertig': return { color: 'bg-[#00A36C] text-bauhaus-white', label: 'FERTIG', icon: CheckCircle2 };
      case 'fehler': return { color: 'bg-bauhaus-red text-bauhaus-white', label: 'FEHLER', icon: AlertCircle };
      default: return { color: 'bg-bauhaus-gray text-bauhaus-black', label: status, icon: Clock };
    }
  };

  return (
    <div className="min-h-screen bg-bauhaus-gray font-sans selection:bg-bauhaus-black selection:text-bauhaus-white text-bauhaus-black">
      <header className="border-b-8 border-bauhaus-black bg-bauhaus-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-3xl font-display font-black uppercase tracking-tighter hover:text-bauhaus-blue transition-colors">
          LICHTREICH <span className="font-light">Cloud</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs uppercase hidden md:block">Rolle: User</div>
          <Link to="/setup" className="font-mono text-xs uppercase font-bold hover:text-bauhaus-blue hover:underline hidden md:block">
            Einstellungen
          </Link>
          <div className="px-4 py-2 border-4 border-bauhaus-black font-display font-bold uppercase text-sm bg-bauhaus-white shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Mein Bereich
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-7xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-4 border-bauhaus-black p-8 bg-bauhaus-yellow shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]"
        >
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-bauhaus-black mb-4">
            Meine Heimat
          </h1>
          <p className="text-xl font-medium max-w-2xl">
            Dein persönlicher Einstieg in den LICHTREICH Cloud-Computer. Wähle dein Modul oder überprüfe den Status laufender Prozesse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Modules (Kacheln) */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-2xl font-display font-bold uppercase border-b-4 border-bauhaus-black pb-2">Meine Module</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Briefkasten Kachel */}
              <Link to="/briefkasten" className="group block h-full">
                <div className="bg-bauhaus-white border-8 border-bauhaus-black p-8 transition-transform hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] hover:shadow-[16px_16px_0px_0px_rgba(17,17,17,1)] h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-bauhaus-blue rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="w-16 h-16 bg-bauhaus-black text-bauhaus-white flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase mb-4 flex items-center justify-between">
                    Briefkasten
                  </h3>
                  <p className="font-sans font-medium text-lg mb-8 flex-1 leading-relaxed">
                    Der zentrale Posteingang. Dokumente hochladen, OCR-Verarbeitung und KI-Ablage in deine Akten.
                  </p>
                  <div className="inline-flex items-center gap-2 font-display font-bold uppercase text-bauhaus-blue tracking-wider group-hover:gap-4 transition-all">
                    Modul öffnen <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>

              {/* Datei-Manager Kachel */}
              <Link to="/datei-manager" className="group block h-full">
                <div className="bg-bauhaus-white border-8 border-bauhaus-black p-8 transition-transform hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] hover:shadow-[16px_16px_0px_0px_rgba(17,17,17,1)] h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-bauhaus-red rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="w-16 h-16 bg-bauhaus-red text-bauhaus-white flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-3 transition-transform">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase mb-4 flex items-center justify-between">
                    Datei-Manager
                  </h3>
                  <p className="font-sans font-medium text-lg mb-8 flex-1 leading-relaxed">
                    Die Dokumenten-Werkbank. Übersetzen, umbenennen, analysieren und in Ordner verschieben.
                  </p>
                  <div className="inline-flex items-center gap-2 font-display font-bold uppercase text-bauhaus-red tracking-wider group-hover:gap-4 transition-all">
                    Modul öffnen <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>

              {/* Herrkünstler Kachel */}
              <a href="https://herrkuenstler.lichtreich.info" target="_blank" rel="noopener noreferrer" className="group block h-full">
                <div className="bg-bauhaus-black text-bauhaus-white border-8 border-bauhaus-black p-8 transition-transform hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] hover:shadow-[16px_16px_0px_0px_rgba(17,17,17,1)] h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-bauhaus-yellow rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="w-16 h-16 bg-bauhaus-yellow text-bauhaus-black flex items-center justify-center mb-8 -rotate-3 group-hover:-rotate-6 transition-transform">
                    <Paintbrush className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase mb-4">
                    Herrkünstler
                  </h3>
                  <p className="font-sans font-medium text-lg mb-8 flex-1 leading-relaxed opacity-90">
                    Das Creator- und Back-Office-Modul für visuelle Prozesse, Redaktionspläne und Veröffentlichungen.
                  </p>
                  <div className="inline-flex items-center gap-2 font-display font-bold uppercase text-bauhaus-yellow tracking-wider group-hover:gap-4 transition-all">
                    Extern öffnen <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Status & Fristen */}
          <div className="lg:col-span-4 space-y-12">
            
            <div className="bg-bauhaus-white border-8 border-bauhaus-black p-6 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]">
              <h2 className="text-2xl font-display font-bold uppercase border-b-4 border-bauhaus-black pb-2 mb-6 flex items-center justify-between">
                Laufende Jobs
                <span className="text-xs bg-bauhaus-blue text-bauhaus-white px-2 py-1">Live</span>
              </h2>
              
              <div className="space-y-4">
                {activeJobs.length === 0 ? (
                  <div className="p-4 bg-bauhaus-gray border-2 border-dashed border-bauhaus-black text-center font-mono text-sm uppercase">
                    Keine aktiven Jobs.
                  </div>
                ) : (
                  activeJobs.map(job => {
                    const statusConfig = getStatusDisplay(job.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                      <div key={job.job_id} className="group border-b-2 border-bauhaus-black pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2 gap-4">
                          <p className="text-sm font-bold truncate flex-1">
                            {job.fileName}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-bold font-mono uppercase ${statusConfig.color}`}>
                            {job.status === 'analyse' && <StatusIcon className="w-3 h-3 mr-1 animate-spin" />}
                            {job.status !== 'analyse' && <StatusIcon className="w-3 h-3 mr-1" />}
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono opacity-60">
                          <span>ID: {job.job_id.split('-')[0]}</span>
                          {job.createdAt && (
                            <span>
                              {job.createdAt?.toDate ? new Date(job.createdAt.toDate()).toLocaleTimeString() : '...'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {activeJobs.length > 0 && (
                <div className="mt-6 pt-4 border-t-4 border-bauhaus-black">
                  <Link to="/briefkasten" className="text-sm font-display font-bold uppercase hover:text-bauhaus-blue flex items-center justify-between group">
                    Alle Jobs ansehen <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-bauhaus-white border-8 border-bauhaus-black p-6 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-bauhaus-red -translate-y-8 translate-x-8 rotate-45" />
              <h2 className="text-2xl font-display font-bold uppercase border-b-4 border-bauhaus-black pb-2 mb-6 relative z-10">
                Fristen
              </h2>
              <div className="p-4 bg-bauhaus-gray border-2 border-bauhaus-black text-center font-mono text-sm">
                Keine kritischen Fristen.
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
