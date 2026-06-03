/* eslint-disable react-refresh/only-export-components */

export const API_URL = import.meta.env.VITE_API_URL as string;


export const SF =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif";



export const APPLE = {
  indigo: "#5E5CE6", // systemIndigo
  green:  "#30D158", // systemGreen
  red:    "#FF453A", // systemRed
  amber:  "#FF9F0A", // <systemOrange></systemOrange>
  
} as const;

// ─── Dark mode detection ───────────────────────────────────────────────────────
export const isDarkMode = (): boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// ─── Tooltip defaults ─────────────────────────────────────────────────────────
export const tooltipDefaults = (dark: boolean) => ({
  backgroundColor: dark ? "#2c2c2e" : "#ffffff",
  titleColor:      dark ? "#ffffff" : "#000000",
  bodyColor:       dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
  borderColor:     dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.08)",
  borderWidth:     1,
  cornerRadius:    12,
  padding:         10,
});

