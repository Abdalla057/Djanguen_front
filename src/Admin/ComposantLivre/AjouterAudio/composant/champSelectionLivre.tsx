import React from "react";
import { BookOpen } from "lucide-react";

interface ChampSelectionLivreProps {
  livres:    Array<{ id: number; titre: string }>;
  valeur:    string;
  onChange:  (v: string) => void;
  desactive: boolean;
}

const ChampSelectionLivre = ({ livres, valeur, onChange, desactive }: ChampSelectionLivreProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
      <BookOpen className="w-4 h-4 text-purple-400" />
      Sélectionner le livre
    </label>

    {livres.length > 0 ? (
      <select
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all"
        required
        disabled={desactive}
      >
        <option value="">-- Choisir un livre --</option>
        {livres.map((livre) => (
          <option key={livre.id} value={livre.id}>{livre.titre}</option>
        ))}
      </select>
    ) : (
      <input
        type="number"
        placeholder="ID du livre"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all"
        required
        disabled={desactive}
      />
    )}
  </div>
);

export default ChampSelectionLivre;