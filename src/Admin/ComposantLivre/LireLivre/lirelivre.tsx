import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";


const API_URL = import.meta.env.VITE_API_URL;

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  description:string;
  categorie: string;
  fichierPdf: string;
  cover: string;
}

const ListeLivres = () => {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/livres)`);
        setLivres(response.data.slice(0, 50)); // ← Limiter à 20 livres pour éviter surcharge
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivres();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Chargement des livres...</p>;
  }

  if (livres.length === 0) {
    return <p className="text-center mt-10">Aucun livre disponible.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Liste des Livres</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {livres.map((livre) => (
          <div key={livre.id} className="relative group bg-white rounded-xl shadow overflow-hidden">
            <img
              src={
                livre.cover
                  ? `${API_URL}/uploads/images/${livre.cover}`
                  : "/placeholder.png"
              }
              alt={`Couverture de ${livre.titre}`}
              loading="lazy"
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            <div
              onClick={() => {
                if (livre.fichierPdf) {
                  window.open(`${API_URL}/uploads/pdf/${livre.fichierPdf}`, "_blank");
                }
              }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <span className="text-white text-lg font-bold">📖 Ouvrir le PDF</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold truncate">{livre.titre}</h3>
              <p className="text-gray-600">Auteur : {livre.auteur}</p>
              <p className="text-gray-600">Description : {livre.description}</p>
              <p className="text-gray-600">Categorie : {livre.categorie}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeLivres;
