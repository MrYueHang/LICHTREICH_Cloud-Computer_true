import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, CircleDot, ExternalLink, Mail, Menu, MousePointer2, Sparkles, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import ImmersiveField from '../components/ImmersiveField';
import { portfolioContent, type Project } from '../lib/portfolioContent';

const reveal = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [lowPower, setLowPower] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [contactState, setContactState] = useState<'idle' | 'shown'>('idle');

  useEffect(() => {
    document.title = portfolioContent.meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', portfolioContent.meta.description);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener?.('change', updateMotion);
    return () => media.removeEventListener?.('change', updateMotion);
  }, []);

  const motionProps = reducedMotion ? { initial: false, animate: { opacity: 1, y: 0 } } : reveal;

  function toggleProject(project: Project) {
    setActiveProject((current) => (current === project.id ? null : project.id));
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactState('shown');
  }

  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Startseite"><span className="brand-symbol">✳</span><span>STEFAN / BUSSE</span></a>
        <nav className={`site-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Hauptnavigation">
          <a href="#work" onClick={() => setMobileOpen(false)}>Arbeiten</a><a href="#method" onClick={() => setMobileOpen(false)}>Methode</a><a href="#context" onClick={() => setMobileOpen(false)}>Kontext</a><a href="#contact" onClick={() => setMobileOpen(false)}>Kontakt</a>
        </nav>
        <div className="header-actions">
          <button className="mode-switch" type="button" onClick={() => setLowPower((value) => !value)} aria-pressed={lowPower}><span className="mode-dot" /> {lowPower ? 'light field' : 'full field'}</button>
          <button className="menu-toggle" type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Navigation schließen' : 'Navigation öffnen'}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <div id="top" className="hero-grid" />
      <section id="main-content" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...motionProps}><CircleDot size={13} /> immersive frontend / human-scale systems</motion.p>
          <motion.h1 id="hero-title" className="hero-title" {...motionProps} transition={reducedMotion ? undefined : { ...reveal.transition, delay: 0.08 }}>Interfaces<br /><em>with a pulse.</em></motion.h1>
          <motion.p className="hero-lede" {...motionProps} transition={reducedMotion ? undefined : { ...reveal.transition, delay: 0.16 }}>{portfolioContent.profile.intro}</motion.p>
          <motion.div className="hero-actions" {...motionProps} transition={reducedMotion ? undefined : { ...reveal.transition, delay: 0.24 }}><button className="button button-primary" type="button" onClick={() => scrollToId('work')}>Arbeiten erkunden <ArrowDownRight size={17} /></button><a className="text-link" href="#contact">{portfolioContent.profile.availability} <ArrowUpRight size={16} /></a></motion.div>
          <div className="hero-footnote"><span>01 / 04</span><span>Designing the space between human intent and machine complexity.</span></div>
        </div>
        <ImmersiveField reducedMotion={reducedMotion} lowPower={lowPower} />
      </section>

      <section className="signal-strip" aria-label="Portfolio-Fokus"><div className="signal-label">Selected signals</div><div className="signal-list"><span>WebGL</span><span>Product UX</span><span>Motion systems</span><span>Content architecture</span><span>Frontend craft</span></div></section>

      <section id="work" className="section section-work" aria-labelledby="work-title">
        <div className="section-heading"><p className="eyebrow">02 / work in progress</p><h2 id="work-title">Projects that<br /><em>hold weight.</em></h2><p>Keine Demo-Landschaft ohne Boden. Jedes Projekt zeigt Problem, Haltung und das Stück System, das danach tragfähiger ist.</p></div>
        <div className="project-list">
          {portfolioContent.projects.map((project) => {
            const isOpen = activeProject === project.id;
            return <article className={`project-row accent-${project.accent} ${isOpen ? 'is-open' : ''}`} key={project.id}>
              <button className="project-summary" type="button" onClick={() => toggleProject(project)} aria-expanded={isOpen}><span className="project-number">{project.index}</span><span className="project-title-wrap"><span className="project-eyebrow">{project.eyebrow}</span><strong>{project.title}</strong><span>{project.summary}</span></span><span className="project-toggle"><ChevronDown size={20} /></span></button>
              <AnimatePresence initial={false}>{isOpen && <motion.div className="project-detail" initial={reducedMotion ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.3 }}><div className="project-detail-intro"><span className="detail-stamp">EXPANDED CASE</span><p>{project.solution}</p></div><div className="detail-grid"><div><span className="detail-label">Problem</span><p>{project.problem}</p></div><div><span className="detail-label">Rolle</span><p>{project.role}</p></div><div><span className="detail-label">Ergebnis</span><p>{project.result}</p></div><div><span className="detail-label">Stack</span><div className="tag-list">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></div><a className="detail-link" href={project.linkHref}>{project.linkLabel} <ExternalLink size={15} /></a></motion.div>}</AnimatePresence>
            </article>;
          })}
        </div>
      </section>

      <section id="method" className="section method-section" aria-labelledby="method-title"><div className="method-aside"><p className="eyebrow">03 / method as material</p><span className="scribble">make it legible<br />then make it alive</span><MousePointer2 size={24} /></div><div className="method-main"><h2 id="method-title">The system is<br /><em>part of the story.</em></h2><p className="section-lede">Bewegung ist kein Konfetti. Sie gibt Orientierung, markiert Zustände und macht ein komplexes Produkt erinnerbar.</p><div className="process-line">{portfolioContent.process.map((step, index) => <div className="process-step" key={step.number}><span className="process-number">{step.number}</span><span className="process-title">{step.title}</span><p>{step.text}</p>{index < portfolioContent.process.length - 1 && <span className="process-connector" aria-hidden="true">↘</span>}</div>)}</div></div></section>

      <section className="section skill-section" aria-labelledby="skill-title"><div className="skill-copy"><p className="eyebrow">04 / field notes</p><h2 id="skill-title">A broad toolkit,<br /><em>one clear intent.</em></h2><p>Technologien sind Material. Die Frage ist, welche Form Menschen schneller verstehen, bedienen und weiterdenken lässt.</p></div><div className="skill-wheel" aria-label="Technologie-Felder">{portfolioContent.skills.map((skill, index) => <div className={`skill-note tone-${skill.tone}`} key={skill.label}><span>0{index + 1}</span><strong>{skill.label}</strong><p>{skill.detail}</p></div>)}</div></section>

      <section id="context" className="section context-section" aria-labelledby="context-title"><div className="context-map" aria-hidden="true"><span className="map-line map-line-a" /><span className="map-line map-line-b" /><span className="map-core">CONTEXT<br />ATLAS</span><span className="map-node map-node-a">A</span><span className="map-node map-node-b">B</span><span className="map-node map-node-c">C</span></div><div className="context-copy"><p className="eyebrow">05 / an additional layer</p><h2 id="context-title">Make the loose ends<br /><em>meaningful.</em></h2><p>Aus dem unsortierten Dokumentkorpus wird kein weiteres Archiv. Es wird eine lesbare Oberfläche für Herkunft, Entscheidungen und nächste Handlungen.</p><div className="context-threads">{portfolioContent.contextThreads.map((thread) => <div className="context-thread" key={thread.label}><span>{thread.mark}</span><div><strong>{thread.label}</strong><p>{thread.value}</p></div></div>)}</div><p className="concept-note"><Sparkles size={15} /> CONCEPT / Kontext-Atlas ist als Frontend-Konzept implementiert. Die echte Notion-/Dokument-Synchronisation ist noch nicht angeschlossen.</p></div></section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-title"><div className="contact-copy"><p className="eyebrow">06 / open channel</p><h2 id="contact-title">Bring the<br /><em>interesting problem.</em></h2><p>Für ein neues digitales Produkt, einen mutigen Relaunch oder eine Oberfläche, die endlich so klar ist wie die Idee dahinter.</p><a className="contact-email" href={`mailto:${portfolioContent.profile.email}`}><Mail size={17} /> {portfolioContent.profile.email}</a></div><form className="contact-form" onSubmit={handleContactSubmit}><label htmlFor="name">Dein Name</label><input id="name" name="name" placeholder="[PLATZHALTER]" required /><label htmlFor="email">Deine E-Mail</label><input id="email" name="email" type="email" placeholder="name@example.com" required /><label htmlFor="message">Worum geht es?</label><textarea id="message" name="message" rows={4} placeholder="[PLATZHALTER: Projektkontext]" required /><button className="button button-primary" type="submit">Nachricht vorbereiten <ArrowUpRight size={17} /></button><p className="form-note" aria-live="polite">{contactState === 'shown' ? <><Check size={15} /> Formular-Demo bereit. Vor Launch mit einem echten Endpoint verbinden.</> : 'Keine Fake-Übertragung: der Versand wird vor Launch angeschlossen.'}</p></form></section>

      <footer className="site-footer"><div><span className="brand-symbol">✳</span><span>Stefan Busse / [PLATZHALTER]</span></div><div className="footer-links">{portfolioContent.social.map((item) => <a key={item.label} href={item.href}>{item.label} <ArrowUpRight size={13} /></a>)}</div><span>© {new Date().getFullYear()} / crafted with intent</span></footer>
    </main>
  );
}
