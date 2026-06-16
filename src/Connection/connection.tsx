import React, { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface UserType {
  id: number;
  nomUtilisateur: string;
  prenomUtilisateur?: string;
  email: string;
  role: "USER" | "ADMIN";
}

const Connection: React.FC = () => {
  const [email, setEmail]             = useState("");
  const [motDePasse, setMotDePasse]   = useState("");
  const [message, setMessage]         = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [loading, setLoading]         = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const params       = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");

        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
          window.history.replaceState({}, document.title, "/connection");
        }

        const token = localStorage.getItem("token");
        if (!token || token === "undefined") return;

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return;
        }

        if (!res.ok) return;

        const user: UserType = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate(user.role === "ADMIN" ? "/admin" : "/utilisateur");
      } catch (error) {
        console.warn("Auth check error (non bloquant):", error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); setMessageType(""); setLoading(true);

    if (!email || !motDePasse) {
      setLoading(false);
      setMessage("Veuillez remplir tous les champs");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), motDePasse: motDePasse.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setMessage(data.message || "Erreur lors de la connexion");
        setMessageType("error");
        return;
      }

      const token: string  = data.token;
      const user: UserType = data.utilisateur;

      if (!token || !user) {
        setLoading(false);
        setMessage("Réponse invalide du serveur");
        setMessageType("error");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Connexion réussie !");
      setMessageType("success");

      setTimeout(() => {
        setLoading(false);
        navigate(user.role === "ADMIN" ? "/admin" : "/utilisateur");
      }, 400);
    } catch (error) {
      console.error("Erreur:", error);
      setLoading(false);
      setMessage("Erreur serveur - Backend indisponible");
      setMessageType("error");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google/login`;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">

      {/* ── Wrapper deux colonnes ── */}
      <div className="flex rounded-3xl shadow-2xl overflow-hidden w-[820px]">

        {/* ── GAUCHE — formulaire ── */}
        <div className="bg-gradient-to-br from-[#0C3B2E] to-[#0C3B2E]/80 w-96 flex-shrink-0 p-8 flex flex-col justify-center">

          {/* Logo / titre */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#FFBA00] flex items-center justify-center mx-auto mb-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="#0C3B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h1 className="text-white text-2xl font-black tracking-tight">Dianguen</h1>
            <p className="text-white/50 text-xs mt-1">Votre espace de lecture</p>
          </div>

          {/* Carte formulaire */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-white font-semibold text-lg mb-5 text-center">
              Bienvenue
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-white/50" />
                <input
                  type="email"
                  placeholder="Email"
                  className="pl-9 pr-4 py-2.5 rounded-xl w-full text-sm
                    bg-white/10 border border-white/20 text-white placeholder-white/40
                    focus:outline-none focus:border-[#FFBA00] transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mot de passe */}
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-white/50" />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="pl-9 pr-4 py-2.5 rounded-xl w-full text-sm
                    bg-white/10 border border-white/20 text-white placeholder-white/40
                    focus:outline-none focus:border-[#FFBA00] transition-colors"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                />
              </div>

              {/* Bouton connexion */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFBA00] text-[#0C3B2E] py-2.5 rounded-xl
                  font-bold text-sm hover:bg-[#e6a800] transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            {/* Message erreur / succès */}
            {message && (
              <div className={`text-center mt-3 p-2.5 rounded-xl text-xs font-medium ${
                messageType === "error"
                  ? "bg-red-500/20 text-red-300 border border-red-500/20"
                  : "bg-green-500/20 text-green-300 border border-green-500/20"
              }`}>
                {message}
              </div>
            )}

            {/* Séparateur */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/15" />
              <span className="text-white/30 text-xs">ou</span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full
                bg-white text-[#0C3B2E] py-2.5 rounded-xl text-sm font-semibold
                hover:bg-gray-100 transition-colors"
            >
              <FcGoogle size={18} />
              Continuer avec Google
            </button>

            {/* Lien inscription */}
            <p className="text-center mt-4 text-xs text-white/40">
              Pas de compte ?{" "}
              <Link to="/inscrire" className="text-[#FFBA00] font-semibold hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>

        {/* ── DROITE — image ── */}
        <div className="flex-1 relative bg-[#0C3B2E] hidden md:block">
          <img
            src="/images/image3.jpg"
            alt="Couverture"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Overlay + citation */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E] via-[#0C3B2E]/20 to-transparent
            flex flex-col justify-end p-8">
            <div className="w-8 h-1 bg-[#FFBA00] rounded-full mb-3" />
            <p className="text-white text-3xl font-black leading-snug mb-2">
              "Dianguen"
            </p>
            <p className="text-white/50 text-sm">
              Votre bibliothèque numérique personnelle
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Connection;