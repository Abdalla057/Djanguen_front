import React from "react";
import {
  ArrowRight,
  BookOpen,
  Headphones,
  Sparkles,
} from "lucide-react";

const SectionBienvenue = () => {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-2xl
        bg-gradient-to-br from-white via-rose-50 to-red-100
        border border-white/40
        shadow-sm
        px-6 py-6
        flex flex-col lg:flex-row
        items-center justify-between
        gap-6
      "
    >

      {/* GLOW */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-80px] left-[20%] w-60 h-60 bg-rose-300/20 rounded-full blur-3xl" />

      {/* CONTENU */}
      <div className="relative z-10 flex-1 max-w-xl">

        {/* BADGE */}
        <div className="
          inline-flex items-center gap-2
          px-3 py-1.5
          rounded-full
          bg-white/80
          border border-red-100
          mb-4
        ">
          <Sparkles className="w-4 h-4 text-red-500" />
          <span className="text-[11px] font-semibold uppercase text-red-500">
            Plateforme d’apprentissage
          </span>
        </div>

        {/* TITRE */}
        <h1 className="text-2xl lg:text-3xl font-black text-slate-800 leading-snug">
          Explorez votre
          <span className="block bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
            bibliothèque numérique
          </span>
        </h1>

        {/* STATS */}
        <div className="flex gap-3 mt-4">

          <div className="
            flex items-center gap-2
            px-3 py-2
            rounded-xl
            bg-white/80 border border-red-100
          ">
            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-red-500" />
            </div>

            <div>
              <p className="text-sm font-bold">500+</p>
              <p className="text-[10px] text-slate-500">Livres</p>
            </div>
          </div>

          <div className="
            flex items-center gap-2
            px-3 py-2
            rounded-xl
            bg-white/80 border border-red-100
          ">
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-rose-500" />
            </div>

            <div>
              <p className="text-sm font-bold">Audio</p>
              <p className="text-[10px] text-slate-500">Écoute</p>
            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 mt-5">

          <button className="
            px-5 py-2.5
            rounded-xl
            bg-gradient-to-r from-red-500 to-rose-500
            text-white text-sm font-semibold
            hover:scale-105 transition
            flex items-center gap-2
          ">
            Explorer
            <ArrowRight className="w-4 h-4" />
          </button>

          <button className="
            px-4 py-2.5
            rounded-xl
            bg-white/80 border border-red-100
            text-sm text-slate-700
          ">
            Audios
          </button>

        </div>
      </div>

      {/* IMAGE */}
      <div className="relative z-10 flex items-center justify-center">

        <div className="absolute w-40 h-40 bg-red-300/20 rounded-full blur-2xl" />

        <img
          src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"
          alt="bibliothèque"
          className="w-[120px] lg:w-[110px] object-contain"
        />

      </div>

    </section>
  );
};

export default SectionBienvenue;