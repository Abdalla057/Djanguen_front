export interface UserView {
  id: number;
  statut: "ACTIF" | "INACTIF";
  livresLus?: number;
}

export interface DonutSlice {
  label: string;
  value: number;
  pct: number;
  color: string;
}

export interface LegendItem {
  label: string;
  color: string;
  extra?: string;
}

export interface UseBarreStatistiqueProps {
  users: UserView[];
}

export interface UseBarreStatistiqueReturn {
  // Bar chart
  barLabels: string[];
  barValues: number[];
  barColors: string[];
  barLegend: LegendItem[];

  // Donut chart
  donutSlices: DonutSlice[];
  donutLegend: LegendItem[];

  // Stats
  usersCount: number;
}