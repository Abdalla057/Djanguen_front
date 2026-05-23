import React from "react";
import { X, Music } from "lucide-react";

interface EnTeteModalProps {
  defaultPageDebut?: number;
  defaultPageFin?:   number;
  estModal:          boolean;
  enEnvoi:           boolean;
  onFermer?:         () => void;
}

const EnTeteModal = ({
  defaultPageDebut,
  defaultPageFin,
  estModal,
  enEnvoi,
  onFermer,
}: EnTeteModalProps) => (
  <div className="sticky top-0 bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-6 border-b border-slate-700 flex items-center justify-between z-10">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
        <Music className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Ajouter un audio</h2>
        {defaultPageDebut != null && defaultPageFin != null && (
          <p className="text-xs text-purple-300 mt-0.5">
            Pré-rempli : pages {defaultPageDebut} → {defaultPageFin}
          </p>
        )}
      </div>
    </div>

    {estModal && onFermer && (
      <button
        onClick={onFermer}
        disabled={enEnvoi}
        className="w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-colors disabled:opacity-40"
      >
        <X className="w-5 h-5 text-slate-300" />
      </button>
    )}
  </div>
);

export default EnTeteModal;