/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search, BookOpen, User, Eye, Sparkles,
  TrendingUp, Filter, LayoutGrid, Grid3x3, X, BookMarked,
  ChevronUp, SortAsc, SortDesc, Tag, ArrowUpRight, ChevronDown,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL as string;

const INITIAL_LIMIT = 10;

const Couleur = {
  bg1:        "#1a1a2e",
  bg2:        "#16213e",
  bg3:        "#0f3460",
  bgCard:     "rgba(255,255,255,0.04)",
  bgCardHov:  "rgba(255,255,255,0.08)",
  blue:       "#3a86ff",
  cyan:       "#00d9ff",
  purple:     "#8338ec",
  text:       "#f1f5f9",
  textMuted:  "#cbd5e1",
  textDim:    "#94a3b8",
  border:     "rgba(58,134,255,0.18)",
  borderHov:  "rgba(58,134,255,0.45)",
  glow:       "rgba(58,134,255,0.25)",
  glowCyan:   "rgba(0,217,255,0.15)",
  shadow:     "rgba(0,0,0,0.35)",
} as const;

interface Livre {
  id:          number;
  titre?:      string;
  auteur?:     string;
  categorie?:  string;
  cover?:      string;
  fichierPdf?: string;
}

type ViewMode  = "grid" | "compact";
type SortOrder = "asc" | "desc" | "none";

/* ================================================================
   UTILITAIRES
   ================================================================ */
const getImageUrl = (cover?: string): string => {
  if (!cover) return "/placeholder.png";
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  return `${API_URL}/uploads/images/${cover}`;
};

const groupByCategory = (livres: Livre[]): Record<string, Livre[]> =>
  livres.reduce<Record<string, Livre[]>>((acc, livre) => {
    const cat = livre.categorie?.trim() || "Non classé";
    (acc[cat] ??= []).push(livre);
    return acc;
  }, {});

/* ================================================================
   SOUS-COMPOSANTS
   ================================================================ */

/* ── Stat card ── */
const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div
    className="px-5 py-4 rounded-2xl flex items-center gap-4"
    style={{
      background: "rgba(255,255,255,0.06)",
      border: `1px solid ${Couleur.border}`,
      backdropFilter: "blur(12px)",
    }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`, boxShadow: `0 4px 12px ${Couleur.glow}` }}
    >
      <span style={{ color: "#fff" }}>{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-black leading-none" style={{ color: Couleur.text }}>{value}</p>
      <p className="text-xs font-bold uppercase tracking-widest mt-0.5" style={{ color: Couleur.cyan }}>{label}</p>
    </div>
  </div>
);

/* ── Chip filtre ── */
const FilterChip = ({ label, active, count, onClick }: { label: string; active: boolean; count?: number; onClick: () => void }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="focus-ring px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-1.5"
      aria-pressed={active}
      style={
        active
          ? {
              background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`,
              color: "#fff",
              border: "1px solid transparent",
              boxShadow: `0 4px 14px ${Couleur.glow}`,
            }
          : {
              background: hov ? "rgba(58,134,255,0.1)" : "rgba(255,255,255,0.04)",
              color: hov ? Couleur.text : Couleur.textDim,
              border: `1px solid ${hov ? Couleur.borderHov : Couleur.border}`,
            }
      }
    >
      {label}
      {count !== undefined && (
        <span
          className="text-xs font-black px-1.5 py-0.5 rounded-full"
          style={{
            background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
            color: active ? "#fff" : Couleur.textDim,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
};

/* ── Toggle vue ── */
const ViewToggle = ({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) => (
  <div
    className="flex rounded-xl p-1 shrink-0"
    style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${Couleur.border}` }}
    role="group"
    aria-label="Mode d'affichage"
  >
    {(["grid", "compact"] as ViewMode[]).map((m) => (
      <button
        key={m}
        onClick={() => onChange(m)}
        className="focus-ring p-2 rounded-lg transition-all duration-200"
        aria-label={m === "grid" ? "Vue grille" : "Vue compacte"}
        aria-pressed={mode === m}
        style={
          mode === m
            ? { background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.cyan})`, color: "#fff", boxShadow: `0 2px 8px ${Couleur.glow}` }
            : { color: Couleur.textDim }
        }
      >
        {m === "grid" ? <LayoutGrid className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
      </button>
    ))}
  </div>
);

/* ── Sort toggle ── */
const SortToggle = ({ order, onChange }: { order: SortOrder; onChange: (o: SortOrder) => void }) => {
  const next: Record<SortOrder, SortOrder> = { none: "asc", asc: "desc", desc: "none" };
  const labels: Record<SortOrder, string> = { none: "Trier A→Z", asc: "A→Z", desc: "Z→A" };
  return (
    <button
      onClick={() => onChange(next[order])}
      className="focus-ring flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
      style={{
        background: order !== "none" ? `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.cyan})` : "rgba(255,255,255,0.05)",
        color: order !== "none" ? "#fff" : Couleur.textDim,
        border: `1px solid ${order !== "none" ? "transparent" : Couleur.border}`,
        boxShadow: order !== "none" ? `0 2px 10px ${Couleur.glow}` : "none",
      }}
      aria-label="Changer l'ordre de tri"
    >
      {order === "desc" ? <SortDesc className="w-3.5 h-3.5" /> : <SortAsc className="w-3.5 h-3.5" />}
      {labels[order]}
    </button>
  );
};

/* ── Carte livre ── */
const BookCard = ({ livre, viewMode, onNavigate }: { livre: Livre; viewMode: ViewMode; onNavigate: (id: number) => void }) => {
  const [hov, setHov]       = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden cursor-pointer focus-ring"
      tabIndex={0}
      role="button"
      aria-label={`Lire ${livre.titre || "ce livre"} par ${livre.auteur || "auteur inconnu"}`}
      style={{
        background: hov ? Couleur.bgCardHov : Couleur.bgCard,
        border: `1px solid ${hov ? Couleur.borderHov : Couleur.border}`,
        boxShadow: hov
          ? `0 20px 50px ${Couleur.shadow}, 0 0 0 1px rgba(58,134,255,0.1)`
          : `0 4px 16px ${Couleur.shadow}`,
        transform: hov ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        maxHeight: viewMode === "compact" ? "220px" : undefined,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onNavigate(livre.id)}
      onKeyDown={(e) => e.key === "Enter" && onNavigate(livre.id)}
    >
      {/* Couverture */}
      <div
        className={`relative overflow-hidden ${viewMode === "grid" ? "aspect-[2/3]" : "aspect-[3/4]"}`}
        style={{ background: Couleur.bg3 }}
      >
        {!loaded && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${Couleur.bg2} 25%, ${Couleur.bg3} 50%, ${Couleur.bg2} 75%)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 1.8s ease-in-out infinite",
            }}
          />
        )}

        <img
          src={imgErr ? "/placeholder.png" : getImageUrl(livre.cover)}
          alt={livre.titre || "Couverture du livre"}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{
            opacity:    loaded ? 1 : 0,
            transform:  hov ? "scale(1.07)" : "scale(1)",
            filter:     hov ? "brightness(1.04)" : "brightness(0.9)",
            transition: "transform 0.5s ease, filter 0.4s ease, opacity 0.3s ease",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => { setImgErr(true); setLoaded(true); }}
        />

        {/* Dégradé bas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,10,30,0.75) 0%, transparent 55%)" }}
        />

        {/* Badge catégorie */}
        {livre.categorie && viewMode === "grid" && (
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              background: "rgba(15,52,96,0.75)",
              color: Couleur.cyan,
              backdropFilter: "blur(8px)",
              border: `1px solid rgba(0,217,255,0.25)`,
            }}
          >
            <Tag className="w-2.5 h-2.5" />
            <span className="line-clamp-1 max-w-[80px]">{livre.categorie}</span>
          </div>
        )}

        {/* Overlay hover */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "rgba(10,10,30,0.55)",
            opacity:    hov ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          aria-hidden="true"
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm text-white"
            style={{
              background:  `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`,
              boxShadow:   `0 4px 18px ${Couleur.glow}`,
              transform:   hov ? "translateY(0) scale(1)" : "translateY(8px) scale(0.93)",
              transition:  "transform 0.3s cubic-bezier(0.34,1.2,0.64,1)",
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            Lire
          </div>
        </div>
      </div>

      {/* Infos — mode grille uniquement */}
      {viewMode === "grid" && (
        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="text-sm font-black leading-snug mb-1.5 line-clamp-2"
            style={{ color: hov ? Couleur.cyan : Couleur.text, transition: "color 0.2s" }}
          >
            {livre.titre || "Titre inconnu"}
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-semibold mb-4" style={{ color: Couleur.textDim }}>
            <User className="w-3 h-3 shrink-0" />
            <p className="line-clamp-1">{livre.auteur || "Auteur inconnu"}</p>
          </div>

          <button
            className="mt-auto py-2 rounded-xl text-xs font-black transition-all duration-250 flex items-center justify-center gap-1.5 focus-ring border-none cursor-pointer"
            style={{
              background:  hov ? `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})` : "rgba(58,134,255,0.08)",
              color:       hov ? "#fff" : Couleur.textMuted,
              border:      `1px solid ${hov ? "transparent" : Couleur.border}`,
              boxShadow:   hov ? `0 4px 14px ${Couleur.glow}` : "none",
            }}
            onClick={(e) => { e.stopPropagation(); onNavigate(livre.id); }}
            aria-label={`Consulter ${livre.titre}`}
          >
            Consulter
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </article>
  );
};

/* ── Titre de catégorie ── */
const CategoryTitle = ({ name, count }: { name: string; count: number }) => (
  <div className="flex items-center gap-5 mb-8">
    <div className="flex items-center gap-2 shrink-0">
      <div className="w-1.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${Couleur.blue}, ${Couleur.cyan})` }} />
      <div className="w-0.5 h-4 rounded-full" style={{ background: Couleur.cyan, opacity: 0.3 }} />
    </div>

    <h2 className="text-lg font-black whitespace-nowrap" style={{ color: Couleur.text, letterSpacing: "-0.3px" }}>
      {name}
      <span className="ml-2 text-sm font-bold" style={{ color: Couleur.textDim }}>— {count} titre{count > 1 ? "s" : ""}</span>
    </h2>

    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${Couleur.border}, transparent)` }} />
  </div>
);

/* ── Loading ── */
const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: Couleur.bg1 }}>
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: Couleur.glowCyan }} />
        <div
          className="w-20 h-20 border-4 rounded-full animate-spin"
          style={{ borderColor: Couleur.border, borderTopColor: Couleur.cyan }}
        />
        <BookOpen className="absolute inset-0 m-auto w-8 h-8" style={{ color: Couleur.cyan }} />
      </div>
      <p className="text-lg font-black" style={{ color: Couleur.textMuted }}>Chargement du catalogue...</p>
      <p className="text-sm mt-1" style={{ color: Couleur.textDim }}>Veuillez patienter</p>
    </div>
  </div>
);

/* ── Erreur ── */
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: Couleur.bg1 }}>
    <div
      className="text-center max-w-md p-8 rounded-3xl"
      style={{ background: Couleur.bgCard, border: `1px solid ${Couleur.border}`, boxShadow: `0 8px 32px ${Couleur.shadow}` }}
    >
      <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: Couleur.blue }} />
      <h3 className="text-xl font-black mb-2" style={{ color: Couleur.text }}>Erreur de chargement</h3>
      <p className="font-semibold mb-6" style={{ color: Couleur.textMuted }}>{message}</p>
      <button
        onClick={onRetry}
        className="focus-ring px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
        style={{ background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})` }}
      >
        Réessayer
      </button>
    </div>
  </div>
);

/* ── État vide ── */
const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <div className="text-center py-24 fade-up">
    <BookMarked className="w-14 h-14 mx-auto mb-4 opacity-20" style={{ color: Couleur.textMuted }} />
    <h3 className="text-xl font-black mb-2" style={{ color: Couleur.text }}>Aucun ouvrage trouvé</h3>
    <p className="font-semibold mb-6" style={{ color: Couleur.textDim }}>Essayez avec d'autres mots-clés</p>
    <button
      onClick={onReset}
      className="focus-ring px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
      style={{ background: "rgba(58,134,255,0.1)", color: Couleur.textMuted, border: `1px solid ${Couleur.border}` }}
    >
      Réinitialiser la recherche
    </button>
  </div>
);

/* ── Back to top ── */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg focus-ring back-to-top ${visible ? "visible" : ""}`}
      style={{ background: `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`, boxShadow: `0 4px 20px ${Couleur.glow}` }}
      aria-label="Retour en haut"
    >
      <ChevronUp className="w-5 h-5 text-white" />
    </button>
  );
};

/* ── Show All Banner ── */
const ShowAllBanner = ({ hidden, total, onShowAll }: { hidden: number; total: number; onShowAll: () => void }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="fade-up flex flex-col items-center gap-5 py-12"
      style={{ animationDelay: "0.2s" }}
    >
      {/* Ligne décorative avec flou de bas de catalogue */}
      <div
        className="w-full h-24 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${Couleur.bg1})`,
          marginTop: "-6rem",
          marginBottom: "-1rem",
        }}
      />

      <p className="text-sm font-semibold" style={{ color: Couleur.textDim }}>
        Affichage de <span style={{ color: Couleur.cyan }}>{total - hidden}</span> livres sur{" "}
        <span style={{ color: Couleur.text }}>{total}</span>
      </p>

      <button
        onClick={onShowAll}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="focus-ring flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-sm text-white transition-all duration-300"
        style={{
          background: hov
            ? `linear-gradient(135deg, ${Couleur.purple}, ${Couleur.blue})`
            : `linear-gradient(135deg, ${Couleur.blue}, ${Couleur.purple})`,
          boxShadow: hov
            ? `0 8px 30px rgba(131,56,236,0.45), 0 0 0 1px rgba(131,56,236,0.3)`
            : `0 4px 20px ${Couleur.glow}`,
          transform: hov ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        }}
        aria-label={`Afficher les ${hidden} livres restants`}
      >
        <BookOpen className="w-4 h-4" />
        Voir tous les livres
        <span
          className="px-2 py-0.5 rounded-full text-xs font-black"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          +{hidden}
        </span>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-300"
          style={{ transform: hov ? "translateY(2px)" : "translateY(0)" }}
        />
      </button>
    </div>
  );
};

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
const BibliothèqueSite: React.FC = () => {
  const navigate = useNavigate();

  const [livres,          setLivres]         = useState<Livre[]>([]);
  const [recherche,       setRecherche]       = useState("");
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState<string | null>(null);
  const [categorieActive, setCategorieActive] = useState<string | null>(null);
  const [viewMode,        setViewMode]        = useState<ViewMode>("grid");
  const [sortOrder,       setSortOrder]       = useState<SortOrder>("none");
  const [retry,           setRetry]           = useState(0);
  const [showAll,         setShowAll]         = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    const fetch_ = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get<Livre[]>(`${API_URL}/admin/livre`);
        if (!cancelled) setLivres(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setError("Impossible de charger les livres.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch_();
    return () => { cancelled = true; };
  }, [retry]);

  const handleNavigate = useCallback((id: number) => navigate(`/livre/${id}/pages`), [navigate]);

  // Quand une recherche ou un filtre change, on repasse en mode limité
  useEffect(() => { setShowAll(false); }, [recherche, categorieActive]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const { livresParCategorie, livresParCategorieAll, categories, totalLivres, categoryCounts, totalAll } = useMemo(() => {
    const q = recherche.toLowerCase().trim();
    const filtered = livres.filter((l) =>
      !q ||
      (l.titre ?? "").toLowerCase().includes(q) ||
      (l.auteur ?? "").toLowerCase().includes(q) ||
      (l.categorie ?? "").toLowerCase().includes(q)
    );
    const grouped = groupByCategory(filtered);
    const categoryCounts: Record<string, number> = {};
    Object.entries(grouped).forEach(([cat, items]) => { categoryCounts[cat] = items.length; });

    const finalGrouped = categorieActive ? { [categorieActive]: grouped[categorieActive] ?? [] } : grouped;

    if (sortOrder !== "none") {
      Object.keys(finalGrouped).forEach((cat) => {
        finalGrouped[cat] = [...finalGrouped[cat]].sort((a, b) => {
          const ta = (a.titre ?? "").toLowerCase();
          const tb = (b.titre ?? "").toLowerCase();
          return sortOrder === "asc" ? ta.localeCompare(tb) : tb.localeCompare(ta);
        });
      });
    }

    const totalAll = Object.values(finalGrouped).reduce((s, a) => s + a.length, 0);

    // Version limitée à INITIAL_LIMIT livres au total (en préservant l'ordre des catégories)
    const limitedGrouped: Record<string, Livre[]> = {};
    let remaining = INITIAL_LIMIT;
    for (const [cat, items] of Object.entries(finalGrouped)) {
      if (remaining <= 0) break;
      limitedGrouped[cat] = items.slice(0, remaining);
      remaining -= limitedGrouped[cat].length;
    }

    return {
      livresParCategorie:    showAll ? finalGrouped : limitedGrouped,
      livresParCategorieAll: finalGrouped,
      categories:            Object.keys(grouped).sort(),
      totalLivres:           filtered.length,
      categoryCounts,
      totalAll,
    };
  }, [livres, recherche, categorieActive, sortOrder, showAll]);

  if (loading) return <LoadingState />;
  if (error)   return <ErrorState message={error} onRetry={() => setRetry((r) => r + 1)} />;

  const totalVisible = Object.values(livresParCategorie).reduce((s, a) => s + a.length, 0);
  const hiddenCount  = totalAll - totalVisible;
  const isLimited    = !showAll && hiddenCount > 0;

  return (
    <>
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up  { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .stagger  { animation: fadeUp 0.5s  cubic-bezier(0.22,1,0.36,1) both; }
        .focus-ring:focus-visible { outline: 2px solid ${Couleur.cyan}; outline-offset: 3px; border-radius: 8px; }
        .back-to-top { opacity: 0; pointer-events: none; transform: translateY(8px); transition: opacity 0.3s, transform 0.3s; }
        .back-to-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .scrollbar-thin::-webkit-scrollbar { height: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(58,134,255,0.25); border-radius: 99px; }
      `}</style>

      <div style={{ background: `linear-gradient(160deg, ${Couleur.bg3}, ${Couleur.bg1}, ${Couleur.bg2})` }}>

        {/* ════ HERO HEADER ════ */}
        <header
          className="relative overflow-hidden fade-up"
          style={{
            background: `linear-gradient(160deg, ${Couleur.bg1} 0%, ${Couleur.bg2} 50%, ${Couleur.bg3} 100%)`,
            paddingTop: "4rem",
            paddingBottom: "5.5rem",
          }}
        >
          {/* Décoratif */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(58,134,255,0.12), transparent 70%)` }} />
            <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(131,56,236,0.1), transparent 70%)` }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, rgba(0,217,255,0.3), transparent)` }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: "rgba(0,217,255,0.1)", border: `1px solid rgba(0,217,255,0.25)`, color: Couleur.cyan }}
                >
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  Collection complète
                </div>

                <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: Couleur.text, lineHeight: 1.15 }}>
                  Notre{" "}
                  <span className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, ${Couleur.blue}, ${Couleur.cyan})` }}>
                    Bibliothèque
                  </span>
                </h1>

                <p className="text-base font-medium max-w-md" style={{ color: Couleur.textMuted }}>
                  Explorez notre sélection d'ouvrages coraniques soigneusement rassemblés
                </p>

                <p className="mt-3 text-xs font-semibold" style={{ color: Couleur.textDim }}>
                  Appuyez sur{" "}
                  <kbd className="px-1.5 py-0.5 rounded text-xs font-mono"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: Couleur.textMuted }}>
                    /
                  </kbd>{" "}
                  pour rechercher
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-3 shrink-0">
                <StatCard icon={<BookOpen className="w-4 h-4" />}   label="Ouvrages"   value={livres.length} />
                <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Catégories" value={categories.length} />
              </div>
            </div>
          </div>

          {/* Vague bas */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none"
            style={{ display: "block" }} aria-hidden="true">
            <path d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z"
              fill={`rgba(15,52,96,0.5)`} />
          </svg>
        </header>

        {/* ════ CORPS ════ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 relative z-10">

          {/* ── Barre de recherche ── */}
          <div className="mb-8 fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ color: Couleur.blue }} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Titre, auteur, catégorie…"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full pl-14 pr-12 py-4 text-sm font-semibold outline-none rounded-2xl transition-all duration-300"
                aria-label="Rechercher un livre"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${Couleur.border}`,
                  color: Couleur.text,
                  boxShadow: `0 2px 12px ${Couleur.shadow}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border    = `1px solid ${Couleur.blue}`;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${Couleur.glow}, 0 2px 12px ${Couleur.shadow}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border    = `1px solid ${Couleur.border}`;
                  e.currentTarget.style.boxShadow = `0 2px 12px ${Couleur.shadow}`;
                }}
              />
              {recherche && (
                <button
                  onClick={() => { setRecherche(""); searchRef.current?.focus(); }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 focus-ring rounded"
                  style={{ color: Couleur.textDim }}
                  aria-label="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {recherche && (
              <p className="mt-2 text-sm font-bold fade-up" style={{ color: Couleur.textDim }} aria-live="polite">
                <span style={{ color: Couleur.cyan }}>{totalLivres}</span>{" "}
                résultat{totalLivres !== 1 ? "s" : ""} pour «{" "}
                <span style={{ color: Couleur.text }}>{recherche}</span> »
              </p>
            )}
          </div>

          {/* ── Filtres ── */}
          <div
            className="flex flex-wrap items-center gap-3 mb-10 fade-up scrollbar-thin overflow-x-auto pb-1"
            style={{ animationDelay: "0.15s" }}
            role="toolbar"
            aria-label="Filtres et options d'affichage"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0"
              style={{ color: Couleur.textDim }}>
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              Filtres
            </div>

            {/* Chip "Tout" : si en mode limité, cliquer dessus affiche tous les livres */}
            <FilterChip
              label="Tout"
              active={categorieActive === null}
              count={livres.length}
              onClick={() => {
                setCategorieActive(null);
                if (categorieActive === null) setShowAll(true); // double-clic sur "Tout" = tout afficher
              }}
            />

            {categories.map((cat) => (
              <FilterChip key={cat} label={cat} active={categorieActive === cat} count={categoryCounts[cat]}
                onClick={() => setCategorieActive(categorieActive === cat ? null : cat)} />
            ))}

            <div className="ml-auto flex items-center gap-2 shrink-0">
              <SortToggle order={sortOrder} onChange={setSortOrder} />
              <ViewToggle mode={viewMode} onChange={setViewMode} />
            </div>
          </div>

          {/* Résumé visible */}
          {!recherche && (
            <p className="text-xs font-semibold mb-6 fade-up" style={{ color: Couleur.textDim, animationDelay: "0.2s" }}>
              {categorieActive
                ? `${totalVisible} titre${totalVisible > 1 ? "s" : ""} dans « ${categorieActive} »`
                : isLimited
                  ? `${totalVisible} titre${totalVisible > 1 ? "s" : ""} affichés sur ${totalAll}`
                  : `${totalVisible} titre${totalVisible > 1 ? "s" : ""} au total`}
            </p>
          )}

          {/* ── Catalogue ── */}
          {Object.keys(livresParCategorie).length === 0 ? (
            <EmptyState onReset={() => { setRecherche(""); setCategorieActive(null); }} />
          ) : (
            <>
              {Object.entries(livresParCategorie).map(([categorie, livresCategorie]) => (
                <section key={categorie} className="mb-16 fade-up" aria-labelledby={`cat-${categorie}`}>
                  <CategoryTitle name={categorie} count={livresParCategorieAll[categorie]?.length ?? livresCategorie.length} />
                  <div
                    className={`grid gap-5 sm:gap-6 ${
                      viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                        : "grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"
                    }`}
                  >
                    {livresCategorie.map((livre, idx) => (
                      <div key={livre.id} className="stagger" style={{ animationDelay: `${Math.min(idx * 0.04, 0.4)}s` }}>
                        <BookCard livre={livre} viewMode={viewMode} onNavigate={handleNavigate} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* ── Bouton "Voir tous les livres" ── */}
              {isLimited && (
                <ShowAllBanner
                  hidden={hiddenCount}
                  total={totalAll}
                  onShowAll={() => setShowAll(true)}
                />
              )}
            </>
          )}
        </main>
      </div>

      <BackToTop />
    </>
  );
};

export default BibliothèqueSite;