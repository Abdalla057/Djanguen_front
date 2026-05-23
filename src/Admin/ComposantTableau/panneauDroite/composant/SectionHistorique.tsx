import React from "react";
import type { Historique } from "../type/PanneauDroit.Type.js";

interface Props {
  historique: Historique[];
}

const HistoryPanel = ({ historique }: Props) => {

  return (

    <div className="
      bg-[#111827]
      rounded-[32px]
      p-6
      shadow-2xl
      border
      border-slate-800
    ">

      {/* HEADER */}
      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h2 className="
            text-white
            text-xl
            font-bold
          ">
            Historique de lecture
          </h2>

          <p className="
            text-slate-400
            text-sm
            mt-1
          ">
            Vos dernières activités
          </p>

        </div>

        <div className="
          w-14
          h-14
          rounded-2xl
          bg-gradient-to-br
          from-purple-500
          to-indigo-600
          flex
          items-center
          justify-center
          text-2xl
          shadow-lg
        ">
          📚
        </div>

      </div>

      {/* LISTE */}
      <div className="space-y-4">

        {historique.length === 0 && (

          <div className="
            bg-[#1E293B]
            rounded-2xl
            py-10
            text-center
          ">

            <p className="
              text-slate-400
              text-sm
            ">
              Aucun historique disponible
            </p>

          </div>

        )}

        {historique.map((item) => (

          <div
            key={item.id}
            className="
              group
              bg-[#1E293B]
              hover:bg-[#273449]
              transition-all
              duration-300
              rounded-3xl
              p-4
              flex
              items-center
              justify-between
              border
              border-transparent
              hover:border-indigo-500/40
              hover:scale-[1.01]
            "
          >

            {/* GAUCHE */}
            <div className="
              flex
              items-center
              gap-4
            ">

              {/* COVER */}
              <div className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-purple-600
                flex
                items-center
                justify-center
                text-2xl
                shadow-md
              ">
                📖
              </div>

              {/* INFOS */}
              <div>

                <h3 className="
                  text-white
                  font-semibold
                  text-base
                  line-clamp-1
                ">
                  {item.livre?.titre || "Livre"}
                </h3>

                <p className="
                  text-slate-400
                  text-sm
                  mt-1
                ">
                  Lecture récente
                </p>

              </div>

            </div>

            {/* DATE */}
            <div className="
              flex
              flex-col
              items-end
            ">

              <span className="
                text-xs
                text-slate-500
              ">
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </span>

              <div className="
                mt-2
                px-3
                py-1
                rounded-full
                bg-indigo-500/20
                text-indigo-300
                text-xs
                font-medium
              ">
                Terminé
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default HistoryPanel;