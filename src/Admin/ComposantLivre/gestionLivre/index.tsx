import React from "react";
import Header from "./composant/header";
import GestionLivre from "./composant/gestionLivre";
import TopLivre from "./composant/topLivre";

const Dashboard = () => (
  <div className="min-h-screen bg-slate-50 font-sans">
    <Header />
    <main className="px-8 py-8 max-w-[1200px] mx-auto">
      <div className="mb-7">
        <h1 className="text-[24px] font-bold text-slate-800">Dashboard</h1>
        <p className="text-[13px] text-slate-400 mt-1">Gestion des livres et des audios</p>
      </div>
      <TopLivre />
      <GestionLivre />
    </main>
  </div>
);

export default Dashboard;