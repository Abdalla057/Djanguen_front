import React from "react";
import { BookOpen } from "lucide-react";
import { COULEURS } from "../constant/couleur";

/* ── État de chargement ── */
export const EtatChargement = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: COULEURS.fond }}
  >
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40"
          style={{ background: `radial-gradient(circle, ${COULEURS.accentLueur}, transparent)` }}
        />
        <div
          className="relative w-24 h-24 border-4 rounded-full animate-spin flex items-center justify-center"
          style={{ borderColor: COULEURS.bordure, borderTopColor: COULEURS.accent }}
        >
          <BookOpen className="w-10 h-10 animate-pulse" style={{ color: COULEURS.accentClair }} />
        </div>
      </div>
      <p className="text-xl font-black" style={{ color: COULEURS.texte }}>
        Chargement du catalogue...
      </p>
    </div>
  </div>
);

/* ── État d'erreur ── */
export const EtatErreur = ({ message }: { message: string }) => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: COULEURS.fond }}
  >
    <div className="text-center max-w-md">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <BookOpen className="w-10 h-10 text-red-400" />
      </div>
      <h3 className="text-2xl font-black mb-2" style={{ color: COULEURS.texte }}>
        Erreur de chargement
      </h3>
      <p className="font-semibold text-red-400">{message}</p>
    </div>
  </div>
);

/* ── État vide ── */
export const EtatVide = () => (
  <div
    className="text-center py-20"
    style={{ animation: "apparitionBas 0.4s ease forwards" }}
  >
    <div
      className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
      style={{
        background: "rgba(59,130,246,0.06)",
        border: `1px solid ${COULEURS.bordure}`,
      }}
    >
      <BookOpen className="w-12 h-12" style={{ color: `${COULEURS.accent}4d` }} />
    </div>
    <h3 className="text-xl font-black mb-2" style={{ color: COULEURS.texte }}>
      Aucun livre trouvé
    </h3>
    <p className="font-semibold" style={{ color: COULEURS.texteDiscret }}>
      Essayez avec d'autres mots-clés
    </p>
  </div>
);

/* ── Titre de catégorie ── */
export const TitreCategorie = ({ nom, nombre }: { nom: string; nombre: number }) => (
  <div className="flex items-center gap-4 mb-8">
    <div
      className="h-px flex-1"
      style={{
        background: `linear-gradient(to right, ${COULEURS.bordure}, transparent)`,
      }}
    />
    <h2
      className="text-xl font-black flex items-center gap-2 whitespace-nowrap"
      style={{ color: COULEURS.texte }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{
          background: COULEURS.accent,
          boxShadow: `0 0 8px ${COULEURS.accentLueur}`,
        }}
      />
      {nom}
      <span className="text-sm font-bold" style={{ color: COULEURS.texteDiscret }}>
        ({nombre})
      </span>
    </h2>
    <div
      className="h-px flex-1"
      style={{
        background: `linear-gradient(to left, ${COULEURS.bordure}, transparent)`,
      }}
    />
  </div>
);