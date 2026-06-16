import type { Palette } from "../type";

// ─────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────

export const API_URL = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────────────────────────
// PALETTES PAR LIVRE
// ─────────────────────────────────────────────────────────────

export const PALETTES: Palette[] = [
  {
    bg: "#E8F3DC",
    icon: "",
    iconColor: "#639922",
    barColor: "#639922",
  },
  {
    bg: "#E6F1FB",
    icon: "",
    iconColor: "#185FA5",
    barColor: "#185FA5",
  },
  {
    bg: "#FEF3E2",
    icon: "",
    iconColor: "#D94F2B",
    barColor: "#D94F2B",
  },
  {
    bg: "#EEF0FE",
    icon: "",
    iconColor: "#7F77DD",
    barColor: "#7F77DD",
  },
  {
    bg: "#F0EAE0",
    icon: "🔭",
    iconColor: "#9B9389",
    barColor: "#9B9389",
  },
];


// ─────────────────────────────────────────────────────────────
// CATÉGORIES
// ─────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────
// JOURS DE LA SEMAINE
// ─────────────────────────────────────────────────────────────

export const DAYS_SHORT = [
  "Dim",
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
];

// ─────────────────────────────────────────────────────────────
// STYLES PARTAGÉS
// ─────────────────────────────────────────────────────────────

export const STYLES = {
  progressBg: {
    height: 4,
    background: "#F0EAE0",
    borderRadius: 99,
    overflow: "hidden" as const,
  },

  progressFill: {
    height: "100%",
    borderRadius: 99,
  },

  sectionHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1A1612",
  },

  viewAll: {
    fontSize: 12,
    color: "#D94F2B",
    cursor: "pointer",
  },

  bookCard: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden" as const,
  },

  bookThumb: {
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
  },

  thumbTag: {
    position: "absolute" as const,
    top: 10,
    left: 10,
    background: "rgba(255,255,255,0.88)",
    borderRadius: 99,
    padding: "3px 10px",
    fontSize: 11,
    color: "#5A5349",
  },

  thumbStart: {
    position: "absolute" as const,
    top: 10,
    right: 10,
    fontSize: 10,
    color: "#9B9389",
  },

  startBtn: {
    fontSize: 12,
    fontWeight: 500,
    padding: "6px 14px",
    background: "#1A1612",
    color: "#fff",
    border: "none",
    borderRadius: 99,
    cursor: "pointer",
  },

  progItem: {
    background: "#fff",
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  progIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  progBtn: {
    fontSize: 12,
    padding: "5px 12px",
    border: "1px solid #E0DAD0",
    borderRadius: 99,
    background: "#fff",
    color: "#1A1612",
    cursor: "pointer",
  },

  miniCard: {
    background: "#F5F1EA",
    borderRadius: 12,
    padding: 12,
  },

  chartTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#FFF3E0",
    borderRadius: 99,
    padding: "3px 10px",
    fontSize: 11,
    color: "#D94F2B",
  },

  donutCenter: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
  },
};