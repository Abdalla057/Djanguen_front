import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./barreProgression";
import { GenreBadge, Avatar } from "./historiqueUI";
import type { Historique, RepriseInfo } from "../type/historique.types";

interface HistoriqueCardProps {
  item: Historique;
  onDelete: (id: number) => Promise<void>;
  onReprendre: (livreId: number) => Promise<RepriseInfo | undefined>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export function HistoriqueCard({ item, onDelete, onReprendre }: HistoriqueCardProps) {
  const [deleting, setDeleting] = useState(false);
  const [resuming, setResuming] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(item.id);
    setDeleting(false);
  };

  const handleResume = async () => {
    setResuming(true);
    const info = await onReprendre(item.livreId);

    if (info) {
      // Navigue vers la page de lecture en passant la position exacte
      navigate(`/livre/${item.livreId}/lecture`, {
        state: {
          dernierePage:  info.dernierePage,
          derniereAudio: info.derniereAudio,
          positionAudio: info.positionAudio,
        },
      });
    }

    setResuming(false);
  };

  return (
    <div className="bg-[#FFFF] shadow-2xl border border-gray-100 rounded-2xl px-5 py-4 flex flex-col gap-3 hover:border-gray-300 transition-colors">

      {/* En-tête */}
      <div className="flex gap-3 items-start">
        <Avatar name={item.livre?.auteur ?? "?"} />
        <div className="flex-1 min-w-0">
          <p className="text-[20px] font-bold text-black truncate">
            {item.livre?.titre ?? "Titre inconnu"}
          </p>
          <p className="text-bold text-black mt-0.5">
            {item.livre?.auteur ?? "Auteur inconnu"}
          </p>
        </div>
        <GenreBadge genre={item.livre?.categorie ?? ""} />
      </div>

      {/* Pages */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xl text-gray-500">Pages lues</span>
          <span className="text-xs font-medium text-gray-700">Page {item.dernierePage}</span>
        </div>
        <ProgressBar value={item.dernierePage} total={100} color="teal" />
      </div>

      {/* Audio */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-400">Audio</span>
          <span className="text-xs font-medium text-gray-700">Piste {item.derniereAudio}</span>
        </div>
        <ProgressBar value={item.derniereAudio} total={20} color="amber" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-700 flex items-center gap-1">
          <i className="ti ti-clock text-xs" aria-hidden="true" />
          {formatDate(item.updatedAt)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Supprimer"
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 border border-transparent hover:border-red-100 transition"
          >
            <i className="ti ti-trash text-sm" aria-hidden="true" />
          </button>
          <button
            onClick={handleResume}
            disabled={resuming}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-teal-200 text-teal-700 hover:bg-teal-50 transition"
          >
            <i className="ti ti-player-play text-xs" aria-hidden="true" />
            {resuming ? "…" : "Reprendre"}
          </button>
        </div>
      </div>
    </div>
  );
}