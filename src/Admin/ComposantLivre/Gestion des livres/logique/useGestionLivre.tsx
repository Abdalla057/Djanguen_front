import { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

import {
  URL_API,
  MAX_LIVRES_AFFICHES,
} from "../constant/constant";

import type {
  Livre,
  EtatChargement,
  EtatErreur,
} from "../type/listeLivreType";

export const useGestionLivres = () => {

  // ─────────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────────
  const [livres, setLivres] = useState<Livre[]>([]);

  const [recherche, setRecherche] =
    useState<string>("");

  const [indexActuel, setIndexActuel] =
    useState<number>(0);

  const [chargement, setChargement] =
    useState<EtatChargement>({
      livres: true,
      utilisateurs: true,
    });

  const [erreurs, setErreurs] =
    useState<EtatErreur>({
      livres: null,
      utilisateurs: null,
    });

  // ─────────────────────────────────────────────
  // CHARGEMENT DES LIVRES
  // ─────────────────────────────────────────────
  const chargerLivres = useCallback(async () => {

    try {

      setChargement((prev) => ({
        ...prev,
        livres: true,
      }));

      setErreurs((prev) => ({
        ...prev,
        livres: null,
      }));

      const reponse = await axios.get<Livre[]>(
        `${URL_API}/admin/livre`
      );

      const donnees = reponse.data.slice(
        0,
        MAX_LIVRES_AFFICHES
      );

      setLivres(donnees);

      setIndexActuel(0);

    } catch (err) {

      const message =
        err instanceof Error
          ? err.message
          : "Erreur chargement livres";

      setErreurs((prev) => ({
        ...prev,
        livres: message,
      }));

    } finally {

      setChargement((prev) => ({
        ...prev,
        livres: false,
      }));

    }

  }, []);

  // ─────────────────────────────────────────────
  // CHARGEMENT INITIAL
  // ─────────────────────────────────────────────
  useEffect(() => {
    chargerLivres();
  }, [chargerLivres]);

  // ─────────────────────────────────────────────
  // FILTRAGE DES LIVRES
  // ─────────────────────────────────────────────
  const livresFiltres = useMemo(() => {

    // Protection absolue
    const valeurRecherche =
      typeof recherche === "string"
        ? recherche
        : "";

    const requete =
      valeurRecherche
        .trim()
        .toLowerCase();

    if (!requete) {
      return livres;
    }

    return livres.filter((livre) => {

      const titre =
        (livre.titre ?? "")
          .toLowerCase();

      const auteur =
        (livre.auteur ?? "")
          .toLowerCase();

      return (
        titre.includes(requete) ||
        auteur.includes(requete)
      );

    });

  }, [livres, recherche]);

  // ─────────────────────────────────────────────
  // RESET INDEX
  // ─────────────────────────────────────────────
  useEffect(() => {
    setIndexActuel(0);
  }, [recherche]);

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────
  const allerVers = useCallback((
    idx: number
  ) => {

    if (
      idx >= 0 &&
      idx < livresFiltres.length
    ) {
      setIndexActuel(idx);
    }

  }, [livresFiltres.length]);

  const allerPrecedent = useCallback(() => {

    setIndexActuel((prev) =>
      Math.max(0, prev - 1)
    );

  }, []);

  const allerSuivant = useCallback(() => {

    setIndexActuel((prev) =>
      Math.min(
        livresFiltres.length - 1,
        prev + 1
      )
    );

  }, [livresFiltres.length]);

  // ─────────────────────────────────────────────
  // LIVRE COURANT
  // ─────────────────────────────────────────────
  const livreCourant = useMemo(() => {

    if (
      livresFiltres.length === 0
    ) {
      return null;
    }

    return (
      livresFiltres[indexActuel] ??
      livresFiltres[0]
    );

  }, [livresFiltres, indexActuel]);

  // ─────────────────────────────────────────────
  // LIVRES VISIBLES
  // ─────────────────────────────────────────────
  const livresVisibles = useMemo(() => {

    const resultat: {
      livre: Livre;
      position: number;
      idx: number;
    }[] = [];

    for (
      let position = -2;
      position <= 2;
      position++
    ) {

      const idx =
        indexActuel + position;

      if (
        idx >= 0 &&
        idx < livresFiltres.length
      ) {

        resultat.push({
          livre: livresFiltres[idx],
          position,
          idx,
        });

      }

    }

    return resultat;

  }, [livresFiltres, indexActuel]);

  // ─────────────────────────────────────────────
  // STATISTIQUES
  // ─────────────────────────────────────────────
  const statistiques = useMemo(() => {

    const total =
      livresFiltres.length;

    return {
      totalLivres: total,
      nouveautes: Math.min(5, total),
      enLecture: Math.ceil(total * 0.3),
    };

  }, [livresFiltres.length]);

  // ─────────────────────────────────────────────
  // EXPORT
  // ─────────────────────────────────────────────
  return {

    livres,
    livresFiltres,

    recherche,
    setRecherche,

    indexActuel,

    chargement,
    erreurs,

    chargerLivres,

    allerVers,
    allerPrecedent,
    allerSuivant,

    livreCourant,
    livresVisibles,

    statistiques,

  };

};