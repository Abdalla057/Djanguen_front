import type { Historique, SaveHistoriqueDto, RepriseInfo } from "../type/historique.types";

const API_URL = import.meta.env.VITE_API_URL ?? "../../api";

const getHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
});

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error((await res.text()) || `Erreur ${res.status}`);
  return res.json() as Promise<T>;
}

export const historiqueApi = {
  /** GET /lecture/historique/{userId} */
  getByUser: (userId: number): Promise<Historique[]> =>
    fetch(`${API_URL}/lecture/historique/${userId}`, { headers: getHeaders() })
      .then(handleResponse<Historique[]>),

  /** GET /lecture/historique/{userId}/{livreId} */


  getLastProgress: (userId: number, livreId: number): Promise<Historique> =>
    fetch(`${API_URL}/lecture/historique/${userId}/${livreId}`, { headers: getHeaders() })
      .then(handleResponse<Historique>),

  /** GET /lecture/reprendre/{userId}/{livreId} */

  reprendre: (userId: number, livreId: number): Promise<RepriseInfo> =>
    fetch(`${API_URL}/lecture/reprendre/${userId}/${livreId}`, { headers: getHeaders() })
      .then(handleResponse<RepriseInfo>),

  /** POST /lecture/historique */
  
  save: (dto: SaveHistoriqueDto): Promise<Historique> =>
    fetch(`${API_URL}/lecture/historique`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(dto),
    }).then(handleResponse<Historique>),

  /** DELETE /lecture/historique/{id} */
  delete: (id: number): Promise<void> =>
    fetch(`${API_URL}/lecture/historique/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse<void>),
};
