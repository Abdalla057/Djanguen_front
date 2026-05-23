import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// logique
import { useChargementLivres } from "./logique/useChargementLivre";
import { useFiltrageLivres }   from "./logique/useFiltrageLivre";

// Composants
import EnteteBibliotheque                        from "./composant/EnteteBibliotheque";
import CarteLivre                                from "./composant/CarteLivre";
import { EtatChargement, EtatErreur, EtatVide, TitreCategorie } from "./composant/ComposantEtat";

// Constantes
import { COULEURS } from "./constant/couleur";
import type { ModeAffichage } from "./types/BibliothequeType";

/* ================================================================
   ORCHESTRATEUR — Bibliothèque
   Responsabilité : assembler les hooks et distribuer les données
   aux composants enfants.
   ================================================================ */
const Bibliotheque: React.FC = () => {
  const naviguer = useNavigate();

  const [modeAffichage, setModeAffichage] = useState<ModeAffichage>("grille");

  // ── Données ───────────────────────────────────────────
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

  // ── Navigation ────────────────────────────────────────
  const naviguerVersLivre = useCallback(
    (id: number) => naviguer(`/livre/${id}/pages`),
    [naviguer]
  );

  // ── États de page ─────────────────────────────────────
  if (chargement) return <EtatChargement />;
  if (erreur)     return <EtatErreur message={erreur} />;

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      style={{
        background: `linear-gradient(160deg, ${COULEURS.fond} 0%, #0d1520 50%, ${COULEURS.fond} 100%)`,
      }}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes apparitionBas {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes decalageApparition {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-in   { animation: apparitionBas      0.4s  ease forwards; }
        .decalage  { animation: decalageApparition 0.35s ease forwards; opacity: 0; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* ════ EN-TÊTE + RECHERCHE + FILTRES ════ */}
        <EnteteBibliotheque
          totalLivres={livres.length}
          totalCategories={categories.length}
          recherche={recherche}
          onRecherche={setRecherche}
          categories={categories}
          categorieActive={categorieActive}
          onBasculerCategorie={basculerCategorie}
          onReinitCategorie={reinitialiserCategorie}
          modeAffichage={modeAffichage}
          onChangerMode={setModeAffichage}
          totalResultats={totalLivres}
        />

        {/* ════ CATALOGUE ════ */}
        {Object.keys(livresParCategorie).length === 0 ? (
          <EtatVide />
        ) : (
          Object.entries(livresParCategorie).map(([categorie, livresCategorie]) => (
            <section key={categorie} className="mb-16 fade-in">
              <TitreCategorie nom={categorie} nombre={livresCategorie.length} />

              <div
                className={`grid gap-4 sm:gap-6 ${
                  modeAffichage === "grille"
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
                }`}
              >
                {livresCategorie.map((livre, idx) => (
                  <div
                    key={livre.id}
                    className="decalage"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <CarteLivre
                      livre={livre}
                      modeAffichage={modeAffichage}
                      onNaviguer={naviguerVersLivre}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Bibliotheque;