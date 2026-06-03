import React from "react";
import SectionProfil      from "./composant/SectionProfil";
import BloquerUtilisateur from "./composant/BloquerUtilisateur";
import DiagrammeActivite  from "./composant/DiagrammeActivite";
import { useGestionUtilisateur } from "./logique/useGestionUtilisateur";

const Index = () => {

  const {
    profil,
    loadingProfil,
    users,
    loadingUsers,
    blockUser,
    diagrammeData,
  } = useGestionUtilisateur();

  return (
    <div className="min-h-screen p-6 space-y-6 bg-[#fdf6f0]">

      {/* ── Titre page ── */}
      <div className="rounded-2xl px-6 py-4 bg-gradient-to-r from-[#fde8d8] to-[#c8e8f0]">
        <h1 className="text-xl font-black uppercase tracking-widest text-[#1a1a2e]">
          Gestion Utilisateurs
        </h1>
        <p className="text-xs mt-1 text-[#6b7280]">
          Administration et suivi des comptes
        </p>
      </div>

      {/* ── Profil Admin ── */}
      <div className="rounded-2xl p-4 bg-white">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[#a78bfa]">
          Profil Admin
        </p>
        <SectionProfil profil={profil} loading={loadingProfil} />
      </div>

      {/* ── Utilisateurs ── */}
      <div className="rounded-2xl p-4 bg-white">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[#4ecb8d]">
          Utilisateurs
        </p>
        <BloquerUtilisateur users={users} loading={loadingUsers} onBlock={blockUser} />
      </div>

      {/* ── Diagramme ── */}
      <div className="rounded-2xl p-4 bg-white">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[#fbbf24]">
          Activité
        </p>
        <DiagrammeActivite data={diagrammeData} />
      </div>

    </div>
  );
};

export default Index;