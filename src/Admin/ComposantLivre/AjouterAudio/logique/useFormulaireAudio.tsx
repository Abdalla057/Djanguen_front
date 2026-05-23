import { useState, useEffect } from "react";
import axios from "axios";
import { URL_API, ETAT_FORMULAIRE_INITIAL, ETAT_NOTIFICATION_INITIAL } from "../../AjouterAudio/constant/constant";
import type { EtatFormulaire, EtatNotification } from "../type/ajouterAudioType";

interface UseFormulaireAudioProps {
  isOpen?:           boolean;
  asModal?:          boolean;
  defaultLivreId?:   number;
  defaultPageDebut?: number;
  defaultPageFin?:   number;
  onSuccess?:        () => void;
}

export const useFormulaireAudio = ({
  isOpen,
  asModal,
  defaultLivreId,
  defaultPageDebut,
  defaultPageFin,
  onSuccess,
}: UseFormulaireAudioProps) => {
  const [formulaire,    setFormulaire]    = useState<EtatFormulaire>(ETAT_FORMULAIRE_INITIAL);
  const [envoi,         setEnvoi]         = useState(false);
  const [notification,  setNotification]  = useState<EtatNotification>(ETAT_NOTIFICATION_INITIAL);

  // ── Réinitialisation à l'ouverture du modal ───────────
  useEffect(() => {
    if (asModal && isOpen) {
      setFormulaire(ETAT_FORMULAIRE_INITIAL);
      setNotification(ETAT_NOTIFICATION_INITIAL);
    }
  }, [isOpen, asModal]);

  // ── Pré-remplissage depuis AudioStatusPanel ───────────
  useEffect(() => {
    if (defaultLivreId   != null) setFormulaire(prev => ({ ...prev, livreId:   String(defaultLivreId) }));
    if (defaultPageDebut != null) setFormulaire(prev => ({ ...prev, pageDebut: String(defaultPageDebut) }));
    if (defaultPageFin   != null) setFormulaire(prev => ({ ...prev, pageFin:   String(defaultPageFin) }));
  }, [defaultLivreId, defaultPageDebut, defaultPageFin]);

  // ── Afficher une notification temporaire ─────────────
  const afficherNotification = (type: "succes" | "erreur", message: string) => {
    setNotification({ afficher: true, type, message });
    setTimeout(() => {
      setNotification(ETAT_NOTIFICATION_INITIAL);
      if (type === "succes" && onSuccess) onSuccess();
    }, 2000);
  };

  // ── Changement du fichier audio ───────────────────────
  const gererChangementFichier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fichier = e.target.files?.[0];
    if (fichier) {
      setFormulaire(prev => ({ ...prev, fichierAudio: fichier, apercu: fichier.name }));
    }
  };

  // ── Mise à jour d'un champ du formulaire ──────────────
  const mettreAJourChamp = (champ: keyof EtatFormulaire, valeur: string) => {
    setFormulaire(prev => ({ ...prev, [champ]: valeur }));
  };

  // ── Soumission du formulaire ──────────────────────────
  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();

    const { livreId, pageDebut, pageFin, fichierAudio } = formulaire;

    if (!fichierAudio || !livreId || !pageDebut || !pageFin) {
      afficherNotification("erreur", "Veuillez remplir tous les champs.");
      return;
    }
    if (parseInt(pageFin) < parseInt(pageDebut)) {
      afficherNotification("erreur", "La page de fin doit être ≥ à la page de début.");
      return;
    }

    setEnvoi(true);

    const donneesFormulaire = new FormData();
    donneesFormulaire.append("file",      fichierAudio);
    donneesFormulaire.append("pageDebut", pageDebut);
    donneesFormulaire.append("pageFin",   pageFin);

    try {
      await axios.post(`${URL_API}/admin/upload-audio/${livreId}`, donneesFormulaire, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      afficherNotification("succes", "Audio uploadé avec succès !");
      setFormulaire(ETAT_FORMULAIRE_INITIAL);
    } catch (erreur) {
      if (axios.isAxiosError(erreur)) {
        afficherNotification("erreur", erreur.response?.data?.message || "Erreur lors de l'envoi.");
      } else {
        afficherNotification("erreur", "Erreur lors de l'envoi de l'audio.");
      }
    } finally {
      setEnvoi(false);
    }
  };

  // ── Calcul du nombre de pages couvertes ───────────────
  const nombrePagesCouvertes = (): number | null => {
    const debut = parseInt(formulaire.pageDebut);
    const fin   = parseInt(formulaire.pageFin);
    if (!isNaN(debut) && !isNaN(fin) && fin >= debut) return fin - debut + 1;
    return null;
  };

  return {
    formulaire,
    envoi,
    notification,
    mettreAJourChamp,
    gererChangementFichier,
    gererSoumission,
    nombrePagesCouvertes,
  };
};