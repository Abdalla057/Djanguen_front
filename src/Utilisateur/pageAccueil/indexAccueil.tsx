import React from "react";
import { useDashboard, initials, getGreeting } from "./logique/useAccueil";



import RightPanel   from "./composant/panneauDroit";
import ChartSection from "./composant/diagrammedeProgression";
import SectionLivres from "./composant/sectionlivre";


// ─── Loading ──────────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <span className="w-8 h-8 rounded-full border-[3px] border-[#0C3B2E]/20 border-t-[#0C3B2E] animate-spin" />
        <p className="text-sm text-slate-400">Chargement de votre espace...</p>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function IndexAccueil() {
  const {
    user,
    livres,
    historique,
    loading,
    isDemo,
    handleResume,
  
  } = useDashboard();



  if (loading) return <LoadingScreen />;
  if (!user)   return null;

  const ini = initials(user.prenomUtilisateur, user.nomUtilisateur);


 

  return (
    <div className="flex h-[620px] bg-white rounded-2xl overflow-hidden font-sans">

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <div className="px-7 pt-6 pb-0 flex items-start justify-between flex-shrink-0">
          <div>
            <h1 className="text-2xl font-black text-[#0C3B2E] leading-tight">
              {getGreeting()},{" "}
              <span className="text-[#FFBA00]">{user.prenomUtilisateur}</span>
              {isDemo && (
                <span className="ml-2 text-xs font-semibold text-[#0C3B2E] bg-[#FFBA00]/20
                  border border-[#FFBA00]/40 px-2.5 py-0.5 rounded-full align-middle">
                  Mode démo
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              @{user.pseudo} · Bonne session de lecture !
            </p>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div
          className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-6"
          style={{ scrollbarWidth: "none" }}
        >

        {/* Entre les pills et le graphique */}
         <SectionLivres livres={livres} onResume={handleResume} />
        {/* Graphique */}
     <section className="bg-white rounded-lg border border-[#0C3B2E]/15 p-5 shadow-xl">
       <ChartSection historique={historique} livres={livres} />
     </section>
        </div>
      </div>

      {/* ── PANNEAU DROIT ── */}
      <RightPanel
       user={user}
       initials={ini}
       livres={livres}
       avatar={user.avatar} // ← selon le nom du champ dans ton type User
      />

    </div>
  );
}