import React from "react";
import type { Page } from "../type/livreType";

interface Props {
  pages: Page[];
  goTo: (index: number) => void;
  currentIndex: number;
}

const API_URL = import.meta.env.VITE_API_URL as string;

const buildImageUrl = (imagePath?: string) => {
  if (!imagePath) return "/placeholder.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_URL}/uploads/${imagePath.replace(/\\/g, "/")}`;
};

const PageNavigation = ({ pages, goTo, currentIndex }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {pages.map((p, i) => {
        const isActive = i === currentIndex;
        return (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              isActive
                ? "border-[#f5c842] scale-105 shadow-lg shadow-[#f5c842]/40"
                : "border-transparent shadow-sm hover:border-[#f5c842]/40"
            }`}
          >
            <img
              src={buildImageUrl(p.imagePath)}
              alt={`Page ${p.numero}`}
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
              className="w-full h-10 object-cover block"
            />
          </button>
        );
      })}
    </div>
  );
};

export default PageNavigation;