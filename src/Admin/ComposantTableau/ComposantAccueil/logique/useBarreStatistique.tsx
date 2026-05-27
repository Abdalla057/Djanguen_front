import { useMemo } from "react";

import { APPLE } from "../constante/constante";
import type {
  UseBarreStatistiqueProps,
  UseBarreStatistiqueReturn,
} from "../type/BarreStatistiqueType";

export const useBarreStatistique = ({
  users = [],
}: UseBarreStatistiqueProps): UseBarreStatistiqueReturn => {

  const stats = useMemo(() => {

    const safeUsers = Array.isArray(users) ? users : [];

    const usersCount = safeUsers.length;

    const actifCount = safeUsers.filter(
      (u) => u.statut?.toUpperCase() === "ACTIF"
    ).length;

    const inactifCount = usersCount - actifCount;

    return {
      usersCount,
      actifCount,
      inactifCount,
    };

  }, [users]);

  // 📊 BAR CHART (UNIQUEMENT DONNÉES RÉELLES USERS)
  const barLabels = ["Total", "Actifs", "Inactifs"];

  const barValues = [
    stats.usersCount,
    stats.actifCount,
    stats.inactifCount,
  ];

  const barColors = [
    APPLE.indigo,
    APPLE.green,
    APPLE.red,
  ];

  const barLegend = barLabels.map((label, i) => ({
    label,
    color: barColors[i],
    extra: String(barValues[i]),
  }));

  // 🍩 DONUT CHART
  const donutSlices = [
    {
      label: "Actifs",
      value: stats.actifCount,
      pct: stats.usersCount
        ? Math.round((stats.actifCount / stats.usersCount) * 100)
        : 0,
      color: APPLE.green,
    },
    {
      label: "Inactifs",
      value: stats.inactifCount,
      pct: stats.usersCount
        ? Math.round((stats.inactifCount / stats.usersCount) * 100)
        : 0,
      color: APPLE.red,
    },
  ];

  const donutLegend = donutSlices.map((s) => ({
    label: s.label,
    color: s.color,
    extra: `${s.pct}%`,
  }));

  return {
    barLabels,
    barValues,
    barColors,
    barLegend,

    donutSlices,
    donutLegend,

    usersCount: stats.usersCount,
  };
};