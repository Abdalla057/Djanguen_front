import React, { useState } from "react";
import { LayoutGrid, Grid3x3 } from "lucide-react";
import { COULEURS } from "../constant/couleur";
import type { ModeAffichage } from "../types/BibliothequeType";

/* ── Skeleton de chargement ── */
export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`rounded-xl ${className}`}
    style={{
      background: "linear-gradient(90deg, #111827 25%, #1a2235 50%, #111827 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
    }}
  />
);

/* ── Carte de statistique ── */
export const CarteStatistique = ({
  icone, etiquette, valeur,
}: {
  icone: React.ReactNode;
  etiquette: string;
  valeur: number;
}) => (
  <div
    className="px-5 py-4 rounded-2xl flex flex-col gap-1 min-w-[100px]"
    style={{
      background: "rgba(59,130,246,0.06)",
      border: `1px solid ${COULEURS.bordure}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}
  >
    <div className="flex items-center gap-2">
      <span style={{ color: COULEURS.accentClair }}>{icone}</span>
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: COULEURS.texteDiscret }}>
        {etiquette}
      </p>
    </div>
    <p className="text-2xl font-black" style={{ color: COULEURS.texte }}>{valeur}</p>
  </div>
);

/* ── Puce de filtre catégorie ── */
export const PuceFiltre = ({
  etiquette, actif, onClick,
}: {
  etiquette: string;
  actif: boolean;
  onClick: () => void;
}) => {
  const [survol, setSurvol] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setSurvol(true)}
      onMouseLeave={() => setSurvol(false)}
      className="px-4 py-1.5 rounded-full text-sm font-black border transition-all duration-200"
      style={
        actif
          ? {
              background: COULEURS.accent,
              color: "#fff",
              border: `1px solid ${COULEURS.accent}`,
              boxShadow: `0 4px 16px ${COULEURS.accentLueur}`,
              transform: "translateY(-1px)",
            }
          : {
              background: survol ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.04)",
              color: survol ? COULEURS.accentClair : COULEURS.texteAttenue,
              border: `1px solid ${survol ? COULEURS.bordureSurvol : "rgba(255,255,255,0.08)"}`,
            }
      }
    >
      {etiquette}
    </button>
  );
};

/* ── Basculeur de mode d'affichage ── */
export const BasculeurVue = ({
  mode, onChange,
}: {
  mode: ModeAffichage;
  onChange: (m: ModeAffichage) => void;
}) => (
  <div
    className="ml-auto flex rounded-xl p-1 shrink-0"
    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
  >
    {(["grille", "compacte"] as ModeAffichage[]).map((m) => (
      <button
        key={m}
        onClick={() => onChange(m)}
        className="p-2 rounded-lg transition-all duration-200"
        style={
          mode === m
            ? { background: COULEURS.accent, color: "#fff", boxShadow: `0 2px 8px ${COULEURS.accentLueur}` }
            : { color: COULEURS.texteDiscret }
        }
        title={m === "grille" ? "Vue grille" : "Vue compacte"}
      >
        {m === "grille"
          ? <LayoutGrid className="w-4 h-4" />
          : <Grid3x3   className="w-4 h-4" />}
      </button>
    ))}
  </div>
);