import React from 'react';
import { useFluxLecture } from './UseFluxLecture';
import { BookOpen, Play, Zap } from 'lucide-react';

interface CarteLivreProps {
  id: string | number;
  titre: string;
  auteur: string;
  couverture: string;
  description?: string;
  pages?: number;
  audioDisponible?: boolean;
}

/**
 * Composant CarteLivre avec navigation vers l'historique
 */
export function CarteHistorique({
  id,
  titre,
  auteur,
  couverture,
  description,
  pages,
  audioDisponible = false,
}: CarteLivreProps) {
  const { allerALHistorique, commencerLecture, isConnected } = useFluxLecture();

  const handleCardClick = () => {
    if (!isConnected) {
      // Si non connecté, rediriger vers connexion
      window.location.href = '/connection';
      return;
    }

    // Rediriger vers l'historique de ce livre
    allerALHistorique({
      id,
      titre,
      auteur,
    });
  };

  const handleLireClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    commencerLecture({
      id,
      titre,
      auteur,
    });
  };

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
      onClick={handleCardClick}
    >
      {/* Image de couverture */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={couverture}
          alt={titre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleLireClick}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all"
            title="Commencer la lecture"
          >
            <Play size={24} fill="white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all"
            title="Voir l'historique"
          >
            <BookOpen size={24} />
          </button>
        </div>

        {/* Badge Audio */}
        {audioDisponible && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Zap size={14} />
            Audio
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
          {titre}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{auteur}</p>

        {description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">{description}</p>
        )}

        {pages && (
          <p className="text-xs text-gray-500">📄 {pages} pages</p>
        )}

        {/* CTA Principal */}
        <button
          onClick={handleCardClick}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Voir l'historique
        </button>
      </div>
    </div>
  );
}

export default CarteHistorique;