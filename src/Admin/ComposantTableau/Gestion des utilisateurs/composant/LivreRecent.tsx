import type { Book } from "../type/GestionUtilisateurType";
import React from "react";

/* ================================================================
   PROPS
================================================================ */

interface Props {
  books?: Book[];
  loading: boolean;
}

/* ================================================================
   COMPONENT
================================================================ */

const LivreRecent = ({
  books = [],
  loading,
}: Props) => {

  const safeBooks = books ?? [];

  /* ================================================================
     LOADING
  ================================================================ */

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-xl shadow animate-pulse text-slate-400">
        Chargement des livres récents...
      </div>
    );
  }

  /* ================================================================
     EMPTY STATE
  ================================================================ */

  if (safeBooks.length === 0) {
    return (
      <div className="p-4 bg-white rounded-xl shadow text-gray-500 text-sm">
        Aucun livre récent
      </div>
    );
  }

  /* ================================================================
     UI
  ================================================================ */

  return (
    <div className="p-4 bg-white rounded-xl shadow">

      {/* HEADER */}
      <h2 className="font-bold text-lg mb-4">
        📚 Livres récents
      </h2>

      {/* LISTE */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto">

        {safeBooks.map((book) => (
          <div
            key={book.id}
            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
          >

            {/* COVER */}
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.titre}
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded" />
            )}

            {/* INFOS */}
            <div className="flex-1">

              <p className="font-semibold text-sm">
                {book.titre ?? "Sans titre"}
              </p>

              <p className="text-xs text-gray-500">
                {book.auteur ?? "Auteur inconnu"}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default LivreRecent;