import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

/* ── Composants pages ── */
import Header from './Header';
import Propos from './propos';
import BibliothèqueSite from './BibliothèqueSite';
import Contact from './contact';
import Footer from './footer';

/* ================================================================
   PALETTE
   ================================================================ */
const Couleur = {
  bg1:       '#1a1a2e',
  bg2:       '#16213e',
  bg3:       '#0f3460',
  blue:      '#3a86ff',
  cyan:      '#00d9ff',
  purple:    '#8338ec',
  text:      '#f1f5f9',
  textMuted: '#cbd5e1',
  textDim:   '#94a3b8',
} as const;

/* ================================================================
   SECTIONS
   ================================================================ */
type SectionId = 'accueil' | 'apropos' | 'Bibliothequesite' | 'contact';

const NavItems: { label: string; id: SectionId }[] = [
  { label: 'Accueil',      id: 'accueil'          },
  { label: 'À propos',     id: 'apropos'           },
  { label: 'Bibliothèque', id: 'Bibliothequesite'  },
  { label: 'Contact',      id: 'contact'           },
];

/* ================================================================
   HELPER scroll
   ================================================================ */
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
const Site: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('accueil');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [isScrolled,    setIsScrolled]    = useState(false);

  useEffect(() => {
    const ids: SectionId[] = ['accueil', 'apropos', 'Bibliothequesite', 'contact'];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const NavLink = ({ label, id }: { label: string; id: SectionId }) => {
    const active = activeSection === id;
    return (
      <button
        onClick={() => navigate(id)}
        className="relative group text-sm font-semibold transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
        style={{ color: active ? Couleur.cyan : Couleur.textMuted }}
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = '#fff'; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = Couleur.textMuted; }}
      >
        {label}
        <span
          className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300"
          style={{ width: active ? '100%' : '0%', background: `linear-gradient(to right, ${Couleur.blue}, ${Couleur.cyan})` }}
        />
        <span
          className="absolute -bottom-0.5 left-0 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-300"
          style={{ background: `linear-gradient(to right, ${Couleur.blue}, ${Couleur.cyan})`, opacity: active ? 0 : 1 }}
        />
      </button>
    );
  };

  const MobileNavLink = ({ label, id }: { label: string; id: SectionId }) => {
    const active = activeSection === id;
    return (
      <button
        onClick={() => navigate(id)}
        className="w-full py-3 px-4 rounded-xl text-sm font-bold text-center transition-all duration-200 cursor-pointer"
        style={{
          background: active ? 'rgba(58,134,255,0.15)' : 'transparent',
          color:      active ? Couleur.cyan : Couleur.textMuted,
          border:     `1px solid ${active ? 'rgba(58,134,255,0.3)' : 'transparent'}`,
        }}
        onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#fff'; } }}
        onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = Couleur.textMuted; } }}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px);  } to { opacity:1; transform:translateY(0); } }
        .anim-up     { animation: fadeInUp 0.65s ease both; }
        .mobile-menu { animation: fadeDown 0.25s ease forwards; }

        /* Chaque section commence proprement sous la navbar */
        section { scroll-margin-top: 80px; }

        /* Espacement vertical uniforme entre sections */
        .section-block {
          padding-top: 96px;
          padding-bottom: 96px;
        }

        input::placeholder, textarea::placeholder { color: #94a3b8; }
      `}</style>

      {/* ════ NAVBAR FIXE ════ */}
      <nav
        className="fixed top-0 w-full z-50 h-20 flex items-center justify-between px-6 lg:px-12"
        style={{
          background:     isScrolled ? 'rgba(22,33,62,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom:   isScrolled ? '1px solid rgba(58,134,255,0.2)' : '1px solid transparent',
          boxShadow:      isScrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
          transition:     'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('accueil')}
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 bg-transparent border-none cursor-pointer"
        >
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl tracking-tight" style={{ color: Couleur.blue }}>ABDOULAYE</span>
            <span className="text-[10px] tracking-widest font-semibold" style={{ color: Couleur.textDim }}>APP</span>
          </div>
          <div className="w-1 h-10 rounded-full" style={{ background: `linear-gradient(to bottom, ${Couleur.blue}, ${Couleur.purple})` }} />
        </button>

        {/* Liens desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {NavItems.map((item) => (
            <NavLink key={item.id} label={item.label} id={item.id} />
          ))}
        </div>

        {/* Bouton Profil desktop */}
        <div className="hidden lg:flex">
          <a
            href="/profil"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`, boxShadow: `0 4px 16px rgba(58,134,255,0.3)`, textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px rgba(58,134,255,0.5)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px rgba(58,134,255,0.3)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">👤</span>
            Profil
          </a>
        </div>

        {/* Burger mobile */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden p-2 rounded-xl transition-all duration-200"
          style={{
            color:      Couleur.textMuted,
            background: menuOpen ? 'rgba(58,134,255,0.1)' : 'transparent',
            border:     `1px solid ${menuOpen ? 'rgba(58,134,255,0.3)' : 'transparent'}`,
          }}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {/* ── Menu mobile déroulant ── */}
      {menuOpen && (
        <div
          className="mobile-menu lg:hidden fixed top-20 left-0 right-0 z-40 py-5 px-5 flex flex-col gap-2"
          style={{
            background:     'rgba(13,21,37,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom:   '1px solid rgba(58,134,255,0.2)',
            boxShadow:      '0 16px 48px rgba(0,0,0,0.5)',
          }}
        >
          {NavItems.map((item) => (
            <MobileNavLink key={item.id} label={item.label} id={item.id} />
          ))}
          <div className="my-2 h-px" style={{ background: 'rgba(58,134,255,0.15)' }} />
          <a
            href="/profil"
            className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`, textDecoration: 'none' }}
          >
            <span>👤</span> Mon Profil
          </a>
        </div>
      )}

      {/* ════ CONTENU ════ */}
      <main style={{ margin: 0, padding: 0 }}>

        {/* 1. ACCUEIL — le Header gère son propre padding (pt-28) */}
        <Header navigate={navigate} />

        {/* 2. À PROPOS */}
        <section
          id="apropos"
          className="section-block"
          style={{ background: `linear-gradient(160deg, ${Couleur.bg2}, ${Couleur.bg3}, ${Couleur.bg1})`, marginTop: '80px' }}
        >
          <Propos />
        </section>

        {/* 3. BIBLIOTHÈQUE */}
        <section
          id="Bibliothequesite"
          className="section-block"
          style={{ background: `linear-gradient(160deg, ${Couleur.bg3}, ${Couleur.bg1}, ${Couleur.bg2})`, marginTop: '80px' }}
        >
          <BibliothèqueSite />
        </section>

        {/* 4. CONTACT */}
        <section
          id="contact"
          className="section-block"
          style={{ background: `linear-gradient(160deg, ${Couleur.bg1}, ${Couleur.bg2}, ${Couleur.bg3})` }}
        >
          <Contact />
        </section>

        {/* 5. FOOTER — pas de section id, juste en bas de page */}
        <footer style={{ background: Couleur.bg1 }} className="px-6 lg:px-12 py-8">
          <Footer />
        </footer>

      </main>
    </>
  );
};

export default Site;