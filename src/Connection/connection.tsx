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
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // AUTH CHECK AU CHARGEMENT
  // =========================
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");

        // =========================
        // GOOGLE LOGIN CALLBACK
        // =========================
        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
          window.history.replaceState({}, document.title, "/connection");
        }

        const token = localStorage.getItem("token");
        if (!token || token === "undefined") return;

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // UNIQUEMENT si token invalide
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return;
        }

        if (!res.ok) return;

        const user: UserType = await res.json();
        

        localStorage.setItem("user", JSON.stringify(user));

        // redirection selon rôle
        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/site");
        }
      } catch (error) {
        console.warn("Auth check error (non bloquant):", error);
      }
    };

    checkAuth();
  }, [navigate]);

  // =========================
  // LOGIN CLASSIQUE
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    if (!email || !motDePasse) {
      setLoading(false);
      setMessage("Veuillez remplir tous les champs");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          motDePasse: motDePasse.trim(),
        }),
      });

      const data = await response.json();
      console.log("DATA LOGIN :", data.utilisateur);
      console.log(data);

      if (!response.ok) {
        setLoading(false);
        setMessage(data.message || "Erreur lors de la connexion");
        setMessageType("error");
        return;
      }
    

      const token: string = data.token;
      const user: UserType = data.utilisateur;

      if (!token || !user) {
        setLoading(false);
        setMessage("Réponse invalide du serveur");
        setMessageType("error");
        return;
      }

      // =========================
      // STOCKAGE PROPRE
      // =========================
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Connexion réussie !");
      setMessageType("success");

      setTimeout(() => {
        setLoading(false);

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/site");
        }
      }, 400);
    } catch (error) {
      console.error("Erreur:", error);
      setLoading(false);
      setMessage("Erreur serveur - Backend indisponible");
      setMessageType("error");
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google/login`;
  };

  return (
    <div className="bg-[#4b515d] min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#4b515d] to-[#c20074] w-96 rounded-3xl shadow-2xl p-6 text-white">

        <div className="text-center mb-6">
          <img src="/icones/zntcf1.png" alt="Logo" className="w-40 mx-auto" />
        </div>

        <div className="bg-[#4b515d] rounded-2xl p-6 shadow-2xl">

          <h2 className="text-center font-semibold text-xl mb-2">
            Bienvenue
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="relative">
              <User className="absolute left-3 top-2 w-5 h-5 text-black" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 pr-4 py-2 rounded-full w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2 w-5 h-5 text-black" />
              <input
                type="password"
                placeholder="Mot de passe"
                className="pl-10 pr-4 py-2 rounded-full w-full text-black"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c20074] py-2 rounded-full font-bold disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {message && (
            <div
              className={`text-center mt-3 p-2 rounded ${
                messageType === "error"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-black py-2 rounded-full"
          >
            <FcGoogle />
            Google
          </button>

          <div className="text-center mt-4 text-sm">
            Pas de compte ?{" "}
            <Link to="/inscrire" className="underline">
              S'inscrire
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Connection;