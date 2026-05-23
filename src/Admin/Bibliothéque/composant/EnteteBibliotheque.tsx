import React from "react";
import { BookOpen, Sparkles, TrendingUp, Search, Filter, X } from "lucide-react";
import { COULEURS } from "../constant/couleur";
import { CarteStatistique, PuceFiltre, BasculeurVue } from "./ComposantUI";
import type { ModeAffichage } from "../types/BibliothequeType";

interface EnteteBibliothequeProps {
  totalLivres:          number;
  totalCategories:      number;
  recherche:            string;
  onRecherche:          (v: string) => void;
  categories:           string[];
  categorieActive:      string | null;
  onBasculerCategorie:  (c: string) => void;
  onReinitCategorie:    () => void;
  modeAffichage:        ModeAffichage;
  onChangerMode:        (m: ModeAffichage) => void;
  totalResultats:       number;
}

const EnteteBibliotheque = ({
  totalLivres,
  totalCategories,
  recherche,
  onRecherche,
  categories,
  categorieActive,
  onBasculerCategorie,
  onReinitCategorie,
  modeAffichage,
  onChangerMode,
  totalResultats,
}: EnteteBibliothequeProps) => {
  return (
    <>
      {/* ════ HEADER ════ */}
      <header className="mb-10 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
          {/* Titre */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${COULEURS.accent}, ${COULEURS.accentSombre})`,
                  boxShadow: `0 8px 24px ${COULEURS.accentLueur}`,
                }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ color: COULEURS.texte }}
              >
                Bibliothèque
              </h1>
            </div>
            <p
              className="text-sm sm:text-base font-semibold flex items-center gap-2"
              style={{ color: COULEURS.texteAttenue }}
            >
              <Sparkles className="w-4 h-4" style={{ color: COULEURS.accentClair }} />
              Découvrez notre collection d'ouvrages
            </p>
          </div>

          {/* Statistiques */}
          <div className="flex gap-3 shrink-0">
            <CarteStatistique
              icone={<BookOpen className="w-4 h-4" />}
              etiquette="Total"
              valeur={totalLivres}
            />
            <CarteStatistique
              icone={<TrendingUp className="w-4 h-4" />}
              etiquette="Catégories"
              valeur={totalCategories}
            />
          </div>
        </div>

        <div
          className="h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${COULEURS.bordure}, transparent)`,
          }}
        />
      </header>

      {/* ════ RECHERCHE & FILTRES ════ */}
      <div className="mb-10 space-y-5 fade-in" style={{ animationDelay: "0.1s" }}>

        {/* Barre de recherche */}
        <div className="relative max-w-2xl group">
          <div
            className="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(59,130,246,0.1)" }}
          />
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: COULEURS.accent }}
            />
            <input
              type="text"
              placeholder="Rechercher un titre, auteur ou catégorie..."
              value={recherche}
              onChange={(e) => onRecherche(e.target.value)}
              className="w-full pl-14 pr-12 py-4 text-sm font-semibold outline-none rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: COULEURS.texte,
              }}
              onFocus={(e) => {
                e.currentTarget.style.border     = `1px solid ${COULEURS.bordureSurvol}`;
                e.currentTarget.style.background = "rgba(59,130,246,0.04)";
                e.currentTarget.style.boxShadow  = "0 0 0 3px rgba(59,130,246,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border     = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.boxShadow  = "none";
              }}
            />
            {recherche && (
              <button
                onClick={() => onRecherche("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: COULEURS.texteDiscret }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = COULEURS.accentClair; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = COULEURS.texteDiscret; }}
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filtres catégories + toggle vue */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: COULEURS.texteDiscret }}
          >
            <Filter className="w-4 h-4" />
            <span>Filtres :</span>
          </div>

          <PuceFiltre
            etiquette="Tout"
            actif={categorieActive === null}
            onClick={onReinitCategorie}
          />

          {categories.map((cat) => (
            <PuceFiltre
              key={cat}
              etiquette={cat}
              actif={categorieActive === cat}
              onClick={() => onBasculerCategorie(cat)}
            />
          ))}

          <BasculeurVue mode={modeAffichage} onChange={onChangerMode} />
        </div>

        {/* Compteur de résultats */}
        {recherche && (
          <p className="text-sm font-bold" style={{ color: COULEURS.texteDiscret }}>
            <span style={{ color: COULEURS.accentClair }}>{totalResultats}</span>{" "}
            résultat{totalResultats !== 1 ? "s" : ""} pour "
            <span style={{ color: COULEURS.accentClair }}>{recherche}</span>"
          </p>
        )}
      </div>
    </>
  );
};

export default EnteteBibliotheque;