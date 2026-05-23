import React from "react";
import { Upload, Loader } from "lucide-react";

interface BoutonsActionsProps {
  estModal:  boolean;
  enEnvoi:   boolean;
  onFermer?: () => void;
}

const BoutonsActions = ({ estModal, enEnvoi, onFermer }: BoutonsActionsProps) => (
  <div className="flex gap-3 pt-4 border-t border-slate-700">
    {estModal && onFermer && (
      <button
        type="button"
        onClick={onFermer}
        disabled={enEnvoi}
        className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-40"
      >
        Annuler
      </button>
    )}

    <button
      type="submit"
      disabled={enEnvoi}
      className={`${
        estModal && onFermer ? "flex-1" : "w-full"
      } px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {enEnvoi ? (
        <><Loader className="w-5 h-5 animate-spin" />Upload en cours...</>
      ) : (
        <><Upload className="w-5 h-5" />Uploader l'audio</>
      )}
    </button>
  </div>
);

export default BoutonsActions;