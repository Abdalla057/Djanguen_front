export interface Page {
  id:        number;
  numero:    number;
  imagePath: string;
}

export interface Audio {
  id:           number;
  fichierAudio: string;
  pageDebut:    number;
  pageFin:      number;
}

export interface Livre {
  id:    number;
  titre: string;
}

export interface AudioStatusPanelProps {
  livre:      Livre;
  onAddAudio: (livreId: number, pageDebut: number, pageFin: number) => void;
}

export interface StatutPage {
  page:     Page;
  audio:    Audio | null;
  couverte: boolean;
}

export interface Statistiques {
  couvertes:    number;
  nonCouvertes: number;
  total:        number;
  pourcentage:  number;
}

export interface PlagePages {
  debut: number;
  fin:   number;
}