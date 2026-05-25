import React from "react";
import { ChevronLeft, ChevronRight, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Livre3D from "./livre3D";
import type { Livre } from "../type/listeLivreType";

interface CarrouselLivresProps {
  livresVisibles: { livre: Livre; position: number; idx: number }[];
  livreCourant:   Livre | null;
  indexActuel:    number;
  totalLivres:    number;
  allerVers:      (idx: number) => void;
  allerPrecedent: () => void;
  allerSuivant:   () => void;
  livresFiltres:  Livre[];
}

const CarrouselLivres = ({
  livresVisibles,
  livreCourant,
  indexActuel,
  totalLivres,
  allerVers,
  allerPrecedent,
  allerSuivant,
  livresFiltres,
}: CarrouselLivresProps) => {
  const naviguer = useNavigate();

  return (
    <>
      {/* ── Scène 3D ── */}
      <div
        className="relative bg-slate-800/40 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-700/30 overflow-hidden"
        style={{ minHeight: 420 }}
      >
        {/* Fond dégradé bas */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(99,102,241,0.06) 0%, transparent 100%)" }}
        />
        <div className="absolute bottom-20 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        {/* Livres */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 380, perspective: "1400px", perspectiveOrigin: "50% 45%" }}
        >
          {livresVisibles.map(({ livre, position, idx }) => (
            <Livre3D
              key={livre.id}
              livre={livre}
              estActif={position === 0}
              position={position}
              onClick={() => allerVers(idx)}
            />
          ))}
        </div>

        {/* Bouton précédent */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={allerPrecedent}
            disabled={indexActuel === 0}
            className={`w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur border border-slate-600/50 flex items-center justify-center transition-all duration-200 ${
              indexActuel === 0
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-indigo-600/40 hover:border-indigo-500/50 hover:scale-110"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Bouton suivant */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={allerSuivant}
            disabled={indexActuel >= totalLivres - 1}
            className={`w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur border border-slate-600/50 flex items-center justify-center transition-all duration-200 ${
              indexActuel >= totalLivres - 1
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-indigo-600/40 hover:border-indigo-500/50 hover:scale-110"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Infos livre courant */}
        {livreCourant && (
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1 px-6">
            <p className="text-white font-bold text-sm text-center truncate max-w-xs">
              {livreCourant.titre}
            </p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <User className="w-3 h-3" />{livreCourant.auteur}
            </p>
          </div>
        )}

        {/* Bouton Voir */}
        {livreCourant && (
          <button
            onClick={() => naviguer(`/livre/${livreCourant.id}/pages`)}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform z-20"
          >
            <Eye className="w-3.5 h-3.5" />Voir
          </button>
        )}
      </div>

      {/* ── Indicateurs de pagination ── */}
      <div className="flex justify-center gap-1.5 mt-4">
        {livresFiltres.map((_, idx) => (
          <button
            key={idx}
            onClick={() => allerVers(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === indexActuel ? "w-8 bg-indigo-400" : "w-1.5 bg-slate-600 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>

      <p className="text-center text-xs text-slate-500 mt-2">
        {indexActuel + 1} / {totalLivres} — cliquez sur un livre pour le sélectionner
      </p>
    </>
  );
};

export default CarrouselLivres;