import React from "react";
import { Loader } from "lucide-react";

interface BoutonsActionsProps {
  enEnvoi:  boolean;
  onAnnuler:() => void;
}

const BoutonsActions = ({ enEnvoi, onAnnuler }: BoutonsActionsProps) => (
  <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
    {/* Annuler */}
    <button
      type="button"
      onClick={onAnnuler}
      style={{
        flex: 1, padding: "11px", borderRadius: "12px",
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(180,180,210,1)", fontSize: "13px", fontWeight: 600, cursor: "pointer",
      }}
    >
      Annuler
    </button>

    {/* Soumettre */}
    <button
      type="submit"
      disabled={enEnvoi}
      style={{
        flex: 2, padding: "11px", borderRadius: "12px",
        background: "linear-gradient(135deg, #6366f1, #c20074)",
        border: "none", color: "#fff", fontSize: "13px", fontWeight: 700,
        cursor: enEnvoi ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        opacity: enEnvoi ? 0.7 : 1, letterSpacing: "0.01em",
      }}
    >
      {enEnvoi ? (
        <><Loader size={15} style={{ animation: "spin 1s linear infinite" }} />Ajout en cours...</>
      ) : (
        <>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="16 16 12 12 8 16"/>
            <line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
          </svg>
          Ajouter le livre
        </>
      )}
    </button>
  </div>
);

export default BoutonsActions;