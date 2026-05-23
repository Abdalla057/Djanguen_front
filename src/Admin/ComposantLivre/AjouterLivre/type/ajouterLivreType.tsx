export interface AjouterLivreProps {
  isOpen:     boolean;
  onClose:    () => void;
  onSuccess?: () => void;
}

export interface EtatFormulaire {
  titre:       string;
  auteur:      string;
  description: string;
  categorie:   string;
  fichierPdf:  File | null;
  fichierCover:File | null;
  apercuCover: string | null;
}

export interface EtatMessage {
  texte: string;
  type:  "succes" | "erreur" | "";
}

export type TypeGlisser = "pdf" | "cover" | null;

export const CATEGORIES = [
  "hadis",
  "tafsir",
  "fiqh",
  "histoire",
  "Sciences",
] as const;