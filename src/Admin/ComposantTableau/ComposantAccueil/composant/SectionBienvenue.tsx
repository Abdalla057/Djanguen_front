import React from "react";

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  nom?: string;
  onVoirRapports?: () => void;
}

const IconChartBar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6"  y1="20" x2="6"  y2="14"/>
    <line x1="2"  y1="20" x2="22" y2="20"/>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const BandeauBienvenue = ({
  nom = "Administrateur",
  onVoirRapports,
}: Props) => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        px-8 py-10
        min-h-[200px]
        flex items-center justify-between gap-6
        bg-[#fde8d8] dark:bg-slate-900
        border border-slate-100 dark:border-slate-800
        shadow-sm
      "
    >
      {/* ── Décor de fond ── */}
      <div
        className="absolute -top-16 right-10 w-56 h-56 rounded-full bg-violet-400/20 dark:bg-violet-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Contenu gauche ── */}
      <div className="relative z-10 flex flex-col gap-2 max-w-lg">

        <span className="self-start text-[11px] font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full select-none">
          Tableau de bord
        </span>

        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 leading-tight">
          Bienvenue,{" "}
          <span className="text-[#fbbf24] dark:text-violet-400">{nom}</span>{" "}
          👋
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Gérez vos utilisateurs, surveillez l'activité en temps réel et
          gardez un contrôle total sur votre plateforme.
        </p>

        <button
          type="button"
          onClick={onVoirRapports}
          className="
            mt-2 self-start
            flex items-center gap-2
            bg-[#f0c34f] hover:bg-[#4ecb8d] dark:bg-violet-500 dark:hover:bg-violet-600
            text-[#1a1a2e]
            text-sm font-medium
            px-5 py-2.5
            rounded-xl
            transition-all duration-150
            active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
          "
        >
          <IconChartBar />
          Voir plus
        </button>

      </div>

      {/* ── Contenu droit ── */}
      <div className="relative z-10 flex flex-col items-center gap-3 flex-shrink-0">
      <div className="w-60 h-60 rounded-3xl overflow-hidden">
       <img
          src="/public/images/image1.jpg"
           alt=""
          className="w-full h-full object-cover"
         />
      </div>
      </div>
    </div>
  );
};

export default BandeauBienvenue;