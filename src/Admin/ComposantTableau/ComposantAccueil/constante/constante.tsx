/* =========================================================
   CONSTANTES — PANNEAU DROITE
   ========================================================= */

export const API_URL = import.meta.env.VITE_API_URL as string;

/* Audio */
export const DEFAULT_VOLUME = 80;
export const VOLUME_MIN = 0;
export const VOLUME_MAX = 100;

/* Navigation livres */
export const STEP_PREV = -1;
export const STEP_NEXT = 1;

/* Limites */
export const LIMITE_LIVRES = 50;
export const LIMITE_UTILISATEURS = 100;

/* Progression audio */
export const PROGRESS_START = 0;
export const PROGRESS_MAX = 100;

/* Historique */
export const DEFAULT_STATS = {
  completed: 0,
  goal: 0,
  percentage: 0,
};