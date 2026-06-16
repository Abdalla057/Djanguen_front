import { useState, useEffect } from "react";
import { DAYS_SHORT } from "../constante";

import type { User, Historique, DashboardStats, Livre } from "../type/index";

const API_URL = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

export const pct = (a: number, b: number): number =>
  b ? Math.round((a / b) * 100) : 0;

export const secsToMin = (s: number): number =>
  Math.round((s || 0) / 60);

export const initials = (prenom = "", nom = ""): string =>
  (prenom[0] || "") + (nom[0] || "");

export const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
};

export const getWeekLabels = (): string[] => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return DAYS_SHORT[d.getDay()];
  });
};

export const computeStats = (historique: Historique[]): DashboardStats => ({
  totalLivres: historique.length,
  totalPages: historique.reduce((acc, h) => acc + (h.dernierePage || 0), 0),
  totalMinutes: secsToMin(
    historique.reduce((acc, h) => acc + (h.positionAudio || 0), 0)
  ),
});

export const getWeekActivity = (historique: Historique[]): number[] => {
  const totalPages = historique.reduce((acc, h) => acc + (h.dernierePage || 0), 0);
  return Array.from({ length: 7 }, (_, i) =>
    i === 6 ? Math.min(totalPages, 15) : Math.floor(Math.random() * 12)
  );
};

export const getDonutSegments = (historique: Historique[]) => {
  const total = historique.length;
  const done = historique.filter(
    (h) => h.totalPages && h.dernierePage >= h.totalPages
  ).length;
  const inProgress = historique.filter(
    (h) => h.dernierePage > 0 && (!h.totalPages || h.dernierePage < h.totalPages)
  ).length;
  const notStarted = Math.max(0, total - done - inProgress);

  return [
    { label: "Terminés",       val: done,       color: "#639922" },
    { label: "En cours",       val: inProgress, color: "#D94F2B" },
    { label: "Non commencés",  val: notStarted, color: "#E8E2D8" },
  ].filter((s) => s.val > 0);
};

// ─────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  "Content-Type": "application/json",
});

export const apiGetMe = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/utilisateur/me`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Erreur récupération profil : ${response.status}`);
  }
  const data = await response.json();
  // L'avatar est sur data.profil.avatar (entité Profil séparée)
  const avatarFilename = data.profil?.avatar;
  return {
    ...data,
    avatar: avatarFilename
      ? `${API_URL}/uploads/avatars/${avatarFilename}`
      : undefined,
  };
};

export const apiGetHistorique = async (userId: number): Promise<Historique[]> => {
  const response = await fetch(`${API_URL}/lecture/historique/${userId}`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Erreur récupération historique : ${response.status}`);
  }
  return response.json();
};

export const apiGetLivres = async (): Promise<Livre[]> => {
  const response = await fetch(`${API_URL}/admin/livre`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Erreur récupération livres : ${response.status}`);
  }
  const data = await response.json();
  return data.map((livre: Livre) => ({
    ...livre,
    cover: livre.cover
      ? `${API_URL}/uploads/images/${livre.cover}`
      : undefined,
  }));
};

export const apiReprendre = async (userId: number, livreId: number) => {
  const response = await fetch(`${API_URL}/lecture/reprendre/${userId}/${livreId}`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Erreur reprise lecture : ${response.status}`);
  }
  return response.json();
};

// ─── Mise à jour de l'avatar ──────────────────────────────────────────────────
export const apiUpdateAvatar = async (userId: number, file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${API_URL}/utilisateur/${userId}/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      // ⚠️ Ne pas mettre Content-Type ici — le navigateur le gère avec le boundary multipart
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erreur mise à jour avatar : ${response.status}`);
  }

  const data = await response.json();
  // L'avatar est sur data.profil.avatar (entité Profil séparée)
  const avatarFilename = data.profil?.avatar;
  return {
    ...data,
    avatar: avatarFilename
      ? `${API_URL}/uploads/avatars/${avatarFilename}`
      : undefined,
  };
};

// ─────────────────────────────────────────────────────────────
// TYPES DU HOOK
// ─────────────────────────────────────────────────────────────

interface UseDashboardReturn {
  user:         User | null;
  historique:   Historique[];
  livres:       Livre[];
  loading:      boolean;
  isDemo:       boolean;
  stats:        DashboardStats;
  handleResume: (livreId: number) => void;
  handleAvatar: (file: File) => Promise<void>;  // ← nouveau
}

// ─────────────────────────────────────────────────────────────
// HOOK PRINCIPAL
// ─────────────────────────────────────────────────────────────

export function useDashboard(): UseDashboardReturn {
  const [user,       setUser]       = useState<User | null>(null);
  const [historique, setHistorique] = useState<Historique[]>([]);
  const [livres,     setLivres]     = useState<Livre[]>([]);
  const [loading,    setLoading]    = useState<boolean>(true);
  const [isDemo,     setIsDemo]     = useState<boolean>(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const currentUser = await apiGetMe();
        const [historiqueData, livresData] = await Promise.all([
          apiGetHistorique(currentUser.id),
          apiGetLivres(),
        ]);
        setUser(currentUser);
        setHistorique(historiqueData);
        setLivres(livresData);
      } catch (error) {
        console.error(error);
        setLivres([]);
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const handleResume = (livreId: number) => {
    if (!user) return;
    window.location.href = `/lecture/${livreId}`;
  };

  // ─── Upload avatar ────────────────────────────────────────────────────────
  const handleAvatar = async (file: File): Promise<void> => {
    if (!user) return;
    try {
      const updatedUser = await apiUpdateAvatar(user.id, file);
      setUser(updatedUser);
    } catch (error) {
      console.error("Erreur upload avatar :", error);
    }
  };

  const stats = computeStats(historique);

  return {
    user,
    historique,
    livres,
    loading,
    isDemo,
    stats,
    handleResume,
    handleAvatar,   // ← exposé
  };
}