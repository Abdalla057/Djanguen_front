import React, { useEffect, useState, useRef } from "react";
import { COULEURS } from "../constante/constante";

interface LecteurAudioProps {
  src: string;
}

const LecteurAudio = ({ src }: LecteurAudioProps) => {
  const refAudio    = useRef<HTMLAudioElement>(null);
  const [enLecture, setEnLecture] = useState(false);
  const [position,  setPosition]  = useState(0);
  const [duree,     setDuree]     = useState(0);
  const [volume,    setVolume]    = useState(1);
  const [muet,      setMuet]      = useState(false);

  useEffect(() => {
    setEnLecture(false);
    setPosition(0);
    setDuree(0);
  }, [src]);

  const formaterTemps = (secondes: number) => {
    if (!isFinite(secondes)) return "0:00";
    const minutes = Math.floor(secondes / 60);
    const sec     = Math.floor(secondes % 60).toString().padStart(2, "0");
    return `${minutes}:${sec}`;
  };

  const basculerLecture = () => {
    const audio = refAudio.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setEnLecture(true); }
    else              { audio.pause(); setEnLecture(false); }
  };

  const deplacer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = refAudio.current;
    if (!audio) return;
    const valeur = Number(e.target.value);
    audio.currentTime = valeur;
    setPosition(valeur);
  };

  const modifierVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeur = Number(e.target.value);
    setVolume(valeur);
    if (refAudio.current) refAudio.current.volume = valeur;
    setMuet(valeur === 0);
  };

  const basculerMuet = () => {
    const audio = refAudio.current;
    if (!audio) return;
    const suivant = !muet;
    audio.muted = suivant;
    setMuet(suivant);
  };

  const pourcentage = duree ? (position / duree) * 100 : 0;
  console.log("AUDIO SRC =", src);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${COULEURS.bordure}`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 8px 32px ${COULEURS.ombre}`,
      }}
    >
      <audio
        ref={refAudio}
        src={src}
        onTimeUpdate={() => setPosition(refAudio.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuree(refAudio.current?.duration ?? 0)}
        onEnded={() => setEnLecture(false)}
      />

      {/* En-tête */}
      <div
        className="flex items-center gap-2 px-5 pt-4 pb-3"
        style={{ borderBottom: `1px solid ${COULEURS.bordure}` }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: enLecture ? COULEURS.cyan : COULEURS.discret,
            boxShadow: enLecture ? `0 0 8px ${COULEURS.lueurC}` : "none",
            transition: "all 0.3s",
          }}
        />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: COULEURS.discret }}>
          Récitation audio
        </span>
        {enLecture && (
          <div className="ml-auto flex items-end gap-0.5 h-4">
            {[0, 150, 75, 200, 50].map((delai, i) => (
              <div
                key={i}
                style={{
                  width: "3px",
                  borderRadius: "2px",
                  background: `linear-gradient(to top, ${COULEURS.bleu}, ${COULEURS.cyan})`,
                  animation: `wave 0.8s ${delai}ms ease-in-out infinite alternate`,
                  height: `${8 + i * 2}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contrôles */}
      <div className="px-5 py-4 flex flex-col gap-3">

        {/* Barre de progression */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tabular-nums w-10 text-right shrink-0" style={{ color: COULEURS.discret }}>
            {formaterTemps(position)}
          </span>
          <div className="relative flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
              style={{
                width: `${pourcentage}%`,
                background: `linear-gradient(to right, ${COULEURS.bleu}, ${COULEURS.cyan})`,
                boxShadow: `0 0 8px ${COULEURS.lueur}`,
              }}
            />
            <input
              type="range" min={0} max={duree || 1} step={0.1} value={position}
              onChange={deplacer}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ margin: 0 }}
              aria-label="Position audio"
            />
          </div>
          <span className="text-xs font-mono tabular-nums w-10 shrink-0" style={{ color: COULEURS.discret }}>
            {formaterTemps(duree)}
          </span>
        </div>

        {/* Boutons lecture + volume */}
        <div className="flex items-center gap-4">
          <button
            onClick={basculerLecture}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${COULEURS.bleu}, ${COULEURS.violet})`,
              boxShadow: `0 4px 14px ${COULEURS.lueur}`,
            }}
            aria-label={enLecture ? "Pause" : "Lecture"}
          >
            {enLecture ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="1" width="3.5" height="12" rx="1.2" fill="white"/>
                <rect x="8.5" y="1" width="3.5" height="12" rx="1.2" fill="white"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 1.5L12.5 7L3 12.5V1.5Z" fill="white"/>
              </svg>
            )}
          </button>

          <button
            onClick={basculerMuet}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-opacity"
            style={{ color: muet ? COULEURS.discret : COULEURS.attenue, opacity: 0.8 }}
            aria-label={muet ? "Réactiver le son" : "Couper le son"}
          >
            {muet || volume === 0 ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.63 3.63a1 1 0 000 1.41L7.29 8.7 7 9H4a1 1 0 00-1 1v4a1 1 0 001 1h3l3.57 3.57c.63.63 1.43.19 1.43-.7v-2.83l4.09 4.09a1 1 0 001.41-1.41L5.04 3.63a1 1 0 00-1.41 0z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>

          <div className="relative flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${(muet ? 0 : volume) * 100}%`,
                background: `linear-gradient(to right, ${COULEURS.violet}, ${COULEURS.cyan})`,
                transition: "width 0.1s",
              }}
            />
            <input
              type="range" min={0} max={1} step={0.02} value={muet ? 0 : volume}
              onChange={modifierVolume}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ margin: 0 }}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecteurAudio;