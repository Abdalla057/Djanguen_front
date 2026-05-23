import React from "react";
import { STYLE_INPUT, STYLE_LABEL } from "../constant/constante";
import { CATEGORIES } from "../type/ajouterLivreType";

interface ChampsTexteProps {
  titre:       string;
  auteur:      string;
  description: string;
  categorie:   string;
  onChange:    (champ: string, valeur: string) => void;
}

// Handlers focus/blur communs
const surFocus  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "rgba(99,102,241,0.6)";
  e.target.style.background  = "rgba(99,102,241,0.08)";
};
const surBlur   = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "rgba(255,255,255,0.1)";
  e.target.style.background  = "rgba(255,255,255,0.06)";
};

const ChampsTexte = ({ titre, auteur, description, categorie, onChange }: ChampsTexteProps) => (
  <>
    {/* Titre + Auteur */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div>
        <label style={STYLE_LABEL}>Titre *</label>
        <input
          type="text"
          placeholder="Ex: Les Misérables"
          value={titre}
          onChange={(e) => onChange("titre", e.target.value)}
          style={STYLE_INPUT}
          onFocus={surFocus}
          onBlur={surBlur}
        />
      </div>
      <div>
        <label style={STYLE_LABEL}>Auteur *</label>
        <input
          type="text"
          placeholder="Ex: Victor Hugo"
          value={auteur}
          onChange={(e) => onChange("auteur", e.target.value)}
          style={STYLE_INPUT}
          onFocus={surFocus}
          onBlur={surBlur}
        />
      </div>
    </div>

    {/* Description */}
    <div>
      <label style={STYLE_LABEL}>Description</label>
      <textarea
        placeholder="Résumé du livre..."
        rows={2}
        value={description}
        onChange={(e) => onChange("description", e.target.value)}
        style={{ ...STYLE_INPUT, resize: "none" }}
        onFocus={surFocus}
        onBlur={surBlur}
      />
    </div>

    {/* Catégorie */}
    <div>
      <label style={STYLE_LABEL}>Catégorie</label>
      <div style={{ position: "relative" }}>
        <select
          value={categorie}
          onChange={(e) => onChange("categorie", e.target.value)}
          style={{
            ...STYLE_INPUT,
            appearance: "none",
            cursor:     "pointer",
            color:      categorie ? "#fff" : "rgba(148,148,180,1)",
          }}
          onFocus={surFocus}
          onBlur={surBlur}
        >
          <option value="" style={{ background: "#1e1b3a" }}>Sélectionner une catégorie</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} style={{ background: "#1e1b3a", fontWeight: "bold" }}>
              {cat}
            </option>
          ))}
        </select>
        {/* Flèche select */}
        <svg
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          width="14" height="14" fill="none" stroke="rgba(148,148,180,1)" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  </>
);

export default ChampsTexte;