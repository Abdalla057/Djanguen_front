import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useChargementLivres } from "./logique/useChargementLivre";
import { useFiltrageLivres }   from "./logique/useFiltrageLivre";

import BarreRecherche  from "./composant/barreRecherche";
import SectionCategorie from "./composant/sectionCategorie";

import type { ModeAffichage } from "./types/BibliothequeType";

const IndexHistorique: React.FC = () => {
  const naviguer = useNavigate();

  const [modeAffichage, setModeAffichage] = useState<ModeAffichage>("grille");

  const { livres, chargement, erreur } = useChargementLivres();

  const {
    recherche,
    setRecherche,
    categorieActive,
    basculerCategorie,
    reinitialiserCategorie,
    livresParCategorie,
    categories,
    totalLivres,
  } = useFiltrageLivres(livres);

  const naviguerVersLivre = useCallback(
    (id: number) => naviguer(`/livre/${id}/pages`),
    [naviguer]
  );

  if (chargement) return (
    <div className="min-h-screen flex items-center justify-center bg-[#666462]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#f0cbb0] border-t-[#e8734a] animate-spin" />
        <p className="text-sm text-[#a0694a]">Chargement des livres...</p>
      </div>
    </div>
  );

  if (erreur) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf6f0] to-[#fde8d8]">
      <div className="bg-white/80 border border-red-200 rounded-2xl p-8 max-w-sm text-center">
        <p className="text-sm text-red-500 font-medium">{erreur}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2 rounded-xl bg-[#e8734a] text-white text-sm font-medium"
        >
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#fde8d8]">

      <div className="max-w-7xl mx-auto">

        {/* ════ EN-TÊTE ════ */}
        <div className="mb-10">

          {/* Titre + mode d'affichage */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#3b1f0e] tracking-tight">
                Ma Bibliothèque
              </h1>
              <p className="text-sm text-[#a0694a] mt-1">
                {livres.length} livre{livres.length !== 1 ? "s" : ""} · {categories.length} catégorie{categories.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/60 rounded-xl p-1 border border-[#f0cbb0]">
              {(["grille", "compacte"] as ModeAffichage[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setModeAffichage(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    modeAffichage === mode
                      ? "bg-[#e8734a] text-white shadow-sm"
                      : "text-[#a0694a] hover:bg-white/80"
                  }`}
                >
                  {mode === "grille" ? "⊞ Grille" : "⊟ Compacte"}
                </button>
              ))}
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="mb-5">
            <BarreRecherche valeur={recherche} onChange={setRecherche} />
            {recherche && (
              <p className="text-xs text-[#a0694a] mt-2">
                {totalLivres} résultat{totalLivres !== 1 ? "s" : ""} pour « {recherche} »
              </p>
            )}
          </div>

          {/* Filtres catégories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={reinitialiserCategorie}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  !categorieActive
                    ? "bg-[#3b1f0e] text-white border-[#3b1f0e]"
                    : "bg-white/60 text-[#a0694a] border-[#f0cbb0] hover:border-[#e8734a]"
                }`}
              >
                Tous
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => basculerCategorie(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    categorieActive === cat
                      ? "bg-[#e8734a] text-white border-[#e8734a]"
                      : "bg-white/60 text-[#a0694a] border-[#f0cbb0] hover:border-[#e8734a]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ════ CATALOGUE ════ */}
        {Object.keys(livresParCategorie).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-[#a0694a] font-medium">Aucun livre trouvé</p>
            <p className="text-[#c4895e] text-sm mt-1">Essayez un autre mot-clé ou catégorie</p>
          </div>
        ) : (
          Object.entries(livresParCategorie).map(([categorie, livresCategorie]) => (
            <SectionCategorie
              key={categorie}
              categorie={categorie}
              livres={livresCategorie}
              modeAffichage={modeAffichage}
              onNaviguer={naviguerVersLivre}
            />
          ))
        )}

      </div>
    </div>
  );
};

export default IndexHistorique;