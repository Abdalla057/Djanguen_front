import { useState, useEffect, useCallback } from "react";
import { historiqueApi } from "./historique.api";
import type { Historique, SaveHistoriqueDto, ToastState, RepriseInfo } from "../type/historique.types";

export interface UseHistoriqueReturn {
  historique: Historique[];
  loading: boolean;
  error: string | null;
  toastMsg: ToastState | null;
  deleteEntry: (id: number) => Promise<void>;
  saveProgression: (dto: SaveHistoriqueDto) => Promise<void>;
  refresh: () => void;
  reprendre: (livreId: number) => Promise<unknown>;
}

export function useHistorique(userId: number): UseHistoriqueReturn {
  const [historique, setHistorique] = useState<Historique[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [toastMsg,   setToastMsg]   = useState<ToastState | null>(null);



  const notify = (msg: string, type: ToastState["type"] = "success") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const fetchAll = useCallback(async () => {
  if (!userId){

    console.log ("fecthAll bloqué-userId:",userId);
    return; // ← bloque le fetch si userId est 0
  }
    
  setLoading(true);
  setError(null);
  try {
     console.log(" Appel API avec userId:", userId);
    const data = await historiqueApi.getByUser(userId);
    console.log(" Données reçues:", data);
    setHistorique(data);
  } catch (e) {
    console.log(" Erreur:", e);
    setError(e instanceof Error ? e.message : "Erreur inconnue");
  } finally {
    setLoading(false);
  }
}, [userId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const deleteEntry = async (id: number) => {
    try {
      await historiqueApi.delete(id);
      setHistorique((prev) => prev.filter((h) => h.id !== id));
      notify("Entrée supprimée");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Suppression échouée", "error");
    }
  };

  const saveProgression = async (dto: SaveHistoriqueDto) => {
    try {
      await historiqueApi.save(dto);
      notify("Progression sauvegardée ✓");
      fetchAll();
    } catch (e) {
      notify(e instanceof Error ? e.message : "Sauvegarde échouée", "error");
    }
  };
  const reprendre = async (livreId: number): Promise<RepriseInfo | undefined> => {
  try {
    const info = await historiqueApi.reprendre(userId, livreId);
    notify(`Reprise du livre #${livreId}`);
    return info;
  } catch (e) {
    notify(e instanceof Error ? e.message : "Reprise impossible", "error");
  }
};

  return { historique, loading, error, toastMsg, deleteEntry, saveProgression, reprendre, refresh: fetchAll };
}