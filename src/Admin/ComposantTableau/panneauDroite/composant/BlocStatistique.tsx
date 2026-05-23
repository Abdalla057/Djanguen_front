import {
  BookOpen,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import type { Stats } from "../../type/PanneauDroit.Type.tsx";

interface Props {
  statistiques: Stats | null;
}

const CarteStatistiques = ({ statistiques }: Props) => {

  const pourcentageProgression =
    statistiques?.percentage ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* =========================
          TOTAL LIVRES
      ========================= */}
      <div className="
        relative overflow-hidden
        rounded-2xl p-4
        bg-gradient-to-br from-white to-slate-50
        border border-slate-100
        shadow-sm hover:shadow-md
        transition-all duration-300
      ">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-slate-500">
              Total livres
            </p>

            <h2 className="text-3xl font-bold text-slate-800">
              {statistiques?.goal ?? 0}
            </h2>
          </div>

          <div className="
            w-10 h-10 rounded-lg
            bg-blue-500 flex items-center justify-center
          ">
            <BookOpen className="w-5 h-5 text-white" />
          </div>

        </div>

      </div>

      {/* =========================
          LIVRES LUS
      ========================= */}
      <div className="
        relative overflow-hidden
        rounded-2xl p-4
        bg-gradient-to-br from-white to-emerald-50
        border border-slate-100
        shadow-sm hover:shadow-md
        transition-all duration-300
      ">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-slate-500">
              Livres lus
            </p>

            <h2 className="text-3xl font-bold text-slate-800">
              {statistiques?.completed ?? 0}
            </h2>
          </div>

          <div className="
            w-10 h-10 rounded-lg
            bg-emerald-500 flex items-center justify-center
          ">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>

        </div>

      </div>

      {/* =========================
          PROGRESSION
      ========================= */}
      <div className="
        relative overflow-hidden
        rounded-2xl p-4
        bg-gradient-to-br from-white to-orange-50
        border border-slate-100
        shadow-sm hover:shadow-md
        transition-all duration-300
      ">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-slate-500">
              Progression
            </p>

            <h2 className="text-3xl font-bold text-slate-800">
              {pourcentageProgression}%
            </h2>
          </div>

          <div className="
            w-10 h-10 rounded-lg
            bg-orange-500 flex items-center justify-center
          ">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>

        </div>

        {/* BARRE */}
        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 transition-all duration-700"
            style={{ width: `${pourcentageProgression}%` }}
          />
        </div>

      </div>

    </div>
  );
};

export default CarteStatistiques;