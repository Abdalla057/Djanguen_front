import React, { useState } from "react";
import { BookOpen, Home, LogOut, X, AlertCircle, ChevronRight } from "lucide-react";
import { GiBookshelf } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string | number;
}

interface AdminSidebarProps {
  closeSidebar?: () => void;
  isOpen?: boolean;
}

const FirstPosition: Position[] = [
  { path: "/admin/home",         icon: Home,        label: "Home" },
  { path: "/admin/livres",       icon: BookOpen,    label: "Gestion des livres" },
  { path: "/admin/bibliotheque", icon: GiBookshelf, label: "Bibliothèque" },
  { path: "/admin/historique",   icon: MdHistory,   label: "Historique" },
];

const AdminSidebar = ({ closeSidebar, isOpen = true }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isHovered, setIsHovered]             = useState<string | null>(null);

  const handleNavClick = (path: string) => {
    navigate(path);
    if (closeSidebar) closeSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Connection");
  };

  const NavButton = ({ item, isActive }: { item: Position; isActive: boolean }) => {
    const Icon = item.icon;
    return (
      <motion.button
        onMouseEnter={() => setIsHovered(item.path)}
        onMouseLeave={() => setIsHovered(null)}
        onClick={() => handleNavClick(item.path)}
        className={`group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
          isActive ? "text-[#1a1a2e]" : "text-[#374151] hover:text-[#1a1a2e]"
        }`}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Fond actif — cta */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-gradient-to-r from-[#f5c842] to-[#fbbf24] shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Fond survol — heroSaumon */}
        {!isActive && isHovered === item.path && (
          <motion.div
            className="absolute inset-0 bg-[#fde8d8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <div className="relative z-10 flex items-center gap-2.5 w-full">
          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isActive ? "scale-110 rotate-3" : "group-hover:scale-110"
          }`} />
          <span className="flex-1 text-left text-xs tracking-wide truncate">{item.label}</span>

          {/* Badge — cta */}
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#f5c842] text-[#1a1a2e] rounded-full">
              {item.badge}
            </span>
          )}

          {/* Flèche active textDark */}
          {isActive && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <ChevronRight className="w-3 h-3 text-[#1a1a2e] opacity-60" />
            </motion.div>
          )}
        </div>
      </motion.button>
    );
  };

  return (
    <>
      {/* ── Overlay mobile ── */}
      <AnimatePresence>
        {isOpen && closeSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/*   Sidebar bgPage  */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        className={`fixed top-0 left-2 h-screen w-60 flex flex-col z-50 overflow-hidden bg-[#fdf6f0] ${
          !isOpen && "md:translate-x-0"
        }`}
      >
        {/* Halo haut-gauche — cta */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(245,200,66,0.3) 0%, transparent 70%)" }}
        />

        {/* Halo bas-droite — heroBleupast */}
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(200,232,240,0.6) 0%, transparent 70%)" }}
        />

        {/* Panneau interne — bgWhite + heroSaumon border */}
        <div className="absolute inset-2 rounded-2xl z-[1] bg-white/60 backdrop-blur-sm border border-[#fde8d8]" />

        {/* ── En-tête ── */}
        <div className="relative z-10 px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              {/* Logo — cta glow */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500 bg-gradient-to-r from-[#f5c842] to-[#fbbf24]" />
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[#ffffff] border border-[#fde8d8] shadow-sm">
                  <BookOpen className="w-10 h-10 text-[#2a2720]" />
                </div>
              </div>

              {/* Nom — textDark + cta accent */}
              <div>
                <h1 className="text-2xl font-bold tracking-tight leading-none text-[#1a1a2e]">
                  DiAn<span className="text-[#f5c842]">Gueen</span>
                </h1>
              </div>
            </div>

            {/* Bouton fermeture mobile — bgWhite + heroSaumon border */}
            {closeSidebar && (
              <button
                onClick={closeSidebar}
                className="md:hidden w-7 h-7 rounded-full flex items-center justify-center bg-[#ffffff] border border-[#fde8d8]"
              >
                <X className="w-3 h-3 text-[#374151]" />
              </button>
            )}
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="relative z-10 flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
          <div className="px-3 mb-3">
            {/* Label — textBody */}
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
              Menu Principal
            </p>
          </div>

          {FirstPosition.map((item) => (
            <div key={item.path}>
              <NavButton item={item} isActive={location.pathname === item.path} />
            </div>
          ))}
        </nav>

        {/* ── Bas : profil + déconnexion ── */}
        <div className="relative z-10 p-3 mt-auto">

          {/* Séparateur — heroSaumon */}
          <div className="mb-3 h-px bg-[#fde8d8]" />
          {/* Bouton déconnexion */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 bg-red-50 border border-red-200 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            Déconnexion
          </button>
        </div>
      </motion.aside>

      {/* ── Modal déconnexion ── */}
      <AnimatePresence>
        {showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">

    {/* Overlay */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      onClick={() => setShowLogoutModal(false)}
    />

    {/* Modal */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 10 }}
      className="relative rounded-2xl p-6 w-full max-w-xs bg-[#fdf6f0] border border-[rgb(232,209,190)] shadow-xl z-10"
    >
      {/* Icône */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50 border border-red-200">
          <AlertCircle className="w-6 h-6 text-red-400" />
        </div>
      </div>

      {/* Texte */}
      <h2 className="text-base font-bold text-center text-[#1a1a2e] mb-1">
        Quitter la session ?
      </h2>
      <p className="text-xs text-center text-[#6b7280] mb-5 leading-relaxed">
        Vous devrez vous reconnecter pour accéder à l'administration.
      </p>

      {/* Boutons côte à côte */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#ffffff] border border-[#fde8d8] text-[#374151] hover:bg-[#fde8d8] transition-all"
        >
          Annuler
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#f5c842] to-[#fbbf24] text-[#1a1a2e] hover:opacity-90 transition-all"
        >
          Confirmer
        </button>
      </div>

    </motion.div>
  </div>
)}
             
         
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;