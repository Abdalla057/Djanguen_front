import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import type { Utilisateur } from "../type/listeLivreType";

const URL_API = import.meta.env.VITE_API_URL as string;

export const useGestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [afficherTous, setAfficherTous] = useState(false);
  const [chargementUtilisateurs, setChargementUtilisateurs] =
    useState(true);

  const chargerUtilisateurs = useCallback(async () => {
    try {
      setChargementUtilisateurs(true);

      const token = localStorage.getItem("token");

      console.log("TOKEN LOCALSTORAGE :", token);

      const reponse = await axios.get(
        `${URL_API}/utilisateur`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("REPONSE :", reponse.data);

      setUtilisateurs(reponse.data);
    } catch (err: unknown) {
      console.error(
        "Erreur chargement utilisateurs :",
        (err as { response?: { data?: unknown } }).response?.data || err
      );

      setUtilisateurs([]);
    } finally {
      setChargementUtilisateurs(false);
    }
  }, []);

  const basculerAffichage = () =>
    setAfficherTous((prev) => !prev);

  const utilisateursAffiches = useMemo(
    () =>
      afficherTous
        ? utilisateurs
        : utilisateurs.slice(0, 3),
    [utilisateurs, afficherTous]
  );

  return {
    utilisateurs,
    utilisateursAffiches,
    afficherTous,
    chargementUtilisateurs,
    chargerUtilisateurs,
    basculerAffichage,
  };
};