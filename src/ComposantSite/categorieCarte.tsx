import React from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconScale = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 9l9-6 9 6M5 20h14"/>
    <path d="M5 12l-2 7h4zM19 12l-2 7h4z"/>
  </svg>
);

const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const IconType = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
);

const IconMusic = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const IconMessageCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconHeart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);



const IconBookOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    <line x1="12" y1="7" x2="12" y2="17"/>
  </svg>
);// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { Icon: IconScale,        label: "Figh"    },
  { Icon: IconBook,         label: "Tafsir"  },
  { Icon: IconType,         label: "Langue"  },
  { Icon: IconMusic,        label: "Tajwid"  },
  { Icon: IconMessageCircle,label: "Hadith"  },
  { Icon: IconShield,       label: "Aqida"   },
  { Icon: IconStar,         label: "Sira"    },
  { Icon: IconHeart,        label: "Tarbiya" },
  { Icon: IconBookOpen,     label: "Coran"   },
];

// ─── Component ────────────────────────────────────────────────────────────────
const TopCategories: React.FC = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-5xl mx-auto">

      {/* En-tête */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold text-[#0C3B2E] bg-[#0C3B2E]/8 px-4 py-1.5 rounded-full mb-4">
          Catégories
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-[#0C3B2E] tracking-tight">
          Nos meilleures catégories
        </h2>
        <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Retrouvez les catégories les plus populaires parmi nos utilisateurs,
          couvrant une variété de sujets pour enrichir votre expérience de lecture.
        </p>
      </div>

      {/* Grille */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map(({ Icon, label }, i) => {
          const isGold = i === 8; // "Coran" mis en avant
          return (
            <div
              key={i}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer
                hover:-translate-y-0.5 hover:shadow-md transition-all duration-200
                ${isGold
                  ? "bg-[#0C3B2E] border-[#0C3B2E]"
                  : "bg-white border-[#0C3B2E]/15 hover:border-[#0C3B2E]/30"
                }`}
            >
              {/* Icône */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
                ${isGold
                  ? "bg-[#FFBA00] text-[#0C3B2E]"
                  : "bg-[#0C3B2E]/8 text-[#0C3B2E] group-hover:bg-[#FFBA00]/20"
                }`}>
                <Icon />
              </div>

              {/* Label */}
              <span className={`font-semibold text-sm
                ${isGold ? "text-white" : "text-[#0C3B2E]"}`}>
                {label}
              </span>

              {/* Flèche */}
              <svg
                className={`ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200
                  ${isGold ? "text-[#FFBA00]" : "text-[#0C3B2E]"}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TopCategories;