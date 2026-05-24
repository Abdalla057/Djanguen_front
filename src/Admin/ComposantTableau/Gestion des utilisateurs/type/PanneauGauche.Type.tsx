/* ================================================================
   leftPanel.types.ts
   Types du Panneau Gauche
   ================================================================ */
/* ==========================
   PROFIL ADMIN
========================== */

export interface AdminProfile {

  id: number;

  nom: string;

  email: string;

  avatar?: string;

  role: string;

}
/* ==========================
   bloquer les utilisateurs
========================== */
export interface User {
  id: number;
  nom: string;
  email: string;
  statut: "ACTIF" | "BLOQUE";
}

/* ==========================
   LIVRE
========================== */

export interface Book {
  id: number;

  titre: string;

  auteur: string;

  description?: string;

  categorie?: string;

  cover?: string;

  fichierPdf?: string;
}

/* ==========================
   AUTEUR
========================== */

export interface Author {

  id: number;

  name: string;

  bookCount: number;

}

/* ==========================
   STATISTIQUES
========================== */

export interface Stats {

  totalLivres: number;

  totalAuteurs: number;

  enLecture: number;

}


/* ==========================
   RETURN DU HOOK
========================== */

export interface UsePanneauGaucheReturn {

  /* STATES */

 

  popularBooks: Book[];

  topAuthors: Author[];

  trendingBook: Book | null;

  stats: Stats | null;

  diagrammeData: { label: string; value: number }[];

  /* LOADING */

  loadingPopular: boolean;

  loadingAuthors: boolean;

  loadingTrending: boolean;

  loadingStats: boolean;

  loadingSearch: boolean;

  /* ERRORS */

  errorPopular: string | null;

  errorTrending: string | null;

  

  

}