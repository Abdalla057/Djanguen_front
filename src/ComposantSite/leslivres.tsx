import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Eye } from 'lucide-react';

/* ================================================================
   CONSTANTES
   ================================================================ */
const API_URL = import.meta.env.VITE_API_URL as string;

const C = {
  bg1:        '#0a0d16',
  bg2:        '#0d1525',
  blue:       '#3a86ff',
  cyan:       '#00d9ff',
  purple:     '#8338ec',
  gold:       '#ffbe0b',
  text:       '#f1f5f9',
  textMuted:  '#94a3b8',
  textDim:    '#475569',
  card:       'rgba(15,25,50,0.6)',
  border:     'rgba(58,134,255,0.18)',
  borderHov:  'rgba(58,134,255,0.5)',
} as const;

/* Couleurs podium uniquement pour les 3 premiers */
const RANK_STYLES: Record<number, { gradient: string; label: string; glow: string }> = {
  1: { gradient: `linear-gradient(135deg, #ffd700, #ffb700)`, label: '#1',  glow: 'rgba(255,215,0,0.5)'  },
  2: { gradient: `linear-gradient(135deg, #b0c4de, #9baec8)`, label: '#2',  glow: 'rgba(176,196,222,0.4)' },
  3: { gradient: `linear-gradient(135deg, #cd7f32, #a0522d)`, label: '#3',  glow: 'rgba(205,127,50,0.4)'  },
};

/* ================================================================
   TYPE
   ================================================================ */
interface Livre {
  id:         number;
  titre:      string;
  auteur:     string;
  fichierPdf: string;
  cover:      string;
}

/* ================================================================
   UTILITAIRE IMAGE
   ================================================================ */
const getCoverUrl = (cover: string | null | undefined): string => {
  if (!cover || cover.trim() === '') return '/placeholder.png';
  if (cover.startsWith('http://') || cover.startsWith('https://')) return cover;
  const clean = cover.replace(/^\/+/, '');
  if (clean.startsWith('uploads/')) return `${API_URL}/${clean}`;
  return `${API_URL}/uploads/images/${clean}`;
};

/* ================================================================
   BOOK CARD
   ================================================================ */
interface BookCardProps {
  livre:  Livre;
  rank:   number;
  onRead: () => void;
}

const BookCard = ({ livre, rank, onRead }: BookCardProps) => {
  const [imgErr, setImgErr] = useState(false);
  const [hov,    setHov]    = useState(false);
  const [loaded, setLoaded] = useState(false);

  const rankStyle = RANK_STYLES[rank] ?? null;

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: C.card,
        border:     `1px solid ${hov ? C.borderHov : C.border}`,
        boxShadow:  hov
          ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(58,134,255,0.2)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        transform:  hov ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        cursor:     'pointer',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onRead}
    >
      {/* ── Badge podium (rang 1-3 seulement) ── */}
      {rankStyle && (
        <div
          className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black text-white shadow-lg"
          style={{
            background: rankStyle.gradient,
            boxShadow:  `0 4px 14px ${rankStyle.glow}`,
          }}
        >
          {rankStyle.label}
        </div>
      )}

      {/* ── Numéro de rang discret (4-10) ── */}
      {!rankStyle && (
        <div
          className="absolute top-2.5 left-2.5 z-20 w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-black"
          style={{
            background: 'rgba(10,13,22,0.75)',
            color:       C.textDim,
            border:      '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {rank}
        </div>
      )}

      {/* ── Image couverture ── */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '2 / 3',
          background:  'linear-gradient(135deg, #0d1525, #111827)',
        }}
      >
        {/* Skeleton shimmer pendant le chargement */}
        {!loaded && (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #0d1525 25%, #1a2740 50%, #0d1525 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}

        <img
          src={imgErr ? '/placeholder.png' : getCoverUrl(livre.cover)}
          alt={livre.titre}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            transform:  hov ? 'scale(1.07)' : 'scale(1)',
            filter:     hov ? 'brightness(1.08)' : 'brightness(0.96)',
            transition: 'transform 0.5s ease, filter 0.4s ease, opacity 0.3s ease',
            opacity:    loaded ? 1 : 0,
          }}
          onLoad={() => setLoaded(true)}
          onError={() => { setImgErr(true); setLoaded(true); }}
        />

        {/* Dégradé bas permanent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,13,22,0.85) 0%, rgba(10,13,22,0.1) 55%, transparent 100%)' }}
        />

        {/* Overlay hover avec bouton Lire */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: 'rgba(0,0,0,0.38)',
            opacity:    hov ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs text-white pointer-events-auto"
            style={{
              background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
              boxShadow:  `0 4px 18px rgba(58,134,255,0.45)`,
              transform:  hov ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.95)',
              transition: 'transform 0.3s ease',
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            Lire
          </div>
        </div>
      </div>

      {/* ── Infos ── */}
      <div className="p-3 flex flex-col gap-1.5">
        <h3
          className="text-xs font-black line-clamp-2 leading-snug"
          style={{ color: hov ? '#fff' : C.text, transition: 'color 0.2s' }}
        >
          {livre.titre}
        </h3>
        <p className="text-[10px] font-semibold line-clamp-1" style={{ color: C.textDim }}>
          {livre.auteur}
        </p>

        <button
          className="mt-1 w-full py-1.5 rounded-lg text-[10px] font-black flex items-center justify-center gap-1.5"
          style={{
            background: hov
              ? `linear-gradient(135deg, ${C.blue}, ${C.cyan})`
              : 'rgba(58,134,255,0.08)',
            color:  hov ? '#fff' : C.blue,
            border: `1px solid ${hov ? 'transparent' : 'rgba(58,134,255,0.25)'}`,
            boxShadow: hov ? `0 4px 14px rgba(58,134,255,0.3)` : 'none',
            transition: 'all 0.25s ease',
          }}
          onClick={(e) => { e.stopPropagation(); onRead(); }}
        >
          Consulter
          <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
};

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
const LesLivres: React.FC = () => {
  const [livres,  setLivres]  = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const fetchLivres = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/admin/livre`);
        if (!res.ok) throw new Error('Erreur serveur');
        const data: Livre[] = await res.json();
        if (!cancelled) setLivres(data.slice(0, 10));
      } catch {
        if (!cancelled) {
          setError('Impossible de charger les livres');
          setLivres([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchLivres();
    return () => { cancelled = true; };
  }, []);

  const handleRead = useCallback(
    (id: number) => navigate(`/livre/${id}/pages`),
    [navigate],
  );

  return (
    <div
      className="p-8 md:p-10 rounded-3xl relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${C.bg1} 0%, ${C.bg2} 50%, ${C.bg1} 100%)`,
        border: `1px solid ${C.border}`,
      }}
    >
      {/* ── Blobs de fond ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(58,134,255,0.1), transparent 70%)', animation: 'floatBlob 7s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(131,56,236,0.1), transparent 70%)', animation: 'floatBlob 9s ease-in-out infinite 1.5s' }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(-18px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes staggerIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-in { animation: fadeInUp  0.5s ease forwards; }
        .stagger { animation: staggerIn 0.4s ease forwards; opacity: 0; }
      `}</style>

      <div className="relative z-10">

        {/* ── Header ── */}
        <div className="fade-in flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
                  boxShadow:  `0 6px 20px rgba(58,134,255,0.35)`,
                }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${C.blue}, ${C.cyan}, ${C.purple})` }}
              >
                Top 10 Best Sellers
              </h2>
            </div>

            <p className="text-sm font-medium" style={{ color: C.textMuted }}>
              Découvrez les livres les plus populaires et captivants
            </p>

            <div
              className="mt-3 h-0.5 w-14 rounded-full"
              style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.gold})` }}
            />
          </div>

          {/* Bouton Voir tout */}
          <button
            onClick={() => navigate('/livres')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white whitespace-nowrap transition-all duration-300 active:scale-95 shrink-0"
            style={{
              background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
              boxShadow:  `0 6px 20px rgba(58,134,255,0.3)`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 28px rgba(58,134,255,0.5)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px rgba(58,134,255,0.3)`;  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Voir tous les livres
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── États ── */}
        {loading ? (
          /* Skeletons */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: '2/3', background: 'linear-gradient(90deg, #0d1525 25%, #1a2740 50%, #0d1525 75%)', backgroundSize: '200% 100%', animation: `shimmer 1.5s infinite ${i * 0.06}s` }}
              />
            ))}
          </div>
        ) : error ? (
          <div
            className="p-5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
          >
            {error}
          </div>
        ) : livres.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" style={{ color: C.blue }} />
            <p className="text-sm font-semibold" style={{ color: C.textDim }}>Aucun livre disponible</p>
          </div>
        ) : (
          /* Grille de livres */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {livres.map((livre, idx) => (
              <div
                key={livre.id}
                className="stagger"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <BookCard
                  livre={livre}
                  rank={idx + 1}
                  onRead={() => handleRead(livre.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LesLivres;