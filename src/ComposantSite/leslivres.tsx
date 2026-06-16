import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL as string;

interface Livre {
  id:         number;
  titre:      string;
  auteur:     string;
  fichierPdf: string;
  cover:      string;
  tag?:       string;
}

const getCoverUrl = (cover: string | null | undefined): string => {
  if (!cover || cover.trim() === '') return '/placeholder.png';
  if (cover.startsWith('http://') || cover.startsWith('https://')) return cover;
  const clean = cover.replace(/^\/+/, '');
  if (clean.startsWith('uploads/')) return `${API_URL}/${clean}`;
  return `${API_URL}/uploads/images/${clean}`;
};

/* ── Étoiles ── */
const Stars: React.FC<{ n: number }> = ({ n }) => (
  <span className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="11" height="11" viewBox="0 0 24 24"
        fill={i <= n ? "#FFBA00" : "none"} stroke="#FFBA00" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </span>
);

/* ── Skeleton ── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-[#0C3B2E]/10 animate-pulse">
    <div className="h-44 bg-[#0C3B2E]/8"/>
    <div className="p-4 space-y-2">
      <div className="h-3 bg-[#0C3B2E]/8 rounded w-4/5"/>
      <div className="h-3 bg-[#0C3B2E]/8 rounded w-3/5"/>
      <div className="h-4 bg-[#0C3B2E]/8 rounded w-2/5 mt-2"/>
    </div>
  </div>
);

/* ── Dots ── */
const Dots: React.FC<{ active?: number }> = ({ active = 2 }) => (
  <div className="flex justify-center gap-1.5 mb-4">
    {[0,1,2,3,4].map(i => (
      <div key={i} className={`w-2 h-2 rounded-full ${i === active ? "bg-[#FFBA00]" : "bg-[#0C3B2E]/20"}`}/>
    ))}
  </div>
);

/* ── Book Card ── */
const BookCard = ({ livre, rank, onRead }: { livre: Livre; rank: number; onRead: () => void }) => {
  const [imgErr, setImgErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const note = Number(livre.tag) || 0;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-[#0C3B2E]/10
        hover:shadow-xl hover:shadow-[#0C3B2E]/10 transition-all duration-300 group cursor-pointer"
      onClick={onRead}
    >
      {/* Cover */}
      <div className="h-44 relative grid place-items-center overflow-hidden bg-[#0C3B2E]/5">

        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3B2E]/5 via-white to-[#0C3B2E]/5 animate-pulse"/>
        )}

        <img
          src={imgErr ? '/placeholder.png' : getCoverUrl(livre.cover)}
          alt={livre.titre}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
          onLoad={() => setLoaded(true)}
          onError={() => { setImgErr(true); setLoaded(true); }}
        />

        {/* Badge rang */}
        <span className="absolute top-3 left-3 bg-[#FFBA00] text-[#0C3B2E]
          text-[11px] font-black px-2.5 py-1 rounded-full shadow">
          #{rank}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="font-bold text-[13px] text-[#0C3B2E] line-clamp-2 leading-snug min-h-[40px]
          group-hover:text-[#FFBA00] transition-colors">
          {livre.titre}
        </p>
        {livre.auteur && (
          <p className="text-[11px] text-slate-400 mt-1 truncate">{livre.auteur}</p>
        )}

        {note > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <Stars n={note}/>
            <span className="text-[11px] text-slate-400">{note}.0 / 5</span>
          </div>
        )}

        <button
          className="mt-3 w-full py-1.5 rounded-lg text-[11px] font-black flex items-center
            justify-center gap-1.5 border border-[#0C3B2E]/20 text-[#0C3B2E]
            group-hover:bg-[#0C3B2E] group-hover:text-white group-hover:border-transparent
            transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); onRead(); }}
        >
          Consulter <ArrowRight className="w-3 h-3"/>
        </button>
      </div>
    </div>
  );
};

/* ── Composant principal ── */
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
        if (!cancelled) { setError('Impossible de charger les livres'); setLivres([]); }
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
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Titre */}
        <div className="text-center mb-12">
          <Dots active={2}/>
          <p className="text-[#FFBA00] text-[11px] font-black uppercase tracking-[.12em] mb-2">
            Livres populaires
          </p>
          <h2 className="text-[38px] font-black text-[#0C3B2E]">Top 10 Best Sellers</h2>
          <div className="w-12 h-[3px] bg-[#FFBA00] rounded mx-auto mt-3"/>
          <p className="text-slate-400 text-[13px] mt-3">
            Découvrez les livres les plus populaires et captivants
          </p>
        </div>

        {/* États */}
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-400 text-sm font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i}/>)
              : livres.map((livre, idx) => (
                  <BookCard
                    key={livre.id}
                    livre={livre}
                    rank={idx + 1}
                    onRead={() => handleRead(livre.id)}
                  />
                ))
            }
          </div>
        )}

        {/* Bouton voir tout */}
        {!loading && !error && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/livres')}
              className="border-2 border-[#0C3B2E] text-[#0C3B2E] hover:bg-[#0C3B2E]
                hover:text-white font-semibold px-10 py-3.5 rounded-full transition-all
                duration-200 text-[13px] flex items-center gap-2 mx-auto"
            >
              Voir tous les livres <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default LesLivres;