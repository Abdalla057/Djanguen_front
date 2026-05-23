import SectionProfil from "./composant/SectionProfil";
import BloquerUtilisateur from "./composant/BloquerUtilisateur";
import LivreRecent from "./composant/LivreRecent";
import DiagrammeActivite from "./composant/DiagrammeActivite";

import { usePanneauGauche } from "./logique/usePanneauGauche";

const PanneauGauche = () => {

  const {
    profil,
    loadingProfil,

    users,
    loadingUsers,
    blockUser,
    recentBooks,
    loadingRecent,
    diagrammeData,

  } = usePanneauGauche();

  return (
    <div className="space-y-6">

      {/* PROFIL ADMIN */}
      <SectionProfil
        profil={profil}
        loading={loadingProfil}
      />

      {/* UTILISATEURS */}
      <BloquerUtilisateur
        users={users}
        loading={loadingUsers}
        onBlock={blockUser}
      />
            {/* =========================
          LIVRES RÉCENTS
      ========================= */}
      <LivreRecent
        books={recentBooks}
        loading={loadingRecent}
      />
    

      {/* DIAGRAMME ACTIVITÉ */}
      <DiagrammeActivite data={diagrammeData} />
    </div>
  );
};

export default PanneauGauche;