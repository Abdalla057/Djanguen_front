import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Carousel from './carousoll';

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
} as const;

/* ================================================================
   PROPS — reçoit navigate depuis le parent (Site.tsx)
   ================================================================ */
interface HeaderProps {
  navigate?: (id: string) => void;  
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  return (
    <section
      id="accueil"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-20 pt-28 lg:pt-24 pb-16 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${Couleur.bg1}, ${Couleur.bg2}, ${Couleur.bg3})` }}
    >
      {/* Shapes décoratives */}
      <svg className="absolute top-0 right-0 w-96 h-96 z-0 pointer-events-none" viewBox="0 0 400 400" style={{ opacity: 0.35 }}>
        <defs>
          <linearGradient id="shapeR" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path d="M0,0 Q100,50 200,0 T400,0 L400,400 Q350,350 300,400 T100,400 Q50,350 0,400 Z" fill="url(#shapeR)" />
      </svg>
      <svg className="absolute top-0 left-0 w-80 h-80 z-0 pointer-events-none" viewBox="0 0 400 400" style={{ opacity: 0.2, transform: 'scaleX(-1)' }}>
        <defs>
          <linearGradient id="shapeL" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#8338ec" />
          </linearGradient>
        </defs>
        <path d="M0,0 Q100,50 200,0 T400,0 L400,400 Q350,350 300,400 T100,400 Q50,350 0,400 Z" fill="url(#shapeL)" />
      </svg>

      {/* Texte hero */}
      <div className="flex-1 space-y-6 relative z-10 anim-up" style={{ animationDelay: '0.1s' }}>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
          style={{ background: 'rgba(58,134,255,0.1)', border: '1px solid rgba(58,134,255,0.3)', color: Couleur.cyan }}
        >
          📖 Bienvenue
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight" style={{ color: Couleur.text }}>
          Plongez-vous<br />dans la{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, ${Couleur.blue}, ${Couleur.cyan})` }}
          >
            lecture
          </span>
          <br />du coran
        </h1>

        <p className="text-lg font-medium leading-relaxed max-w-lg" style={{ color: Couleur.textMuted }}>
          Découvrez une large variété de textes coraniques et apprenez paisiblement
          avec notre plateforme interactive.
        </p>

        <div className="flex items-center gap-4 pt-2 flex-col sm:flex-row">
          <button
            onClick={() => navigate?.('Bibliothequesite')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base w-full sm:w-auto justify-center transition-all duration-300 active:scale-95 border-none cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`, boxShadow: `0 6px 24px rgba(58,134,255,0.35)` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 32px rgba(58,134,255,0.55)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px rgba(58,134,255,0.35)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Rechercher un livre <FaArrowRight />
          </button>

          <button
            onClick={() => navigate?.('apropos')}
            className="px-8 py-4 rounded-xl font-bold text-base w-full sm:w-auto text-center transition-all duration-300 active:scale-95 bg-transparent cursor-pointer"
            style={{ border: `2px solid rgba(58,134,255,0.4)`, color: Couleur.blue }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(58,134,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = Couleur.blue; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            En savoir plus
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex-1 w-full lg:w-auto relative z-10 anim-up" style={{ animationDelay: '0.25s' }}>
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-3xl blur-2xl pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(58,134,255,0.12), rgba(131,56,236,0.12))' }}
          />
          <Carousel />
        </div>
      </div>

      {/* Vague bas */}
      <svg className="absolute bottom-0 left-0 w-full z-20 pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.03)" />
      </svg>
    </section>
  );
};

export default Header;