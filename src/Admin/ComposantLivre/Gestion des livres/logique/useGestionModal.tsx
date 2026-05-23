import { useState } from "react";
import type { PresetAudio } from "../type/listeLivreType";

export const useGestionModals = () => {
  const [modalAjoutOuverte,    setModalAjoutOuverte]    = useState(false);
  const [modalModifOuverte,    setModalModifOuverte]    = useState(false);
  const [modalSupprOuverte,    setModalSupprOuverte]    = useState(false);
  const [modalAudioOuverte,    setModalAudioOuverte]    = useState(false);
  const [presetAudio,          setPresetAudio]          = useState<PresetAudio | null>(null);

  const ouvrirAjout  = () => setModalAjoutOuverte(true);
  const fermerAjout  = () => setModalAjoutOuverte(false);

  const ouvrirModif  = () => setModalModifOuverte(true);
  const ouvrirSuppr  = () => setModalSupprOuverte(true);

  const ouvrirAudio  = () => setModalAudioOuverte(true);

  const ouvrirAudioDepuisPanel = (livreId: number, pageDebut: number, pageFin: number) => {
    setPresetAudio({ livreId, pageDebut, pageFin });
    setModalAudioOuverte(true);
  };

  const fermerTout = () => {
    setModalModifOuverte(false);
    setModalSupprOuverte(false);
    setModalAudioOuverte(false);
    setPresetAudio(null);
  };

  return {
    modalAjoutOuverte,
    modalModifOuverte,
    modalSupprOuverte,
    modalAudioOuverte,
    presetAudio,
    ouvrirAjout,
    fermerAjout,
    ouvrirModif,
    ouvrirSuppr,
    ouvrirAudio,
    ouvrirAudioDepuisPanel,
    fermerTout,
  };
};