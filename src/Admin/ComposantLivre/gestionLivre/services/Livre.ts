import axios from "axios";
import { API_URL } from "../constante/constante";
import { LivreApi } from "../type/GestionType";

export const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
});

export interface LivreStats {
  totalLivres: number;
  livresAvecAudio: number;
}

export async function fetchLivre(): Promise<LivreStats> {
  try {
    const { data } = await axios.get<LivreApi[]>(
      `${API_URL}/admin/livre`,
      { headers: getHeaders() }
    );

    const totalLivres = data.length;
    const livresAvecAudio = data.filter(
      (livre) => livre.audios && livre.audios.length > 0
    ).length;

    return { totalLivres, livresAvecAudio };
  } catch (err) {
    console.error("Erreur chargement livres :", err);
    return { totalLivres: 0, livresAvecAudio: 0 };
  }
}