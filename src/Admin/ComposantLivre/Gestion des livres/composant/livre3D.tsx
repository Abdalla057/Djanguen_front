import React, { useState } from "react";
import { Sparkles, ImageOff } from "lucide-react";
import { COULEURS_TRANCHE } from "../../Gestion des livres/constant/constant";
import { obtenirUrlImage } from "../../Gestion des livres/utilImageUrl/imageUtil";
import type { Livre } from "../../Gestion des livres/type/listeLivreType";

interface Livre3DProps {
  livre:    Livre;
  estActif: boolean;
  position: number;
  onClick:  () => void;
}

const LARGEUR_LIVRE  = 140;
const HAUTEUR_LIVRE  = 210;
const LARGEUR_TRANCHE = 28;

const Livre3D = ({ livre, estActif, position, onClick }: Livre3DProps) => {
  const [erreurImage, setErreurImage] = useState(false);

  const urlImage     = obtenirUrlImage(livre.cover);
  const couleurTranche = COULEURS_TRANCHE[livre.id % COULEURS_TRANCHE.length];

  const rotationY   = position * 38;
  const translationX = position * 170;
  const translationZ = -Math.abs(position) * 80;
  const echelle     = estActif ? 1 : 0.82 - Math.abs(position) * 0.06;
  const opacite     = estActif ? 1 : 0.55 - Math.abs(position) * 0.08;

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{
        width: LARGEUR_LIVRE,
        height: HAUTEUR_LIVRE,
        transformStyle: "preserve-3d",
        transform: `translateX(${translationX}px) translateZ(${translationZ}px) rotateY(${rotationY}deg) scale(${echelle})`,
        transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease",
        opacity: opacite,
        zIndex: estActif ? 10 : 5 - Math.abs(position),
      }}
    >
      {/* Face avant */}
      <div
        className="absolute inset-0 rounded-r-lg overflow-hidden shadow-2xl"
        style={{
          backfaceVisibility: "hidden",
          transform: `translateZ(${LARGEUR_TRANCHE / 2}px)`,
          boxShadow: estActif
            ? "8px 12px 40px rgba(0,0,0,0.7), inset -3px 0 8px rgba(0,0,0,0.3)"
            : "4px 8px 20px rgba(0,0,0,0.5)",
        }}
      >
        {!erreurImage && urlImage ? (
          <img
            src={urlImage}
            alt={`Couverture de ${livre.titre}`}
            className="w-full h-full object-cover"
            onError={() => setErreurImage(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-b ${couleurTranche} flex flex-col items-center justify-center gap-2 p-3`}>
            <ImageOff className="w-8 h-8 text-white/40" />
            <span className="text-[10px] text-white/60 text-center leading-tight">{livre.titre}</span>
          </div>
        )}

        {/* Reflet */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }}
        />

        {/* Badge actif */}
        {estActif && (
          <div className="absolute top-2 right-2">
            <span className="px-1.5 py-0.5 bg-indigo-500/80 backdrop-blur text-white text-[9px] font-bold rounded-md flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />Actif
            </span>
          </div>
        )}
      </div>

      {/* Tranche latérale */}
      <div
        className={`absolute top-0 left-0 h-full bg-gradient-to-b ${couleurTranche} rounded-l-sm flex items-center justify-center overflow-hidden`}
        style={{
          width: LARGEUR_TRANCHE,
          transform: `rotateY(-90deg) translateZ(${LARGEUR_TRANCHE / 2}px)`,
          transformOrigin: "right center",
          backfaceVisibility: "hidden",
          boxShadow: "inset -2px 0 6px rgba(0,0,0,0.4)",
        }}
      >
        <span
          className="text-white/80 font-bold text-[8px] tracking-widest uppercase px-1"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            maxHeight: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {livre.titre}
        </span>
        <div className="absolute top-3 bottom-3 right-1.5 w-px bg-white/20 rounded-full" />
      </div>

      {/* Face arrière */}
      <div
        className="absolute inset-0 rounded-r-lg bg-gradient-to-b from-slate-800 to-slate-950"
        style={{
          backfaceVisibility: "hidden",
          transform: `rotateY(180deg) translateZ(${LARGEUR_TRANCHE / 2}px)`,
        }}
      />

      {/* Tranche bas */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${couleurTranche}`}
        style={{
          height: LARGEUR_TRANCHE,
          transform: `rotateX(90deg) translateZ(${LARGEUR_TRANCHE / 2}px)`,
          transformOrigin: "bottom center",
          backfaceVisibility: "hidden",
          opacity: 0.6,
        }}
      />

      {/* Ombre au sol */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: LARGEUR_LIVRE * 0.85,
          height: 20,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
          transform: `translateY(${HAUTEUR_LIVRE / 2 + 8}px) rotateX(90deg)`,
          filter: "blur(4px)",
        }}
      />
    </div>
  );
};

export default Livre3D;