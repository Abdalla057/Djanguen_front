import React from "react";
import type { Historique } from "../type/historique.types";

interface StatsBarProps {
  historique: Historique[];
}

export function StatsBar({ historique }: StatsBarProps) {
  const total    = historique.length;
  const termines = historique.filter((h) => h.dernierePage >= h.totalpages).length;
  const enCours  = total - termines;
  const pages    = historique.reduce((acc, h) => acc + h.dernierePage, 0);

  const stats = [
    { label: "Livres suivis", value: total,    icon: "ti-books"     },
    { label: "En cours",      value: enCours,  icon: "ti-book-2"    },
    { label: "Terminés",      value: termines, icon: "ti-check"     },
    { label: "Pages lues",    value: pages,    icon: "ti-file-text" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map(({ label, value, icon }) => (
        <div key={label} className="bg-[#6D9773] border border-[#acadad] rounded-xl px-4 py-3">
          <p className="flex items-center gap-1.5 text-bold text-white mb-1">
            <i className={`ti ${icon} text-sm`} aria-hidden="true" />
            {label}
          </p>
          <p className="text-2xl font-medium text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}
