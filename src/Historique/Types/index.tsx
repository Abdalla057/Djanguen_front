export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  cover: string;
  pages: number;
  totalPages: number;
  progression: number;
  audio: number;
  date?: string;
}

export interface Utilisateur {
  [x: string]: any;
  nom: string;
  avatar: string;
  livres: number;
  heures: number;
  streak: number;
}
export default Livre;