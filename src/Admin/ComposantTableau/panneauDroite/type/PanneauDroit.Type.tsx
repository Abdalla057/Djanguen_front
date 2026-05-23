/* ================================================================
   panneauDroitType.ts
   Types du panneau droit
=============================================================== */

export interface User {
  id: number;

  nom: string;

  email: string;

  avatar?: string;

  livresLus?: number;
}

export interface Book {
  id: number;

  titre: string;

  auteur: string;

  description?: string;

  categorie?: string;

  cover?: string;
}

export interface Historique {
  id: number;

  livreId: number;

  userId: number;

  createdAt: string;

  livre?: Book;
}

export interface Stats {
  completed: number;

  goal: number;

  percentage: number;
}

/* ================================================================
   STATE
=============================================================== */

export interface RightPanelState {

  currentUser: User | null;

  books: Book[];

  historique: Historique[];

  currentIndex: number;

  stats: Stats | null;

  loadingUser: boolean;

  loadingBooks: boolean;

  showHistory: boolean;

}

/* ================================================================
   EXTRA
=============================================================== */

export interface RightPanelExtra {

  allUsers: User[];

}

/* ================================================================
   ACTIONS
=============================================================== */

export interface RightPanelActions {

  /* =========================================================
      SETTERS
  ========================================================= */

  setCurrentUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;

  setShowHistory: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  /* =========================================================
      UTILISATEURS
  ========================================================= */

  chargerUtilisateurs: () => Promise<void>;

  chargerUtilisateurConnecte: () => Promise<void>;

  recupererUtilisateurParId: (
    id: number
  ) => Promise<User | null>;

  modifierUtilisateur: (
    id: number,
    data: Partial<User>
  ) => Promise<User | null>;

  supprimerUtilisateur: (
    id: number
  ) => Promise<boolean>;

  /* =========================================================
      LIVRES
  ========================================================= */

  handleSelectBook: (
    index: number
  ) => void;

  handleNext: () => void;

  handlePrev: () => void;

}