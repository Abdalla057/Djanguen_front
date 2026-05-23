import React from "react";
import ChampSelectionLivre from "../../AjouterAudio/composant/champSelectionLivre";
import ChampsPlagesPages   from "../../AjouterAudio/composant/champPlacePage";
import ChampFichierAudio   from "../../AjouterAudio/composant/champFichierAudio";
import BoutonsActions      from "../../AjouterAudio/composant/bouttonAction";
import type { EtatFormulaire } from "../../AjouterAudio/type/ajouterAudioType";

interface FormulaireAudioProps {
  formulaire:        EtatFormulaire;
  livres:            Array<{ id: number; titre: string }>;
  enEnvoi:           boolean;
  estModal:          boolean;
  defaultPageDebut?: number;
  onChangerChamp:    (champ: keyof EtatFormulaire, valeur: string) => void;
  onChangerFichier:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSoumettre:       (e: React.FormEvent) => void;
  onFermer?:         () => void;
}

const FormulaireAudio = ({
  formulaire,
  livres,
  enEnvoi,
  estModal,
  defaultPageDebut,
  onChangerChamp,
  onChangerFichier,
  onSoumettre,
  onFermer,
}: FormulaireAudioProps) => (
  <form onSubmit={onSoumettre} className="p-6 space-y-6">

    <ChampSelectionLivre
      livres={livres}
      valeur={formulaire.livreId}
      onChange={(v) => onChangerChamp("livreId", v)}
      desactive={enEnvoi}
    />

    <ChampsPlagesPages
      pageDebut={formulaire.pageDebut}
      pageFin={formulaire.pageFin}
      onChangeDebut={(v) => onChangerChamp("pageDebut", v)}
      onChangeFin={(v)   => onChangerChamp("pageFin", v)}
      desactive={enEnvoi}
      defaultPageDebut={defaultPageDebut}
    />

    <ChampFichierAudio
      apercu={formulaire.apercu}
      onChange={onChangerFichier}
      desactive={enEnvoi}
    />

    <BoutonsActions
      estModal={estModal}
      enEnvoi={enEnvoi}
      onFermer={onFermer}
    />
  </form>
);

export default FormulaireAudio;