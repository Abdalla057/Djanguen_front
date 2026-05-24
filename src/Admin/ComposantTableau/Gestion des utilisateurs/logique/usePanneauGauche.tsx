/* ================================================================
   usePanneauGauche.ts
================================================================ */

import {
  useEffect,
  useState,
  useCallback,
} from "react";

import type {
  UsePanneauGaucheReturn,
  AdminProfile,
} from "../type/PanneauGauche.Type";

/* ================================================================
   ENV
================================================================ */

const API_URL =
  import.meta.env.VITE_API_URL as string;

/* ================================================================
   TOKEN
================================================================ */

const getToken = (): string =>
  localStorage.getItem("token") || "";

/* ================================================================
   HOOK
================================================================ */

export const usePanneauGauche =
  (): UsePanneauGaucheReturn => {

  /* ================================================================
     STATE
  ================================================================ */

  const [profil, setProfil] =
    useState<AdminProfile | null>(null);

  /* ================================================================
     LOADING
  ================================================================ */

  const [loadingProfil, setLoadingProfil] =
    useState(true);

  /* ================================================================
     ERROR
  ================================================================ */

  const [errorProfil, setErrorProfil] =
    useState<string | null>(null);

  /* ================================================================
     FETCH PROFIL
  ================================================================ */

  const fetchProfil =
    useCallback(async () => {

      try {

        setLoadingProfil(true);

        const res = await fetch(
          `${API_URL}/admin/profil`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (!res.ok) {

          throw new Error(
            "Erreur récupération profil"
          );

        }

        const data = await res.json();

        console.log(
          "PROFIL CONNECTÉ :",
          data
        );

        setProfil(data);

        setErrorProfil(null);

      } catch (err) {

        console.log(
          "ERREUR PROFIL :",
          err
        );

        setProfil(null);

        setErrorProfil(
          "Erreur profil"
        );

      } finally {

        setLoadingProfil(false);

      }

    }, []);

  /* ================================================================
     INIT
  ================================================================ */

  useEffect(() => {

    fetchProfil();

  }, [fetchProfil]);

  /* ================================================================
     RETURN
  ================================================================ */

  return {

    profil,

    loadingProfil,

    errorProfil,

  };

};