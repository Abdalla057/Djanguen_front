/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/* ================== TYPES ================== */
export interface UserProfile {
  id: string | number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  email: string;
  avatar?: string;
}

/* ================== CONTEXT ================== */
interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loadProfileFromLocalStorage: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/* ================== PROVIDER ================== */
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadProfileFromLocalStorage();
  }, []);

  const loadProfileFromLocalStorage = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setProfileState(null);
        setIsAuthenticated(false);
        return;
      }

      const userData = localStorage.getItem('user');
      if (!userData) return;

      const user = JSON.parse(userData);

      const loadedProfile: UserProfile = {
        id: user.id || Date.now(),
        nomUtilisateur: user.nomUtilisateur || 'Utilisateur',
        prenomUtilisateur: user.prenomUtilisateur || 'Nouveau',
        email: user.email || '',
        avatar: user.avatar || '👤',
      };

      setProfileState(loadedProfile);
      setIsAuthenticated(true);
      localStorage.setItem('userProfile', JSON.stringify(loadedProfile));
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      setProfileState(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (profile) localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    setIsAuthenticated(true);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      setProfileState(updatedProfile);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    setProfileState(null);
    setIsAuthenticated(false);
  };

  const value: UserContextType = {
    profile,
    setProfile,
    updateProfile,
    logout,
    isAuthenticated,
    loadProfileFromLocalStorage,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

/* ================== HOOK ================== */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser doit être utilisé avec UserProvider');
  return context;
};