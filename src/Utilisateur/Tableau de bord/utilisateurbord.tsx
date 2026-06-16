/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Settings, X } from "lucide-react";

import AdminHeader  from "./utilisateurheader";
import AdminSidebar from "./utilisateurslidebar";

const UtilisateurBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/Connection", { replace: true });
      return;
    }
    if (
      location.pathname === "/utilisateur" ||
      location.pathname === "/utilisateur/"
    ) {
      navigate("/utilisateur/accueil", { replace: true });
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-gray-50 text-slate-800">

      {/* ── Header Mobile ── */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between
        px-5 h-14 bg-white border-b border-[#0C3B2E]/10 shadow-sm">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-xl
            text-[#0C3B2E] hover:bg-[#0C3B2E]/8 transition-colors"
          aria-label="Menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo centré mobile */}
        <span className="font-black text-[#0C3B2E] text-base tracking-tight">
          guen <span className="text-[#FFBA00]">Dian</span>
        </span>

        <button
          onClick={() => navigate("/Parametre")}
          className="w-9 h-9 flex items-center justify-center rounded-xl
            text-[#0C3B2E] hover:bg-[#0C3B2E]/8 transition-colors"
          aria-label="Paramètres"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-[#0C3B2E]/10
          shadow-lg transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <AdminSidebar />
      </div>

      {/* ── Header Desktop ── */}
      <div className="hidden md:block sticky top-0 z-20 bg-white border-b border-[#0C3B2E]/10 shadow-sm">
        <AdminHeader />
      </div>

      {/* ── Contenu principal ── */}
      <main className="md:ml-64 p-5 min-h-[calc(100vh-56px)]">
        {/* contenu ici */}
      </main>

    </div>
  );
};

export default UtilisateurBoard;