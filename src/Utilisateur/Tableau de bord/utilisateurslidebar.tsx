import React, { useState } from "react";
import { BookOpen, Home, LogOut, X, AlertCircle, ChevronRight } from "lucide-react";
import { GiBookshelf } from "react-icons/gi";
import { MdHistory }   from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  path:   string;
  icon:   React.ComponentType<{ className?: string }>;
  label:  string;
  badge?: string | number;
}

interface AdminSidebarProps {
  closeSidebar?: () => void;
  isOpen?:       boolean;
}

const FirstPosition: Position[] = [
  { path: "/utilisateur/accueil",      icon: Home,        label: "Accueil"      },
  { path: "/utilisateur/bibliotheque", icon: GiBookshelf, label: "Bibliothèque" },
  { path: "/utilisateur/historique",   icon: MdHistory,   label: "Historique"   },
];

const UtilisateurSidebar = ({ closeSidebar, isOpen = true }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isHovered, setIsHovered]             = useState<string | null>(null);

  const handleNavClick = (path: string) => {
    navigate(path);
    closeSidebar?.();
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
        className={`group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
          font-medium transition-all duration-200 overflow-hidden
          ${isActive ? "text-[#0C3B2E]" : "text-slate-500 hover:text-[#0C3B2E]"}`}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Fond actif */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-[#FFBA00]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Fond survol */}
        {!isActive && isHovered === item.path && (
          <motion.div
            className="absolute inset-0 bg-[#0C3B2E]/8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <div className="relative z-10 flex items-center gap-2.5 w-full">
          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200
            ${isActive ? "scale-110" : "group-hover:scale-110"}`}
          />
          <span className="flex-1 text-left text-xs tracking-wide truncate">
            {item.label}
          </span>

          {/* Badge */}
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-black
              bg-[#0C3B2E] text-[#FFBA00] rounded-full ">
              {item.badge}
            </span>
          )}

          {/* Flèche active */}
          {isActive && (
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
              <ChevronRight className="w-3 h-3 text-[#0C3B2E] opacity-60" />
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
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col z-50
          overflow-hidden bg-white border-r border-[#0C3B2E]/10
          ${!isOpen && "md:translate-x-0"}`}
      >
        {/* Halo décoratif haut */}
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(12,59,46,0.06) 0%, transparent 70%)" }}
        />
        {/* Halo décoratif bas */}
        <div
          className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(255,186,0,0.08) 0%, transparent 70%)" }}
        />

        {/* ── En-tête ── */}
        <div className="relative z-10 px-5 py-5 border-b border-[#0C3B2E]/8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0C3B2E] flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-[#FFBA00]" />
              </div>
              <h1 className="text-lg font-black tracking-tight text-[#0C3B2E]">
                guen <span className="text-[#FFBA00]">Dian</span>
              </h1>
            </div>

            {/* Bouton fermeture mobile */}
            {closeSidebar && (
              <button
                onClick={closeSidebar}
                className="md:hidden w-7 h-7 rounded-full flex items-center justify-center
                  text-[#0C3B2E] hover:bg-[#0C3B2E]/8 transition-colors border border-[#0C3B2E]/15"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="relative z-10 flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Menu Principal
          </p>

          {FirstPosition.map((item) => (
            <NavButton
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        {/* ── Bas : déconnexion ── */}
        <div className="relative z-10 p-4">
          <div className="mb-3 h-px bg-[#0C3B2E]/8" />
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
              text-xs font-semibold border border-[#0C3B2E] text-black
              bg-[#FFBA00] hover:bg-[#0C3B2E] hover:text-black hover:border-[#FFBA00]
              transition-all duration-200"
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
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowLogoutModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1,   opacity: 1, y: 0  }}
              exit={{   scale: 0.9, opacity: 0, y: 10 }}
              className="relative rounded-2xl p-6 w-full max-w-xs bg-white
                border border-[#0C3B2E]/15 shadow-xl z-10"
            >
              {/* Icône */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center
                  bg-red-50 border border-red-200">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
              </div>

              {/* Texte */}
              <h2 className="text-base font-bold text-center text-[#0C3B2E] mb-1">
                Quitter la session ?
              </h2>
              <p className="text-xs text-center text-slate-400 mb-5 leading-relaxed">
                Vous devrez vous reconnecter pour accéder à votre espace utilisateur.
              </p>

              {/* Boutons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold
                    bg-white border border-[#0C3B2E]/20 text-slate-600
                    hover:bg-[#0C3B2E]/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold
                    bg-[#FFBA00] text-[#0C3B2E] hover:bg-[#e6a800] transition-colors"
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

export default UtilisateurSidebar;