import { useState } from "react";
import axios from "axios";
import { URL_API, ETAT_FORMULAIRE_INITIAL, ETAT_MESSAGE_INITIAL } from "../constant/constante";
import type { EtatFormulaire, EtatMessage, TypeGlisser } from "../type/ajouterLivreType";

interface UseFormulaireAjoutLivreProps {
  onSuccess?: () => void;
  onClose:    () => void;
}

export const useFormulaireAjoutLivre = ({ onSuccess, onClose }: UseFormulaireAjoutLivreProps) => {
  const [formulaire,  setFormulaire]  = useState<EtatFormulaire>(ETAT_FORMULAIRE_INITIAL);
  const [message,     setMessage]     = useState<EtatMessage>(ETAT_MESSAGE_INITIAL);
  const [enEnvoi,     setEnEnvoi]     = useState(false);
  const [typeGlisser, setTypeGlisser] = useState<TypeGlisser>(null);

  // ── Mise à jour d'un champ texte ──────────────────────
  const mettreAJourChamp = (champ: keyof EtatFormulaire, valeur: string) => {
    setFormulaire(prev => ({ ...prev, [champ]: valeur }));
  };

  // ── Gestion du fichier PDF ────────────────────────────
  const gererChangementPdf = (fichier: File | null) => {
    setFormulaire(prev => ({ ...prev, fichierPdf: fichier }));
  };

  // ── Gestion de la couverture (fichier + aperçu) ───────
  const gererChangementCover = (fichier: File) => {
    const lecteur = new FileReader();
    lecteur.onloadend = () => {
      setFormulaire(prev => ({
        ...prev,
        fichierCover: fichier,
        apercuCover:  lecteur.result as string,
      }));
    };
    lecteur.readAsDataURL(fichier);
  };

  // ── Suppression de la couverture ──────────────────────
  const supprimerCover = () => {
    setFormulaire(prev => ({ ...prev, fichierCover: null, apercuCover: null }));
  };

  // ── Gestion du glisser-déposer ────────────────────────
  const gererGlisser = (e: React.DragEvent, type: TypeGlisser) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setTypeGlisser(type);
    else if (e.type === "dragleave") setTypeGlisser(null);
  };

  const gererDepot = (e: React.DragEvent, type: TypeGlisser) => {
    e.preventDefault();
    e.stopPropagation();
    setTypeGlisser(null);
    const fichiers = e.dataTransfer.files;
    if (!fichiers?.[0]) return;
    if (type === "pdf" && fichiers[0].type === "application/pdf") {
      setFormulaire(prev => ({ ...prev, fichierPdf: fichiers[0] }));
    } else if (type === "cover" && fichiers[0].type.startsWith("image/")) {
      gererChangementCover(fichiers[0]);
    }
  };

  // ── Réinitialisation du formulaire ────────────────────
  const reinitialiserFormulaire = () => {
    setFormulaire(ETAT_FORMULAIRE_INITIAL);
    setMessage(ETAT_MESSAGE_INITIAL);
  };

  // ── Fermeture avec réinitialisation ──────────────────
  const gererFermeture = () => {
    reinitialiserFormulaire();
    onClose();
  };

  // ── Soumission du formulaire ──────────────────────────
  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(ETAT_MESSAGE_INITIAL);

    const { titre, auteur, fichierPdf, fichierCover, description, categorie } = formulaire;

    if (!titre || !auteur || !fichierPdf || !fichierCover) {
      setMessage({ texte: "Tous les champs obligatoires doivent être remplis.", type: "erreur" });
      return;
    }

    const donneesFormulaire = new FormData();
    donneesFormulaire.append("titre",       titre);
    donneesFormulaire.append("auteur",      auteur);
    donneesFormulaire.append("description", description);
    donneesFormulaire.append("categorie",   categorie);
    donneesFormulaire.append("pdf",         fichierPdf);
    donneesFormulaire.append("cover",       fichierCover);

    setEnEnvoi(true);
    try {
      const reponse = await axios.post(`${URL_API}/admin/livre`, donneesFormulaire, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({
        texte: `Livre "${reponse.data.titre}" ajouté avec succès !`,
        type:  "succes",
      });
      setTimeout(() => {
        reinitialiserFormulaire();
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (erreur) {
      console.error(erreur);
      setMessage({
        texte: "Erreur lors de l'ajout du livre. Vérifiez les informations et réessayez.",
        type:  "erreur",
      });
    } finally {
      setEnEnvoi(false);
    }
  };

  return {
    formulaire,
    message,
    enEnvoi,
    typeGlisser,
    mettreAJourChamp,
    gererChangementPdf,
    gererChangementCover,
    supprimerCover,
    gererGlisser,
    gererDepot,
    gererFermeture,
    gererSoumission,
  };
};