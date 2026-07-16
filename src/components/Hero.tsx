import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('E-Mail ist erforderlich.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Ungültiges E-Mail Format.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    try {
      // Echt: direkt in Firestore-Collection "waitlist" schreiben (kein Webhook nötig)
      await addDoc(collection(db, 'waitlist'), {
        email,
        source: 'landing_hero',
        ts: serverTimestamp()
      });
      setSubmitted(true);
    } catch (err) {
      console.error('waitlist error', err);
      setError('Konnte nicht speichern. Bitte später versuchen.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center border-b-8 border-bauhaus-black overflow-hidden">
      {/* Background Geometric Elements */}
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-bauhaus-red border-8 border-bauhaus-black z-0 opacity-90 mix-blend-multiply" 
      />
      <motion.div 
        initial={{ scale: 0, x: -100 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
        className="absolute bottom-[5%] left-[-10%] w-[50vw] h-[25vw] bg-bauhaus-yellow border-8 border-bauhaus-black z-0 opacity-90 mix-blend-multiply" 
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-bauhaus-blue text-bauhaus-white px-8 py-4 border-4 border-bauhaus-black shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex items-center gap-4"
          >
            <div className="font-display font-bold text-xl uppercase">Erfolg</div>
            <div className="font-sans font-medium border-l-2 border-bauhaus-white pl-4">Auf die Warteliste gesetzt!</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 bg-bauhaus-white border-8 border-bauhaus-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-block bg-bauhaus-blue text-bauhaus-white font-mono font-bold px-3 py-1 mb-6 border-2 border-bauhaus-black text-sm uppercase">
              System Live Alpha
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
              LICHTREICH<br />CLOUD-COMPUTER
            </h1>
            <p className="font-sans text-xl md:text-2xl font-medium max-w-2xl leading-tight border-l-4 border-bauhaus-red pl-6 mb-10">
              Ein modularer, KI-gestützter Arbeitsplatz für komplexe Akten, Vorgänge und Projekte.
            </p>
            
            <div className="flex flex-col gap-4 font-display">
              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 max-w-xl">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="E-MAIL (WARTELISTE)" 
                      className={`flex-1 px-4 py-4 text-lg font-bold uppercase border-4 border-bauhaus-black focus:outline-none transition-all placeholder:text-bauhaus-black/50 min-w-0 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] focus:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] focus:translate-x-[2px] focus:translate-y-[2px] ${
                        error 
                          ? 'bg-bauhaus-white border-bauhaus-red text-bauhaus-red focus:bg-red-50' 
                          : 'bg-bauhaus-white text-bauhaus-black focus:bg-bauhaus-yellow'
                      }`}
                    />
                    <button disabled={isSubmitting} type="submit" className="bg-bauhaus-blue text-bauhaus-white px-8 py-4 text-lg font-bold uppercase hover:bg-bauhaus-yellow hover:text-bauhaus-black active:bg-bauhaus-red transition-all border-4 border-bauhaus-black flex items-center justify-center group shrink-0 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-70 disabled:pointer-events-none">
                      <span>{isSubmitting ? 'Wird eingetragen...' : 'Eintragen'}</span>
                      <span className="ml-3 transform group-hover:translate-x-1 transition-transform text-2xl leading-none">→</span>
                    </button>
                  </div>
                  {error && (
                    <div className="bg-bauhaus-red text-bauhaus-white font-mono font-bold text-xs p-2 border-2 border-bauhaus-black inline-block self-start uppercase shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                      {error}
                    </div>
                  )}
                </form>
              ) : (
                <div className="inline-block self-start bg-bauhaus-yellow text-bauhaus-black px-8 py-4 text-xl font-bold uppercase border-4 border-bauhaus-black max-w-xl">
                  Auf der Warteliste eingetragen.
                </div>
              )}
              
              <div className="flex">
                <button onClick={() => document.getElementById('betriebskette')?.scrollIntoView({ behavior: 'smooth' })} className="bg-bauhaus-white text-bauhaus-black px-8 py-4 text-lg font-bold uppercase hover:bg-bauhaus-yellow transition-colors border-4 border-bauhaus-black cursor-pointer">
                  Architektur ansehen
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 bg-bauhaus-blue text-bauhaus-white border-8 border-bauhaus-black p-8 shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
          <h3 className="text-2xl mb-6">Die Betriebskette</h3>
          <ul className="font-mono text-sm flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-bauhaus-yellow text-bauhaus-black border-2 border-bauhaus-black font-bold">1</span>
              <span>Dokumenteingang</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-bauhaus-white text-bauhaus-black border-2 border-bauhaus-black font-bold">2</span>
              <span>Semantische Analyse</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-bauhaus-white text-bauhaus-black border-2 border-bauhaus-black font-bold">3</span>
              <span>Geführtes Interview</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-bauhaus-red text-bauhaus-black border-2 border-bauhaus-black font-bold">4</span>
              <span>Rechte & Mandat</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-bauhaus-white text-bauhaus-black border-2 border-bauhaus-black font-bold">5</span>
              <span>Entwurf & Akte</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
