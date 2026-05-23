import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../ComposantSite/userContext';

interface LivreData {
  id: string | number;
  titre: string;
  auteur?: string;
}

/**
 * Hook pour gérer le flux de lecture complet
 * Livre → Ajouter à historique → Rediriger vers le livre dans l'historique
 */
export const useFluxLecture = () => {
  const navigate = useNavigate();
  const { profile } = useUser();

  /**
   * Démarrer la lecture d'un livre
   * @param livre - Les données du livre
   */
  const commencerLecture = useCallback(
    async (livre: LivreData) => {
      if (!profile) {
        navigate('/connection');
        return;
      }

      try {
        // Créer une entrée d'historique
        const entreeHistorique = {
          userId: profile.id,
          livreId: livre.id,
          titre: livre.titre,
          auteur: livre.auteur,
          dernierePage: 0,
          derniereAudio: 0,
          dateDebut: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // ✅ Utilise le proxy Vite (commence par /)
        const response = await fetch('/lecture/historique', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entreeHistorique),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Rediriger vers la page de lecture du livre
          navigate(`/livre/${livre.id}/lecture`, {
            state: { historiqueId: data.id, livre },
          });
        } else {
          console.error('Erreur lors de la création de l\'historique');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    [profile, navigate]
  );

  /**
   * Rediriger vers l'historique après avoir cliqué sur un livre
   * Utilise l'userId du profil pour récupérer l'historique
   * @param livre - Les données du livre
   */
  const allerALHistorique = useCallback(
    (livre: LivreData) => {
      if (!profile) {
        navigate('/connection');
        return;
      }

      // Rediriger vers l'historique avec l'userId et le livre en focus
      navigate(`/lecture/historique/${profile.id}`, {
        state: { scrollToLivre: livre.id },
      });
    },
    [profile, navigate]
  );

  return {
    commencerLecture,
    allerALHistorique,
    isConnected: !!profile,
  };
};