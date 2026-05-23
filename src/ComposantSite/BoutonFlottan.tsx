import { useState, useEffect, useCallback } from 'react';
import { FaArrowUp, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

/* ================== CONST ================== */
const COLOR_SCHEME = {
  primary: {
    dark: '#1a1a2e',
    medium: '#16213e',
    light: '#0f3460',
  },
  accent: {
    blue: '#3a86ff',
    cyan: '#00d9ff',
    purple: '#8338ec',
  },
  status: {
    success: '#06d6a0',
    warning: '#ffbe0b',
    error: '#ef476f',
  },
  neutral: {
    white: '#ffffff',
    gray900: '#0f172a',
    gray300: '#cbd5e1',
  },
};

const FLOATING_ACTIONS = [
  {
    id: 'whatsapp',
    icon: FaWhatsapp,
    label: 'WhatsApp',
    color: '#25D366',
    action: () => window.open('https://wa.me/1234567890', '_blank'),
  },
  {
    id: 'email',
    icon: FaEnvelope,
    label: 'Email',
    color: COLOR_SCHEME.accent.blue,
    action: () => window.location.href = 'mailto:contact@example.com',
  },
  {
    id: 'phone',
    icon: FaPhone,
    label: 'Appel',
    color: COLOR_SCHEME.accent.purple,
    action: () => window.location.href = 'tel:+1234567890',
  },
];

interface FloatingButtonState {
  isOpen: boolean;
  scrollProgress: number;
  showProgress: boolean;
}

/* ================== COMPONENT ================== */
const FloatingButton = () => {
  const [state, setState] = useState<FloatingButtonState>({
    isOpen: false,
    scrollProgress: 0,
    showProgress: false,
  });

  /**
   * Gère le scroll pour le calcul de la progression
   */
  const handleScroll = useCallback(() => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
    
    setState(prev => ({
      ...prev,
      scrollProgress: progress,
      showProgress: scrolled > 300,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <>
      {/* CONTENEUR DES ACTIONS FLOTTANTES */}
      <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
        {/* ACTIONS EN ÉTOILE */}
        {state.isOpen && (
          <div className="pointer-events-auto">
            {FLOATING_ACTIONS.map((action, index) => {
              const angle = (index / FLOATING_ACTIONS.length) * 360;
              const radius = 100;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              const ActionIcon = action.icon;

              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: action.color,
                    transform: `translate(${x}px, ${y}px) scale(1)`,
                    animation: `popIn 0.3s ease-out ${index * 0.1}s both`,
                  }}
                  title={action.label}
                >
                  <ActionIcon size={24} />
                  
                  {/* TOOLTIP */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {action.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* BOUTON PRINCIPAL (MENU) */}
        <button
          onClick={toggleMenu}
          className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-2xl transition-all duration-300 hover:scale-110 pointer-events-auto group"
          style={{
            background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.blue}, ${COLOR_SCHEME.accent.purple})`,
            boxShadow: `0 8px 20px ${COLOR_SCHEME.accent.blue}40`,
          }}
        >
          {/* ICÔNE ANIMÉE */}
          <div
            className="transition-all duration-300 text-2xl"
            style={{
              transform: state.isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            +
          </div>

          {/* GLOW EFFECT */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle, ${COLOR_SCHEME.accent.cyan}40, transparent)`,
            }}
          />
        </button>

        {/* INDICATEUR DE PROGRESSION CIRCULAIRE */}
        {state.showProgress && (
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-auto"
            style={{
              animation: `slideUp 0.3s ease-out backwards`,
            }}
          >
            <svg
              className="absolute inset-0"
              viewBox="0 0 60 60"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={COLOR_SCHEME.accent.blue} />
                  <stop offset="100%" stopColor={COLOR_SCHEME.accent.cyan} />
                </linearGradient>
              </defs>

              {/* Cercle de fond */}
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="rgba(131, 56, 236, 0.1)"
                strokeWidth="2"
              />

              {/* Cercle de progression */}
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="2"
                strokeDasharray={`${(state.scrollProgress / 100) * (26 * 2 * Math.PI)} ${26 * 2 * Math.PI}`}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dasharray 0.1s linear',
                }}
              />

              {/* Texte de progression */}
              <text
                x="30"
                y="36"
                textAnchor="middle"
                fill={COLOR_SCHEME.accent.purple}
                fontSize="12"
                fontWeight="bold"
              >
                {Math.round(state.scrollProgress)}%
              </text>
            </svg>
          </div>
        )}

        {/* BOUTON RETOUR AU TOP (ALTERNATIF) */}
        {state.showProgress && !state.isOpen && (
          <button
            onClick={handleScrollToTop}
            className="absolute bottom-0 right-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-2xl transition-all duration-300 hover:scale-110 pointer-events-auto group"
            style={{
              background: `linear-gradient(135deg, ${COLOR_SCHEME.accent.purple}, ${COLOR_SCHEME.accent.blue})`,
              boxShadow: `0 8px 20px ${COLOR_SCHEME.accent.purple}40`,
              animation: `slideUp 0.3s ease-out backwards`,
            }}
            title="Retour au top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default FloatingButton;