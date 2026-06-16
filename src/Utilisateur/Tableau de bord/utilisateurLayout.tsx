import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import UtilisateurSidebar from "../../Utilisateur/Tableau de bord/utilisateurslidebar";
import UtilisateurHeader  from "../../Utilisateur/Tableau de bord/utilisateurheader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-[#0C3B2E]">

      {/* ── Header Mobile ── */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between
        px-5 h-14 bg-white border-b border-[#0C3B2E]/10 shadow-sm">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-xl
            text-[#0C3B2E] hover:bg-[#0C3B2E]/8 transition-colors"
          aria-label="Menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <span className="font-black text-[#0C3B2E] text-base tracking-tight select-none">
          guen <span className="text-[#FFBA00]">Dian</span>
        </span>

        <div className="w-9" />
      </header>

      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white
          border-r border-[#0C3B2E]/10 shadow-lg
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <UtilisateurSidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* ── Header Desktop ── */}
      <header className="hidden md:block sticky top-0 z-20
        bg-white border-b border-[#0C3B2E]/10 shadow-sm">
        <UtilisateurHeader />
      </header>

      {/* ── Contenu ── */}
      <main className="md:ml-64 p-5 min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;