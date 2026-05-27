// ─────────────────────────────────────────────
// Types API — Livres & Audios
// ─────────────────────────────────────────────

/** GET /admin/livre  |  GET /admin/livre/:id */
export interface LivreApi {
  id: number;
  titre: string;
  auteur: string;
  description: string;
  categorie: string;
  coverUrl?: string;
  pdfUrl?: string;
  createdAt?: string;
  audios?: { id: number }[]; 
  cover?: string;
}





/** POST /admin/livre  |  PATCH /admin/livre/:id — multipart/form-data */
export interface CreateLivreDto {
  titre: string;
  auteur: string;
  description: string;
  categorie: string;
  fichierPdf?: File;
  cover?: File;
}

export type UpdateLivreDto = Partial<CreateLivreDto>;

/** GET /admin/livre/:id/audios  |  GET /audios/livre/:livreId */
export interface AudioApi {
  id: number;
  livreId: number;
  pageDebut: number;
  pageFin: number;
  audioUrl?: string;
}

/** POST /admin/upload-audio/:livreId — multipart/form-data */
export interface CreateAudioDto {
  pageDebut: number;
  pageFin: number;
  fichierAudio?: File;
}