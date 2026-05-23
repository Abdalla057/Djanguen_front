import React from "react";
import { Layers, ChevronUp, ChevronDown } from "lucide-react";
import { COULEURS_STATUT } from "../constant/constantes";
import type { Statistiques } from "../type/audioStatusType";

interface EnTetePanelProps {
  titreLivre:   string;
  statistiques: Statistiques;
  chargement:   boolean;
  developpe:    boolean;
  onBasculer:   () => void;
}

const EnTetePanel = ({
  titreLivre, statistiques, chargement, developpe, onBasculer,
}: EnTetePanelProps) => {
  const couleurPourcentage =
    statistiques.pourcentage === 100 ? "#4ade80"
    : statistiques.pourcentage > 50  ? "#60a5fa"
    : "#fbbf24";

  const gradientBarre =
    statistiques.pourcentage === 100
      ? "linear-gradient(90deg, #22c55e, #16a34a)"
      : statistiques.pourcentage > 50
        ? "linear-gradient(90deg, #3b82f6, #1d4ed8)"
        : "linear-gradient(90deg, #f59e0b, #d97706)";

  return (
    <div
      className="flex items-center justify-between p-4 cursor-pointer"
      style={{ borderBottom: developpe ? "1px solid rgba(255,255,255,0.05)" : "none" }}
      onClick={onBasculer}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(59,130,246,0.12)" }}>
          <Layers className="w-4 h-4" style={{ color: COULEURS_STATUT.bleu }} />
        </div>
        <div>
          <h3 className="text-sm font-black" style={{ color: COULEURS_STATUT.texte }}>
            Couverture audio — {titreLivre}
          </h3>
          {!chargement && (
            <p className="text-[10px] font-semibold" style={{ color: COULEURS_STATUT.discret }}>
              {statistiques.couvertes}/{statistiques.total} pages couvertes
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Barre de progression compacte */}
        {!chargement && statistiques.total > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${statistiques.pourcentage}%`, background: gradientBarre }}
              />
            </div>
            <span className="text-xs font-black tabular-nums"
              style={{ color: couleurPourcentage }}>
              {statistiques.pourcentage}%
            </span>
          </div>
        )}

        {developpe
          ? <ChevronUp   className="w-4 h-4" style={{ color: COULEURS_STATUT.discret }} />
          : <ChevronDown className="w-4 h-4" style={{ color: COULEURS_STATUT.discret }} />}
      </div>
    </div>
  );
};

export default EnTetePanel;