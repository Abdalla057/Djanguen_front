import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import AdminSidebar from "./adminslidebar";
import AdminHeader from "./adminheader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#393b3f] text-gray-800">
      {/* ================= Header Mobile ================= */}
      <header className="md:hidden p-4 flex justify-between items-center bg-gradient-to-r from-[#0a0b45] to-[#113c07] shadow sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          <Menu size={32} />
        </button>
      </header>

      {/* ================= Overlay mobile ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white w-64 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* ================= Header Desktop ================= */}
      <header className="sticky top-0 z-20 bg-white shadow-sm hidden md:block">
        <AdminHeader />
      </header>

      {/* ================= Contenu ================= */}
      <main className="p-4 md:ml-56">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;