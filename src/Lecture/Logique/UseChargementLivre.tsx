import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../constants/couleurs";
import type { Livre, Page } from "../types/livreTypes";

export const useChargementLivre = (id: string | undefined) => {
  const [livre, setLivre] = useState<Livre | null>(null);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    if (!id) return;

    const chargerDonnees = async () => {
      try {
        const [reponseLivre, reponsePages] = await Promise.all([
          axios.get(`${URL_API}/admin/livre/${id}`),
          axios.get(`${URL_API}/admin/livre/${id}/pages`),
        ]);
        setLivre(reponseLivre.data);
        setPages(reponsePages.data);
      } catch (erreur) {
        console.error("Erreur chargement livre :", erreur);
      }
    };

    chargerDonnees();
  }, [id]);

  return { livre, pages };
};