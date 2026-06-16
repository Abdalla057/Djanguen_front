import React, { useState, useEffect, useRef, useCallback } from "react";
import { Settings, Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderState {
  showProfileMenu: boolean;
}

const UtilisateurHeader = () => {
  const navigate       = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<HeaderState>({ showProfileMenu: false });

  const notifications = 3;

  const handleToggleProfileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showProfileMenu: !prev.showProfileMenu }));
  }, []);

  const handleCloseProfileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showProfileMenu: false }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        handleCloseProfileMenu();
      }
    };
    if (state.showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [state.showProfileMenu, handleCloseProfileMenu]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.showProfileMenu) handleCloseProfileMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [state.showProfileMenu, handleCloseProfileMenu]);

  return (
    <header className="w-full bg-white border-b border-[#0C3B2E]/10 px-6 py-3">
      <div className="flex justify-end items-center gap-2 relative" ref={profileMenuRef}>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl
          border border-[#0C3B2E]/15 text-[#0C3B2E] hover:bg-[#0C3B2E]/8
          transition-colors">
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFBA00] rounded-full
              text-[9px] text-[#0C3B2E] flex items-center justify-center font-black">
              {notifications}
            </span>
          )}
        </button>

        {/* Bouton profil */}
        <button
          onClick={handleToggleProfileMenu}
          className="flex items-center gap-2 px-3 py-2 rounded-xl
            border border-[#0C3B2E]/15 hover:bg-[#0C3B2E]/5
            transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[#0C3B2E] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-black text-[#FFBA00]">A</span>
          </div>
          <span className="text-xs font-semibold text-[#0C3B2E]">Utilisateur</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200
              ${state.showProfileMenu ? "rotate-180" : ""}`}
          />
        </button>

        {/* Menu déroulant */}
        {state.showProfileMenu && (
          <div className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-white
            border border-[#0C3B2E]/15 shadow-lg z-50 overflow-hidden">

            {/* Identité */}
            <div className="px-4 py-3 border-b border-[#0C3B2E]/8 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0C3B2E] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-[#FFBA00]">A</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0C3B2E] leading-tight">Admin User</p>
                <p className="text-[11px] text-slate-400">Administrateur</p>
              </div>
            </div>

            {/* Paramètres */}
            <button
              onClick={() => { navigate("/Parametre"); handleCloseProfileMenu(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs
                text-slate-600 hover:bg-[#0C3B2E]/5 hover:text-[#0C3B2E]
                transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-[#0C3B2E]" />
              Paramètres
            </button>

            {/* Séparateur + Déconnexion */}
            <div className="border-t border-[#0C3B2E]/8">
              <button
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs
                  text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Se déconnecter
              </button>
            </div>

          </div>
        )}

      </div>
    </header>
  );
};

export default UtilisateurHeader;