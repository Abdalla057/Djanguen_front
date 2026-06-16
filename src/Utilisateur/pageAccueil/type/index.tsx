import { Page } from "@/src/Lecture/type/livreType";

export interface User {
  id: number;
  prenomUtilisateur: string;
  nomUtilisateur: string;
  pseudo: string;
  email?: string;
  avatar?: string;
}

export interface Historique {
  livreId: number;
  titre: string;
  dernierePage: number;
  totalPages: number;
  positionAudio: number;
  derniereAudio?: number;
}

export interface Palette {
  bg: string;
  icon: string;
  iconColor: string;
  barColor: string;
}

export interface Segment {
  label: string;
  val: number;
  color: string;
}

export interface DashboardStats {
  totalLivres: number;
  totalPages: number;
  totalMinutes: number;
}
export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  fichierPdf: string;
  cover?: string;
  description?: string;
  categorie?: string;
  tag?: string;
  pages?: Page[];
  estNouveau?: boolean;
}
