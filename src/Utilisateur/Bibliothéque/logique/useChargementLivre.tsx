import { useEffect, useState } from "react";
import axios from "axios";
import {API_URL } from "../constante/constante";
import type { Livre } from "../types/BibliothequeType";

export const useChargementLivres = () => {
  const [livres,     setLivres]     = useState<Livre[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur,     setErreur]     = useState<string | null>(null);

  useEffect(() => {
    let annule = false;

    const chargerLivres = async () => {
      try {
        setChargement(true);
        const { data } = await axios.get<Livre[]>(`${API_URL}/admin/livre`);
       
        if (!annule) setLivres(Array.isArray(data) ? data : []);
      } catch {
        if (!annule) setErreur("Impossible de charger les livres.");
      } finally {
        if (!annule) setChargement(false);
      }
    };

    chargerLivres();
    return () => { annule = true; };
  }, []);

  return { livres, chargement, erreur };
};