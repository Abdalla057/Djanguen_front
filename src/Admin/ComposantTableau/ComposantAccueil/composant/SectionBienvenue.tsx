import React from "react";
import { Users, ChartBar } from "lucide-react";

interface Props {
  nom?: string;
  onVoirRapports?: () => void;
}

const BandeauBienvenue = ({ nom = "Administrateur", onVoirRapports }: Props) => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[24px] px-7 py-6
        flex items-center justify-between
        min-h-[160px]
        bg-gradient-to-br from-violet-50 via-[#3807e8d8] to-white
        border border-violet-200
      "
    >

      {/* Cercles décoratifs */}
      <div className="absolute -top-10 right-20 w-40 h-40 rounded-full bg-violet-700 opacity-[0.07] pointer-events-none" />
      <div className="absolute -bottom-8 -right-5 w-32 h-32 rounded-full bg-violet-300 opacity-[0.12] pointer-events-none" />

      {/* Gauche */}
      <div className="relative z-10 flex flex-col gap-1.5">

        <span className="self-start text-[11px] font-medium bg-violet-200 text-violet-800 px-3 py-0.5 rounded-full">
          Tableau de bord
        </span>

        <h1 className="text-[18px] font-semibold text-violet-900 mt-1">
          Bienvenue, {nom} 👋
        </h1>

        <p className="text-[12px] text-violet-600">
          Gérez vos utilisateurs et suivez leur activité en temps réel.
        </p>

        <button
          onClick={onVoirRapports}
          className="
            mt-2 self-start
            flex items-center gap-2
            bg-violet-700 hover:bg-violet-800
            text-white text-[12px] font-medium
            px-4 py-2 rounded-xl
            transition-colors
          "
        >
          <ChartBar className="w-3.5 h-3.5" />
          Voir les rapports
        </button>

      </div>

      {/* Droite */}
      <div className="relative z-10 flex flex-col items-center gap-2">

        <div className="w-16 h-16 rounded-[20px] bg-violet-700 flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>

        <span className="flex items-center gap-1 text-[10px] font-medium bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          En ligne
        </span>

      </div>

    </div>
  );
};

export default BandeauBienvenue;