import React from "react";

interface Props {
  nom?: string;
  onVoirRapports?: () => void;
}

const IconChartBar = () => (
  <svg
    width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
    <line x1="2"  y1="20" x2="22" y2="20" />
  </svg>
);

const BandeauBienvenue = ({
  nom = "Administrateur",
  onVoirRapports,
}: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg px-8 py-10 min-h-[180px] flex items-center justify-between gap-6 bg-white border-[1.5px] shadow-xl">

      {/* Décors de fond */}
      <div
        className="absolute -top-16 right-10 w-52 h-52 rounded-full bg-[#0C3B2E]/[0.06] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-8 w-60 h-60 rounded-full bg-[#FFBA00]/[0.08] pointer-events-none"
        aria-hidden="true"
      />

      {/* Contenu gauche */}
      <div className="relative z-10 flex flex-col gap-2.5 max-w-lg">

        <span className="self-start text-[11px] font-medium bg-[#0C3B2E] text-white px-3.5 py-1 rounded-full select-none">
          Tableau de bord
        </span>

        <h1 className="text-2xl font-semibold text-[#0C3B2E] leading-tight">
          Bienvenue,{" "}
          <span className="text-[#FFBA00]">{nom}</span>
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed">
          Gérez vos utilisateurs, surveillez l'activité en temps réel et
          gardez un contrôle total sur votre plateforme.
        </p>

        <button
          type="button"
          onClick={onVoirRapports}
          className="mt-1.5 self-start flex items-center gap-2 bg-[#FFBA00] hover:bg-[#e6a800] text-[#0C3B2E] text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBA00] focus-visible:ring-offset-2"
        >
          <IconChartBar />
          Voir plus
        </button>
      </div>

      {/* Image droite */}
      <div className="relative z-10 flex-shrink-0 w-36 h-36 rounded-2xl overflow-hidden border-[1.5px] border-[#0C3B2E]">
        <img
          src="/public/images/coran.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BandeauBienvenue;