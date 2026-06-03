/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import type {
  LivreApi, CreateLivreDto, UpdateLivreDto,
  AudioApi, CreateAudioDto,
} from "../type/GestionType";
import { API_URL } from "../constante/constante";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
});

const buildForm = (data: Record<string, string | File | undefined | null>): FormData => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      form.append(k, v instanceof File ? v : String(v));
    }
  });
  return form;
};

// ─────────────────────────────────────────────
// useLivres
// GET    /admin/livre
// GET    /admin/livre/:id
// POST   /admin/livre           (multipart)
// PATCH  /admin/livre/:id       (multipart)
// DELETE /admin/livre/:id
// ─────────────────────────────────────────────

export const useLivres = () => {
  const [allLivres, setAllLivres] = useState<LivreApi[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  // ── GET /admin/livre ──
  const chargerLivres = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<LivreApi[]>(
        `${API_URL}/admin/livre`,
        { headers: getHeaders() }
      );
      setAllLivres(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur chargement livres :", err);
      setError("Impossible de charger les livres.");
      setAllLivres([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── GET /admin/livre/:id ──
  const recupererLivreParId = useCallback(async (id: number): Promise<LivreApi | null> => {
    try {
      const { data } = await axios.get<LivreApi>(
        `${API_URL}/admin/livre/${id}`,
        { headers: getHeaders() }
      );
      return data;
    } catch (err) {
      console.error("Erreur récupération livre :", err);
      return null;
    }
  }, []);

  // ── POST /admin/livre — multipart/form-data ──
  const creerLivre = useCallback(async (dto: CreateLivreDto): Promise<LivreApi | null> => {
    try {
      const { data } = await axios.post<LivreApi>(
        `${API_URL}/admin/livre`,
        buildForm({
          titre:      dto.titre,
          auteur:     dto.auteur,
          description:dto.description,
          categorie:  dto.categorie,
          pdf:        dto.fichierPdf,   // nom attendu par NestJS @UploadedFiles()
          cover:      dto.cover,
        }),
        { headers: getHeaders() }
      );
      await chargerLivres();
      return data;
    } catch (err) {
      console.error("Erreur création livre :", err);
      return null;
    }
  }, [chargerLivres]);

  // ── PATCH /admin/livre/:id — multipart/form-data ──
  const modifierLivre = useCallback(async (id: number, dto: UpdateLivreDto): Promise<LivreApi | null> => {
    try {
      const { data } = await axios.patch<LivreApi>(
        `${API_URL}/admin/livre/${id}`,
        buildForm({
          titre:      dto.titre,
          auteur:     dto.auteur,
          description:dto.description,
          categorie:  dto.categorie,
          pdf:        dto.fichierPdf,   // nom attendu par NestJS @UploadedFiles()
          cover:      dto.cover,
        }),
        { headers: getHeaders() }
      );
      setAllLivres((prev) => prev.map((l) => (l.id === id ? data : l)));
      return data;
    } catch (err) {
      console.error("Erreur modification livre :", err);
      return null;
    }
  }, []);

  // ── DELETE /admin/livre/:id ──
  const supprimerLivre = useCallback(async (id: number): Promise<boolean> => {
    try {
      await axios.delete(
        `${API_URL}/admin/livre/${id}`,
        { headers: getHeaders() }
      );
      setAllLivres((prev) => prev.filter((l) => l.id !== id));
      return true;
    } catch (err) {
      console.error("Erreur suppression livre :", err);
      return false;
    }
  }, []);

  useEffect(() => {
    chargerLivres();
  }, []);

  return {
    allLivres,
    loading,
    error,
    chargerLivres,
    recupererLivreParId,
    creerLivre,
    modifierLivre,
    supprimerLivre,
  };
};

// ─────────────────────────────────────────────
// useAudios
// GET  /admin/livre/:id/audios
// GET  /admin/livre/:id/page/:num/audio
// POST /admin/upload-audio/:livreId   (multipart)
// ─────────────────────────────────────────────

export const useAudios = (livreId: number | null) => {
  const [allAudios, setAllAudios] = useState<AudioApi[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  // ── GET /admin/livre/:id/audios ──
  const chargerAudios = useCallback(async () => {
    if (!livreId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<AudioApi[]>(
        `${API_URL}/admin/livre/${livreId}/audios`,
        { headers: getHeaders() }
      );
      setAllAudios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur chargement audios :", err);
      setError("Impossible de charger les audios.");
      setAllAudios([]);
    } finally {
      setLoading(false);
    }
  }, [livreId]);

  // ── GET /admin/livre/:id/page/:num/audio ──
  const recupererAudioParPage = useCallback(async (
    id: number,
    pageNum: number
  ): Promise<AudioApi | null> => {
    try {
      const { data } = await axios.get<AudioApi>(
        `${API_URL}/admin/livre/${id}/page/${pageNum}/audio`,
        { headers: getHeaders() }
      );
      return data;
    } catch (err) {
      console.error("Erreur récupération audio page :", err);
      return null;
    }
  }, []);

  // ── POST /admin/upload-audio/:livreId — multipart/form-data ──
  const uploadAudio = useCallback(async (dto: CreateAudioDto): Promise<AudioApi | null> => {
    if (!livreId) return null;
    try {
      const { data } = await axios.post<AudioApi>(
        `${API_URL}/admin/upload-audio/${livreId}`,
        buildForm({
          pageDebut: String(dto.pageDebut),
          pageFin:   String(dto.pageFin),
          file:      dto.fichierAudio,
        }),
        { headers: getHeaders() }
      );
      await chargerAudios();
      return data;
    } catch (err: unknown) {
      // Le backend sauvegarde mais peut retourner 400 sur la réponse
      // On recharge quand même les audios pour refléter l'état réel
      await chargerAudios();
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status && status !== 400) {
        console.error("Erreur upload audio :", err);
      }
      return null;
    }
  }, [livreId, chargerAudios]);

  useEffect(() => {
    chargerAudios();
  }, [livreId]);

  return {
    allAudios,
    loading,
    error,
    chargerAudios,
    recupererAudioParPage,
    uploadAudio,
  };
};