import React from "react";
import type { EtatMessage } from "../type/ajouterLivreType";

interface BandeauMessageProps {
  message: EtatMessage;
}

const BandeauMessage = ({ message }: BandeauMessageProps) => {
  if (!message.texte) return null;

  const estSucces  = message.type === "succes";
  const couleur    = estSucces ? "rgba(74,222,128,1)"   : "rgba(252,165,165,1)";
  const fondCouleur= estSucces ? "rgba(34,197,94,0.1)"  : "rgba(239,68,68,0.1)";
  const bordure    = estSucces ? "rgba(34,197,94,0.3)"  : "rgba(239,68,68,0.3)";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "10px 14px", borderRadius: "12px",
      background: fondCouleur,
      border: `1px solid ${bordure}`,
    }}>
      <svg width="16" height="16" fill="none" stroke={couleur} strokeWidth="2" viewBox="0 0 24 24">
        {estSucces ? (
          <polyline points="20 6 9 17 4 12"/>
        ) : (
          <>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </>
        )}
      </svg>
      <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: couleur }}>
        {message.texte}
      </p>
    </div>
  );
};

export default BandeauMessage;