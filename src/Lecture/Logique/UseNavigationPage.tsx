/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import type { Page } from "../types/livreTypes";

export const useNavigationPages = (
  pages: Page[],
  mettreAJourHistorique: (numeroPage: number) => Promise<void>
) => {
  const [indexCourant, setIndexCourant] = useState(0);
  const [imageChargee, setImageChargee] = useState(false);

  const allerVers = useCallback(
    (index: number) => {
      const indexValide = Math.max(0, Math.min(pages.length - 1, index));
      setIndexCourant(indexValide);
      setImageChargee(false);
      mettreAJourHistorique(pages[indexValide]?.numero ?? 1);
    },
    [pages, mettreAJourHistorique]
  );

  const pageSuivante   = useCallback(() => allerVers(indexCourant + 1));
  const pagePrecedente = () => allerVers(indexCourant - 1);

  // Navigation clavier (← →)
  useEffect(() => {
    const gererTouche = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") pageSuivante();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   pagePrecedente();
    };
    window.addEventListener("keydown", gererTouche);
    return () => window.removeEventListener("keydown", gererTouche);
  }, [indexCourant, pagePrecedente, pageSuivante, pages]);

  return {
    indexCourant,
    imageChargee,
    setImageChargee,
    allerVers,
    pageSuivante,
    pagePrecedente,
  };
};