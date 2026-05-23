import { URL_API } from "../constant/constantes";
import type { StatutPage, PlagePages } from "../type/audioStatusTypes";

// ── Requête authentifiée ──────────────────────────────
export const requeteAuthentifiee = (url: string) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

// ── Construction des URLs API ─────────────────────────
export const obtenirUrlPages  = (livreId: number) => `${URL_API}/admin/livre/${livreId}/pages`;
export const obtenirUrlAudios = (livreId: number) => `${URL_API}/admin/livre/${livreId}/audios`;

// ── Suggérer une plage de pages consécutives non couvertes ──
export const suggererPlage = (
  numeroPage: number,
  statutsPages: StatutPage[],
  totalPages: number
): PlagePages => {
  let debut = numeroPage;
  let fin   = numeroPage;

  // Étendre vers le bas
  for (let i = numeroPage - 1; i >= 1; i--) {
    const statut = statutsPages.find(p => p.page.numero === i);
    if (statut && !statut.couverte) debut = i;
    else break;
  }

  // Étendre vers le haut
  for (let i = numeroPage + 1; i <= totalPages; i++) {
    const statut = statutsPages.find(p => p.page.numero === i);
    if (statut && !statut.couverte) fin = i;
    else break;
  }

  return { debut, fin };
};

// ── Calculer toutes les plages consécutives sans audio ──
export const calculerPlagesSansAudio = (statutsPages: StatutPage[]): PlagePages[] => {
  const plages: PlagePages[] = [];
  let debutPlage: number | null = null;

  statutsPages.forEach(({ page, couverte }, idx) => {
    if (!couverte && debutPlage === null) {
      debutPlage = page.numero;
    }
    if (couverte && debutPlage !== null) {
      plages.push({ debut: debutPlage, fin: statutsPages[idx - 1].page.numero });
      debutPlage = null;
    }
    if (idx === statutsPages.length - 1 && debutPlage !== null) {
      plages.push({ debut: debutPlage, fin: page.numero });
    }
  });

  return plages;
};

// ── Formater l'affichage d'une plage de pages ─────────
export const formaterPlage = (debut: number, fin: number): string =>
  debut === fin ? `Page ${debut}` : `Pages ${debut} → ${fin}`;