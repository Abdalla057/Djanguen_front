import React from "react";
import { Hash, BookOpen } from "lucide-react";

interface ChampsPlagesPagesProps {
  pageDebut:         string;
  pageFin:           string;
  onChangeDebut:     (v: string) => void;
  onChangeFin:       (v: string) => void;
  desactive:         boolean;
  defaultPageDebut?: number;
}

const ChampsPlagesPages = ({
  pageDebut,
  pageFin,
  onChangeDebut,
  onChangeFin,
  desactive,
  defaultPageDebut,
}: ChampsPlagesPagesProps) => {
  const nombrePages =
    pageDebut && pageFin && parseInt(pageFin) >= parseInt(pageDebut)
      ? parseInt(pageFin) - parseInt(pageDebut) + 1
      : null;

  return (
    <>
      {/* Champs début / fin */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Hash className="w-4 h-4 text-emerald-400" />
            Page de début
          </label>
          <input
            type="number" placeholder="Ex: 1" value={pageDebut} min="1"
            onChange={(e) => onChangeDebut(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none transition-all"
            required disabled={desactive}
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Hash className="w-4 h-4 text-amber-400" />
            Page de fin
          </label>
          <input
            type="number" placeholder="Ex: 10" value={pageFin} min="1"
            onChange={(e) => onChangeFin(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all"
            required disabled={desactive}
          />
        </div>
      </div>

      {/* Info pages couvertes */}
      {nombrePages !== null && (
        <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-400/30 rounded-xl">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <p className="text-sm text-purple-300">
            Cet audio couvre{" "}
            <span className="font-bold">{nombrePages}</span>{" "}
            page{nombrePages > 1 ? "s" : ""}
            {defaultPageDebut != null && (
              <span className="ml-2 text-purple-400/70 text-xs">(suggéré par le panel)</span>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default ChampsPlagesPages;