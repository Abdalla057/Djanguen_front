import React, { useState } from "react";
import { X, Music, AlertCircle, Loader2 } from "lucide-react";
import type { CreateAudioDto } from "../type/GestionType";

export interface ModalAudioProps {
  livreId: number;
  titreLivre: string;
  onClose: () => void;
  onSubmit: (dto: CreateAudioDto) => Promise<void>;
}

const ModalAudio = ({ titreLivre, onClose, onSubmit }: ModalAudioProps) => {
  const [pageDebut,     setPageDebut]     = useState("");
  const [pageFin,       setPageFin]       = useState("");
  const [fichierAudio,  setFichierAudio]  = useState<File | undefined>();
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        pageDebut:    Number(pageDebut),
        pageFin:      Number(pageFin),
        fichierAudio,
      });
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
              <Music className="w-4 h-4 text-violet-500" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-slate-800">Uploader un audio</h2>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[220px]">{titreLivre}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          {/* Pages début / fin */}
          <div className="grid grid-cols-2 gap-4">
            {([
              { label: "Page début", value: pageDebut, set: setPageDebut },
              { label: "Page fin",   value: pageFin,   set: setPageFin   },
            ] as const).map(({ label, value, set }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {label}
                </label>
                <input
                  type="number"
                  min={1}
                  value={value}
                  required
                  onChange={(e) => set(e.target.value)}
                  className="px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                />
              </div>
            ))}
          </div>

          {/* Fichier audio */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Fichier Audio
            </label>
            <label className="flex items-center justify-center h-16 border-2 border-dashed border-slate-200 hover:border-violet-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-violet-50/20 transition-colors">
              <span className="text-[12px] text-slate-400">
                {fichierAudio ? fichierAudio.name : "Choisir un fichier audio"}
              </span>
              <input
                type="file"
                accept="audio/*"
                required
                className="hidden"
                onChange={(e) => setFichierAudio(e.target.files?.[0])}
              />
            </label>
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-60 rounded-xl transition-all"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Uploader
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalAudio;