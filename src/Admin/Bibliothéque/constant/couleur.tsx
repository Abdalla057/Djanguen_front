/* eslint-disable react-refresh/only-export-components */
export const URL_API = import.meta.env.VITE_API_URL as string;

export const COULEURS = {
  accent:       "#3b82f6",
  accentClair:  "#60a5fa",
  accentSombre: "#1d4ed8",
  accentLueur:  "rgba(59,130,246,0.35)",
  fond:         "#0a0f1a",
  carte:        "#111827",
  bordure:      "rgba(59,130,246,0.15)",
  bordureSurvol:"rgba(59,130,246,0.4)",
  texte:        "#f1f5f9",
  texteAttenue: "#94a3b8",
  texteDiscret: "#475569",
} as const;

export default COULEURS;