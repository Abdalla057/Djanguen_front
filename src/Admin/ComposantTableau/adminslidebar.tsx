import React, { useState } from "react";
import { BookOpen, Home, LogOut, X, AlertCircle, ChevronRight, User } from "lucide-react";
import { GiBookshelf } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────
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

// ── Liens de navigation ────────────────────────────────
const FirstPosition: Position[] = [
  { path: "/admin/home",         icon: Home,        label: "Home" },
  { path: "/admin/livres",       icon: BookOpen,    label: "Gestion des livres" },
  { path: "/admin/bibliotheque", icon: GiBookshelf, label: "Bibliothèque" },
  { path: "/admin/historique",   icon: MdHistory,   label: "Historique" },
];

const AdminSidebar = ({ closeSidebar, isOpen = true }: AdminSidebarProps) => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isHovered, setIsHovered]             = useState<string | null>(null);

  // Navigation vers une page et fermeture du sidebar sur mobile
  const handleNavClick = (path: string) => {
    navigate(path);
    if (closeSidebar) closeSidebar();
  };

  // Déconnexion : suppression du token et redirection
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Connection");
  };

  // ── Bouton de navigation individuel ───────────────────
  const NavButton = ({ item, isActive }: { item: Position; isActive: boolean }) => {
    const Icon = item.icon;
    return (
      <motion.button
        onMouseEnter={() => setIsHovered(item.path)}
        onMouseLeave={() => setIsHovered(null)}
        onClick={() => handleNavClick(item.path)}
        className={`group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
          isActive ? "text-white" : "text-slate-300 hover:text-white"
        }`}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Fond animé pour l'élément actif */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-gradient-to-r from-indigo-600/60 to-purple-600/60 shadow-[0_0_16px_rgba(79,70,229,0.25)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Fond au survol pour les éléments inactifs */}
        {!isActive && isHovered === item.path && (
          <motion.div
            className="absolute inset-0 bg-white/8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Contenu du bouton : icône + label + badge optionnel */}
        <div className="relative z-10 flex items-center gap-2.5 w-full">
          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-500 ${
            isActive ? "scale-110 rotate-3" : "group-hover:scale-110"
          }`} />
          <span className="flex-1 text-left text-xs tracking-wide truncate">{item.label}</span>

          {/* Badge numérique optionnel */}
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full">
              {item.badge}
            </span>
          )}

          {/* Flèche indicatrice sur l'élément actif */}
          {isActive && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <ChevronRight className="w-3 h-3 opacity-50" />
            </motion.div>
          )}
        </div>
      </motion.button>
    );
  };

  return (
    <>
      {/* ── Overlay sombre sur mobile quand le sidebar est ouvert ── */}
      <AnimatePresence>
        {isOpen && closeSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          SIDEBAR PRINCIPALE
      ══════════════════════════════════════ */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col z-50 overflow-hidden ${
          !isOpen && "md:translate-x-0"
        }`}
        style={{
          background: "linear-gradient(160deg, #0f0c29 0%, #302b63 60%, #24243e 100%)",
        }}
      >
        {/* Halo décoratif rose — coin haut gauche */}
        <div style={{
          position: "absolute", top: "-100px", left: "-100px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,0,116,0.28) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Halo décoratif indigo — coin bas droite */}
        <div style={{
          position: "absolute", bottom: "-80px", right: "-80px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Panneau glassmorphism interne */}
        <div
          className="absolute inset-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        />

        {/* ── En-tête / Logo ── */}
        <div className="relative z-10 px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              {/* Icône logo avec halo au survol */}
              <div className="relative group">
                <div className="absolute -inset-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-700" />
                <div
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <BookOpen className="w-4 h-4 text-indigo-300" />
                </div>
              </div>

              {/* Nom de l'application */}
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight leading-none">
                  DARSH<span className="text-indigo-400">APP</span>
                </h1>
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-bold mt-0.5">
                  Administration
                </p>
              </div>
            </div>

            {/* Bouton de fermeture — visible uniquement sur mobile */}
            {closeSidebar && (
              <button
                onClick={closeSidebar}
                className="md:hidden w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <X className="w-3 h-3 text-slate-300" />
              </button>
            )}
          </div>
        </div>

        {/* ── Navigation principale ── */}
        <nav className="relative z-10 flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
          <div className="px-3 mb-3">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em]">
              Menu Principal
            </p>
          </div>

          {/* Rendu de chaque lien de navigation */}
          {FirstPosition.map((item) => (
            <div key={item.path}>
              <NavButton item={item} isActive={location.pathname === item.path} />
            </div>
          ))}
        </nav>

        {/* ── Section bas : profil + déconnexion ── */}
        <div className="relative z-10 p-3 mt-auto">

          {/* Séparateur */}
          <div className="mb-3" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

          {/* Carte profil */}
          <div
            className="p-3 rounded-xl mb-3"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(194,0,116,0.5))",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-semibold text-white truncate flex-1">Admin User</p>
            </div>
          </div>

          {/* Bouton de déconnexion */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full group flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all duration-300"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#f87171",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.75)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
            }}
          >
            <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Déconnexion
          </button>
        </div>
      </motion.aside>

      {/* ══════════════════════════════════════
          MODAL DE CONFIRMATION DE DÉCONNEXION
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">

            {/* Fond assombri avec fermeture au clic */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />

            {/* Contenu de la modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative rounded-[2.5rem] p-10 w-full max-w-md overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0f0c29 0%, #302b63 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 32px 64px -12px rgba(0,0,0,0.6)",
              }}
            >
              {/* Halo décoratif coin haut droit */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: "200px", height: "200px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(194,0,116,0.2) 0%, transparent 70%)",
                transform: "translate(50%,-50%)", pointerEvents: "none",
              }} />

              <div className="relative z-10">

                {/* Icône d'avertissement */}
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                  }}
                >
                  <AlertCircle className="w-10 h-10 text-red-400" />
                </div>

                {/* Titre et description */}
                <h2 className="text-2xl font-bold mb-3 text-center text-white tracking-tight">
                  Quitter la session ?
                </h2>
                <p className="text-slate-400 text-center mb-10 text-sm leading-relaxed">
                  Votre session sera terminée. Vous devrez vous reconnecter pour accéder à l'administration.
                </p>

                {/* Boutons d'action */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #c20074, #7c3aed)" }}
                  >
                    Confirmer la déconnexion
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="w-full py-4 text-white rounded-2xl font-bold transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Rester connecté
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;