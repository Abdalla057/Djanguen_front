import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import type { Livre, Page } from "../type/livreType";

const API_URL = import.meta.env.VITE_API_URL;

export const usePagesLivre = (id?: string) => {
  const [livre, setLivre] = useState<Livre | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioFichier, setAudioFichier] = useState<string | null>(null);

  // 📦 LOAD DATA
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [livreRes, pagesRes] = await Promise.all([
          axios.get(`${API_URL}/admin/livre/${id}`),
          axios.get(`${API_URL}/admin/livre/${id}/pages`),
        ]);

        setLivre(livreRes.data);
        setPages(pagesRes.data ?? []);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Erreur chargement livre:", err);
      }
    };

    fetchData();
  }, [id]);

  // 🔊 LOAD AUDIO
  useEffect(() => {
    if (!id || pages.length === 0) return;

    const safeIndex = Math.max(
      0,
      Math.min(currentIndex, pages.length - 1)
    );

    const page = pages[safeIndex];

    if (!page) {
      setAudioFichier(null);
      return;
    }

    axios
      .get(`${API_URL}/admin/livre/${id}/page/${page.numero}/audio`)
      .then((res) => {
        const fichier = res.data?.fichierAudio;

        if (!fichier) {
          setAudioFichier(null);
          return;
        }

        const clean = fichier
          .replace(/^\/?uploads\/?/, "")
          .replace(/\\/g, "/");

        setAudioFichier(`${API_URL}/uploads/audio/${clean}`);
      })
      .catch(() => setAudioFichier(null));
  }, [currentIndex, pages, id]);

  // 🎯 GO TO (FIX prev unused)
  const goTo = useCallback(
    (index: number) => {
      const max = pages.length - 1;

      const clamped = Math.max(0, Math.min(index, max));

      setCurrentIndex(clamped);
    },
    [pages.length]
  );

  // ▶️ NEXT
  const nextPage = useCallback(() => {
    setCurrentIndex((prev) => {
      const max = pages.length - 1;
      return prev < max ? prev + 1 : prev;
    });
  }, [pages.length]);

  // ⏮ PREV
  const prevPage = useCallback(() => {
    setCurrentIndex((prev) => {
      return prev > 0 ? prev - 1 : 0;
    });
  }, []);

  return {
    livre,
    pages,
    currentIndex,
    currentPage: pages[currentIndex] ?? null,
    audioFichier,
    goTo,
    nextPage,
    prevPage,
  };
};
export default usePagesLivre;