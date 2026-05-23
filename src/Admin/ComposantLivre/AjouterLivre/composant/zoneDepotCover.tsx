import React from "react";
import { X } from "lucide-react";
import { STYLE_LABEL } from "../constant/constante";
import type { TypeGlisser } from "../type/ajouterLivreType";

interface ZoneDepotCoverProps {
  fichierCover:    File | null;
  apercuCover:     string | null;
  typeGlisser:     TypeGlisser;
  onGlisser:       (e: React.DragEvent, type: TypeGlisser) => void;
  onDeposer:       (e: React.DragEvent, type: TypeGlisser) => void;
  onChangement:    (fichier: File) => void;
  onSupprimerCover:() => void;
}

const ZoneDepotCover = ({
  fichierCover, apercuCover, typeGlisser,
  onGlisser, onDeposer, onChangement, onSupprimerCover,
}: ZoneDepotCoverProps) => (
  <div>
    <label style={STYLE_LABEL}>Couverture *</label>
    <div
      onDragEnter={(e) => onGlisser(e, "cover")}
      onDragLeave={(e)  => onGlisser(e, "cover")}
      onDragOver={(e)   => onGlisser(e, "cover")}
      onDrop={(e)       => onDeposer(e, "cover")}
      style={{
        position:   "relative",
        border:     `1.5px dashed ${typeGlisser === "cover" ? "rgba(194,0,116,0.8)" : fichierCover ? "rgba(34,197,94,0.6)" : "rgba(194,0,116,0.35)"}`,
        borderRadius: "14px",
        padding:    apercuCover ? "0.5rem" : "1.25rem",
        textAlign:  "center",
        cursor:     "pointer",
        background: fichierCover ? "rgba(34,197,94,0.06)" : typeGlisser === "cover" ? "rgba(194,0,116,0.1)" : "rgba(194,0,116,0.04)",
        transition: "all 0.2s",
        overflow:   "hidden",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onChangement(f); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 10 }}
      />

      {apercuCover ? (
        <div style={{ position: "relative" }}>
          <img
            src={apercuCover}
            alt="Aperçu couverture"
            style={{ width: "100%", height: "112px", objectFit: "cover", borderRadius: "10px" }}
          />
          {/* Bouton supprimer */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onSupprimerCover(); }}
            style={{
              position: "absolute", top: "6px", right: "6px",
              background: "rgba(239,68,68,0.85)", border: "none", color: "#fff",
              width: "22px", height: "22px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 20,
            }}
          >
            <X size={10} />
          </button>
        </div>
      ) : (
        <>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(194,0,116,0.12)", border: "1px solid rgba(194,0,116,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px",
          }}>
            <svg width="16" height="16" fill="none" stroke="rgba(240,130,190,1)" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <p style={{ margin: "0 0 3px", fontSize: "12px", fontWeight: 600, color: "rgba(200,200,230,1)" }}>
            Glissez votre image
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "rgba(100,100,140,1)" }}>JPG, PNG, WEBP</p>
        </>
      )}
    </div>
  </div>
);

export default ZoneDepotCover;