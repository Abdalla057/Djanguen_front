/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";



const API_URL = import.meta.env.VITE_API_URL;

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  cover: string;
}

const ListeModifier = () => {
  const [livres, setLivres] = useState<Livre[]>([]);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/livre`);
        setLivres(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des livres", err);
      }
    };
    fetchLivres();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
      try {
        await axios.delete(`${API_URL}/admin/livre/${id}`);
        setLivres((prev) => prev.filter((livre) => livre.id !== id));
        alert("Livre supprimé avec succès");
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {livres.map((livre) => (
        <div
          key={livre.id}
          className="bg-white rounded shadow hover:shadow-lg transition"
        >
          <img
            src={`${API_URL}/uploads/images/${livre.cover}`}
            alt={livre.titre}
            className="w-full h-48 object-cover rounded-t"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">{livre.titre}</h2>
            <p className="text-sm text-gray-600">{livre.auteur}</p>
            <div className="flex gap-2 mt-4">
           <Link to={`/admin/livre/${livre.id}/modifierlivre`}>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
              Modifier
              </button>
           </Link>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleDelete(livre.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListeModifier;
