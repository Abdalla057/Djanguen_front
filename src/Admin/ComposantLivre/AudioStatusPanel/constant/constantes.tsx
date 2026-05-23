export const URL_API = import.meta.env.VITE_API_URL as string;

export const COULEURS_STATUT = {
  couvert:     "#4ade80",
  nonCouvert:  "#f87171",
  bleu:        "#60a5fa",
  discret:     "#475569",
  tresDiscret: "#334155",
  texte:       "#e2e8f0",
  fond:        "#0d1423",
} as const;

export const FONDS_STATUT = {
  couvert:    "rgba(34,197,94,0.08)",
  nonCouvert: "rgba(239,68,68,0.06)",
  bleu:       "rgba(59,130,246,0.08)",
} as const;

export const BORDURES_STATUT = {
  couvert:    "rgba(34,197,94,0.2)",
  nonCouvert: "rgba(239,68,68,0.15)",
  bleu:       "rgba(59,130,246,0.2)",
} as const;