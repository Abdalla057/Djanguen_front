import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Carousel from "./carousoll";
import { useNavigate } from "react-router-dom";

const NAV = [
  { id: "accueil",    label: "Accueil"      },
  { id: "apropos",    label: "À propos"     },
  { id: "services",   label: "Services"     },
  { id: "contact",    label: "Contact"      },
  { id: "/connection", label: "Se connecter" },
];

const scrollTo = (id: string, close?: () => void) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 80,
    behavior: "smooth",
  });
  close?.();
};

const Header: React.FC = () => {
  const navigate   = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("accueil");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "accueil";
      NAV.forEach(({ id }) => {
        const sec = document.getElementById(id);
        if (sec && sec.getBoundingClientRect().top <= 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-300
          ${scrolled
            ? "bg-white border-b border-[#0C3B2E]/10 shadow-sm"
            : "bg-white/80 backdrop-blur-md"
          }`}
      >
        {/* Logo */}
        <div
          onClick={() => scrollTo("accueil")}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0C3B2E] flex items-center justify-center">
            <span className="text-[#FFBA00] text-sm font-black">A</span>
          </div>
          <span className="font-black text-[17px] text-[#0C3B2E] tracking-tight">
            guen <span className="text-[#FFBA00]">Dian</span>
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(({ id, label }) => {
            const isConnect = id === "/connection";
            const isActive  = active === id;

            if (isConnect) {
              return (
                <button
                  key={id}
                  onClick={() => navigate("/connection")}
                  className="ml-4 px-5 py-2 rounded-xl bg-[#FFBA00] text-[#0C3B2E] text-sm font-semibold hover:bg-[#e6a800] transition-colors"
                >
                  {label}
                </button>
              );
            }

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${isActive
                    ? "text-[#0C3B2E] bg-[#0C3B2E]/8 font-semibold"
                    : "text-slate-500 hover:text-[#0C3B2E] hover:bg-[#0C3B2E]/5"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#0C3B2E] p-2"
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 w-full z-[9998] bg-white border-b border-[#0C3B2E]/10 shadow-md md:hidden">
          <div className="flex flex-col p-4 gap-1">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === "/connection") {
                    navigate("/connection");
                    setMenuOpen(false);
                  } else {
                    scrollTo(id, () => setMenuOpen(false));
                  }
                }}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${id === "/connection"
                    ? "bg-[#FFBA00] text-[#0C3B2E] font-semibold"
                    : "text-slate-600 hover:bg-[#0C3B2E]/5 hover:text-[#0C3B2E]"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="accueil"
        className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 pt-28 pb-20 overflow-hidden bg-white gap-12"
      >
        {/* Décors de fond subtils */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #0C3B2E, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FFBA00, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* ── Contenu gauche ── */}
        <div className="relative z-10 flex-1 flex flex-col gap-6 max-w-xl">

          {/* Badge */}
          <span className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0C3B2E]/20 bg-[#0C3B2E]/5 text-[#0C3B2E] text-xs font-semibold tracking-wide">
            Plateforme de lecture interactive
          </span>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-black text-[#0C3B2E] leading-[1.15] tracking-tight">
            Plongez-vous dans une{" "}
            <span className="text-[#FFBA00]">expérience moderne</span>{" "}
            de lecture
          </h1>

          {/* Description */}
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-md">
            Explorez les textes coraniques dans une interface fluide, élégante
            et intuitive, pensée pour une lecture confortable et immersive.
          </p>

          {/* CTA */}
          <div className="flex gap-3 flex-wrap mt-2">
            <button
              onClick={() =>
                document.getElementById("Bibliothequesite")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 rounded-xl bg-[#FFBA00] text-[#0C3B2E] font-semibold text-sm hover:bg-[#e6a800] transition-colors shadow-sm"
            >
              Explorer
            </button>
            <button
              onClick={() => scrollTo("apropos")}
              className="px-8 py-3 rounded-xl border border-[#0C3B2E]/25 text-[#0C3B2E] font-semibold text-sm hover:bg-[#0C3B2E]/5 transition-colors"
            >
              En savoir plus
            </button>
          </div>

          {/* Stats rapides */}
          <div className="flex gap-8 mt-4 pt-6 border-t border-[#0C3B2E]/10">
            {[
              { value: "114", label: "Sourates" },
              { value: "6 236", label: "Versets" },
              { value: "30", label: "Juzz" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-black text-[#0C3B2E]">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Carousel droite ── */}
        <div className="relative z-10 flex-1 flex justify-center w-full max-w-md">
          <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-[#0C3B2E]/15">
            <Carousel />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;