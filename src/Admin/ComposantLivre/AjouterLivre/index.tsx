import React from "react";

// Hook
import { useFormulaireAjoutLivre } from "./logique/useFormulaireAjouterLivre";

// Composants
import EnTeteModal    from "./composant/enteteModal";
import ChampsTexte    from "./composant/champTexte";
import ZoneDepotPdf   from "./composant/zoneDepotPdf";
import ZoneDepotCover from "./composant/zoneDepotCover";
import BandeauMessage from "./composant/bandeauMessage";
import BoutonsActions from "./composant/bouttonAction";

// Types
import type { AjouterLivreProps } from "./type/ajouterLivreType";

/* ================================================================
   ORCHESTRATEUR — AjouterLivre
   Responsabilité : assembler le hook et distribuer les données
   aux composants enfants.
   ================================================================ */
const AjouterLivre: React.FC<AjouterLivreProps> = ({ isOpen, onClose, onSuccess }) => {
  const {
    formulaire,
    message,
    enEnvoi,
    typeGlisser,
    mettreAJourChamp,
    gererChangementCover,
    gererChangementPdf,
    supprimerCover,
    gererGlisser,
    gererDepot,
    gererFermeture,
    gererSoumission,
  } = useFormulaireAjoutLivre({ onSuccess, onClose });

  const gererChangementchamp = (champ: string, valeur: string) => {
    mettreAJourChamp(champ as keyof typeof formulaire, valeur);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto" }}>

      {/* Fond assombri */}
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={gererFermeture}
      />

      {/* Centrage modal */}
      <div style={{ display: "flex", minHeight: "100%", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position:   "relative",
            width:      "100%",
            maxWidth:   "660px",
            borderRadius:"24px",
            overflow:   "hidden",
            background: "linear-gradient(160deg, #0f0c29 0%, #302b63 60%, #24243e 100%)",
            border:     "1px solid rgba(255,255,255,0.1)",
            boxShadow:  "0 32px 64px rgba(0,0,0,0.5)",
          }}
        >
          {/* Halos décoratifs */}
          <div style={{
            position: "absolute", top: "-80px", left: "-80px",
            width: "260px", height: "260px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(194,0,116,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-60px", right: "-60px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* En-tête */}
          <EnTeteModal onFermer={gererFermeture} />

          {/* Formulaire */}
          <form onSubmit={gererSoumission}>
            <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

              <ChampsTexte
                titre={formulaire.titre}
                auteur={formulaire.auteur}
                description={formulaire.description}
                categorie={formulaire.categorie}
                onChange={gererChangementchamp}
              />

              {/* Zones de dépôt PDF + Couverture */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <ZoneDepotPdf
                  fichierPdf={formulaire.fichierPdf}
                  typeGlisser={typeGlisser}
                  onGlisser={gererGlisser}
                  onDeposer={gererDepot}
                  onChangement={gererChangementPdf}
                />
                <ZoneDepotCover
                  fichierCover={formulaire.fichierCover}
                  apercuCover={formulaire.apercuCover}
                  typeGlisser={typeGlisser}
                  onGlisser={gererGlisser}
                  onDeposer={gererDepot}
                  onChangement={gererChangementCover}
                  onSupprimerCover={supprimerCover}
                />
              </div>

              <BandeauMessage message={message} />

              <BoutonsActions enEnvoi={enEnvoi} onAnnuler={gererFermeture} />
            </div>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AjouterLivre;