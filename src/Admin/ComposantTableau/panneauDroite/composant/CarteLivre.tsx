import React from "react";
import { BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import type { Book } from "../type/PanneauDroit.Type.tsx";

interface Props {
  book: Book;
  active?: boolean;
  onClick?: () => void;
}

const CarteLivre = ({ book, active, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer
        rounded-xl p-3
        border
        transition-all duration-200 ease-out
        group

        ${
          active
            ? "bg-violet-700 border-violet-800"
            : "bg-white border-slate-200/80 hover:-translate-y-0.5 hover:border-slate-300"
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-2">

        <div
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            transition-colors duration-200
            ${active ? "bg-white/20" : "bg-violet-50 group-hover:bg-violet-100"}
          `}
        >
          <BookOpen
            className={`w-4 h-4 ${active ? "text-white" : "text-violet-600"}`}
          />
        </div>

        <span
          className={`
            inline-flex items-center gap-1 px-2 py-0.5 rounded-full
            text-[10px] font-medium
            ${
              active
                ? "bg-white/20 text-white"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }
          `}
        >
          <TrendingUp className="w-3 h-3" />
          Tendance
        </span>

      </div>

      {/* CONTENU */}
      <div className="space-y-0.5">
        <h3
          className={`
            text-sm font-medium line-clamp-1
            ${active ? "text-white" : "text-slate-800"}
          `}
        >
          {book.titre}
        </h3>

        <p
          className={`
            text-[11px]
            ${active ? "text-violet-200" : "text-slate-400"}
          `}
        >
          {book.auteur}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-3">

        <span
          className={`
            text-[10px] px-2 py-0.5 rounded-full
            ${active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}
          `}
        >
          {book.categorie || "Livre"}
        </span>

        <button
          className={`
            flex items-center gap-1 text-[11px] font-medium
            ${active ? "text-white" : "text-violet-600"}
          `}
        >
          Voir
          <ArrowRight className="w-3 h-3" />
        </button>

      </div>

      {/* ligne accent */}
      <div
        className={`
          absolute bottom-0 left-0 h-[2px]
          transition-all duration-300
          ${active ? "w-full bg-white/30" : "w-0 group-hover:w-full bg-violet-500"}
        `}
      />
    </div>
  );
};

export default CarteLivre;