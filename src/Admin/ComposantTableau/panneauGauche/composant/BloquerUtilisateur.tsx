import type { User } from "../type/PanneauGauche.Type";
import React, {
  useEffect,
  useState,
} from "react";

import { socket } from "../../../../SOCKET/composant/socket";

import { SOCKET_EVENTS } from "../../../../SOCKET/composant/events";

import {
  Users,
  Ban,
} from "lucide-react";

interface Props {
  users?: User[];
  loading: boolean;
  onBlock: (id: number) => void;
}

/* ================================================================
   COULEURS AVATAR
================================================================ */

const AVATAR_COLORS = [

  {
    bg: "bg-violet-100",
    text: "text-violet-800",
  },

  {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },

  {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
  },

  {
    bg: "bg-amber-100",
    text: "text-amber-800",
  },

  {
    bg: "bg-pink-100",
    text: "text-pink-800",
  },

] as const;

/* ================================================================
   INITIALS
================================================================ */

const obtenirInitiales = (
  nom: string
) => {

  return nom
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

};

/* ================================================================
   COMPONENT
================================================================ */

export default function ListeUtilisateurs({
  users = [],
  loading,
  onBlock,
}: Props) {

  /* ================================================================
     STATE
  ================================================================ */

  const [liveUsers, setLiveUsers] =
    useState<User[]>(users || []);

  /* ================================================================
     WEBSOCKET
  ================================================================ */

  useEffect(() => {

    setLiveUsers(users || []);

    socket.on(
      SOCKET_EVENTS.USER_STATUS,
      (data) => {

        setLiveUsers((prev) =>

          (prev || []).map((user) =>

            user.id === data.userId

              ? {
                  ...user,
                  statut:
                    data.status === "ONLINE"
                      ? "ACTIF"
                      : "INACTIF",
                }

              : user
          )
        );

      }
    );

    return () => {

      socket.off(
        SOCKET_EVENTS.USER_STATUS
      );

    };

  }, [users]);

  /* ================================================================
     LOADING
  ================================================================ */

  if (loading) {

    return (

      <div
        className="
          p-4
          flex items-center gap-2
          text-slate-400
          text-sm
        "
      >

        <span className="animate-pulse">

          Chargement utilisateurs...

        </span>

      </div>

    );

  }

  /* ================================================================
     UTILISATEURS ACTIFS
  ================================================================ */

  const actifCount =

    (liveUsers || []).filter(

      (u) => u.statut === "ACTIF"

    ).length;

  /* ================================================================
     UI
  ================================================================ */

  return (

    <div
      className="
        bg-[#f5f6fb]
        rounded-[28px]
        p-4
        border border-white/40
        shadow-[0_8px_32px_rgba(15,23,42,0.06)]
      "
    >

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div
        className="
          flex items-center
          justify-between
          mb-4
        "
      >

        <div
          className="
            flex items-center
            gap-3
          "
        >

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-white
              shadow-sm
              border border-slate-100
              flex items-center
              justify-center
            "
          >

            <Users
              className="
                w-4 h-4
                text-slate-500
              "
            />

          </div>

          <div>

            <p
              className="
                text-[15px]
                font-semibold
                text-slate-800
              "
            >

              Utilisateurs

            </p>

            <p
              className="
                text-[11px]
                text-slate-400
                mt-0.5
              "
            >

              {liveUsers.length} au total

            </p>

          </div>

        </div>

        {/* =====================================================
            COMPTEUR EN LIGNE
        ===================================================== */}

        <div
          className="
            flex items-center
            gap-1.5
          "
        >

          <span
            className="
              w-2 h-2
              rounded-full
              bg-emerald-500
              animate-pulse
            "
          />

          <span
            className="
              text-[12px]
              text-slate-500
            "
          >

            {actifCount} en ligne

          </span>

        </div>

      </div>

      {/* =========================================================
          LISTE
      ========================================================= */}

      <div
        className="
          flex flex-col gap-2
          max-h-[340px]
          overflow-y-auto
          pr-1
          scrollbar-thin
          scrollbar-thumb-slate-200
          scrollbar-track-transparent
        "
      >

        {(liveUsers || []).map(
          (user, idx) => {

            const actif =
              user.statut === "ACTIF";

            const couleur =
              AVATAR_COLORS[
                idx %
                AVATAR_COLORS.length
              ];

            return (

              <div
                key={user.id}
                className="
                  flex items-center gap-3
                  bg-white
                  rounded-2xl
                  px-3 py-2.5
                  border border-white/60
                  shadow-[0_2px_8px_rgba(15,23,42,0.04)]
                  hover:shadow-[0_4px_14px_rgba(15,23,42,0.07)]
                  transition-all duration-200
                "
              >

                {/* ================================
                    AVATAR
                ================================= */}

                <div
                  className={`
                    w-10 h-10
                    rounded-full
                    flex-shrink-0
                    flex items-center
                    justify-center
                    text-[12px]
                    font-semibold
                    ${couleur.bg}
                    ${couleur.text}
                  `}
                >

                  {obtenirInitiales(
                    user.nom
                  )}

                </div>

                {/* ================================
                    INFOS
                ================================= */}

                <div
                  className="
                    flex-1
                    min-w-0
                  "
                >

                  <p
                    className="
                      text-[13px]
                      font-semibold
                      text-slate-800
                      truncate
                    "
                  >

                    {user.nom}

                  </p>

                  <p
                    className="
                      text-[11px]
                      text-slate-400
                      truncate
                    "
                  >

                    {user.email}

                  </p>

                </div>

                {/* ================================
                    ACTIONS
                ================================= */}

                <div
                  className="
                    flex items-center
                    gap-2
                    flex-shrink-0
                  "
                >

                  {/* DOT */}

                  <span
                    className={`
                      w-2 h-2
                      rounded-full
                      ${
                        actif
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }
                    `}
                  />

                  {/* BADGE */}

                  <span
                    className={`
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

                    {user.statut}

                  </span>

                  {/* BOUTON */}

                  {actif && (

                    <button
                      onClick={() =>
                        onBlock(user.id)
                      }
                      className="
                        flex items-center gap-1
                        h-7 px-2.5
                        rounded-lg
                        bg-red-50 hover:bg-red-100
                        border border-red-200
                        text-red-600
                        text-[11px] font-medium
                        transition-colors
                      "
                    >

                      <Ban
                        className="
                          w-3 h-3
                        "
                      />

                      Bloquer

                    </button>

                  )}

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}