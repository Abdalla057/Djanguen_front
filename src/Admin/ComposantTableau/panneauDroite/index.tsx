import {
  BookOpen,
  ChevronRight,
} from "lucide-react";

import UsersList from "./composant/SectionUtilisateurs";
import BlocStatistique from "./composant/BlocStatistique";
import SectionBienvenue from "./composant/SectionBienvenue";
import CarteLivre from "./composant/CarteLivre";

import { usePanneauDroit } from "./logique/usePanneauDroit";
import React from "react";

const PanneauDroit = () => {

  const {

    allUsers,
    books,

    handleSelectBook,

  } = usePanneauDroit();

  return (

    <div className="space-y-7">

      {/* ======================================================
          SECTION BIENVENUE
      ====================================================== */}
      <SectionBienvenue />

      {/* ======================================================
          STATISTIQUES
      ====================================================== */}
      <BlocStatistique />

      {/* ======================================================
          SECTION LIVRES
      ====================================================== */}
      <section
        className="
          bg-white/90
          backdrop-blur-xl
          rounded-[32px]
          border border-slate-100
          shadow-xl shadow-slate-100/60
          p-7
        "
      >

        {/* HEADER */}
        <div
          className="
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-7
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-indigo-50
                flex items-center justify-center
              "
            >
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >
                Livres disponibles
              </h2>

              <p
                className="
                  text-sm
                  text-slate-400
                  mt-1
                "
              >
                Découvrez les derniers livres ajoutés
              </p>

            </div>

          </div>

          {/* BTN */}
          <button
            className="
              flex items-center justify-center gap-2

              px-5 py-3
              rounded-2xl

              bg-indigo-50
              hover:bg-indigo-100

              text-indigo-600
              text-sm
              font-semibold

              transition-all duration-300
            "
          >
            Voir tout

            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* GRID LIVRES */}
        {books.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-2
              gap-5
            "
          >

            {books.map((book, index) => (

              <CarteLivre
                key={book.id}
                book={book}
                onClick={() =>
                  handleSelectBook(index)
                }
              />

            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div
            className="
              flex flex-col
              items-center justify-center
              text-center
              py-20
            "
          >

            <div
              className="
                w-20 h-20
                rounded-full
                bg-slate-100
                flex items-center justify-center
                mb-5
              "
            >
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>

            <h3
              className="
                text-lg
                font-bold
                text-slate-700
              "
            >
              Aucun livre trouvé
            </h3>

            <p
              className="
                text-sm
                text-slate-400
                mt-2
                max-w-sm
              "
            >
              Aucun livre disponible pour le moment.
            </p>

          </div>

        )}

      </section>

      {/* ======================================================
          UTILISATEURS
      ====================================================== */}
      <section
        className="
          bg-white/90
          backdrop-blur-xl
          rounded-[32px]
          border border-slate-100
          shadow-lg shadow-slate-100/40
          p-7
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            mb-6
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
              "
            >
              Tous les utilisateurs
            </h2>

            <p
              className="
                text-sm
                text-slate-400
                mt-1
              "
            >
              Liste complète des utilisateurs
            </p>

          </div>

          <button
            className="
              flex items-center gap-2

              text-sm
              font-semibold

              text-indigo-500
              hover:text-indigo-600

              transition-colors
            "
          >
            Voir tout

            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* LISTE */}
        <UsersList utilisateurs={allUsers} />

      </section>

    </div>

  );
};

export default PanneauDroit;