import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function InscriptionPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    pseudo: "",
    email: "",
    motDePasse: "",
    role: "USER",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1 — Inscription
      const response = await fetch(`${API_URL}/auth/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = "Erreur lors de l'inscription";
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // 2 — Login auto pour recuperer le token
      const loginRes = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          motDePasse: formData.motDePasse,
        }),
      });

      if (!loginRes.ok) {
        console.warn("Login auto echoue, avatar ignore");
        navigate("/connection");
        return;
      }

      const loginData = await loginRes.json();
      console.log("Reponse login :", loginData);

      const token =
        loginData.token ?? loginData.accessToken ?? loginData.jwt ?? null;

      console.log("Token extrait :", token);
      console.log("ID utilisateur :", data.id);
      console.log("Fichier avatar :", avatarFile);

      // 3 — Upload avatar avec le token
      if (avatarFile && data.id && token) {
        const form = new FormData();
        form.append("avatar", avatarFile);

        const avatarRes = await fetch(
          `${API_URL}/utilisateur/${data.id}/avatar`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: form,
          }
        );

        if (!avatarRes.ok) {
          const errText = await avatarRes.text();
          console.warn("Avatar non sauvegarde :", errText);
        } else {
          console.log("Avatar uploade avec succes !");
        }
      } else {
        console.warn("Condition non remplie — avatarFile:", avatarFile, "id:", data.id, "token:", token);
      }

      navigate("/connection");
    } catch (error) {
      console.error("Erreur inscription :", error);
      alert(error instanceof Error ? error.message : "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white rounded-2xl">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-[#0C3B2E]/15"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[#0C3B2E]">
          Inscription
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="hidden"
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload" className="cursor-pointer group">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#FFBA00] shadow"
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full bg-[#0C3B2E]/8 border-2 border-dashed
                border-[#0C3B2E]/30 flex flex-col items-center justify-center gap-1
                group-hover:border-[#FFBA00] transition-colors"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C3B2E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[9px] text-slate-400">Photo</span>
              </div>
            )}
          </label>
          {avatarPreview && (
            <button
              type="button"
              onClick={() => {
                setAvatarFile(null);
                setAvatarPreview(null);
              }}
              className="text-[10px] text-red-400 mt-1 hover:underline"
            >
              Supprimer
            </button>
          )}
        </div>

        {/* Champs */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#0C3B2E]">
            Pseudo
          </label>
          <input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
            className="w-full border border-[#0C3B2E]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C3B2E] text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#0C3B2E]">
            Nom
          </label>
          <input
            type="text"
            name="nomUtilisateur"
            value={formData.nomUtilisateur}
            onChange={handleChange}
            required
            className="w-full border border-[#0C3B2E]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C3B2E] text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#0C3B2E]">
            Prenom
          </label>
          <input
            type="text"
            name="prenomUtilisateur"
            value={formData.prenomUtilisateur}
            onChange={handleChange}
            required
            className="w-full border border-[#0C3B2E]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C3B2E] text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#0C3B2E]">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-[#0C3B2E]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C3B2E] text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#0C3B2E]">
            Mot de passe
          </label>
          <input
            type="password"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full border border-[#0C3B2E]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C3B2E] text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-[#0C3B2E]">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-[#0C3B2E]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C3B2E] text-sm"
          >
            <option value="USER">Utilisateur</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FFBA00] text-[#0C3B2E] font-semibold py-2.5 rounded-lg hover:bg-[#e6a800] transition text-sm"
        >
          S'inscrire
        </button>

        <div className="text-center text-sm mt-4 text-slate-500">
          Deja un compte ?{" "}
          <span
            className="text-[#0C3B2E] font-semibold underline cursor-pointer"
            onClick={() => navigate("/connection")}
          >
            Se connecter
          </span>
        </div>
      </form>
    </div>
  );
}