// ── Livre imbriqué retourné par l'API ────────────────────────────────────────
export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  fichierPdf: string;
  cover: string;
  description: string;
  categorie: string;
}

// ── Historique — correspond exactement à la réponse de l'API ─────────────────
export interface Historique {
  id: number;
  utilisateurId: number;
  livreId: number;
  profilId: number | null;
  dernierePage: number;
  derniereAudio: number;
  createdAt: string;
  updatedAt: string;
  livre: Livre;  
  totalpages: number;           // ← objet imbriqué (plus titreLivre / auteur / genre à la racine)
}
export interface RepriseInfo {
  dernierePage: number;
  derniereAudio: number;
  positionAudio: number;
}

// ── DTO envoyé au POST /lecture/historique ────────────────────────────────────
export interface SaveHistoriqueDto {
  utilisateurId: number;
  livreId: number;
  dernierePage: number;
  derniereAudio: number;
  positionAudio?: number;
}

// ── Réponse de GET /lecture/reprendre/{userId}/{livreId} ──────────────────────
export interface RepriseInfo {
  dernierePage: number;
  derniereAudio: number;
  positionAudio: number;
}

// ── UI ────────────────────────────────────────────────────────────────────────
export interface ToastState {
  msg: string;
  type: "success" | "error";
}

export type FilterType = "Tous" | "En cours";
// "Terminés" retiré car l'API ne retourne pas totalPages