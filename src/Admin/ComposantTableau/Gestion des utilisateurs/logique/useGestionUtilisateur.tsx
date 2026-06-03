import {
  useEffect,
  useState,
  useCallback,
} from "react";

import type {
  UseGestionUtilisateurReturn,
  AdminProfile,
  User,
  
} from "../type/GestionUtilisateurType";

const API_URL = import.meta.env.VITE_API_URL as string;

const getToken = (): string =>
  localStorage.getItem("token") || "";

/* ================================================================
   HOOK
================================================================ */

export const useGestionUtilisateur =
  (): UseGestionUtilisateurReturn => {

  /* ================================================================
     STATES
  ================================================================ */

  const [profil, setProfil] =
    useState<AdminProfile | null>(null);

  const [users, setUsers] =
    useState<User[]>([]);



  const [diagrammeData, setDiagrammeData] = useState<
    { label: string; value: number }[]
  >([]);

  /* ================================================================
     LOADING
  ================================================================ */

  const [loadingProfil, setLoadingProfil] =
    useState<boolean>(true);

  const [loadingUsers, setLoadingUsers] =
    useState<boolean>(false);

 

  const [loadingStats, setLoadingStats] =
    useState<boolean>(false);

  /* ================================================================
     ERROR
  ================================================================ */

  const [errorProfil, setErrorProfil] =
    useState<string | null>(null);

  const [errorUsers, setErrorUsers] =
    useState<string | null>(null);


  /* ================================================================
     FETCH PROFIL
  ================================================================ */

  const fetchProfil = useCallback(async () => {
    try {
      setLoadingProfil(true);

      const res = await fetch(`${API_URL}/admin/profil`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setProfil(data);
      setErrorProfil(null);

    } catch {
      setProfil(null);
      setErrorProfil("Erreur profil");
    } finally {
      setLoadingProfil(false);
    }
  }, []);

  /* ================================================================
     FETCH USERS
  ================================================================ */

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);

      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setUsers(data);
      setErrorUsers(null);

    } catch {
      setUsers([]);
      setErrorUsers("Erreur users");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

 
  /* ================================================================
     FETCH STATS (DIAGRAMME)
  ================================================================ */

  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);

      const res = await fetch(
        `${API_URL}/admin/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      setDiagrammeData(data);

    } catch (err) {
      console.error("Erreur stats:", err);
      setDiagrammeData([]);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  /* ================================================================
     ACTION: BLOCK USER
  ================================================================ */

  const blockUser = useCallback(async (id: number) => {
    try {
      await fetch(`${API_URL}/admin/users/${id}/block`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      fetchUsers();

    } catch (err) {
      console.error(err);
    }
  }, [fetchUsers]);

  /* ================================================================
     INIT
  ================================================================ */

  useEffect(() => {
    fetchProfil();
    fetchUsers();
   
    fetchStats(); // 👈 AJOUT IMPORTANT
  }, [
    fetchProfil,
    fetchUsers,
   
    fetchStats,
  ]);

  /* ================================================================
     RETURN
  ================================================================ */

  return {
    profil,
    users,
  
    diagrammeData,

    blockUser,

    loadingProfil,
    loadingUsers,
  
    loadingStats,

    errorProfil,
    errorUsers,
   
  };
};