import React, { useState } from "react";
import { Plus, BookOpen, Loader2, AlertCircle } from "lucide-react";
import { useLivres, useAudios } from "../logique/useGestion";
import ModalLivre from "./modalLivre";
import ModalAudio from "./modalAudio";
import LigneLivre from "./ligneLivre";
import type { LivreApi, CreateLivreDto, UpdateLivreDto, CreateAudioDto } from "../type/GestionType";

const GestionLivres = () => {
  const {
    allLivres,
    loading,
    error,
    creerLivre,
    modifierLivre,
    supprimerLivre,
  } = useLivres();

  const [modalLivre,  setModalLivre]  = useState<"create" | "edit" | null>(null);
  const [livreEdite,  setLivreEdite]  = useState<LivreApi | null>(null);
  const [modalAudio,  setModalAudio]  = useState<LivreApi | null>(null);
  const [supprimant,  setSupprimant]  = useState<number | null>(null);

  // hook audio du livre ciblé pour l'upload
  const audioHook = useAudios(modalAudio?.id ?? null);

  const ouvrirModifier = (livre: LivreApi) => {
    setLivreEdite(livre);
    setModalLivre("edit");
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer ce livre définitivement ?")) return;
    setSupprimant(id);
    try {
      await supprimerLivre(id);
    } finally {
      setSupprimant(null);
    }
  };

  const handleSubmitLivre = async (
    dto: CreateLivreDto | UpdateLivreDto
  ): Promise<LivreApi> => {
    const result =
      modalLivre === "create"
        ? await creerLivre(dto as CreateLivreDto)
        : await modifierLivre(livreEdite!.id, dto as UpdateLivreDto);

    if (!result) throw new Error("Opération échouée, vérifiez les champs.");
    return result;
  };

  const handleUploadAudio = async (dto: CreateAudioDto): Promise<void> => {
    await audioHook.uploadAudio(dto);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-slate-800"></h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {loading
                ? "Chargement…"
                : `${allLivres.length} livre${allLivres.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalLivre("create")}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Nouveau livre
        </button>
      </div>

      {/* Chargement */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-[13px]">Chargement des livres…</span>
        </div>
      )}

      {/* Erreur */}
      {error && !loading && (
        <div className="flex items-center gap-2 m-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-[13px] text-red-600">{error}</p>
        </div>
      )}

      {/* Tableau */}
      {!loading && !error && (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              {["Livre", "Auteur", "Catégorie", "Ajouté le", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allLivres.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center text-[13px] text-slate-400">
                  Aucun livre — cliquez sur "Nouveau livre" pour commencer.
                </td>
              </tr>
            ) : (
              allLivres.map((l) => (
                <LigneLivre
                  key={l.id}
                  livre={l}
                  onModifier={ouvrirModifier}
                  onSupprimer={supprimant === l.id ? () => {} : handleSupprimer}
                  onUploadAudio={setModalAudio}
                />
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal livre */}
      {modalLivre && (
        <ModalLivre
          livre={modalLivre === "edit" ? livreEdite : null}
          onClose={() => { setModalLivre(null); setLivreEdite(null); }}
          onSubmit={handleSubmitLivre}
        />
      )}

      {/* Modal audio */}
      {modalAudio && (
        <ModalAudio
          livreId={modalAudio.id}
          titreLivre={modalAudio.titre}
          onClose={() => setModalAudio(null)}
          onSubmit={handleUploadAudio}
        />
      )}

    </div>
  );
};

export default GestionLivres;