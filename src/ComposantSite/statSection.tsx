import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = () => (
  <span className="inline-block w-6 h-6 rounded-full border-[3px] border-[#0C3B2E]/20 border-t-[#0C3B2E] animate-spin" />
);

// ─── Component ────────────────────────────────────────────────────────────────
const StatSection = () => {
  const [nbLivres,       setNbLivres]       = useState<number | null>(null);
  const [nbUtilisateurs, setNbUtilisateurs] = useState<number | null>(null);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token") ?? ""}`;

    const fetchLivres = async () => {
      try {
        const res  = await fetch(`${API_URL}/admin/livre`, { headers: { Authorization: token } });
        const data = await res.json();
        setNbLivres(Array.isArray(data) ? data.length : 0);
      } catch { setNbLivres(0); }
    };

    const fetchUtilisateurs = async () => {
      try {
        const res  = await fetch(`${API_URL}/utilisateur`, { headers: { Authorization: token } });
        const data = await res.json();
        setNbUtilisateurs(Array.isArray(data) ? data.length : 0);
      } catch { setNbUtilisateurs(0); }
    };

    fetchLivres();
    fetchUtilisateurs();
  }, []);

  const stats = [
    {
      Icon:    IconBook,
      valeur:  nbLivres,
      label:   "Livres disponibles",
      detail:  null,
      accent:  false,
    },
    {
      Icon:    IconUsers,
      valeur:  nbUtilisateurs,
      label:   "Utilisateurs inscrits",
      detail:  null,
      accent:  true,          // carte centrale mise en avant
    },
    {
      Icon:    IconGlobe,
      valeur:  2,
      label:   "Langues disponibles",
      detail:  "Poulard · Wolof",
      accent:  false,
    },
  ];

  return (
    <section id="stats" className="py-16 px-4 sm:px-8 bg-white">

      {/* En-tête */}
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-semibold text-[#0C3B2E] bg-[#0C3B2E]/8 px-4 py-1.5 rounded-full mb-3">
          La plateforme en chiffres
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-[#0C3B2E] tracking-tight">
          Une communauté qui grandit
        </h2>
        <p className="text-slate-400 mt-2 text-sm">
          Des ressources accessibles à tous, chaque jour
        </p>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl p-6 flex flex-col items-center text-center border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
              ${s.accent
                ? "bg-[#0C3B2E] border-[#0C3B2E]"
                : "bg-white border-[#0C3B2E]/15"
              }`}
          >
            {/* Blob décoratif */}
            <div
              className={`absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 pointer-events-none
                ${s.accent ? "bg-[#FFBA00]" : "bg-[#0C3B2E]"}`}
              aria-hidden="true"
            />

            {/* Icône */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
              ${s.accent
                ? "bg-[#FFBA00] text-[#0C3B2E]"
                : "bg-[#0C3B2E]/8 text-[#0C3B2E]"
              }`}>
              <s.Icon />
            </div>

            {/* Valeur */}
            <span className={`text-4xl font-black leading-none tabular-nums
              ${s.accent ? "text-[#FFBA00]" : "text-[#0C3B2E]"}`}>
              {s.valeur === null ? <Spinner /> : s.valeur}
            </span>

            {/* Label */}
            <p className={`text-xs font-semibold mt-2
              ${s.accent ? "text-white/80" : "text-slate-600"}`}>
              {s.label}
            </p>

            {/* Détail */}
            {s.detail && (
              <p className={`text-[11px] mt-1
                ${s.accent ? "text-white/50" : "text-slate-400"}`}>
                {s.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatSection;