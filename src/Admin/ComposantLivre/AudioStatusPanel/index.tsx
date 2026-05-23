import React, { useState } from "react";

// Hook
import { useAudioStatus } from "./logique/useAudioStatus";

// Composants
import EnTetePanel        from "./composant/entetePanel";
import CarteStatistiques  from "./composant/carteStatistique";
import ListeAudios        from "./composant/listeAudio";
import GrillePages        from "./composant/grillePage";
import SuggestionPlages   from "./composant/suggestionPlage";
import { EtatChargement, EtatAucunePage } from "./composant/composantsEtat";

// Types
import type { AudioStatusPanelProps } from "./type/audioStatusTypes";

/* ================================================================
   ORCHESTRATEUR — AudioStatusPanel
   Responsabilité : assembler le hook et distribuer les données
   aux composants enfants.
   ================================================================ */
const AudioStatusPanel = ({ livre, onAddAudio }: AudioStatusPanelProps) => {
  const [developpe, setDeveloppe] = useState(true);

  const {
    audios,
    chargement,
    statutsPages,
    statistiques,
    plagesSansAudio,
  } = useAudioStatus(livre.id);

  return (
    <div
      className="rounded-2xl overflow-hidden mt-4"
      style={{
        background: "linear-gradient(135deg, #111827 0%, #0d1423 100%)",
        border:     "1px solid rgba(59,130,246,0.15)",
        boxShadow:  "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* ── En-tête cliquable ── */}
      <EnTetePanel
        titreLivre={livre.titre}
        statistiques={statistiques}
        chargement={chargement}
        developpe={developpe}
        onBasculer={() => setDeveloppe(v => !v)}
      />

      {/* ── Corps ── */}
      {developpe && (
        <div className="p-4">
          {chargement ? (
            <EtatChargement />
          ) : statistiques.total === 0 ? (
            <EtatAucunePage />
          ) : (
            <>
              <CarteStatistiques statistiques={statistiques} />

              <ListeAudios audios={audios} />

              <GrillePages
                statutsPages={statutsPages}
                statistiques={statistiques}
                livreId={livre.id}
                onAjouterAudio={onAddAudio}
              />

              <SuggestionPlages
                plages={plagesSansAudio}
                nonCouvertes={statistiques.nonCouvertes}
                total={statistiques.total}
                livreId={livre.id}
                onAjouterAudio={onAddAudio}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioStatusPanel;