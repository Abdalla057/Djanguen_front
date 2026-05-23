import React from "react";

// Hook
import { useFormulaireAudio } from "./logique/useFormulaireAudio";

// Composants
import ToastNotification  from "./composant/toastNotification";
import EnTeteModal        from "./composant/enTeteModal";
import FormulaireAudio    from "./composant/FormulaireAudio";

// Types
import type { UploaderAudioProps } from "./type/ajouterAudioType";

/* ================================================================
   ORCHESTRATEUR — UploaderAudio
   Responsabilité : assembler le hook et distribuer les données
   aux composants enfants.
   ================================================================ */
const UploaderAudio: React.FC<UploaderAudioProps> = ({
  isOpen         = true,
  onClose,
  onSuccess,
  livres         = [],
  asModal        = true,
  defaultLivreId,
  defaultPageDebut,
  defaultPageFin,
}) => {
  const {
    formulaire,
    envoi,
    notification,
    mettreAJourChamp,
    gererChangementFichier,
    gererSoumission,
  } = useFormulaireAudio({
    isOpen,
    asModal,
    defaultLivreId,
    defaultPageDebut,
    defaultPageFin,
    onSuccess,
  });

  if (asModal && !isOpen) return null;

  // ── Contenu partagé modal / page ──────────────────────
  const contenu = (
    <>
      <ToastNotification notification={notification} estModal={asModal} />

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">

        <EnTeteModal
          defaultPageDebut={defaultPageDebut}
          defaultPageFin={defaultPageFin}
          estModal={asModal}
          enEnvoi={envoi}
          onFermer={onClose}
        />

        <FormulaireAudio
          formulaire={formulaire}
          livres={livres}
          enEnvoi={envoi}
          estModal={asModal}
          defaultPageDebut={defaultPageDebut}
          onChangerChamp={mettreAJourChamp}
          onChangerFichier={gererChangementFichier}
          onSoumettre={gererSoumission}
          onFermer={onClose}
        />
      </div>
    </>
  );

  // ── Mode modal ────────────────────────────────────────
  if (asModal) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
        {contenu}
      </div>
    );
  }

  // ── Mode page standalone ──────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 flex items-center justify-center relative">
      {contenu}
    </div>
  );
};

export default UploaderAudio;