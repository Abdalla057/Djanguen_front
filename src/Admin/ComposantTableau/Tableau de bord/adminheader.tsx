import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings, Bell, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderState {
  showProfileMenu: boolean;
  isLoading: boolean;
}

const AdminHeader = () => {
  const navigate       = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<HeaderState>({
    showProfileMenu: false,
    isLoading: false,
  });

  const notifications = 2; // Exemple de nombre de notifications, à remplacer par une valeur dynamique si nécessaire


  const handleToggleProfileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showProfileMenu: !prev.showProfileMenu }));
  }, []);

  const handleCloseProfileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showProfileMenu: false }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        handleCloseProfileMenu();
      }
    };
    if (state.showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [state.showProfileMenu, handleCloseProfileMenu]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.showProfileMenu) handleCloseProfileMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [state.showProfileMenu, handleCloseProfileMenu]);

  const NotificationsButton = () => (
    <button className="relative p-2 rounded-xl bg-white border border-[#0c3b2e] hover:bg-white transition-all shadow-sm">
      <Bell className="w-5 h-5 text-[#ffBA00] animate-pulse hover:animate-none" />
      {notifications > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6D9773] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
          {notifications}
        </span>
      )}
    </button>
  );

  return (
    /* bgPage + heroSaumon border bas */
    <header className="w-full bg-white border-[#0c3b2e] px-6 py-3 shadow-sm">
      <div className="flex justify-end items-center gap-3 relative" ref={profileMenuRef}>

        <NotificationsButton />

        {/* Bouton profil — bgWhite + heroSaumon border */}
        <button
          onClick={handleToggleProfileMenu}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#ffffff] border border-[#fde8d8] hover:bg-white transition-all shadow-sm"
        >
          {/* Avatar — cta gradient */}
          <div className="w-6 h-6 rounded-full bg-[#ffBA00] flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#1a1a2e]">A</span>
          </div>
          <span className="text-xs font-semibold text-[#1a1a2e]">Admin</span>
          <ChevronDown
            className={`w-4 h-4 text-[#6b7280] transition-transform duration-300 ${
              state.showProfileMenu ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Menu déroulant — bgWhite + heroSaumon border */}
        {state.showProfileMenu && (
          <div className="absolute top-full right-0 mt-2 w-44 rounded-2xl bg-white border  shadow-lg z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#fde8d8]">
              <p className="text-xs font-bold text-[#1a1a2e]">Admin User</p>
              <p className="text-[11px] text-[#6b7280]">Administrateur</p>
            </div>
            <button
              onClick={() => navigate('/Parametre')}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-[#374151] hover:bg-white transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-black" />
              Paramètres
            </button>
          </div>
        )}

      </div>
    </header>
  );
};

export default AdminHeader;