import React from "react";
import { COULEURS, URL_API } from "../constante/constante";

interface VisionneusePageProps {
  imagePath: string;
  numeroPage: number;
  imageChargee: boolean;
  onImageChargee: () => void;
}

const VisionneusePage = ({
  imagePath,
  numeroPage,
  imageChargee,
  onImageChargee,
}: VisionneusePageProps) => {
  const cheminNormalise = imagePath.replace(/\\/g, "/");

  return (
    <div
      className="relative w-full max-w-[700px] rounded-2xl overflow-hidden fade-in"
      style={{
        background: "rgba(0,0,0,0.4)",
        border: `1px solid ${COULEURS.bordure}`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)`,
      }}
    >
      {/* Shimmer pendant le chargement */}
      {!imageChargee && (
        <div
          className="absolute inset-0 min-h-[400px]"
          style={{
            background: `linear-gradient(90deg, ${COULEURS.fond1} 25%, ${COULEURS.fond2} 50%, ${COULEURS.fond1} 75%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.8s ease-in-out infinite",
          }}
        />
      )}
      <img
        src={`${URL_API}/uploads/${cheminNormalise}`}
        alt={`Page ${numeroPage}`}
        className="w-full object-contain select-none"
        style={{
          maxHeight: "75vh",
          opacity: imageChargee ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
        onLoad={onImageChargee}
        onError={e => {
          (e.target as HTMLImageElement).src = "/placeholder.png";
          onImageChargee();
        }}
        draggable={false}
      />
    </div>
  );
};

export default VisionneusePage;