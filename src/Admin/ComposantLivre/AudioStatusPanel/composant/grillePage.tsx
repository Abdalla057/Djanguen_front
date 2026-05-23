import React from "react";
import { Music2, VolumeX, Upload, CheckCircle2, XCircle } from "lucide-react";
import { suggererPlage } from "../util/audioUtils";
import type { StatutPage, Statistiques } from "../type/audioStatusType";

interface GrillePagesProps {
  statutsPages: StatutPage[];
  statistiques: Statistiques;
  livreId:      number;
  onAjouterAudio: (livreId: number, debut: number, fin: number) => void;
}

const GrillePages = ({ statutsPages, statistiques, livreId, onAjouterAudio }: GrillePagesProps) => (
  <div>
    <p className="text-[10px] font-black uppercase tracking-widest mb-3"
      style={{ color: "#334155" }}>
      État de chaque page
    </p>

    {/* Légende */}
    <div className="flex items-center gap-4 mb-3">
      {[
        { icone: <CheckCircle2 className="w-3 h-3" style={{ color: "#4ade80" }} />, texte: "Avec audio" },
        { icone: <XCircle      className="w-3 h-3" style={{ color: "#f87171" }} />, texte: "Sans audio" },
        { icone: <Upload       className="w-3 h-3" style={{ color: "#60a5fa" }} />, texte: "Cliquer pour ajouter" },
      ].map(({ icone, texte }) => (
        <div key={texte} className="flex items-center gap-1.5">
          {icone}
          <span className="text-[10px] font-bold" style={{ color: "#475569" }}>{texte}</span>
        </div>
      ))}
    </div>

    {/* Grille */}
    <div
      className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2 max-h-64 overflow-y-auto pr-1"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}
    >
      {statutsPages.map(({ page, audio, couverte }) => {
        const plage = !couverte ? suggererPlage(page.numero, statutsPages, statistiques.total) : null;

        return (
          <div
            key={page.id}
            className="relative rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 group"
            style={{
              background:  couverte ? "rgba(34,197,94,0.08)"  : "rgba(239,68,68,0.06)",
              border:      couverte ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(239,68,68,0.15)",
              minHeight:   56,
            }}
            onClick={() => {
              if (!couverte && plage) onAjouterAudio(livreId, plage.debut, plage.fin);
            }}
            onMouseEnter={(e) => {
              if (!couverte) {
                (e.currentTarget as HTMLElement).style.background    = "rgba(59,130,246,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor   = "rgba(59,130,246,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!couverte) {
                (e.currentTarget as HTMLElement).style.background    = "rgba(239,68,68,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor   = "rgba(239,68,68,0.15)";
              }
            }}
            title={
              couverte
                ? `Page ${page.numero} — Audio: ${audio?.fichierAudio} (pages ${audio?.pageDebut}→${audio?.pageFin})`
                : `Page ${page.numero} — Cliquer pour ajouter un audio`
            }
          >
            {/* Numéro */}
            <span className="text-xs font-black"
              style={{ color: couverte ? "#4ade80" : "#f87171" }}>
              {page.numero}
            </span>

            {/* Icône statut */}
            {couverte ? (
              <Music2 className="w-3 h-3 mt-0.5" style={{ color: "#4ade80" }} />
            ) : (
              <div className="relative">
                <VolumeX className="w-3 h-3 mt-0.5 group-hover:hidden"  style={{ color: "#f87171" }} />
                <Upload  className="w-3 h-3 mt-0.5 hidden group-hover:block" style={{ color: "#60a5fa" }} />
              </div>
            )}

            {/* Tooltip audio au survol */}
            {couverte && audio && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "#0f172a",
                  border:     "1px solid rgba(34,197,94,0.3)",
                  color:      "#4ade80",
                }}
              >
                P.{audio.pageDebut}→{audio.pageFin}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default GrillePages;