import React from "react";

import SectionBienvenue from "./composant/SectionBienvenue";
import StatusUtilisateurs from "./composant/StatusUtilisateur";
import TableauUtilisateurs from "./composant/TableauUtilisateurs";
import BarreStatistique from "./composant/BarreStatistique";
import CercleStatistique from "./composant/CercleStatistique";

import { usePanneauDroit } from "./logique/usePanneau";
import { useBarreStatistique } from "./logique/useBarreStatistique";

const PanneauDroit = () => {

  const {
    allUsers,
    modifierUtilisateur,
    supprimerUtilisateur,
  } = usePanneauDroit();

  const {
    barLabels,
    barValues,
    barColors,
    donutSlices,
    usersCount,
  } = useBarreStatistique({ users: allUsers });

  return (
    <div className="p-6 md:p-8 space-y-8 bg-violet-60 dark:bg-[#09205d] min-h-screen shadow-lg">

      {/* HEADER */}
      <div className="rounded-2xl bg-violet-100 dark:bg-[#111827] border border-gray-100 dark:border-white/10 p-6 shadow-2xl">
        <SectionBienvenue />
      </div>

      {/* STATUS CARDS */}
      <div className="rounded-2xl bg-violet-100 dark:bg-[#111827] border border-gray-100 dark:border-white/10 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            Statut des utilisateurs
          </h2>
        </div>
        <StatusUtilisateurs users={allUsers} />
      </div>

      {/* GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="rounded-2xl bg-violet-100 dark:bg-[#111827] border border-gray-100 dark:border-white/10 p-6 shadow-2xl hover:shadow-xl transition">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              Statistiques globales
            </h2>
            <span className="text-xs text-white/80">
              utilisateurs: {usersCount}
            </span>
          </div>

          <BarreStatistique
            labels={barLabels}
            values={barValues}
            colors={barColors}
          />
        </div>

        {/* DONUT CHART */}
        <div className="rounded-2xl bg-violet-100 dark:bg-[#1241a7] border border-gray-100 dark:border-white/10 p-6 shadow-sm hover:shadow-md transition">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200">
              Répartition activité
            </h2>
            <span className="text-1xl text-green-500">
              Analyse temps réel
            </span>
          </div>

          <CercleStatistique
            slices={donutSlices}
            centerValue={`${usersCount}`}
            centerLabel="Total users"
          />
        </div>

      </div>

      {/* TABLE */}
      <div className="rounded-2xl bg-violet-100 dark:bg-[#111827] border border-gray-100 dark:border-white/10 p-6 shadow-2xl hover:shadow-2xl transition">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Gestion des utilisateurs
          </h2>
        </div>

        <TableauUtilisateurs
          users={allUsers}
          onBloquer={(id) =>
            modifierUtilisateur(id, { statut: "INACTIF" })
          }
          onActiver={(id) =>
            modifierUtilisateur(id, { statut: "ACTIF" })
          }
          onSupprimer={supprimerUtilisateur}
        />
      </div>

    </div>
  );
};

export default PanneauDroit;