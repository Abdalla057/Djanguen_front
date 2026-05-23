import React, { useState, useRef } from "react";
import { Eye, User } from "lucide-react";
import { COULEURS, URL_API } from "../constant/couleur";
import type { Livre, ModeAffichage } from "../types/BibliothequeType";

const obtenirUrlImage = (cover?: string): string => {
  if (!cover) return "/placeholder.png";
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  return `${URL_API}/uploads/images/${cover}`;
};

interface CarteLivreProps {
  livre: Livre;
  modeAffichage: ModeAffichage;
  onNaviguer: (id: number) => void;
}

const CarteLivre = ({ livre, modeAffichage, onNaviguer }: CarteLivreProps) => {
  const [survol,      setSurvol]      = useState(false);
  const [imageErreur, setImageErreur] = useState(false);
  const [rotationX,   setRotationX]   = useState(0);
  const [rotationY,   setRotationY]   = useState(0);
  const refCarte = useRef<HTMLDivElement>(null);

  const gererMouvementSouris = (e: React.MouseEvent<HTMLDivElement>) => {
    const carte = refCarte.current;
    if (!carte) return;
    const rect    = carte.getBoundingClientRect();
    const centreX = rect.left + rect.width  / 2;
    const centreY = rect.top  + rect.height / 2;
    setRotationY((e.clientX - centreX) / (rect.width  / 2) * 14);
    setRotationX((e.clientY - centreY) / (rect.height / 2) * -10);
  };

  const gererEntreeSouris = () => setSurvol(true);

  const gererSortieSouris = () => {
    setSurvol(false);
    setRotationX(0);
    setRotationY(0);
  };

  const obtenirCouleurTranche = (): string => {
    const couleurs = ["#1e3a5f", "#2d1b4e", "#1a3d2b", "#3d1a1a", "#1a2d3d", "#2d2d1a"];
    const hash = (livre.titre || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return couleurs[hash % couleurs.length];
  };

  const profondeur = modeAffichage === "grille" ? 28 : 22;
  const couleurTranche = obtenirCouleurTranche();

  return (
    <div
      style={{ perspective: "900px", perspectiveOrigin: "50% 50%", paddingLeft: `${profondeur}px` }}
      onMouseMove={gererMouvementSouris}
      onMouseEnter={gererEntreeSouris}
      onMouseLeave={gererSortieSouris}
    >
      <div
        ref={refCarte}
        className="flex flex-col relative"
        style={{
          transformStyle: "preserve-3d",
          transform: survol
            ? `rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(8px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: survol ? "transform 0.08s ease-out" : "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
          cursor: "pointer",
          filter: survol
            ? `drop-shadow(-14px 22px 32px rgba(0,0,0,0.75))`
            : `drop-shadow(-4px 10px 18px rgba(0,0,0,0.55))`,
        }}
        onClick={() => onNaviguer(livre.id)}
      >

        {/* ── Tranche gauche (épaisseur) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: modeAffichage === "grille" ? "56px" : 0,
            left: 0,
            width: `${profondeur}px`,
            background: `linear-gradient(to right, ${couleurTranche}99, ${couleurTranche})`,
            transformOrigin: "right center",
            transform: "rotateY(-90deg)",
            backfaceVisibility: "hidden",
            borderRadius: "4px 0 0 4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {modeAffichage === "grille" && livre.titre && (
            <span style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "9px",
              fontWeight: 900,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.08em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxHeight: "88%",
              padding: "0 3px",
            }}>
              {livre.titre}
            </span>
          )}
          {[12, 30, 50, 70, 88].map((pct) => (
            <div key={pct} style={{
              position: "absolute", left: 0, right: 0,
              top: `${pct}%`, height: "1px",
              background: "rgba(255,255,255,0.07)",
            }} />
          ))}
        </div>

        {/* ── Tranche du dessus ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: `${profondeur / 2}px`,
          background: `linear-gradient(to bottom, ${couleurTranche}55, ${couleurTranche}22)`,
          transformOrigin: "bottom center",
          transform: "rotateX(90deg)",
          backfaceVisibility: "hidden",
        }} />

        {/* ── Face principale ── */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${survol ? COULEURS.bordureSurvol : "rgba(255,255,255,0.08)"}`,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Couverture */}
          <div
            className={`relative overflow-hidden ${modeAffichage === "grille" ? "aspect-[2/3]" : "aspect-[3/4]"}`}
            style={{ background: "#0a1628" }}
          >
            <img
              src={imageErreur ? "/placeholder.png" : obtenirUrlImage(livre.cover)}
              alt={livre.titre || "Livre"}
              className="w-full h-full object-cover"
              style={{
                transform: survol ? "scale(1.07)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
              onError={() => setImageErreur(true)}
              draggable={false}
            />

            {/* Reflet dynamique selon rotation */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(
                ${125 + rotationY * 2.5}deg,
                rgba(255,255,255,${survol ? 0.13 : 0.04}) 0%,
                transparent 45%,
                rgba(0,0,0,${survol ? 0.18 : 0.04}) 100%
              )`,
              transition: survol ? "none" : "background 0.5s ease",
            }} />

            {/* Dégradé bas */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to top, rgba(10,15,26,0.88) 0%, rgba(10,15,26,0.15) 55%, transparent 100%)",
            }} />

            {/* Lueur bleue au survol */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(ellipse at ${50 + rotationY * 2}% 110%, rgba(59,130,246,0.2), transparent 65%)`,
              opacity: survol ? 1 : 0,
              transition: "opacity 0.35s ease",
            }} />

            {/* Bouton Lire */}
            <div className="absolute inset-0 flex items-center justify-center" style={{
              background: "rgba(0,0,0,0.42)",
              opacity: survol ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}>
              <button
                onClick={(e) => { e.stopPropagation(); onNaviguer(livre.id); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm"
                style={{
                  background: `linear-gradient(135deg, ${COULEURS.accent}, ${COULEURS.accentSombre})`,
                  color: "#fff",
                  boxShadow: `0 6px 24px ${COULEURS.accentLueur}`,
                  transform: survol ? "translateY(0) scale(1)" : "translateY(10px) scale(0.88)",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <Eye className="w-4 h-4" />
                Lire
              </button>
            </div>

            {/* Badge catégorie */}
            {livre.categorie && (
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider" style={{
                background: "rgba(10,15,26,0.78)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${COULEURS.bordure}`,
                color: COULEURS.accentClair,
              }}>
                {livre.categorie}
              </div>
            )}
          </div>

          {/* Infos — mode grille */}
          {modeAffichage === "grille" && (
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-sm font-black leading-snug mb-2 line-clamp-2" style={{ color: COULEURS.texte }}>
                {livre.titre || "Titre inconnu"}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-semibold mb-4" style={{ color: COULEURS.texteDiscret }}>
                <User className="w-3 h-3 shrink-0" />
                <p className="line-clamp-1">{livre.auteur || "Auteur inconnu"}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onNaviguer(livre.id); }}
                className="mt-auto py-2.5 rounded-xl text-xs font-black"
                style={{
                  background: survol ? `linear-gradient(135deg, ${COULEURS.accent}, ${COULEURS.accentSombre})` : "rgba(59,130,246,0.08)",
                  color: survol ? "#fff" : COULEURS.accentClair,
                  border: `1px solid ${survol ? "transparent" : COULEURS.bordure}`,
                  boxShadow: survol ? `0 4px 16px ${COULEURS.accentLueur}` : "none",
                  transition: "all 0.25s ease",
                }}
              >
                Consulter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarteLivre;