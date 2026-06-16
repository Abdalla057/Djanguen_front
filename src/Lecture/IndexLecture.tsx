import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import PageAffichage  from "./Composant/pageAffichage";
import AudioPlayer    from "./Composant/AudioPlayer";
import PageNavigation from "./Composant/pageNavigation";
import useGestionPage from "./logique/useGestionPage";

const IndexLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { livre, pages, currentIndex, audioFichier, goTo, nextPage } =
    useGestionPage(id);

  if (!pages || pages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#825732]">
        <span className="text-sm text-[#6b7280] tracking-widest">Chargement…</span>
      </div>
    );
  }

  const safeIndex   = Math.max(0, Math.min(currentIndex, pages.length - 1));
  const currentPage = pages[safeIndex];

  if (!currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0]">
        <span className="text-sm text-[#6b7280]">Page introuvable</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fde8d8] to-[#c8e8f0] flex justify-center px-4 pb-10">

      <div className="w-full max-w-md flex flex-col">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between pt-20 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/100 text-[#1a1a2e] flex items-center justify-center shadow-md text-lg hover:bg-white transition-all"
          >
            ←
          </button>

          <span className="text-sm font-bold text-[#1a1a2e] tracking-wide">
            En lecture
          </span>

          <div className="w-10" />
        </div>

        {/* ── Illustration ── */}
        <PageAffichage
          imagePath={currentPage.imagePath}
          numero={currentPage.numero}
        />

        {/* ── Audio ── */}
        <div className="mt-2">
          <AudioPlayer audioFichier={audioFichier} onEnd={nextPage} />
        </div>

        {/* ── Titre & page ── */}
        <div className="text-center mt-3">
          <h1 className="text-2xl font-black uppercase tracking-widest text-[#1a1a2e]">
            {livre?.titre ?? "Livre"}
          </h1>
          <p className="mt-1 text-xs text-[#6b7280] tracking-wider">
            Page{" "}
            <span className="font-bold text-[#f5c842]">{safeIndex + 1}</span>
            {" "}sur {pages.length}
          </p>
        </div>

        {/* ── Miniatures ── */}
        <div className="mt-4">
          <PageNavigation pages={pages} goTo={goTo} currentIndex={safeIndex} />
        </div>

      </div>
    </div>
  );
};

export default IndexLecture;