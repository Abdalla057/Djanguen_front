import React from "react";
import { COULEURS } from "../constante/constante";

interface NavigationPagesProps {
  indexCourant: number;
  totalPages: number;
  progression: number;
  allerVers: (index: number) => void;
  pageSuivante: () => void;
  pagePrecedente: () => void;
}

const NavigationPages = ({
  indexCourant,
  totalPages,
  progression,
  allerVers,
  pageSuivante,
  pagePrecedente,
}: NavigationPagesProps) => {
  return (
    <>
      {/* Slider de navigation */}
      <div
        className="w-full max-w-[700px] mt-5 px-4 py-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${COULEURS.bordure}`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COULEURS.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: COULEURS.discret }}>
            Navigation par page
          </span>
          <span
            className="ml-auto text-xs font-mono font-bold px-2 py-0.5 rounded-lg"
            style={{ background: "rgba(99,102,241,0.12)", color: COULEURS.cyan }}
          >
            {indexCourant + 1} / {totalPages}
          </span>
        </div>

        {/* Track du slider */}
        <div className="relative flex items-center h-5">
          <div className="absolute left-0 right-0 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progression}%`,
                background: `linear-gradient(to right, ${COULEURS.bleu}, ${COULEURS.cyan})`,
                boxShadow: `0 0 8px ${COULEURS.lueur}`,
                transition: "width 0.25s ease",
              }}
            />
          </div>
          <input
            type="range"
            min={0} max={totalPages - 1} step={1} value={indexCourant}
            onChange={e => allerVers(Number(e.target.value))}
            className="page-slider absolute inset-0 w-full"
            aria-label="Aller à la page"
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-bold" style={{ color: COULEURS.discret }}>Page 1</span>
          <span className="text-[10px] font-bold" style={{ color: COULEURS.discret }}>Page {totalPages}</span>
        </div>
      </div>

      {/* Boutons Précédente / Suivante */}
      <div className="flex items-center gap-6 mt-5 rounded-full ">
        <button
          onClick={pagePrecedente}
          disabled={indexCourant === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(135deg, ${COULEURS.bleu}, ${COULEURS.violet},${COULEURS.bordure})`,
            boxShadow: indexCourant > 0 ? `0 4px 16px ${COULEURS.lueur}` : "none",
          }}
          aria-label="Page précédente"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Précédente
        </button>

        <div
          className="text-sm font-black px-4 py-2 rounded-xl tabular-nums"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${COULEURS.bordure}`, color: COULEURS.attenue }}
        >
          {indexCourant + 1} <span style={{ color: COULEURS.discret }}>/ {totalPages}</span>
        </div>

        <button
          onClick={pageSuivante}
          disabled={indexCourant === totalPages - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(135deg, ${COULEURS.bleu}, ${COULEURS.violet})`,
            boxShadow: indexCourant < totalPages - 1 ? `0 4px 16px ${COULEURS.lueur}` : "none",
          }}
          aria-label="Page suivante"
        >
          Suivante
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Astuce clavier */}
      <p className="mt-3 text-xs font-semibold" style={{ color: COULEURS.discret }}>
        Utilisez les touches{" "}
        <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono mx-0.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: COULEURS.attenue }}>←</kbd>
        <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono mx-0.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: COULEURS.attenue }}>→</kbd>
        pour naviguer
      </p>
    </>
  );
};

export default NavigationPages;