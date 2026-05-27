import { useEffect, useState } from "react";
import axios from "axios";

import { URL_API } from "../constante/constante";
import type { Page } from "../type/LivreType";

export const useChargementAudio = (
  id: string | undefined,
  pages: Page[],
  indexCourant: number
) => {

  const [urlAudio, setUrlAudio] =useState<string | null>(null);

  useEffect(() => {

    if (!id) return;

    if (!pages.length) return;

    const page = pages[indexCourant];

    if (!page) return;

    const chargerAudio = async () => {

      try {

        const reponse = await axios.get(
          `${URL_API}/audios/page/${page.id}`
        );

        console.log(
          "Réponse audio :",
          reponse.data
        );

        const fichierAudio =
          reponse.data?.fichierAudio;

        if (!fichierAudio) {

          console.warn(
            "Aucun fichier audio trouvé"
          );

          setUrlAudio(null);
          return;
        }

        // Nettoyage du chemin
        const nomFichier =
          fichierAudio
            .replace(/^\/+/, "")
            .replace(/^uploads\/audio\//, "")
            .replace(/\\/g, "/");

        // URL finale correcte
        const audioUrl =
          `${URL_API}/uploads/audio/${nomFichier}`;

        console.log(
          "URL AUDIO :",
          audioUrl
        );

        setUrlAudio(audioUrl);

      } catch (erreur) {

        console.error(
          "Erreur chargement audio :",
          erreur
        );

        setUrlAudio(null);
      }
    };

    chargerAudio();

  }, [id, pages, indexCourant]);

  return {
    urlAudio,
  };
};