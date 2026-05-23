import { useMemo, useState } from "react";
import type { Livre } from "../types/BibliothequeType";

const grouperParCategorie = (livres: Livre[]): Record<string, Livre[]> =>
  livres.reduce<Record<string, Livre[]>>((acc, livre) => {
    const categorie = livre.categorie?.trim() || "Non classé";
    (acc[categorie] ??= []).push(livre);
    return acc;
  }, {});

export const useFiltrageLivres = (livres: Livre[]) => {
  const [recherche,        setRecherche]        = useState("");
  const [categorieActive,  setCategorieActive]  = useState<string | null>(null);

  const { livresParCategorie, categories, totalLivres } = useMemo(() => {
    const requete = recherche.toLowerCase().trim();

    const livresFiltres = livres.filter((l) =>
      !requete ||
      (l.titre     ?? "").toLowerCase().includes(requete) ||
      (l.auteur    ?? "").toLowerCase().includes(requete) ||
      (l.categorie ?? "").toLowerCase().includes(requete)
    );

    const groupes = grouperParCategorie(livresFiltres);

    const groupesFinaux = categorieActive
      ? { [categorieActive]: groupes[categorieActive] ?? [] }
      : groupes;

    return {
      livresParCategorie: groupesFinaux,
      categories:         Object.keys(groupes),
      totalLivres:        livresFiltres.length,
    };
  }, [livres, recherche, categorieActive]);

  const basculerCategorie = (categorie: string) =>
    setCategorieActive(prev => prev === categorie ? null : categorie);

  const reinitialiserCategorie = () => setCategorieActive(null);

  return {
    recherche,
    setRecherche,
    categorieActive,
    basculerCategorie,
    reinitialiserCategorie,
    livresParCategorie,
    categories,
    totalLivres,
  };
};