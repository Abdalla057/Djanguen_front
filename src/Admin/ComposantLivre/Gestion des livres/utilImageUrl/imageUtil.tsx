import { URL_API } from "../../Gestion des livres/constant/constant";

export const obtenirUrlImage = (cover: string | undefined | null): string => {
  if (!cover || cover.trim() === "") return "";
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  const cheminPropre = cover.replace(/^\/+/, "");
  if (cheminPropre.startsWith("uploads/")) return `${URL_API}/${cheminPropre}`;
  return `${URL_API}/uploads/images/${cheminPropre}`;
};