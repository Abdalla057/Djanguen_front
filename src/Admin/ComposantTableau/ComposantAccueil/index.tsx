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
    <div className="md:p-8 space-y-8 bg-white min-h-screen">

      {/* HEADER */}
      <div className="bg-white">
        <SectionBienvenue />
      </div>

      {/* STATUS CARDS */}
      <div className="rounded-2xl bg-white  shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0C3B2E]">
            Statut des utilisateurs
          </h2>
        </div>
        <StatusUtilisateurs users={allUsers} />
      </div>

      {/* GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="rounded-lg bg-white border border-[#0C3B2E]/20 p-6 shadow-sm hover:shadow-md transition">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0C3B2E]">
              Statistiques globales
            </h2>
            <span className="text-xs font-medium text-[#0C3B2E]/60">
              {usersCount} utilisateurs
            </span>
          </div>
          <BarreStatistique
            labels={barLabels}
            values={barValues}
            colors={barColors}
          />
        </div>

        {/* DONUT CHART */}
        <div className="rounded-lg bg-white border border-[#0C3B2E]/20 p-6 shadow-sm hover:shadow-md transition">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0C3B2E]">
              Répartition activité
            </h2>
            <span className="text-xs font-medium text-[#FFBA00] bg-[#FFBA00]/10 px-3 py-1 rounded-full">
              Temps réel
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
      <div className="rounded-lg bg-white   transition">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0C3B2E]">
            Gestion des utilisateurs
          </h2>
        </div>
        <TableauUtilisateurs
          users={allUsers}
          onBloquer={(id) => modifierUtilisateur(id, { statut: "INACTIF" })}
          onActiver={(id) => modifierUtilisateur(id, { statut: "ACTIF" })}
          onSupprimer={supprimerUtilisateur}
        />
      </div>

    </div>
  );
};

export default PanneauDroit;