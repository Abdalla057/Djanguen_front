import React from "react";
import type { Livre, ModeAffichage } from "../types/BibliothequeType";
import CarteLivre from "../composant/carteLivre";

interface Props {
  categorie:     string;
  livres:        Livre[];
  modeAffichage: ModeAffichage;
  onNaviguer:    (id: number) => void;
}

const SectionCategorie: React.FC<Props> = ({ categorie, livres, modeAffichage, onNaviguer }) => (
  <section className="mb-16 fade-in">

    {/* Titre catégorie */}
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest text-[#3b1f0e]">
        {categorie}
      </h2>
      <span className="text-xs text-[#c4895e] font-medium">
        {livres.length} livre{livres.length !== 1 ? "s" : ""}
      </span>
      <div className="flex-1 h-px bg-[#f0cbb0]" />
    </div>

    {/* Grille de livres */}
    <div
      className={`grid gap-4 sm:gap-6 ${
        modeAffichage === "grille"
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
      }`}
    >
      {livres.map((livre, idx) => (
        <div
          key={livre.id}
          className="decalage"
          style={{ animationDelay: `${idx * 0.04}s` }}
        >
          <CarteLivre
            livre={livre}
            modeAffichage={modeAffichage}
            onNaviguer={onNaviguer}
          />
        </div>
      ))}
    </div>
  </section>
);

export default SectionCategorie;