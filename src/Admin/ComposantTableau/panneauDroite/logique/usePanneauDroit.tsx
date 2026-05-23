/* eslint-disable react-hooks/exhaustive-deps */

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import axios from "axios";

import type {
  User,
  Book,
  Historique,
  Stats,
  RightPanelState,
  RightPanelExtra,
  RightPanelActions,
} from "../type/PanneauDroit.Type";

import { API_URL } from "../constante/constante";

/* =========================================================
    HOOK
========================================================= */

export const usePanneauDroit =
  (): RightPanelState &
    RightPanelExtra &
    RightPanelActions => {

  /* =========================================================
      STATES
  ========================================================= */

  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [books, setBooks] =
    useState<Book[]>([]);

  const [historique, setHistorique] =
    useState<Historique[]>([]);

  const [allUsers, setAllUsers] =
    useState<User[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [stats, setStats] =
    useState<Stats | null>(null);

  const [loadingBooks, setLoadingBooks] =
    useState(true);

  const [showHistory, setShowHistory] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /* =========================================================
      TOKEN + HEADERS
  ========================================================= */

  const getToken = () => {

    return localStorage.getItem("token");

  };

  const getHeaders = () => {

    const token = getToken();

    return {
      Authorization: `Bearer ${token}`,
    };

  };

  /* =========================================================
      FILTRAGE LIVRES
  ========================================================= */

  const filteredBooks = useMemo(() => {

    if (!search.trim()) {

      return books;

    }

    return books.filter((book) => {

      const titre =
        book.titre?.toLowerCase() || "";

      const auteur =
        book.auteur?.toLowerCase() || "";

      const categorie =
        book.categorie?.toLowerCase() || "";

      const valeurRecherche =
        search.toLowerCase();

      return (
        titre.includes(valeurRecherche) ||
        auteur.includes(valeurRecherche) ||
        categorie.includes(valeurRecherche)
      );

    });

  }, [books, search]);

  /* =========================================================
      CHARGER UTILISATEURS
  ========================================================= */

  const chargerUtilisateurs =
    useCallback(async () => {

      try {

        const response = await axios.get(
          `${API_URL}/utilisateur`,
          {
            headers: getHeaders(),
          }
        );

        const utilisateurs =
          Array.isArray(response.data)
            ? (response.data as User[])
            : [];

        const utilisateursFormates =
          utilisateurs.map((user: User) => ({

            id: user.id,

            nom:
              user.prenomUtilisateur ||
              user.nomUtilisateur ||
              "Utilisateur",

            email: user.email,

            avatar: user.avatar,

            livresLus:
              user.livresLus ?? 0,

          }));

        setAllUsers(
          utilisateursFormates
        );

      } catch (error) {

        console.error(
          "Erreur chargement utilisateurs :",
          error
        );

        setAllUsers([]);

      }

    }, []);

  /* =========================================================
      UTILISATEUR PAR ID
  ========================================================= */

  const recupererUtilisateurParId =
    useCallback(
      async (id: number) => {

        try {

          const response = await axios.get(
            `${API_URL}/utilisateur/${id}`,
            {
              headers: getHeaders(),
            }
          );

          return response.data;

        } catch (error) {

          console.error(
            "Erreur récupération utilisateur :",
            error
          );

          return null;

        }

      },
      []
    );

  /* =========================================================
      MODIFIER UTILISATEUR
  ========================================================= */

  const modifierUtilisateur =
    useCallback(
      async (
        id: number,
        data: Partial<User>
      ) => {

        try {

          const response =
            await axios.patch(
              `${API_URL}/utilisateur/${id}`,
              data,
              {
                headers: getHeaders(),
              }
            );

          await chargerUtilisateurs();

          return response.data;

        } catch (error) {

          console.error(
            "Erreur modification utilisateur :",
            error
          );

          return null;

        }

      },
      [chargerUtilisateurs]
    );

  /* =========================================================
      SUPPRIMER UTILISATEUR
  ========================================================= */

  const supprimerUtilisateur =
    useCallback(
      async (id: number) => {

        try {

          await axios.delete(
            `${API_URL}/utilisateur/${id}`,
            {
              headers: getHeaders(),
            }
          );

          setAllUsers((prev) =>
            prev.filter(
              (user) =>
                user.id !== id
            )
          );

          return true;

        } catch (error) {

          console.error(
            "Erreur suppression utilisateur :",
            error
          );

          return false;

        }

      },
      []
    );

  /* =========================================================
      CHARGER LIVRES
  ========================================================= */

  const chargerLivres =
    useCallback(async () => {

      try {

        setLoadingBooks(true);

        const response = await axios.get(
          `${API_URL}/admin/livre`
        );

        setBooks(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.error(
          "Erreur chargement livres :",
          error
        );

        setBooks([]);

      } finally {

        setLoadingBooks(false);

      }

    }, []);

  /* =========================================================
      HISTORIQUE
  ========================================================= */

  const chargerHistorique =
    useCallback(async () => {

      try {

        if (!currentUser) {

          return;

        }

        const response = await axios.get(
          `${API_URL}/lecture/historique/${currentUser.id}`,
          {
            headers: getHeaders(),
          }
        );

        const data =
          Array.isArray(response.data)
            ? response.data
            : [];

        setHistorique(data);

        setStats({

          completed: data.length,

          goal: books.length,

          percentage:
            books.length > 0
              ? Math.round(
                  (data.length /
                    books.length) *
                    100
                )
              : 0,

        });

      } catch (error) {

        console.error(
          "Erreur historique :",
          error
        );

        setHistorique([]);

        setStats({

          completed: 0,

          goal: books.length,

          percentage: 0,

        });

      }

    }, [currentUser, books.length]);

  /* =========================================================
      EFFECTS
  ========================================================= */

  useEffect(() => {

    chargerLivres();

  }, [chargerLivres]);

  useEffect(() => {

    if (currentUser) {

      chargerHistorique();

    }

  }, [
    currentUser,
    books.length,
    chargerHistorique,
  ]);

  /* =========================================================
      ACTIONS
  ========================================================= */

  const handleSelectBook =
    useCallback((index: number) => {

      setCurrentIndex(index);

    }, []);

  const handleNext =
    useCallback(() => {

      setCurrentIndex((prev) =>
        Math.min(
          prev + 1,
          books.length - 1
        )
      );

    }, [books.length]);

  const handlePrev =
    useCallback(() => {

      setCurrentIndex((prev) =>
        Math.max(prev - 1, 0)
      );

    }, []);

  /* =========================================================
      RETURN
  ========================================================= */

  return {

    /* STATES */
    currentUser,
    books,
    filteredBooks,
    historique,
    currentIndex,
    stats,
    loadingBooks,
    showHistory,
    search,

    /* EXTRA */
    allUsers,

    /* SETTERS */
    setCurrentUser,
    setShowHistory,
    setSearch,

    /* ACTIONS */
    handleSelectBook,
    handleNext,
    handlePrev,

    /* UTILISATEURS */
    chargerUtilisateurs,
    recupererUtilisateurParId,
    modifierUtilisateur,
    supprimerUtilisateur,

  };

};