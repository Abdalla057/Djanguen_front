import React, { useState } from "react";
import type { Livre } from "../type/index";

interface SectionLivresProps {
  livres: Livre[];
  onResume?: (livreId: number) => void;
  filtreActif?: string;
}

function CarteLivre({
  livre,
  onResume,
}: {
  livre: Livre;
  onResume?: (id: number) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onResume?.(livre.id)}
    >
      {/* Couverture */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

        {livre.cover && !imgError ? (
          <img
            src={livre.cover}
            alt={livre.titre}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0C3B2E] to-[#145C49] flex flex-col items-center justify-center px-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="#FFBA00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <p className="text-white text-xs text-center mt-3 line-clamp-3">
              {livre.titre}
            </p>
          </div>
        )}

        {livre.estNouveau && (
          <span className="absolute top-3 left-3 bg-[#FFBA00] text-[#0C3B2E] text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
            Nouveau
          </span>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12 rounded-full bg-[#FFBA00] flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0C3B2E">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>

      {/* Informations */}
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-[#0C3B2E] line-clamp-2">
          {livre.titre}
        </h3>
        <p className="text-xs text-slate-500 truncate mt-1">
          {livre.auteur}
        </p>
        {(livre.categorie ?? livre.tag) && (
          <span className="inline-flex items-center mt-2 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FFBA00]/40 text-[#0C3B2E]">
            {livre.categorie ?? livre.tag}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SectionLivres({
  livres,
  onResume,
  filtreActif = "Tous",
}: SectionLivresProps) {
  const livresFiltres =
    filtreActif === "Tous"
      ? livres
      : livres.filter(
          (livre) =>
            livre.categorie === filtreActif ||
            livre.tag === filtreActif
        );

  if (!livres.length) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm py-16 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0C3B2E]/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C3B2E" strokeWidth="1.5">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <h3 className="mt-4 text-[#0C3B2E] font-semibold">Aucun livre disponible</h3>
        <p className="text-sm text-slate-500 mt-1">La bibliothèque est vide pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xl">

      {/* Contenu */}
      {livresFiltres.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          Aucun livre dans cette catégorie.
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {livresFiltres.map((livre) => (
              <CarteLivre key={livre.id} livre={livre} onResume={onResume} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}