import React from "react";

interface Props {
  imagePath?: string;
  numero: number;
}

const API_URL = import.meta.env.VITE_API_URL as string;

const buildImageUrl = (imagePath?: string): string => {
  if (!imagePath) return "/placeholder.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_URL}/uploads/${imagePath.replace(/\\/g, "/")}`;
};

const PageAffichage = ({ imagePath, numero }: Props) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#cf8a55] to-[#c8e8f0] shadow-2xl">
      <img
        src={buildImageUrl(imagePath)}
        alt={`Page ${numero}`}
        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
       className="w-full h-auto object-contain block"
      />
    </div>
  );
};

export default PageAffichage;