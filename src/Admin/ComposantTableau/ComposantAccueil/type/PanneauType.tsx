export interface Profil {
  avatar?: string;
  livresLus?: number;
}

export interface User {
  id: number;
  nomUtilisateur: string;
  prenomUtilisateur?: string;
  email: string;
  statut: "ACTIF" | "INACTIF";
  role?: "USER" | "ADMIN";

  profil?: Profil;
}

// 👉 Type utilisé pour l'affichage UI (dashboard)
export interface UserView {
  id: number;
  nom: string;
  email: string;
  avatar: string;
  livresLus: number;
  statut: "ACTIF" | "INACTIF";
  
}

