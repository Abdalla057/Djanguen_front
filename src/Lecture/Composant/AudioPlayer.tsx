import React, { useEffect, useRef, useState } from "react";
import { SkipBack, SkipForward, Play, Pause, Shuffle, Repeat } from "lucide-react";

interface Props {
  audioFichier: string | null;
  onEnd?: () => void;
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const BAR_COUNT = 40;

const AudioPlayer = ({ audioFichier, onEnd }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [duration, setDuration]   = useState(0);
  const [isRepeat, setIsRepeat]   = useState(false);

  const barHeights = useRef<number[]>(
    Array.from({ length: BAR_COUNT }, () => Math.random() * 28 + 8)
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioFichier) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      setIsPlaying(false);
      setProgress(0);
      return;
    }
    audio.src = audioFichier;
    audio.load();
    setProgress(0);
    setIsPlaying(false);
  }, [audioFichier]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) { await audio.play(); setIsPlaying(true); }
      else              { audio.pause();       setIsPlaying(false); }
    } catch (e) { console.error(e); }
  };

  const skip = (secondes: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + secondes, 0), duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const val  = ((e.clientX - rect.left) / rect.width) * (duration || 1);
    if (audioRef.current) audioRef.current.currentTime = val;
    setProgress(val);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleSeek(e);
  };

  const pct       = duration ? (progress / duration) * 100 : 0;
  const activeBars = Math.round((pct / 100) * BAR_COUNT);

  return (
    <div className="w-full flex flex-col gap-4 py-3">

      <audio
        ref={audioRef}
        loop={isRepeat}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
        onEnded={() => {
          if (!isRepeat) {
            setIsPlaying(false);
            setProgress(0);
            onEnd?.();
          }
        }}
      />

      {/* ── Waveform ── */}
      <div className="flex items-end justify-between gap-[2px] h-10 px-1">
        {barHeights.current.map((h, i) => (
          <div
            key={i}
            className="rounded-full flex-1 transition-all duration-100"
            style={{
              height: `${h}px`,
              background: i < activeBars ? "#f5c842" : "rgba(26,26,46,0.2)",
            }}
          />
        ))}
      </div>

      {/* ── Seekbar ── */}
      <div className="flex flex-col gap-1">
        <div
          onClick={handleSeek}
          onMouseMove={handleDrag}
          className="h-[3px] bg-[#1a1a2e]/15 rounded-full cursor-pointer relative"
        >
          <div
            className="h-full bg-[#1a1a2e] rounded-full relative transition-all duration-100"
            style={{ width: `${pct}%` }}
          >
            <div className="w-3.5 h-3.5 bg-[#1a1a2e] rounded-full absolute -right-1.5 top-1/2 -translate-y-1/2 shadow" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-[#6b7280] tracking-wide">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* ── Contrôles ── */}
      <div className="flex items-center justify-between px-2">

        <button className="text-[#1a1a2e]/50 hover:text-[#1a1a2e] transition-colors">
          <Shuffle size={18} />
        </button>

        <button
          onClick={() => skip(-10)}
          className="text-[#1a1a2e] hover:scale-110 transition-all"
        >
          <SkipBack size={22} fill="#1a1a2e" />
        </button>

        <button
          onClick={togglePlay}
          className="text-[#1a1a2e] hover:scale-110 active:scale-95 transition-all"
        >
          {isPlaying
            ? <Pause size={32} fill="#1a1a2e" />
            : <Play  size={32} fill="#1a1a2e" />
          }
        </button>

        <button
          onClick={() => skip(10)}
          className="text-[#1a1a2e] hover:scale-110 transition-all"
        >
          <SkipForward size={22} fill="#1a1a2e" />
        </button>

        <button
          onClick={() => setIsRepeat(!isRepeat)}
          className={`transition-colors ${isRepeat ? "text-[#f5c842]" : "text-[#1a1a2e]/50 hover:text-[#1a1a2e]"}`}
        >
          <Repeat size={18} />
        </button>

      </div>
    </div>
  );
};

export default AudioPlayer;