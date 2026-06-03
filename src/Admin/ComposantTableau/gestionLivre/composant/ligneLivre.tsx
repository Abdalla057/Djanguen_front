import React, { useState } from "react";
import {
  Pencil, Trash2, Eye, BookOpen, Music,
  ChevronDown, ChevronUp, Loader2,
} from "lucide-react";
import { useAudios } from "../logique/useGestion";
import type { LivreApi } from "../type/GestionType";
import { API_URL } from "../constante/constante";

export interface LigneLivreProps {
  livre: LivreApi;
  onModifier:    (livre: LivreApi) => void;
  onSupprimer:   (id: number) => void;
  onUploadAudio: (livre: LivreApi) => void;
}

const LigneLivre = ({ livre, onModifier, onSupprimer, onUploadAudio }: LigneLivreProps) => {
  const [open, setOpen] = useState(false);
  const { allAudios: audios, loading: audiosLoading } = useAudios(open ? livre.id : null);
  console.log("coverUrl :", API_URL, "/", livre.cover);

  return (
    <>
      <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">

        {/* Cover + Titre */}
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-3">
            {livre.cover ? (
              <img
                src={`${API_URL}/uploads/images/${livre.cover}`}
                alt={livre.titre}
                className="w-8 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-100 shadow-sm"
              />
            ) : (
              <div className="w-8 h-10 rounded-lg bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate max-w-[160px]">
                {livre.titre}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">#{livre.id}</p>
            </div>
          </div>
        </td>

        {/* Auteur */}
        <td className="px-5 py-3.5 text-[13px] text-slate-600 max-w-[120px] truncate">
          {livre.auteur}
        </td>

        {/* Catégorie */}
        <td className="px-5 py-3.5">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {livre.categorie}
          </span>
        </td>

        {/* Date */}
        <td className="px-5 py-3.5 text-[12px] text-slate-400">
          {livre.createdAt
            ? new Date(livre.createdAt).toLocaleDateString("fr-FR")
            : "—"}
        </td>

        {/* Actions */}
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-1.5">

            {/* Toggle audios */}
            <button
              onClick={() => setOpen((o) => !o)}
              title={open ? "Masquer les audios" : "Voir les audios"}
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-200 flex items-center justify-center transition-all group"
            >
              {open
                ? <ChevronUp   className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600" />
                : <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600" />}
            </button>

            {/* Upload audio */}
            <button
              onClick={() => onUploadAudio(livre)}
              title="Uploader un audio"
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-200 flex items-center justify-center transition-all group"
            >
              <Music className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600" />
            </button>

            {/* Voir PDF */}
            {livre.pdfUrl && (
              <a
                href={livre.pdfUrl}
                target="_blank"
                rel="noreferrer"
                title="Voir le PDF"
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-200 flex items-center justify-center transition-all group"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </a>
            )}

            {/* Modifier */}
            <button
              onClick={() => onModifier(livre)}
              title="Modifier"
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex items-center justify-center transition-all group"
            >
              <Pencil className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
            </button>

            {/* Supprimer */}
            <button
              onClick={() => onSupprimer(livre.id)}
              title="Supprimer"
              className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 flex items-center justify-center transition-all group"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500" />
            </button>

          </div>
        </td>
      </tr>

      {/* Ligne expandée — audios */}
      {open && (
        <tr className="bg-slate-50/50">
          <td colSpan={5} className="px-8 py-3">
            {audiosLoading ? (
              <div className="flex items-center gap-2 py-2 text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-[12px]">Chargement des audios…</span>
              </div>
            ) : audios.length === 0 ? (
              <p className="text-[12px] text-slate-400 py-1">
                Aucun audio pour ce livre.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 py-1">
                {audios.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[12px] text-slate-600 shadow-sm"
                  >
                    <Music className="w-3 h-3 text-violet-400 flex-shrink-0" />
                    <span>Pages {a.pageDebut} – {a.pageFin}</span>
                    {a.audioUrl && (
                      <a
                        href={a.audioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-500 hover:text-violet-700 transition-colors ml-1"
                      >
                        <Eye className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

export default LigneLivre;