// src/Admin/ComposantLivre/PanneauGauche/utils/index.ts

/* =========================================================
   UTILITAIRES — PANNEAU GAUCHE
   ========================================================= */

/**
 * Formater un pourcentage
 */
export const formaterPourcentage = (valeur: number): string => {
  return `${Math.round(valeur)}%`;
};

/**
 * Limiter un texte
 */
export const limiterTexte = (
  texte: string,
  longueur: number = 120,
): string => {
  if (!texte) return "";

  return texte.length > longueur
    ? `${texte.slice(0, longueur)}...`
    : texte;
};

/**
 * Vérifie si une valeur est un tableau
 */
export const estTableau = <T,>(valeur: unknown): valeur is T[] =>  {
  return Array.isArray(valeur);
};

/**
 * Construire URL image couverture
 */
export const construireUrlCouverture = (
  apiUrl: string,
  cover?: string,
): string => {
  if (!cover) {
    return "https://via.placeholder.com/300x450?text=Livre";
  }

  const chemin = cover
    .replace(/^\/?uploads\/?/i, "")
    .replace(/\\/g, "/");

  return `${apiUrl}/uploads/${chemin}`;
};

/**
 * Construire URL PDF
 */
export const construireUrlPdf = (
  apiUrl: string,
  fichierPdf?: string,
): string | null => {
  if (!fichierPdf) return null;

  const chemin = fichierPdf
    .replace(/^\/?uploads\/?/i, "")
    .replace(/\\/g, "/");

  return `${apiUrl}/uploads/${chemin}`;
};

/**
 * Construire URL audio
 */
export const construireUrlAudio = (
  apiUrl: string,
  fichierAudio?: string,
): string | null => {
  if (!fichierAudio) return null;

  const chemin = fichierAudio
    .replace(/^\/?uploads\/?/i, "")
    .replace(/\\/g, "/");

  return `${apiUrl}/uploads/${chemin}`;
};

/**
 * Calcul progression
 */
export const calculerProgression = (
  actuel: number,
  total: number,
): number => {
  if (total <= 0) return 0;

  return Math.min(
    100,
    Math.max(0, Math.round((actuel / total) * 100)),
  );
};

/**
 * Obtenir initials utilisateur
 */
export const obtenirInitiales = (nom?: string): string => {
  if (!nom) return "U";

  return nom
    .split(" ")
    .map((mot) => mot.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

/**
 * Générer avatar fallback
 */
export const genererAvatar = (nom?: string): string => {
  const texte = encodeURIComponent(nom || "Utilisateur");

  return `https://ui-avatars.com/api/?name=${texte}&background=4f46e5&color=ffffff`;
};

/**
 * Formatter date historique
 */
export const formaterDate = (date: string): string => {
  try {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
};

/**
 * Temps audio format mm:ss
 */
export const formaterTemps = (secondes: number): string => {
  if (!secondes || Number.isNaN(secondes)) {
    return "00:00";
  }

  const minutes = Math.floor(secondes / 60);
  const secs = Math.floor(secondes % 60);

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
