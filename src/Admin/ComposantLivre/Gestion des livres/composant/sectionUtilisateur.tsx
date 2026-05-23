import React from "react";
import { BookOpen, User, ChevronLeft, ChevronRight } from "lucide-react";
import type { Utilisateur } from "../type/listeLivreType";

interface SectionUtilisateursProps {
  utilisateurs:         Utilisateur[];
  utilisateursAffiches: Utilisateur[];
  afficherTous:         boolean;
  chargement:           boolean;
  onBasculerAffichage:  () => void;
}

const SectionUtilisateurs = ({
  utilisateurs,
  utilisateursAffiches,
  afficherTous,
  chargement,
  onBasculerAffichage,
}: SectionUtilisateursProps) => {
  return (
    <div className="mt-10">
      <div className="bg-slate-800/40 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-700/30 overflow-hidden">

        {/* En-tête */}
        <div className="p-5 border-b border-slate-700/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Lecteurs Inscrits</h3>
          </div>
          {!chargement && utilisateurs.length > 0 && (
            <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm font-bold rounded-lg border border-indigo-500/30">
              {utilisateurs.length}
            </span>
          )}
        </div>

        {/* Corps */}
        <div className="p-5">
          {chargement ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-indigo-600/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className={`space-y-2 ${afficherTous ? "max-h-72 overflow-y-auto pr-1" : ""}`}>
                {utilisateursAffiches.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/20 hover:bg-slate-700/40 transition-colors duration-200 border border-slate-600/20"
                  >
                    <img
                      src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.nom)}&background=6366f1&color=fff`}
                      alt={u.nom}
                      className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-500/20"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.nom)}&background=6366f1&color=fff`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{u.nom}</h4>
                      <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    </div>
                    {u.livresLus !== undefined && (
                      <div className="flex items-center gap-1 text-indigo-400 shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="text-sm font-bold">{u.livresLus}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {utilisateurs.length > 1 && (
                <button
                  onClick={onBasculerAffichage}
                  className="mt-4 w-full py-2.5 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 rounded-xl text-sm font-semibold transition-all duration-200 border border-slate-600/30 flex items-center justify-center gap-2"
                >
                  {afficherTous
                    ? <><ChevronLeft className="w-4 h-4" />Réduire</>
                    : <>Voir tous ({utilisateurs.length})<ChevronRight className="w-4 h-4" /></>}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionUtilisateurs;