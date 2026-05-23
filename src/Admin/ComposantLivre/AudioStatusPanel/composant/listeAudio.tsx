import React from "react";
import { Music2, CheckCircle2 } from "lucide-react";
import { formaterPlage } from "../util/audioUtils";
import type { Audio } from "../type/audioStatusType";

interface ListeAudiosProps {
  audios: Audio[];
}

const ListeAudios = ({ audios }: ListeAudiosProps) => {
  if (audios.length === 0) return null;

  return (
    <div className="mb-5">
      <p className="text-[10px] font-black uppercase tracking-widest mb-3"
        style={{ color: "#334155" }}>
        Audios enregistrés ({audios.length})
      </p>

      <div className="space-y-2">
        {audios.map((audio) => (
          <div
            key={audio.id}
            className="flex items-center gap-3 p-2.5 rounded-xl"
            style={{
              background: "rgba(34,197,94,0.06)",
              border:     "1px solid rgba(34,197,94,0.15)",
            }}
          >
            {/* Icône */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(34,197,94,0.12)" }}>
              <Music2 className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate" style={{ color: "#e2e8f0" }}>
                {audio.fichierAudio}
              </p>
              <p className="text-[10px] font-semibold" style={{ color: "#4ade80" }}>
                {formaterPlage(audio.pageDebut, audio.pageFin)}{" "}
                <span style={{ color: "#334155" }}>
                  ({audio.pageFin - audio.pageDebut + 1} page{audio.pageFin - audio.pageDebut + 1 > 1 ? "s" : ""})
                </span>
              </p>
            </div>

            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#4ade80" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeAudios;