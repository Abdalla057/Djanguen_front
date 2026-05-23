import { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { URL_API, MAX_LIVRES_AFFICHES } from "../constant/constant";
import type { Livre, EtatChargement, EtatErreur } from "../type/listeLivreType";

export const useGestionLivres = () => {
  const [livres,        setLivres]        = useState<Livre[]>([]);
  const [livresFiltres, setLivresFiltres] = useState<Livre[]>([]);
  const [recherche,     setRecherche]     = useState("");
  const [indexActuel,   setIndexActuel]   = useState(0);
  const [chargement,    setChargement]    = useState<EtatChargement>({ livres: true, utilisateurs: true });
  const [erreurs,       setErreurs]       = useState<EtatErreur>({ livres: null, utilisateurs: null });

  // ── Chargement des livres ─────────────────────────────
  const chargerLivres = useCallback(async () => {
    try {
      setErreurs(prev => ({ ...prev, livres: null }));
      const reponse = await axios.get(`${URL_API}/admin/livre`);
      const donnees = reponse.data.slice(0, MAX_LIVRES_AFFICHES);
      setLivres(donnees);
      setLivresFiltres(donnees);
      setIndexActuel(0);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur chargement livres";
      setErreurs(prev => ({ ...prev, livres: message }));
    } finally {
      setChargement(prev => ({ ...prev, livres: false }));
    }
  }, []);

  // ── Filtrage selon la recherche ───────────────────────
  useEffect(() => {
    if (recherche.trim() === "") {
      setLivresFiltres(livres);
      setIndexActuel(0);
    } else {
      const requete = recherche.toLowerCase();
      setLivresFiltres(
        livres.filter(l =>
          l.titre.toLowerCase().includes(requete) ||
          l.auteur.toLowerCase().includes(requete)
        )
      );
      setIndexActuel(0);
    }
  }, [recherche, livres]);

  // ── Navigation ────────────────────────────────────────
  const allerVers      = (idx: number) => setIndexActuel(idx);
  const allerPrecedent = () => setIndexActuel(prev => Math.max(0, prev - 1));
  const allerSuivant   = () => setIndexActuel(prev => Math.min(livresFiltres.length - 1, prev + 1));

  // ── Livre courant ─────────────────────────────────────
  const livreCourant = useMemo(
    () => livresFiltres[indexActuel],
    [livresFiltres, indexActuel]
  );

  // ── Livres visibles dans le carrousel (±2 positions) ──
  const livresVisibles = useMemo(() => {
    const resultat = [];
    for (let pos = -2; pos <= 2; pos++) {
      const idx = indexActuel + pos;
      if (idx >= 0 && idx < livresFiltres.length) {
        resultat.push({ livre: livresFiltres[idx], position: pos, idx });
      }
    }
    return resultat;
  }, [livresFiltres, indexActuel]);

  // ── Statistiques ──────────────────────────────────────
  const statistiques = useMemo(() => ({
    totalLivres:   livresFiltres.length,
    nouveautes:    Math.min(5, livresFiltres.length),
    enLecture:     Math.ceil(livresFiltres.length * 0.3),
  }), [livresFiltres.length]);

  return {
    livres,
    livresFiltres,
    recherche,
    setRecherche,
    indexActuel,
    chargement,
    erreurs,
    chargerLivres,
    allerVers,
    allerPrecedent,
    allerSuivant,
    livreCourant,
    livresVisibles,
    statistiques,
  };
};