import React from "react";

const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden bg-[#0C3B2E]">

    {/* ── Déco points ── */}
    <div className="absolute top-14 left-36 opacity-[0.15]"
      style={{ width:120, height:120, backgroundImage:"radial-gradient(circle,#FFBA00 1px,transparent 1px)", backgroundSize:"11px 11px" }}
    />
    <div className="absolute bottom-24 right-[460px] opacity-[0.12]"
      style={{ width:80, height:80, backgroundImage:"radial-gradient(circle,#FFBA00 1px,transparent 1px)", backgroundSize:"10px 10px" }}
    />

    {/* ── Cercles déco ── */}
    <div className="absolute top-10 right-[280px] w-11 h-11 bg-[#FFBA00] rounded-full opacity-90"/>
    <div className="absolute top-[100px] right-[210px] w-7 h-7 bg-[#FFBA00]/50 rounded-full opacity-70"/>
    <div className="absolute top-[60px] right-[55px] w-[72px] h-[72px] border-[3px] border-[#FFBA00] rounded-full opacity-40"/>
    <div className="absolute bottom-28 right-[130px] w-6 h-6 bg-[#FFBA00]/30 rounded-full opacity-60"/>

    {/* ── Cercle déco fond ── */}
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/5"/>
    <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full border border-white/5"/>

    <div className="max-w-6xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-end gap-0">

      {/* ── Texte ── */}
      <div className="flex-1 pt-16 pb-24 z-10">

        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFBA00]/15 border border-[#FFBA00]/30
          text-[#FFBA00] text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFBA00] inline-block"/>
          Bibliothèque numérique
        </div>

        <h1 className="text-5xl lg:text-[58px] font-black leading-[1.08] text-white tracking-tight">
          Découvrez<br/>
          <span className="text-[#FFBA00]">100+</span> livres<br/>
          sur Dianguen
        </h1>

        <p className="text-white/50 mt-5 max-w-[280px] text-[13px] leading-relaxed">
          Accédez à une bibliothèque numérique complète et enrichissez votre culture à votre rythme.
        </p>

        <button className="mt-8 bg-[#FFBA00] hover:bg-[#e6a800] text-[#0C3B2E] font-bold
          px-8 py-3.5 rounded-full text-[13px] transition-all hover:shadow-xl
          hover:shadow-[#FFBA00]/20 flex items-center gap-2">
          Explorer les livres <span>→</span>
        </button>
      </div>

      {/* ── Image ── */}
      <div className="flex-1 relative flex items-end justify-center min-h-[380px]">

        {/* Blob */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-52 rounded-full opacity-30"
          style={{ background:"radial-gradient(ellipse,#FFBA00,#0C3B2E)", filter:"blur(32px)" }}
        />

        {/* Personne */}
        <div className="relative z-40" style={{ fontSize:200, lineHeight:1 }}></div>
      </div>
    </div>

    {/* ── Wave ── */}
    <div className="absolute bottom-0 left-0 w-full pointer-events-none">
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full" style={{ height:56 }}>
        <path d="M0,28 C280,60 560,0 840,32 C1050,54 1260,18 1440,28 L1440,56 L0,56 Z" fill="white"/>
      </svg>
    </div>

  </section>
);

export default HeroSection;