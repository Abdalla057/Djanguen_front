import React from "react";
import { STYLE_LABEL } from "../constant/constante";
import type { TypeGlisser } from "../type/ajouterLivreType";

interface ZoneDepotPdfProps {
  fichierPdf:   File | null;
  typeGlisser:  TypeGlisser;
  onGlisser:    (e: React.DragEvent, type: TypeGlisser) => void;
  onDeposer:    (e: React.DragEvent, type: TypeGlisser) => void;
  onChangement: (fichier: File | null) => void;
}

const ZoneDepotPdf = ({ fichierPdf, typeGlisser, onGlisser, onDeposer, onChangement }: ZoneDepotPdfProps) => (
  <div>
    <label style={STYLE_LABEL}>Fichier PDF *</label>
    <div
      onDragEnter={(e) => onGlisser(e, "pdf")}
      onDragLeave={(e)  => onGlisser(e, "pdf")}
      onDragOver={(e)   => onGlisser(e, "pdf")}
      onDrop={(e)       => onDeposer(e, "pdf")}
      style={{
        position:   "relative",
        border:     `1.5px dashed ${typeGlisser === "pdf" ? "rgba(99,102,241,0.8)" : fichierPdf ? "rgba(34,197,94,0.6)" : "rgba(99,102,241,0.35)"}`,
        borderRadius: "14px",
        padding:    "1.25rem",
        textAlign:  "center",
        cursor:     "pointer",
        background: fichierPdf ? "rgba(34,197,94,0.06)" : typeGlisser === "pdf" ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.04)",
        transition: "all 0.2s",
      }}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => onChangement(e.target.files?.[0] || null)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
      />

      {/* Icône */}
      <div style={{
        width: "36px", height: "36px", borderRadius: "10px",
        background: fichierPdf ? "rgba(34,197,94,0.15)" : "rgba(99,102,241,0.15)",
        border: `1px solid ${fichierPdf ? "rgba(34,197,94,0.3)" : "rgba(99,102,241,0.25)"}`,
        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px",
      }}>
        {fichierPdf ? (
          <svg width="16" height="16" fill="none" stroke="rgba(74,222,128,1)" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg width="16" height="16" fill="none" stroke="rgba(167,167,255,1)" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
        )}
      </div>

      {/* Texte */}
      {fichierPdf ? (
        <>
          <p style={{ margin: "0 0 3px", fontSize: "12px", fontWeight: 600, color: "rgba(74,222,128,1)" }}>
            {fichierPdf.name.length > 20 ? fichierPdf.name.slice(0, 20) + "…" : fichierPdf.name}
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "rgba(100,180,120,1)" }}>
            {(fichierPdf.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </>
      ) : (
        <>
          <p style={{ margin: "0 0 3px", fontSize: "12px", fontWeight: 600, color: "rgba(200,200,230,1)" }}>
            Glissez votre PDF
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "rgba(100,100,140,1)" }}>
            ou cliquez pour parcourir
          </p>
        </>
      )}
    </div>
  </div>
);

export default ZoneDepotPdf;