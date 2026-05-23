import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../constants/couleurs";
import type { Page } from "../Types/LivreTypes";

export const useChargementAudio = (
  id: string | undefined,
  pages: Page[],
  indexCourant: number
) => {
  const [urlAudio, setUrlAudio] = useState<string | null>(null);

  useEffect(() => {
    if (!id || pages.length === 0) return;

    const page = pages[indexCourant];
    if (!page) return;

    const chargerAudio = async () => {
      try {
       const reponse = await axios.get(`${URL_API}/audios/page/${page.id}`);

       // ── Ajoute ces logs temporaires ──
         console.log("Réponse complète :", reponse.data);
         console.log("fichierAudio :", reponse.data?.fichierAudio);

        const fichier = reponse.data?.fichierAudio;

        if (!fichier) {
          setUrlAudio(null);
          return;
        }

        const cheminPropre = fichier
          .replace(/^\/?uploads\/?/, "")
          .replace(/\\/g, "/");

        setUrlAudio(`${URL_API}/uploads/${cheminPropre}`);
      } catch (erreur) {
        console.error("Erreur chargement audio :", erreur);
        setUrlAudio(null);
      }
      console.log("Réponse complète :", reponse.data);
      console.log("fichierAudio :", reponse.data?.fichierAudio);
    };

    chargerAudio();
  }, [indexCourant, id, pages]);

  return { urlAudio };
};