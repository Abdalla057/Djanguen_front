import { useEffect, useRef, useCallback } from "react";
import { URL_API } from "../constants/couleurs";
import type { Livre } from "../types/livreTypes";

export const useHistoriqueLecture = (
  id: string | undefined,
  profileId: number | undefined,
  livre: Livre | null
) => {
  const historiqueCreeRef = useRef(false);

  // Création de l'historique au premier chargement
  useEffect(() => {
    if (!id || !profileId || !livre) return;
    if (historiqueCreeRef.current) return;
    historiqueCreeRef.current = true;

    const creerHistorique = async () => {
      try {
        await fetch(`${URL_API}/lecture/historique`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            utilisateurId: profileId,
            livreId: livre.id,
            dernierePage: 1,
            derniereAudio: 0,
          }),
        });
      } catch (erreur) {
        console.error("Erreur création historique :", erreur);
      }
    };

    creerHistorique();
  }, [id, profileId, livre]);

  // Mise à jour de l'historique à chaque changement de page
  const mettreAJourHistorique = useCallback(
    async (numeroPage: number) => {
      if (!id || !profileId || !livre) return;
      try {
        await fetch(`${URL_API}/lecture/historique`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            utilisateurId: profileId,
            livreId: livre.id,
            dernierePage: numeroPage,
            derniereAudio: 0,
          }),
        });
      } catch (erreur) {
        console.error("Erreur mise à jour historique :", erreur);
      }
    },
    [id, profileId, livre]
  );

  return { mettreAJourHistorique };
};