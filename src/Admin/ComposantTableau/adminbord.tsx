/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, } from "react-router-dom";
import { Menu, Settings } from "lucide-react";

import AdminHeader      from "./adminheader";
import AdminSidebar     from "./adminslidebar";


const AdminBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ── Vérification connexion au montage ── */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/Connection", { replace: true });
      return;
    }

    //  Redirection automatique /admin → /admin/home après connexion
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/home", { replace: true });
    }
  }, [location.pathname]);
  return (
    <div className="relative min-h-screen bg-[#393b3f] text-gray-800">

      {/* ── Header Mobile ── */}
      <div className="md:hidden p-4 flex justify-between items-center bg-gradient-to-r from-[#4b515d] to-[#c20074] shadow sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white"
        >
          <Menu size={32} />
        </button>

        <button
          onClick={() => navigate("/Parametre")}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <Settings size={22} />
        </button>
      </div>

      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white w-64 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <AdminSidebar />
      </div>

      {/* ── Header Desktop ── */}
      <div className="sticky top-0 z-20 bg-white shadow-sm hidden md:block">
        <AdminHeader />
      </div>

      {/* ── Contenu principal ── */}
      <main className="p-4 md:ml-64">
  
      </main>
    </div>
  );
};

export default AdminBoard;