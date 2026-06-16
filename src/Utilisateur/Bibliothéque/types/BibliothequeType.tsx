export interface Livre {
  id:          number;
  titre?:      string;
  auteur?:     string;
  categorie?:  string;
  cover?:      string;
  fichierPdf?: string;
  tag?:        string;
}

export type ModeAffichage = "grille" | "compacte";