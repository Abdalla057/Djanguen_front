import React from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { formaterPlage } from "../util/audioUtils";
import type { PlagePages } from "../type/audioStatusTypes";

interface SuggestionPlagesProps {
  plages:         PlagePages[];
  nonCouvertes:   number;
  total:          number;
  livreId:        number;
  onAjouterAudio: (livreId: number, debut: number, fin: number) => void;
}

const SuggestionPlages = ({
  plages, nonCouvertes, total, livreId, onAjouterAudio,
}: SuggestionPlagesProps) => {
  // ── Toutes les pages sont couvertes ──────────────────
  if (nonCouvertes === 0 && total > 0) {
    return (
      <div
        className="mt-4 flex items-center gap-3 p-3 rounded-xl"
        style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
      >
        <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#4ade80" }} />
        <p className="text-sm font-black" style={{ color: "#4ade80" }}>
          Toutes les pages ont un audio ! 🎉
        </p>
      </div>
    );
  }

  if (plages.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-[10px] font-black uppercase tracking-widest mb-2"
        style={{ color: "#334155" }}>
        Plages suggérées à couvrir
      </p>

      <div className="flex flex-wrap gap-2">
        {plages.map((plage, i) => (
          <button
            key={i}
            onClick={() => onAjouterAudio(livreId, plage.debut, plage.fin)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all duration-200 active:scale-95"
            style={{
              background: "rgba(59,130,246,0.08)",
              border:     "1px solid rgba(59,130,246,0.2)",
              color:      "#60a5fa",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background  = "rgba(59,130,246,0.18)";
              (e.currentTarget as HTMLElement).style.boxShadow  = "0 4px 16px rgba(59,130,246,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background  = "rgba(59,130,246,0.08)";
              (e.currentTarget as HTMLElement).style.boxShadow  = "none";
            }}
          >
            <Upload className="w-3 h-3" />
            {formaterPlage(plage.debut, plage.fin)}
            <span
              className="px-1.5 py-0.5 rounded-md text-[9px]"
              style={{ background: "rgba(59,130,246,0.2)", color: "#93c5fd" }}
            >
              {plage.fin - plage.debut + 1}p
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionPlages;