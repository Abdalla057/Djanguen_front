import React from "react";

import SectionBienvenue from "./composant/SectionBienvenue";
import StatusUtilisateurs from "./composant/StatusUtilisateur";
import TableauUtilisateurs from "./composant/TableauUtilisateurs";

import { usePanneauDroit } from "./logique/usePanneau";

const PanneauDroit = () => {

  const {
    allUsers,
    modifierUtilisateur,
    supprimerUtilisateur,
  } = usePanneauDroit();

  return (
    <div className="space-y-7">

      <SectionBienvenue />

      <StatusUtilisateurs users={allUsers} />

      <TableauUtilisateurs
        users={allUsers}
        onBloquer={(id) => modifierUtilisateur(id, { statut: "INACTIF" })}
        onActiver={(id) => modifierUtilisateur(id, { statut: "ACTIF" })}
        onSupprimer={(id) => supprimerUtilisateur(id)}
      />

    </div>
  );
};

export default PanneauDroit;