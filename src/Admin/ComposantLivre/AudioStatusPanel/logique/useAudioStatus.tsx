import { useState, useEffect, useCallback, useMemo } from "react";
import { requeteAuthentifiee, obtenirUrlPages, obtenirUrlAudios, calculerPlagesSansAudio } from "../util/audioUtils";
import type { Page, Audio, StatutPage, Statistiques, PlagePages } from "../type/audioStatusTypes";

export const useAudioStatus = (livreId: number) => {
  const [pages,      setPages]      = useState<Page[]>([]);
  const [audios,     setAudios]     = useState<Audio[]>([]);
  const [chargement, setChargement] = useState(true);

  // ── Chargement des pages et audios ───────────────────
  const charger = useCallback(async () => {
    setChargement(true);
    try {
      const [reponsePages, reponseAudios] = await Promise.all([
        requeteAuthentifiee(obtenirUrlPages(livreId)),
        requeteAuthentifiee(obtenirUrlAudios(livreId)),
      ]);

      const donneesPages:  Page[]  = reponsePages.ok  ? await reponsePages.json()  : [];
      const donneesAudios: Audio[] = reponseAudios.ok ? await reponseAudios.json() : [];

      setPages(donneesPages.sort((a, b) => a.numero - b.numero));
      setAudios(donneesAudios.sort((a, b) => a.pageDebut - b.pageDebut));
    } catch (erreur) {
      console.error("[AudioStatusPanel] Erreur chargement :", erreur);
    } finally {
      setChargement(false);
    }
  }, [livreId]);

  useEffect(() => { charger(); }, [charger]);

  // ── Statut de chaque page (couverte ou non) ───────────
  const statutsPages = useMemo<StatutPage[]>(() => {
    return pages.map(page => {
      const audioCouvrant = audios.find(
        a => page.numero >= a.pageDebut && page.numero <= a.pageFin
      );
      return {
        page,
        audio:    audioCouvrant ?? null,
        couverte: !!audioCouvrant,
      };
    });
  }, [pages, audios]);

  // ── Statistiques globales ─────────────────────────────
  const statistiques = useMemo<Statistiques>(() => {
    const couvertes    = statutsPages.filter(p => p.couverte).length;
    const nonCouvertes = statutsPages.length - couvertes;
    const pourcentage  = statutsPages.length > 0
      ? Math.round((couvertes / statutsPages.length) * 100)
      : 0;
    return { couvertes, nonCouvertes, total: statutsPages.length, pourcentage };
  }, [statutsPages]);

  // ── Plages consécutives sans audio ───────────────────
  const plagesSansAudio = useMemo<PlagePages[]>(
    () => calculerPlagesSansAudio(statutsPages),
    [statutsPages]
  );

  return {
    audios,
    chargement,
    statutsPages,
    statistiques,
    plagesSansAudio,
    charger,
  };
};