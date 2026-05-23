export interface UploaderAudioProps {
  isOpen?:           boolean;
  onClose?:          () => void;
  onSuccess?:        () => void;
  livres?:           Array<{ id: number; titre: string }>;
  asModal?:          boolean;
  defaultLivreId?:   number;
  defaultPageDebut?: number;
  defaultPageFin?:   number;
}

export interface EtatNotification {
  afficher: boolean;
  type:     "succes" | "erreur";
  message:  string;
}

export interface EtatFormulaire {
  livreId:      string;
  pageDebut:    string;
  pageFin:      string;
  fichierAudio: File | null;
  apercu:       string;
}