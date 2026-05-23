import React, { useState, useEffect, useRef, useCallback,} from 'react';
import { Settings, Bell,  ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




interface HeaderState {
  showProfileMenu: boolean;
  isLoading: boolean;
}

const AdminHeader = () => {
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<HeaderState>({
    showProfileMenu: false,
    isLoading: false,
  });



  const notifications = 3; // Exemple: notifications liées aux livres (nouveaux ajouts, emprunts, retours)

  // --- Handlers ---
  const handleSettingsClick = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    setState((prev) => ({ ...prev, isLoading: false }));
    navigate('/Parametre');
  }, [navigate]);

  const handleToggleProfileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showProfileMenu: !prev.showProfileMenu }));
  }, []);

  const handleCloseProfileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showProfileMenu: false }));
  }, []);


   // ✅ Ferme le menu si clic à l'extérieur
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

  // ✅ Ferme le menu à l'échappement
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.showProfileMenu) handleCloseProfileMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [state.showProfileMenu, handleCloseProfileMenu]);

  // --- Sous-composants ---
  const NotificationsButton = () => (
    <button className="relative p-2 rounded-lg bg-gray-700/40 hover:bg-gray-700/60">
      <Bell className="w-5 h-5 text-red-200 animate-pulse hover:animate-none" />
      {notifications > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          {notifications}
        </span>
      )}
    </button>
  );

  const SettingsButton = () => (
    <button
      onClick={handleSettingsClick}
      disabled={state.isLoading}
      className="p-2 rounded-lg bg-gray-700/40 hover:bg-gray-700/60 disabled:opacity-50"
    >
      <Settings className={`w-5 h-5 ${state.isLoading ? 'animate-spin' : ''}`} />
    </button>
  );


  return (
    <header className="relative w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 shadow-lg">
      <div className="flex justify-end items-center gap-3 relative" ref={profileMenuRef}>
        <NotificationsButton />
        <SettingsButton />
        <button
          onClick={handleToggleProfileMenu}
          className="flex items-center gap-2 p-2 bg-gray-700/40 rounded-lg"
        >
        
          <ChevronDown
            className={`w-4 h-4 transition-transform ${state.showProfileMenu ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;