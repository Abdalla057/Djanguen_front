import React, { useState } from "react";
import axios from "axios";
import type { Livre, ModeAffichage } from "../types/BibliothequeType";
import { API_URL } from "../constante/constante";

interface Props {
  livre:         Livre;
  modeAffichage: ModeAffichage;
  onNaviguer:    (id: number) => void;
}

const Etoiles: React.FC<{
  note:      number;
  survol:    number;
  onSurvol:  (n: number) => void;
  onSortie:  () => void;
  onCliquer: (n: number) => void;
}> = ({ note, survol, onSurvol, onSortie, onCliquer }) => (
  <div className="flex gap-0.5 mt-1.5">
    {[1, 2, 3, 4, 5].map(i => {
      const active = i <= (survol || note);
      return (
        <svg
          key={i}
          width="14" height="14" viewBox="0 0 24 24"
          fill={active ? "#F5A623" : "none"}
          stroke="#F5A623" strokeWidth="2.5"
          className="cursor-pointer transition-transform hover:scale-125"
          onMouseEnter={() => onSurvol(i)}
          onMouseLeave={onSortie}
          onClick={e => { e.stopPropagation(); onCliquer(i); }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    })}
  </div>
);

const CarteLivre: React.FC<Props> = ({ livre, modeAffichage, onNaviguer }) => {
  const [imgErr,     setImgErr]     = useState(false);
  const [note,       setNote]       = useState<number>(Number(livre.tag) || 0);
  const [survol,     setSurvol]     = useState(0);
  const [sauvegarde, setSauvegarde] = useState(false);

  const couleurs    = ["#c97b4b", "#7b68ee", "#4a90d9", "#50c878", "#e8734a", "#9b59b6"];
  const couleur     = couleurs[livre.id % couleurs.length];
  const estCompacte = modeAffichage === "compacte";
  const coverUrl    = livre.cover ? `${API_URL}/uploads/images/${livre.cover}` : null;

  const noterLivre = async (n: number) => {
    setNote(n);
    setSauvegarde(true);
    try {
      await axios.patch(
        `${API_URL}/admin/livre/${livre.id}`,
        { tag: String(n) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        }
      );
    } catch {
      setNote(Number(livre.tag) || 0);
      console.error("Erreur lors de la notation");
    } finally {
      setSauvegarde(false);
    }
  };

  return (
    <div onClick={() => onNaviguer(livre.id)} className="group cursor-pointer">

      {/* Couverture */}
      <div
        className="w-full rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
        style={{ aspectRatio: "2/3" }}
      >
        {coverUrl && !imgErr ? (
          <img
            src={coverUrl}
            alt={livre.titre}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-3 text-center"
            style={{ background: couleur }}
          >
            <span className="text-white font-semibold leading-snug"
              style={{ fontSize: estCompacte ? 9 : 11 }}>
              {livre.titre}
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      {!estCompacte && (
        <div className="mt-2 px-0.5">
          <p className="text-[#3b1f0e] font-medium leading-snug line-clamp-2"
            style={{ fontSize: 13 }}>
            {livre.titre ?? "Titre inconnu"}
          </p>
          {livre.auteur && (
            <p className="text-[#a0694a] mt-0.5 truncate" style={{ fontSize: 11 }}>
              {livre.auteur}
            </p>
          )}

          {/* Étoiles cliquables */}
          <Etoiles
            note={note}
            survol={survol}
            onSurvol={setSurvol}
            onSortie={() => setSurvol(0)}
            onCliquer={noterLivre}
          />

          {sauvegarde && (
            <p className="text-[10px] text-[#c4895e] mt-0.5">Sauvegarde...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarteLivre;