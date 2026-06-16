import React from "react";

interface Props {
  valeur:    string;
  onChange:  (valeur: string) => void;
}

const BarreRecherche: React.FC<Props> = ({ valeur, onChange }) => (
  <div className="relative w-full sm:w-64">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4895e]">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Search"
      value={valeur}
      onChange={e => onChange(e.target.value)}
      className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white/70 border border-[#f0cbb0] text-sm text-[#3b1f0e] placeholder:text-[#c4895e]/60 outline-none focus:border-[#e8734a] focus:bg-white transition-all"
    />
  </div>
);

export default BarreRecherche;