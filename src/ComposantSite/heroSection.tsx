import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

/* ================================================================
   PALETTE
   ================================================================ */
const C = {
  bg:         '#0a0d16',
  bgMid:      '#0d1525',
  blue:       '#3a86ff',
  cyan:       '#00d9ff',
  purple:     '#8338ec',
  gold:       '#ffbe0b',
  text:       '#f1f5f9',
  textMuted:  '#94a3b8',
  textDim:    '#475569',
  cardBg:     'rgba(22,33,62,0.5)',
  border:     'rgba(58,134,255,0.2)',
  borderHov:  'rgba(58,134,255,0.5)',
} as const;

/* ================================================================
   DONNÉES
   ================================================================ */
const FEATURES = [
  { icon: '📖', text: 'Textes Coraniques Authentiques' },
  { icon: '🌙', text: 'Apprentissage Spirituel'        },
  { icon: '🔊', text: 'Récitations Fluides'            },
  { icon: '📱', text: 'Plateforme Accessible'          },
] as const;

const STATS = [
  { number: '114+', label: 'Sourates Disponibles' },
  { number: '10K+', label: 'Utilisateurs Actifs'  },
  { number: '24/7', label: 'Accès Disponible'      },
] as const;

/* ================================================================
   SOUS-COMPOSANTS
   ================================================================ */

/* ── Chip feature ── */
const FeatureChip = ({ icon, text }: { icon: string; text: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300"
      style={{
        background: hov ? 'rgba(58,134,255,0.1)' : C.cardBg,
        border:     `1px solid ${hov ? C.borderHov : C.border}`,
        transform:  hov ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow:  hov ? `0 8px 24px rgba(58,134,255,0.15)` : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-semibold" style={{ color: C.textMuted }}>{text}</span>
    </div>
  );
};

/* ── Stat card ── */
const StatCard = ({ number, label }: { number: string; label: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="text-center p-6 rounded-2xl transition-all duration-300"
      style={{
        background: hov ? 'rgba(22,33,62,0.7)' : C.cardBg,
        border:     `1px solid ${hov ? C.borderHov : C.border}`,
        backdropFilter: 'blur(12px)',
        transform:  hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:  hov ? `0 16px 40px rgba(58,134,255,0.12)` : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <p
        className="text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(135deg, ${C.blue}, ${C.cyan})` }}
      >
        {number}
      </p>
      <p className="text-sm font-semibold" style={{ color: C.textMuted }}>{label}</p>
    </div>
  );
};

/* ── Bouton primaire ── */
const PrimaryBtn = ({ children }: { children: React.ReactNode }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      className="px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 text-white transition-all duration-300 active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
        boxShadow:  hov
          ? `0 12px 32px rgba(58,134,255,0.5)`
          : `0 6px 20px rgba(58,134,255,0.3)`,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
      <FaArrowRight
        className="transition-transform duration-300"
        style={{ transform: hov ? 'translateX(4px)' : 'translateX(0)' }}
      />
    </button>
  );
};

/* ── Bouton secondaire ── */
const SecondaryBtn = ({ children }: { children: React.ReactNode }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 active:scale-95"
      style={{
        background: hov ? 'rgba(58,134,255,0.1)' : 'transparent',
        border:     `2px solid ${hov ? C.blue : C.border}`,
        color:      hov ? '#fff' : C.blue,
        transform:  hov ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow:  hov ? `0 8px 24px rgba(58,134,255,0.15)` : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </button>
  );
};

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
const HeroSection: React.FC = () => {
  const [imgHov, setImgHov] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${C.bg} 0%, ${C.bgMid} 50%, ${C.bg} 100%)` }}
    >
      {/* ── Animations CSS ── */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-18px); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1);    }
          50%       { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes badgePop {
          0%   { transform: scale(1)    rotate(-3deg); }
          50%  { transform: scale(1.08) rotate(3deg);  }
          100% { transform: scale(1)    rotate(-3deg); }
        }

        .hero-text    { animation: fadeInUp    0.7s ease 0.1s both; }
        .hero-desc    { animation: fadeInUp    0.7s ease 0.2s both; }
        .hero-feat    { animation: fadeInUp    0.7s ease 0.3s both; }
        .hero-btns    { animation: fadeInUp    0.7s ease 0.4s both; }
        .hero-image   { animation: fadeInRight 0.8s ease 0.2s both; }
        .hero-stats   { animation: fadeInUp    0.7s ease 0.5s both; }

        .blob-1 { animation: floatY  7s ease-in-out infinite; }
        .blob-2 { animation: floatY2 9s ease-in-out infinite 1s; }
        .blob-3 { animation: pulseGlow 5s ease-in-out infinite; }

        .badge-float  { animation: badgePop 3s ease-in-out infinite; }

        .ring-rotate  { animation: rotateSlow 12s linear infinite; }
      `}</style>

      {/* ── Blobs de fond ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="blob-1 absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(58,134,255,0.12), transparent 70%)` }}
        />
        <div
          className="blob-2 absolute -bottom-20 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(131,56,236,0.12), transparent 70%)` }}
        />
        <div
          className="blob-3 absolute top-1/2 -translate-y-1/2 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(0,217,255,0.07), transparent 70%)` }}
        />
        {/* Grain subtil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ════ TEXTE ════ */}
          <div className="flex flex-col justify-center">

            {/* Badge supérieur */}
            <div className="hero-text mb-6 inline-flex">
              <span
                className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
                style={{
                  background: 'rgba(58,134,255,0.1)',
                  border:     `1px solid ${C.border}`,
                  color:      C.cyan,
                }}
              >
                ✦ Plateforme Coranique
              </span>
            </div>

            {/* Titre */}
            <div className="hero-text mb-6">
              <h1
                className="text-5xl md:text-6xl font-black leading-tight mb-3"
                style={{ color: C.text }}
              >
                Explorez
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(90deg, ${C.blue}, ${C.cyan}, ${C.purple})` }}
                >
                  le Coran
                </span>
              </h1>

              {/* Ligne décorative animée */}
              <div
                className="h-0.5 rounded-full"
                style={{
                  width: imgHov ? '80px' : '56px',
                  background: `linear-gradient(90deg, ${C.blue}, ${C.gold})`,
                  transition: 'width 0.5s ease',
                }}
              />
            </div>

            {/* Description */}
            <p
              className="hero-desc text-lg md:text-xl font-medium leading-relaxed mb-8"
              style={{ color: C.textMuted }}
            >
              Plongez dans la connaissance divine avec notre plateforme dédiée à la lecture
              et l'apprentissage du Coran. Une expérience spirituelle enrichissante et transformatrice.
            </p>

            {/* Features grid */}
            <div className="hero-feat grid grid-cols-2 gap-3 mb-10">
              {FEATURES.map((f) => (
                <FeatureChip key={f.text} icon={f.icon} text={f.text} />
              ))}
            </div>

            {/* Boutons */}
            <div className="hero-btns flex gap-4 flex-col sm:flex-row">
              <PrimaryBtn>Commencer la Lecture</PrimaryBtn>
              <SecondaryBtn>Découvrir Plus</SecondaryBtn>
            </div>
          </div>

          {/* ════ IMAGE ════ */}
          <div
            className="hero-image flex justify-center relative"
            onMouseEnter={() => setImgHov(true)}
            onMouseLeave={() => setImgHov(false)}
          >
            {/* Anneau décoratif rotatif */}
            <div
              className="ring-rotate absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none"
              style={{
                border: `1px dashed rgba(58,134,255,0.2)`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            {/* Halo glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(58,134,255,0.12), transparent 70%)`,
                transform:   imgHov ? 'scale(1.15)' : 'scale(1)',
                transition:  'transform 0.6s ease',
              }}
            />

            {/* Conteneur image — lift au hover */}
            <div
              className="relative z-10 transition-all duration-500"
              style={{
                transform: imgHov ? 'translateY(-16px) scale(1.03)' : 'translateY(0) scale(1)',
              }}
            >
              {/* Cadre décoratif décalé */}
              <div
                className="absolute rounded-3xl pointer-events-none"
                style={{
                  inset: 0,
                  background: `linear-gradient(135deg, rgba(58,134,255,0.15), rgba(131,56,236,0.15))`,
                  transform: 'translate(-10px, -10px)',
                  zIndex: -1,
                  borderRadius: '1.5rem',
                  border: `1px solid rgba(58,134,255,0.15)`,
                }}
              />

              {/* ============================================================
                  ZONE IMAGE — remplacez le contenu ci-dessous par votre <img>
                  Exemple :
                    <img
                      src="/votre-image.png"
                      alt="Coran"
                      className="w-64 md:w-80 rounded-3xl shadow-2xl object-cover"
                      style={{ filter: imgHov ? 'brightness(1.08)' : 'brightness(1)', transition: 'filter 0.4s ease' }}
                    />
                  ============================================================ */}
              <div
                className="w-64 md:w-80 rounded-3xl flex items-center justify-center"
                style={{
                  height: '22rem',
                  background: 'rgba(22,33,62,0.6)',
                  border: `1px dashed rgba(58,134,255,0.3)`,
                  boxShadow: imgHov
                    ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(58,134,255,0.3)`
                    : `0 16px 48px rgba(0,0,0,0.4)`,
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                <p
                  className="text-xs font-bold text-center px-6 leading-relaxed"
                  style={{ color: 'rgba(58,134,255,0.5)' }}
                >
                  Votre image ici
                </p>
              </div>
              {/* ============================================================
                  FIN ZONE IMAGE
                  ============================================================ */}

              {/* Badge flottant */}
              <div
                className="badge-float absolute -bottom-4 -right-4 px-5 py-2.5 rounded-full font-black text-sm text-white shadow-xl"
                style={{
                  background:  `linear-gradient(135deg, ${C.gold}, #ef476f)`,
                  boxShadow:   `0 8px 24px rgba(255,190,11,0.4)`,
                }}
              >
                🌟 Gratuit
              </div>
            </div>
          </div>

        </div>

        {/* ════ STATS ════ */}
        <div className="hero-stats grid grid-cols-3 gap-6 mt-24">
          {STATS.map((s) => (
            <StatCard key={s.label} number={s.number} label={s.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;