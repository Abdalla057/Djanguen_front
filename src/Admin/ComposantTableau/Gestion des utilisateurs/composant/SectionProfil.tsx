import { User } from "lucide-react";
import React from "react";

interface Profil {
  nom?: string;
  role?: string;
  email?: string;
  avatar?: string;
}

interface SectionProfilProps {
  profil: Profil | null;
  loading: boolean;
}

const SectionProfil = ({
  profil,
  loading,
}: SectionProfilProps) => {

  /* ================================================================
     LOADING STATE
  ================================================================ */

  if (loading) {
    return (
      <div className="bg-white rounded-[28px] shadow-lg p-6 text-center animate-pulse text-slate-400">
        Chargement...
      </div>
    );
  }

  /* ================================================================
     EMPTY STATE
  ================================================================ */

  if (!profil) {
    return (
      <div className="bg-white rounded-[28px] shadow-lg p-6 text-center text-slate-400">
        Aucun profil trouvé
      </div>
    );
  }

  /* ================================================================
     UI
  ================================================================ */

  return (
    <div className="bg-white rounded-[28px] shadow-lg p-6 flex flex-col items-center text-center w-full">

      {/* AVATAR */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-200 to-violet-300 flex items-center justify-center mb-4">

        {profil.avatar ? (
          <img
            src={profil.avatar}
            alt={profil.nom}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User className="w-10 h-10 text-white" />
        )}

      </div>

      {/* NOM */}
      <h2 className="text-lg font-bold text-slate-800">
        {profil.nom ?? "Utilisateur"}
      </h2>

      {/* ROLE */}
      <p className="text-sm text-slate-500 mt-1">
        {profil.role ?? "Membre"}
      </p>

      {/* EMAIL (bonus utile admin dashboard) */}
      {profil.email && (
        <p className="text-xs text-slate-400 mt-1">
          {profil.email}
        </p>
      )}

      {/* BUTTON */}
      <button
        className="
          mt-5
          px-6 py-2.5
          rounded-full
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          text-sm font-medium
          transition-all
        "
      >
        Profile
      </button>

    </div>
  );
};

export default SectionProfil;