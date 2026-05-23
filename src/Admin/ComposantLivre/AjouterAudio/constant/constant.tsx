export const URL_API = import.meta.env.VITE_API_URL;

export const FORMATS_ACCEPTES = "audio/*";

export const ETAT_NOTIFICATION_INITIAL = {
  afficher: false,
  type:     "succes" as const,
  message:  "",
};

export const ETAT_FORMULAIRE_INITIAL = {
  livreId:      "",
  pageDebut:    "",
  pageFin:      "",
  fichierAudio: null,
  apercu:       "",
};