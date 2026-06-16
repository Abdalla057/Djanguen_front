import React, { useRef } from "react";
import DonutChart from "./graphiqueCercle";
import type { User, Livre } from "../type";


// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const IconFileText = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconCamera = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

// ─── Props ────────────────────────────────────────────────────────────────────
interface RightPanelProps {
  user:         User;
  initials:     string;
  livres:       Livre[];
  avatar?:      string;
  onAvatar?:    (file: File) => Promise<void>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RightPanel({ user, initials, livres, avatar, onAvatar }: RightPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const totalLivres = livres.length;
  const totalPages  = livres.reduce((total, livre) => total + (livre.pages?.length || 0), 0);

  const badges = [
    { Icon: IconBook,     val: totalLivres, label: "Livres"  },
    { Icon: IconFileText, val: totalPages,  label: "Pages"   },
  ];

  const miniStats = [
    { val: totalLivres, label: "Livres disponibles" },
    { val: totalPages,  label: "Pages totales"      },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAvatar?.(file);
    e.target.value = ""; // reset pour permettre de re-sélectionner le même fichier
  };

  return (
    <aside className="w-[240px] bg-white border-l border-[#0C3B2E]/10 flex flex-col overflow-y-auto border boder-[#0C3B2E] shadow-lg rounded-lg">

      {/* ── Profil ── */}
      <div className="px-5 pt-6 pb-5 flex flex-col items-center gap-2 border-b border-[#0C3B2E]/8">

        {/* Avatar + bouton caméra */}
        <div className="relative group">
          {avatar ? (
            <img
              src={avatar}
              alt={initials}
              className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-[#FFBA00]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#0C3B2E] flex items-center justify-center
              text-[#FFBA00] text-xl font-black shadow-sm select-none">
              {initials}
            </div>
          )}

          {/* Overlay caméra au hover */}
          {onAvatar && (
            <>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black opacity-0
                  group-hover:opacity-100 transition-opacity duration-200
                  flex items-center justify-center"
                aria-label="Changer la photo de profil"
              >
                <div className="bg-[#FFBA00] rounded-full p-1.5 text-[#0C3B2E]">
                  <IconCamera />
                </div>
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="avatar"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>

        {/* Nom */}
        <div className="text-center">
          <p className="text-sm font-bold text-[#0C3B2E] leading-tight">
            {user.prenomUtilisateur} {user.nomUtilisateur}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">@{user.pseudo}</p>
        </div>

        {/* Pill statut */}
        <span className="text-[10px] font-semibold text-[#0C3B2E] bg-[#FFBA00]/60
          border border-[#FFBA00]/60 px-3 py-0.5 rounded-full">
          Lecteur actif
        </span>
      </div>

      {/* ── Badges ── */}
      <div className="flex justify-around px-3 py-4 border-b border-[#FFBA00]">
        {badges.map(({ Icon, val, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-xl  bg-[#0C3B2E] text-[#FFBA00]
              flex items-center justify-center">
              <Icon />
            </div>
            <p className="text-lg  font-bold text-[#FFBA00]/80 leading-none">{val}</p>
            <p className="text-[10px] text-[#0C3B2E]">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Donut ── */}
      <div className="px-5 py-4 border-b border-[#0C3B2E]">
        <DonutChart livres={livres} />
      </div>

      {/* ── Mini stats ── */}
      <div className="grid grid-cols-2 gap-2.5 px-4 py-4">
        {miniStats.map(({ val, label }) => (
          <div key={label}
            className="flex flex-col gap-0.5 bg-[#0C3B2E] rounded-xl p-3
              border border-[#0C3B2E]/10">
            <p className="text-lg font-black text-[#FFBA00] leading-none">{val}</p>
            <p className="text-[12px] text-white leading-tight">{label}</p>
          </div>
        ))}
      </div>

    </aside>
  );
}