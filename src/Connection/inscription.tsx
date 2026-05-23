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
    role: "USER", // ajout du rôle par défaut
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
         const errorData = await response.json();
           console.log(errorData);

     throw new Error(
        errorData.message || "Erreur lors de l'inscription"
      );
    
    }

      navigate("/connection");
    } catch (error) {
      console.error("Erreur inscription :", error);
      alert(error instanceof Error ? error.message : "Erreur");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
          <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            name="nomUtilisateur"
            value={formData.nomUtilisateur}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Prénom</label>
          <input
            type="text"
            name="prenomUtilisateur"
            value={formData.prenomUtilisateur}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="USER">Utilisateur</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          S'inscrire
        </button>

        <div className="text-center text-sm mt-4">
          Déjà un compte ?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/connection")}
          >
            Se connecter
          </span>
        </div>
      </form>
    </div>
  );
}
