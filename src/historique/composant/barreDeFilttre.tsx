import React from "react";
import type { FilterType } from "../type/historique.types";

interface FilterBarProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  search: string;
  setSearch: (s: string) => void;
}

const FILTERS: FilterType[] = ["Tous", "En cours"];

export function FilterBar({ filter, setFilter, search, setSearch }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-5">
      {/* Recherche */}
      <div className="relative flex-1 min-w-[200px]">
        <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          placeholder="Rechercher un livre…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition"
        />
      </div>

      {/* Filtres */}
      <div className="flex gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition
              ${filter === f
                ? "bg-gray-100 border-gray-300 text-gray-800 font-medium"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
