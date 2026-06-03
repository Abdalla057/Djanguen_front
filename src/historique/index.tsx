import { useState } from "react";
import { useUser } from "../ComposantSite/userContext"; // ← adapte
import { useHistorique } from "./logique/useHistorique";
import { StatsBar }            from "./composant/barreEtats";
import { FilterBar }           from "./composant/barreDeFilttre";
import { HistoriqueCard }      from "./composant/carteHistorique";
import { SaveProgressionForm } from "./composant/sauvegardeProgression";
import { Toast, EmptyState }   from "./composant/historiqueUI";
import type { FilterType, RepriseInfo } from "./type/historique.types";
import React from "react";

function HistoriqueContent({ userId }: { userId: number }) {
  const { historique, loading, toastMsg, deleteEntry, saveProgression, reprendre } =
    useHistorique(userId);

  const [showForm, setShowForm] = useState(false);
  const [filter,   setFilter]   = useState<FilterType>("Tous");
  const [search,   setSearch]   = useState("");

  const filtered = historique.filter((h) => {
    const matchFilter =
      filter === "Tous" ||
      (filter === "En cours" && h.dernierePage > 0);

    const matchSearch =
      !search ||
      h.livre?.titre?.toLowerCase().includes(search.toLowerCase()) ||
      h.livre?.auteur?.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="relative max-w-2xl mx-auto px-4 py-6 font-sans">
      <Toast toast={toastMsg} />

      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <i className="ti ti-history text-xl" aria-hidden="true" />
            Historique de lecture
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Retrouvez et reprenez vos lectures</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition"
        >
          <i className={`ti ${showForm ? "ti-x" : "ti-plus"} text-sm`} aria-hidden="true" />
          {showForm ? "Annuler" : "Sauvegarder"}
        </button>
      </div>

      <StatsBar historique={historique} />

      {showForm && (
        <SaveProgressionForm
          userId={userId}
          onSave={saveProgression}
          onClose={() => setShowForm(false)}
        />
      )}

      <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <i className="ti ti-loader-2 text-4xl animate-spin mb-2 opacity-40" aria-hidden="true" />
          <p className="text-sm">Chargement…</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <HistoriqueCard
              key={item.id}
              item={item}
              onDelete={deleteEntry}
              onReprendre={reprendre as (livreId: number) => Promise<RepriseInfo | undefined>}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HistoriqueApp() {
  const { profile } = useUser();

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <i className="ti ti-alert-circle text-4xl mb-2 opacity-40" aria-hidden="true" />
        <p className="text-sm">Vous devez être connecté.</p>
      </div>
    );
  }

  return <HistoriqueContent userId={Number(profile.id)} />;
}