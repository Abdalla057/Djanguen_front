export const URL_API = import.meta.env.VITE_API_URL;

export const ETAT_FORMULAIRE_INITIAL = {
  titre:        "",
  auteur:       "",
  description:  "",
  categorie:    "",
  fichierPdf:   null,
  fichierCover: null,
  apercuCover:  null,
};

export const ETAT_MESSAGE_INITIAL = {
  texte: "",
  type:  "" as const,
};

// Styles réutilisables communs
export const STYLE_INPUT: React.CSSProperties = {
  width:       "100%",
  boxSizing:   "border-box",
  padding:     "10px 14px",
  borderRadius:"12px",
  background:  "rgba(255,255,255,0.06)",
  border:      "1px solid rgba(255,255,255,0.1)",
  color:       "#fff",
  fontSize:    "13px",
  outline:     "none",
  fontFamily:  "inherit",
};

export const STYLE_LABEL: React.CSSProperties = {
  display:       "block",
  fontSize:      "11px",
  fontWeight:    600,
  color:         "rgba(148,148,180,1)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom:  "7px",
};