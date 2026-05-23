import React from "react";
import { X } from "lucide-react";

interface EnTeteModalProps {
  onFermer: () => void;
}

const EnTeteModal = ({ onFermer }: EnTeteModalProps) => (
  <div style={{
    position:      "relative",
    padding:       "1.5rem 1.75rem 1.25rem",
    borderBottom:  "1px solid rgba(255,255,255,0.08)",
    display:       "flex",
    alignItems:    "center",
    justifyContent:"space-between",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      {/* Icône livre */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(194,0,116,0.4))",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="20" height="20" fill="none" stroke="rgba(167,167,255,1)" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>

      <div>
        <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>
          Ajouter un livre
        </h2>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(148,148,180,1)" }}>
          Remplissez les informations ci-dessous
        </p>
      </div>
    </div>

    {/* Bouton fermer */}
    <button
      onClick={onFermer}
      style={{
        width: "32px", height: "32px", borderRadius: "10px",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "rgba(180,180,210,1)",
      }}
    >
      <X size={14} />
    </button>
  </div>
);

export default EnTeteModal;