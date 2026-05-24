import React, { useState } from "react";
import {
  Ban,
  Check,
  Trash2,
  ChevronDown,
  Users,
  X,
  AlertTriangle,
} from "lucide-react";

import type { UserView } from "../type/PanneauType";

interface Props {
  users: UserView[];
  onBloquer: (id: number) => void;
  onActiver: (id: number) => void;
  onSupprimer: (id: number) => void;
}

const COULEUR_AVATAR = [
  { bg: "bg-violet-100", text: "text-violet-800" },
  { bg: "bg-blue-100", text: "text-blue-800" },
  { bg: "bg-emerald-100", text: "text-emerald-800" },
  { bg: "bg-amber-100", text: "text-amber-800" },
  { bg: "bg-pink-100", text: "text-pink-800" },
] as const;

const obtenirInitiales = (nom: string) =>
  nom
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const TableauUtilisateurs = ({
  users,
  onBloquer,
  onActiver,
  onSupprimer,
}: Props) => {

  const [ouvert, setOuvert] = useState(true);

  /* ================================================= */
  /* MODALE SUPPRESSION */
  /* ================================================= */

  const [modalSuppression, setModalSuppression] = useState<{
    ouvert: boolean;
    id: number | null;
    nom: string;
  }>({
    ouvert: false,
    id: null,
    nom: "",
  });

  const ouvrirModalSuppression = (
    id: number,
    nom: string
  ) => {
    setModalSuppression({
      ouvert: true,
      id,
      nom,
    });
  };

  const fermerModalSuppression = () => {
    setModalSuppression({
      ouvert: false,
      id: null,
      nom: "",
    });
  };

  const confirmerSuppression = () => {

    if (modalSuppression.id !== null) {
      onSupprimer(modalSuppression.id);
    }

    fermerModalSuppression();
  };
  

  /* ================================================= */

  const actifCount =
    users.filter((u) => u.statut === "ACTIF").length;

  const inactifCount =
    users.length - actifCount;

  return (
    <>
      <div
        className="
          rounded-[24px]
          overflow-hidden
          border border-violet-200
          bg-gradient-to-br
          from-violet-50
          to-[#f5f4ff]
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          onClick={() => setOuvert((o) => !o)}
          className="
            flex items-center justify-between
            px-4 py-3.5
            cursor-pointer
            hover:bg-violet-500/5
            transition-colors
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-9 h-9
                rounded-xl
                bg-violet-700
                flex items-center justify-center
              "
            >
              <Users className="w-4 h-4 text-white" />
            </div>

            <div>
              <p className="text-[14px] font-semibold text-violet-900">
                Gestion des utilisateurs
              </p>

              <p className="text-[11px] text-violet-600 mt-0.5">
                Statut et actions rapides
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <span
              className="
                text-[11px]
                font-medium
                bg-violet-700
                text-white
                px-3 py-0.5
                rounded-full
              "
            >
              {users.length} utilisateurs
            </span>

            <ChevronDown
              className={`
                w-4 h-4 text-violet-600
                transition-transform duration-300
                ${ouvert ? "rotate-180" : "rotate-0"}
              `}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* BODY */}
        {/* ================================================= */}

        <div
          className={`
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${ouvert ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >

          <div className="h-px bg-violet-200/60 mx-4" />

          {/* ================================================= */}
          {/* TABLE */}
          {/* ================================================= */}

          <div
            className="
              m-3
              rounded-2xl
              overflow-hidden
              border border-violet-400
              bg-gradient-to-br
              from-violet-600
              via-indigo-600
              to-purple-700
            "
          >

            <table className="w-full">

              <thead>

                <tr className="bg-violet-50 border-b border-violet-100">

                  <th className="text-left text-[11px] font-bold text-violet-700 px-4 py-2.5">
                    Utilisateur
                  </th>

                  <th className="text-left text-[11px] font-bold text-violet-700 px-4 py-2.5">
                    Email
                  </th>

                  <th className="text-left text-[11px] font-bold text-violet-700 px-4 py-2.5">
                    Statut
                  </th>

                  <th className="text-left text-[11px] font-bold text-violet-700 px-4 py-2.5">
                    Livres lus
                  </th>

                  <th className="text-left text-[11px] font-bold text-violet-700 px-4 py-2.5">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((user, idx) => {

                  const actif =
                    user.statut === "ACTIF";

                  const couleur =
                    COULEUR_AVATAR[
                      idx % COULEUR_AVATAR.length
                    ];

                  const nom =
                    user.nom || "Utilisateur";

                  return (
                    <tr
                      key={user.id}
                      className="
                        border-b border-violet-50
                        last:border-none
                        hover:bg-violet-50/40
                        transition-colors
                      "
                    >

                      {/* UTILISATEUR */}
                      <td className="px-4 py-2.5">

                        <div className="flex items-center gap-2">

                          {user.avatar ? (

                            <img
                              src={user.avatar}
                              alt="avatar"
                              className="
                                w-7 h-7
                                rounded-full
                                object-cover
                              "
                            />

                          ) : (

                            <div
                              className={`
                                w-7 h-7
                                rounded-full
                                flex items-center justify-center
                                text-[10px] font-semibold
                                ${couleur.bg}
                                ${couleur.text}
                              `}
                            >
                              {obtenirInitiales(nom)}
                            </div>

                          )}

                          <span className="text-[12px] font-medium text-slate-800">
                            {nom}
                          </span>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td className="px-4 py-2.5 text-[12px] text-slate-300">
                        {user.email}
                      </td>

                      {/* STATUT */}
                      <td className="px-4 py-2.5">

                        <span
                          className={`
                            inline-flex items-center gap-1.5
                            text-[10px]
                            font-semibold
                            px-2 py-0.5
                            rounded-full

                            ${
                              actif
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >

                          <span
                            className={`
                              w-1.5 h-1.5 rounded-full
                              ${
                                actif
                                  ? "bg-emerald-500"
                                  : "bg-red-400"
                              }
                            `}
                          />

                          {user.statut}

                        </span>

                      </td>

                      {/* LIVRES */}
                      <td className="px-4 py-2.5 text-[12px] text-slate-200">
                        {user.livresLus ?? 0}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-2.5">

                        <div className="flex items-center gap-1.5">

                          {actif ? (

                            <button
                              onClick={() => onBloquer(user.id)}
                              className="
                                flex items-center gap-1
                                h-6 px-2.5
                                rounded-lg
                                bg-red-50
                                border border-red-200
                                text-red-700
                                text-[10px]
                                font-medium
                                hover:bg-red-100
                                transition-colors
                              "
                            >
                              <Ban className="w-3 h-3" />
                              Bloquer
                            </button>

                          ) : (

                            <button
                              onClick={() => onActiver(user.id)}
                              className="
                                flex items-center gap-1
                                h-6 px-2.5
                                rounded-lg
                                bg-emerald-50
                                border border-emerald-200
                                text-emerald-700
                                text-[10px]
                                font-medium
                                hover:bg-emerald-100
                                transition-colors
                              "
                            >
                              <Check className="w-3 h-3" />
                              Activer
                            </button>

                          )}

                          {/* BOUTON SUPPRESSION */}
                          <button
                            onClick={() =>
                              ouvrirModalSuppression(
                                user.id,
                                nom
                              )
                            }
                            className="
                              flex items-center gap-1
                              h-6 px-2.5
                              rounded-lg
                              bg-slate-100
                              border border-slate-200
                              text-slate-700
                              text-[10px]
                              font-medium
                              hover:bg-red-100
                              hover:text-red-700
                              hover:border-red-200
                              transition-colors
                            "
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}
          <div className="px-4 pb-3 text-[11px] text-violet-600">

            {actifCount} actifs · {inactifCount} inactifs

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* MODALE CONFIRMATION SUPPRESSION */}
      {/* ================================================= */}

      {modalSuppression.ouvert && (

        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40
            backdrop-blur-[2px]
          "
        >

          <div
            className="
              w-[300px]
              rounded-xl
              bg-indigo-200
              shadow-2xl
              box-border
              overflow-auto
              border border-slate-200
              animate-in fade-in zoom-in-95
            "
          >

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11 h-11
                    rounded-2xl
                    bg-red-100
                    flex items-center justify-center
                  "
                >
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>

                <div>
                  <h2 className="text-[15px] font-semibold text-slate-800">
                    Confirmation
                  </h2>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Suppression utilisateur
                  </p>
                </div>

              </div>

              <button
                onClick={fermerModalSuppression}
                className="
                  w-8 h-8
                  rounded-full
                  hover:bg-slate-100
                  flex items-center justify-center
                  transition-colors
                "
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

            </div>

            {/* BODY */}
            <div className="px-5 py-5">

              <p className="text-[13px] text-slate-600 leading-relaxed">

                Voulez-vous vraiment supprimer
                <span className="font-semibold text-slate-800">
                  {" "}
                  {modalSuppression.nom}
                </span>
                {" "}?

              </p>

              <p className="text-[11px] text-red-500 mt-2">
                Cette action est irréversible.
              </p>

            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 bg-slate-50 border-t border-slate-100">

              <button
                onClick={fermerModalSuppression}
                className="
                  h-10 px-4
                  rounded-xl
                  border border-slate-200
                  bg-white
                  text-[12px]
                  font-medium
                  text-slate-600
                  hover:bg-slate-100
                  transition-colors
                "
              >
                Annuler
              </button>

              <button
                onClick={confirmerSuppression}
                className="
                  h-10 px-4
                  rounded-xl
                  bg-red-600
                  text-white
                  text-[12px]
                  font-medium
                  hover:bg-red-700
                  transition-colors
                "
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default TableauUtilisateurs;