import React from "react";
import type { Statistiques } from "../type/audioStatusType";

interface CarteStatistiquesProps {
  statistiques: Statistiques;
}

const CarteStatistiques = ({ statistiques }: CarteStatistiquesProps) => {
  const lignes = [
    { etiquette: "Total pages",  valeur: statistiques.total,        couleur: "#60a5fa", fond: "rgba(59,130,246,0.08)",  bordure: "rgba(59,130,246,0.15)" },
    { etiquette: "Avec audio",   valeur: statistiques.couvertes,    couleur: "#4ade80", fond: "rgba(34,197,94,0.08)",   bordure: "rgba(34,197,94,0.15)"  },
    { etiquette: "Sans audio",   valeur: statistiques.nonCouvertes, couleur: "#f87171", fond: "rgba(239,68,68,0.08)",   bordure: "rgba(239,68,68,0.15)"  },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      {lignes.map((s) => (
        <div
          key={s.etiquette}
          className="rounded-xl p-3 text-center"
          style={{ background: s.fond, border: `1px solid ${s.bordure}` }}
        >
          <p className="text-xl font-black" style={{ color: s.couleur }}>{s.valeur}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
            style={{ color: "#475569" }}>
            {s.etiquette}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CarteStatistiques;