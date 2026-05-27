import React, { useEffect, useState } from "react";
import Header from "./composant/header";
import GestionLivre from "./composant/gestionLivre";
import TopLivre from "./composant/topLivre";
import StatCard from "./component/StatusCard";
import { Book, BookOpen } from "lucide-react";
import { fetchLivre, LivreStats } from "./services/Livre";

const Dashboard = () => {
  const [stats, setStats] = useState<LivreStats>({ totalLivres: 0, livresAvecAudio: 0 });

  useEffect(() => {
    fetchLivre().then(setStats);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="px-8 py-8 max-w-[1200px] mx-auto">
        <div className="mb-7">
          <h1 className="text-[24px] font-bold text-slate-800">Dashboard</h1>
          <p className="text-[13px] text-slate-400 mt-1">Gestion des livres et des audios</p>
        </div>
        <div className="md:flex-row flex flex-col w-full items-center pb-4 gap-px md:gap-10 justify-center">
          <StatCard
            value={stats.totalLivres}
            title="Total Livres"
            icon={<BookOpen size={20} color="white" />}
            iconBackgroundColor="bg-blue-400"
          />
          <StatCard
            value={stats.livresAvecAudio}
            title="Livre avec audio"
            icon={<Book size={20} color="white" />}
            iconBackgroundColor="bg-pink-400"
          />
          <StatCard
            value={4}
            title="Nombre de livre"
            icon={<Book size={20} color="white" />}
          />
        </div>
        <TopLivre />
        <GestionLivre />
      </main>
    </div>
  );
};

export default Dashboard;