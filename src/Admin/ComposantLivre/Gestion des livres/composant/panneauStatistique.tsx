import React from "react";
import { TrendingUp } from "lucide-react";

interface PanneauStatistiquesProps {
  totalLivres: number;
  nouveautes:  number;
  enLecture:   number;
}

const PanneauStatistiques = ({ totalLivres, nouveautes, enLecture }: PanneauStatistiquesProps) => {
  const lignes = [
    { etiquette: "Total livres", valeur: totalLivres, couleur: "text-indigo-400",  fond: "bg-indigo-600/10 border-indigo-500/20"  },
    { etiquette: "Nouveautés",   valeur: nouveautes,  couleur: "text-amber-400",   fond: "bg-amber-600/10 border-amber-500/20"    },
    { etiquette: "En lecture",   valeur: enLecture,   couleur: "text-emerald-400", fond: "bg-emerald-600/10 border-emerald-500/20" },
  ];

  return (
    <div className="bg-slate-800/40 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-slate-700/30">
      <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-600/30 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
        </div>
        Statistiques
      </h3>
      <div className="space-y-2.5">
        {lignes.map((s) => (
          <div
            key={s.etiquette}
            className={`flex items-center justify-between p-3 rounded-xl border ${s.fond}`}
          >
            <span className="text-slate-300 text-sm">{s.etiquette}</span>
            <span className={`text-xl font-bold ${s.couleur}`}>{s.valeur}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanneauStatistiques;