import React from "react";
import { Upload, Music, AlertCircle } from "lucide-react";
import { FORMATS_ACCEPTES } from "../constant/constant";

interface ChampFichierAudioProps {
  apercu:    string;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  desactive: boolean;
}

const ChampFichierAudio = ({ apercu, onChange, desactive }: ChampFichierAudioProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
      <Upload className="w-4 h-4 text-indigo-400" />
      Fichier audio
    </label>

    <input
      type="file"
      accept={FORMATS_ACCEPTES}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all"
      required
      disabled={desactive}
    />

    {/* Aperçu du fichier sélectionné */}
    {apercu && (
      <div className="mt-2 p-3 bg-slate-700/30 rounded-lg border border-slate-600 flex items-center gap-2">
        <Music className="w-4 h-4 text-purple-400 shrink-0" />
        <p className="text-xs text-slate-300 truncate flex-1">{apercu}</p>
        <span className="text-xs text-emerald-400 font-medium shrink-0">✓ Sélectionné</span>
      </div>
    )}

    <p className="text-xs text-slate-500 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      Formats acceptés : MP3, WAV, OGG, M4A
    </p>
  </div>
);

export default ChampFichierAudio;