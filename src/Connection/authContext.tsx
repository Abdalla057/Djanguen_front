/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type User = {
  id: number;
  email: string;
  nomUtilisateur: string;
  prenomUtilisateur?: string;
  role: "USER" | "ADMIN";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // CHARGEMENT AU START
  // =========================
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setUser(null);
          localStorage.removeItem("token");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.warn("Auth init error", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // =========================
  // LOGIN TOKEN (GOOGLE + CLASSIQUE)
  // =========================
  const loginWithToken = async (token: string) => {
    localStorage.setItem("token", token);

    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    setUser(data);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);