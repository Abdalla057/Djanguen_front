import React from "react";

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  nom?: string;
  onVoirRapports?: () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconUsers = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

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
        bg-indigo-100 dark:bg-slate-900
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
          <span className="text-violet-700 dark:text-violet-400">{nom}</span>{" "}
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
            bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600
            text-white
            text-sm font-medium
            px-5 py-2.5
            rounded-xl
            transition-all duration-150
            active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
          "
        >
          <IconChartBar />
          Voir les rapports
        </button>

      </div>

      {/* ── Contenu droit ── */}
      <div className="relative z-10 flex flex-col items-center gap-3 flex-shrink-0">

        <div
          className="
            w-20 h-20 rounded-3xl
            bg-violet-600 dark:bg-violet-500
            flex items-center justify-center
            text-white
          "
        >
          <IconUsers />
        </div>

        <span
          className="
            flex items-center gap-2
            text-xs font-medium
            bg-emerald-50 dark:bg-emerald-900/30
            text-emerald-700 dark:text-emerald-400
            px-3 py-1 rounded-full
            border border-emerald-100 dark:border-emerald-800
            select-none
          "
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" aria-hidden="true" />
          En ligne
        </span>

      </div>
    </div>
  );
};

export default BandeauBienvenue;