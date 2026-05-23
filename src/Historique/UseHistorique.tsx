import { useMemo } from 'react';
import { useHistorique as useHistoriqueBackend } from './UseHistorique';

interface HistoriqueEntry {
  id: string | number;
  livre: {
    id: string | number;
    titre: string;
  };
  dernierePage: number | string;
  derniereAudio: number | string;
  updatedAt: string | Date;
}

interface HistoriqueStats {
  totalLectures: number;
  livresUniques: number;
  derniereDate: string;
}

interface UseHistoriqueReturn {
  historique: HistoriqueEntry[];
  loading: boolean;
  error: string | null;
  deleteHistorique: (id: string | number) => void;
  dernierLivre: HistoriqueEntry | undefined;
  stats: HistoriqueStats;
}

/**
 * Hook personnalisé pour la gestion de l'historique de lecture
 * Combine les données du hook backend avec la logique UI
 */
export const useHistorique = (): UseHistoriqueReturn => {
  const { historique, loading, error, deleteHistorique } = useHistoriqueBackend();

  // Dernier livre lu
  const dernierLivre = historique[0];

  // Statistiques
  const stats = useMemo(() => {
    return {
      totalLectures: historique.length,
      livresUniques: new Set(historique.map((h: HistoriqueEntry) => h.livre.id)).size,
      derniereDate: historique[0] ? new Date(historique[0].updatedAt).toLocaleDateString('fr-FR') : 'N/A',
    };
  }, [historique]);

  return {
    historique,
    loading,
    error,
    deleteHistorique,
    dernierLivre,
    stats,
  };
};