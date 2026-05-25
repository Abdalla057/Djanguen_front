export interface Livre {
  id:           number;
  titre:        string;
  auteur:       string;
  fichierPdf:   string;
  description?: string;
  categorie?:   string;
  cover:        string;
}

export interface Utilisateur {
  id:         number;
  nom:        string;
  email:      string;
  livresLus?: number;
  avatar?:    string;
}

export interface EtatApplication {
  livres:                   Livre[];
  livresFiltres:            Livre[];
  utilisateurs:             Utilisateur[];
  recherche:                string;
  indexActuel:              number;
  modalOuverte:             boolean;
  afficherTousUtilisateurs: boolean;
}

export interface EtatChargement {
  livres: boolean;
  utilisateurs:boolean;
}

export interface EtatErreur {
  livres:      string | null;
  utilisateurs:string | null;
}

export interface PresetAudio {
  livreId:   number;
  pageDebut: number;
  pageFin:   number;
}