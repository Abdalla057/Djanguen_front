/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import type { User, UserView } from "../type/PanneauType";
import { API_URL } from "../constante/constante";

export const usePanneauDroit = () => {

  const [allUsers, setAllUsers] = useState<UserView[]>([]);

  // ── getHeaders stable — pas dans les deps ──
  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  });

  // ======================================================
  // MAPPING
  // ======================================================

  const mapUser = (user: User): UserView => ({
    id       : user.id,
    nom      : user.prenomUtilisateur || user.nomUtilisateur || "Utilisateur",
    email    : user.email,
    avatar   : user.profil?.avatar   ?? "",
    livresLus: user.profil?.livresLus ?? 0,
    statut   : user.statut,
  });

  // ======================================================
  // CHARGER UTILISATEURS
  // ======================================================

  const chargerUtilisateurs = useCallback(async () => {
    try {
      const { data } = await axios.get<User[]>(
        `${API_URL}/utilisateur`,
        { headers: getHeaders() }
      );

      const liste = Array.isArray(data) ? data : [];
      setAllUsers(liste.map(mapUser));

    } catch (error) {
      console.error("Erreur chargement utilisateurs :", error);
      setAllUsers([]);
    }
  }, []); // ← pas de dépendance sur getHeaders

  // ======================================================
  // RECUPERER PAR ID
  // ======================================================

  const recupererUtilisateurParId = useCallback(async (id: number): Promise<UserView | null> => {
    try {
      const { data } = await axios.get<User>(
        `${API_URL}/utilisateur/${id}`,
        { headers: getHeaders() }
      );
      return mapUser(data);
    } catch (error) {
      console.error("Erreur récupération utilisateur :", error);
      return null;
    }
  }, []);

  // ======================================================
  // AJOUTER
  // ======================================================

  const ajouterUtilisateur = useCallback(async (data: Partial<User>): Promise<UserView | null> => {
    try {
      const response = await axios.post<User>(
        `${API_URL}/utilisateur`,
        data,
        { headers: getHeaders() }
      );
      await chargerUtilisateurs();
      return mapUser(response.data);
    } catch (error) {
      console.error("Erreur ajout utilisateur :", error);
      return null;
    }
  }, [chargerUtilisateurs]);

  // ======================================================
  // MODIFIER
  // ======================================================

  const modifierUtilisateur = useCallback(async (id: number, data: Partial<User>): Promise<UserView | null> => {
    try {
      const response = await axios.patch<User>(
        `${API_URL}/utilisateur/${id}`,
        data,
        { headers: getHeaders() }
      );
      setAllUsers((prev) =>
        prev.map((u) => (u.id === id ? mapUser(response.data) : u))
      );
      return mapUser(response.data);
    } catch (error) {
      console.error("Erreur modification utilisateur :", error);
      return null;
    }
  }, []);

  // ======================================================
  // SUPPRIMER
  // ======================================================

  const supprimerUtilisateur = useCallback(async (id: number): Promise<boolean> => {
    try {
      await axios.delete(
        `${API_URL}/utilisateur/${id}`,
        { headers: getHeaders() }
      );
      setAllUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (error) {
      console.error("Erreur suppression utilisateur :", error);
      return false;
    }
  }, []);

  // ======================================================
  // EFFECT
  // ======================================================

  useEffect(() => {
    chargerUtilisateurs();
  }, []);

  return {
    allUsers,
    chargerUtilisateurs,
    recupererUtilisateurParId,
    ajouterUtilisateur,
    modifierUtilisateur,
    supprimerUtilisateur,
  };
};