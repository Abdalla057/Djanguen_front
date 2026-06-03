import React, { useEffect, useState } from "react";
import { FaBars, FaTimes} from "react-icons/fa";
import Carousel from "./carousoll";

const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "À propos" },
  { id: "Bibliothequesite", label: "Bibliothèque" },
  { id: "contact", label: "Contact" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "accueil";

      NAV.forEach(({ id }) => {
        const sec = document.getElementById(id);
        if (sec && sec.getBoundingClientRect().top <= 120) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] h-[75px] flex items-center justify-between px-8 transition-all duration-300
        ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}
      >
        {/* Logo */}
        <div
          onClick={() => scrollTo("accueil")}
          className="flex items-center gap-2 cursor-pointer font-bold text-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white text-xs font-black">
            A
          </div>

          <span className={`font-black ${scrolled ? "text-gray-800" : "text-black"}`}>
            guen <span className="text-amber-400">Dian</span>
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4">
          {NAV.map(({ id, label }) => {
            const isActive = active === id;

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-xl font-medium transition
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* BURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* ── MOBILE MENU ──────────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed top-[75px] left-0 w-full h-screen bg-white z-[9993] flex flex-col gap-2 p-6">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id, () => setMenuOpen(false))}
              className={`px-4 py-3.5 rounded-xl text-left font-medium transition
                ${
                  active === id
                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {label}
            </button>
          ))}

          <a
            href="/profil"
            className="mt-4 py-3 rounded-full bg-amber-400 text-gray-900 font-bold text-center"
          >
            👤 Profil
          </a>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
       id="accueil"
       className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-10 pt-24 pb-16 overflow-hidden bg-amber-100"
       
     >

  {/* ================= BACKGROUND SHAPES (IDENTIQUE STYLE IMAGE) ================= */}

  <div
    className="absolute top-[-120px] left-[-120px] w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
    style={{
      background: "radial-gradient(circle, #fde68a, transparent 60%)",
    }}
  />

  <div
    className="absolute top-[120px] right-[-120px] w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
    style={{
      background: "radial-gradient(circle, #fbcfe8, transparent 60%)",
    }}
  />

  <div
    className="absolute bottom-[-120px] left-[20%] w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
    style={{
      background: "radial-gradient(circle, #bfdbfe, transparent 60%)",
    }}
  />

  {/* ================= LEFT CONTENT ================= */}
  <div className="relative flex-1 min-w-[300px] z-30 overflow-hidden">

  {/* BACKGROUND GRADIENT + ARCH */}
  <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-sky-200 to-indigo-100 rounded-xl " />

  <div className="absolute bottom-16 left-10 w-full h-40 bg-gradient-to-t from-white to-transparent rounded-t-[100%]" />

  {/* CONTENT */}
  <div className="relative z-10 p-6 md:p-10">

    {/* BADGE */}
    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md text-gray-700 text-xs font-semibold shadow-sm mb-8 border border-white/40">
      📖 Plateforme de lecture interactive
    </span>

    {/* TITLE */}
    <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
      Design pour une
      <br />
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(135deg,#fb7185,#60a5fa)",
        }}
      >
        expérience moderne
      </span>
    </h1>

    {/* DESCRIPTION */}
    <p className="text-gray-600 mt-6 max-w-md text-lg leading-relaxed">
      Explore les textes coraniques dans une interface fluide, élégante et intuitive,
      pensée pour une lecture confortable et immersive.
    </p>

    {/* BUTTONS */}
    <div className="flex gap-4 mt-8 flex-wrap">

      <button
        onClick={() =>
          document.getElementById("Bibliothequesite")?.scrollIntoView({ behavior: "smooth" })
        }
        className="px-7 py-3 rounded-full text-black font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl  bg-yellow-300"
      
      >
        Explorer
      </button>

      <button
        onClick={() =>
          document.getElementById("apropos")?.scrollIntoView({ behavior: "smooth" })
        }
        className="px-7 py-3 rounded-full border border-gray-200 text-gray-700 bg-white/40 backdrop-blur-md hover:bg-white transition-all duration-300"
      >
        En savoir plus
      </button>

    </div>

  </div>
</div>

  {/* ================= RIGHT CONTENT (IMAGE/CAROUSEL) ================= */}
  <div className="flex-1 min-w-[100px] z-10 flex justify-center lg:mt-12 rounded-3xl p-4 " >
    <div
      className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
     
    >
      <Carousel />
    </div>
  </div>

  {/* ================= BOTTOM WAVE (IDENTIQUE STYLE IMAGE) ================= */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none ">
    <svg viewBox="10 0 1440 110" className="w-full h-[120px]" preserveAspectRatio="none">
      <path
        d="M0,64 C240,140 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
        fill="#ffffff"
      />
    </svg>
  </div>
</section>
     
    </>
  );
};

export default Header;