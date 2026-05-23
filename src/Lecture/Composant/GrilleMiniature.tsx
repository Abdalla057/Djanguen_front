import { COULEURS, URL_API } from "../Constants/Couleurs";
import type { Page } from "../../Lecture/Types/LivreTypes";
import React from "react";

interface GrilleMiniaturesProps {
  pages: Page[];
  indexCourant: number;
  allerVers: (index: number) => void;
}

const GrilleMiniatures = ({ pages, indexCourant, allerVers }: GrilleMiniaturesProps) => {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${COULEURS.bordure}` }}
    >
      {/* En-tête */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: `1px solid ${COULEURS.bordure}` }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COULEURS.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: COULEURS.discret }}>Pages</span>
      </div>

      {/* Grille */}
      <div className="p-3 grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
        {pages.map((page, idx) => (
          <button
            key={page.id}
            onClick={() => allerVers(idx)}
            className="aspect-[2/3] rounded-lg overflow-hidden relative transition-all duration-200"
            style={{
              border: idx === indexCourant ? `2px solid ${COULEURS.cyan}` : `1px solid ${COULEURS.bordure}`,
              boxShadow: idx === indexCourant ? `0 0 12px ${COULEURS.lueurC}` : "none",
              transform: idx === indexCourant ? "scale(1.05)" : "scale(1)",
            }}
            aria-label={`Aller à la page ${page.numero}`}
            aria-current={idx === indexCourant ? "true" : undefined}
          >
            <img
              src={`${URL_API}/uploads/${page.imagePath.replace(/\\/g, "/")}`}
              alt={`Page ${page.numero}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 text-center text-[8px] font-black py-0.5"
              style={{
                background: idx === indexCourant
                  ? `linear-gradient(135deg, ${COULEURS.bleu}, ${COULEURS.cyan})`
                  : "rgba(0,0,0,0.6)",
                color: "#fff",
              }}
            >
              {page.numero}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GrilleMiniatures;