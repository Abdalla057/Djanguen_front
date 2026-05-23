/* ================================================================
   composant/SectionUtilisateurs.tsx
================================================================ */

import React, { useRef, useState } from "react";

import {
  Users,
  Trash2,
  Pencil,
  Eye,
  BookOpen,
  ChevronUp,
} from "lucide-react";

import type { User } from "../type/PanneauDroit.Type";

interface Props {
  utilisateurs: User[];
  onVoir: (id: number) => void;
  onModifier: (id: number) => void;
  onSupprimer: (id: number) => void;
}

/* ================================================================
   COULEURS
================================================================ */

const PALETTES = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-pink-100 text-pink-700",
  "bg-amber-100 text-amber-700",
] as const;

/* ================================================================
   INITIALS
================================================================ */

const obtenirInitiales = (nom: string) =>
  nom
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

/* ================================================================
   COMPONENT
================================================================ */

const SectionUtilisateurs = ({
  utilisateurs,
  onVoir,
  onModifier,
  onSupprimer,
}: Props) => {
  const [ouvert, setOuvert] = useState(true);

  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white rounded-[22px] border border-slate-200 overflow-hidden">

      {/* ================================================================
          HEADER
      ================================================================ */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-slate-500" />
          </div>

          <div>

            <h2 className="text-[15px] font-semibold text-slate-800">
              Utilisateurs
            </h2>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Liste des utilisateurs inscrits
            </p>

          </div>

        </div>

        <button
          onClick={() => setOuvert((prev) => !prev)}
          className="
            flex items-center gap-1.5
            text-[13px]
            font-medium
            text-violet-600
            hover:text-violet-700
            hover:bg-violet-50
            px-3 py-1.5
            rounded-xl
            transition
          "
        >
          Voir tout

          <ChevronUp
            className={`
              w-4 h-4 transition-transform duration-300
              ${ouvert ? "rotate-0" : "rotate-180"}
            `}
          />
        </button>

      </div>

      {/* ================================================================
          COLONNES
      ================================================================ */}

      <div className="grid grid-cols-[2fr_2fr_90px_100px] gap-2 px-6 py-3 bg-slate-50 border-b border-slate-100">

        {["Nom", "Email", "Livres lus", "Actions"].map((col) => (
          <span
            key={col}
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-400
              last:text-center
              [&:nth-child(3)]:text-center
            "
          >
            {col}
          </span>
        ))}

      </div>

      {/* ================================================================
          ROWS
      ================================================================ */}

      <div
        ref={bodyRef}
        className="
          overflow-hidden
          transition-all
          duration-300
        "
        style={{
          maxHeight: ouvert
            ? `${bodyRef.current?.scrollHeight ?? 1000}px`
            : "0px",

          opacity: ouvert ? 1 : 0,
        }}
      >

        <div className="px-3 py-2">

          {utilisateurs.map((user, idx) => (

            <div
              key={user.id}
              className="
                relative
                grid grid-cols-[2fr_2fr_90px_100px]
                gap-2
                items-center

                px-4 py-4

                rounded-2xl
                border border-slate-200

                bg-white/90
                backdrop-blur-sm

                hover:bg-slate-50
                hover:border-slate-300
                hover:shadow-md

                transition-all duration-200

                -mt-3 first:mt-0
              "
              style={{
                zIndex: utilisateurs.length - idx,
              }}
            >

              {/* ================================================================
                  NOM
              ================================================================ */}

              <div className="flex items-center gap-3 min-w-0">

                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.nom}
                    className="
                      w-10 h-10
                      rounded-2xl
                      object-cover
                      flex-shrink-0
                    "
                  />
                ) : (
                  <div
                    className={`
                      w-10 h-10
                      rounded-2xl
                      flex items-center justify-center
                      text-[12px]
                      font-bold
                      flex-shrink-0
                      ${PALETTES[idx % PALETTES.length]}
                    `}
                  >
                    {obtenirInitiales(user.nom)}
                  </div>
                )}

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {user.nom}
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <span
                      className={`
                        text-[10px]
                        px-2 py-0.5
                        rounded-full
                        font-medium

                        ${
                          user.statut === "ACTIF"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {user.statut}
                    </span>

                  </div>

                </div>

              </div>

              {/* ================================================================
                  EMAIL
              ================================================================ */}

              <p
                title={user.email}
                className="
                  text-[13px]
                  text-slate-500
                  truncate
                "
              >
                {user.email}
              </p>

              {/* ================================================================
                  LIVRES
              ================================================================ */}

              <div className="flex justify-center">

                <span
                  className="
                    inline-flex items-center gap-1.5

                    px-2.5 py-1

                    rounded-full

                    bg-violet-50
                    border border-violet-100

                    text-[12px]
                    font-semibold
                    text-violet-700
                  "
                >

                  <BookOpen className="w-3.5 h-3.5" />

                  {user.livresLus ?? 0}

                </span>

              </div>

              {/* ================================================================
                  ACTIONS
              ================================================================ */}

              <div className="flex items-center justify-center gap-1.5">

                {/* VOIR */}
                <button
                  onClick={() => onVoir(user.id)}
                  className="
                    w-8 h-8
                    rounded-xl

                    border border-slate-200
                    bg-white

                    hover:bg-blue-50
                    hover:border-blue-200

                    flex items-center justify-center

                    transition
                    group
                  "
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>

                {/* MODIFIER */}
                <button
                  onClick={() => onModifier(user.id)}
                  className="
                    w-8 h-8
                    rounded-xl

                    border border-slate-200
                    bg-white

                    hover:bg-amber-50
                    hover:border-amber-200

                    flex items-center justify-center

                    transition
                    group
                  "
                >
                  <Pencil className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                </button>

                {/* SUPPRIMER */}
                <button
                  onClick={() => onSupprimer(user.id)}
                  className="
                    w-8 h-8
                    rounded-xl

                    border border-slate-200
                    bg-white

                    hover:bg-red-50
                    hover:border-red-200

                    flex items-center justify-center

                    transition
                    group
                  "
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500" />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default SectionUtilisateurs;