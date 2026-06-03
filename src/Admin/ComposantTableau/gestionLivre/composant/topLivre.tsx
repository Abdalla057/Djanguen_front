import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { API_URL } from "../constante/constante";

interface Book {
  id: number;
  titre: string;
  auteur: string;
  cover?: string;
}

const obtenirUrlImage = (cover?: string): string | null => {
  if (!cover) return null;
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  return `${API_URL}/uploads/images/${cover}`;
};

const COVER_GRADIENTS = [
  "from-violet-400 to-violet-600",
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-teal-400 to-teal-600",
];

// ─── Skeleton ───
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="w-full aspect-[2/3] rounded-xl bg-slate-100 mb-2.5" />
    <div className="h-3 bg-slate-100 rounded w-4/5 mb-1.5" />
    <div className="h-2.5 bg-slate-100 rounded w-3/5" />
  </div>
);

// ─── Composant principal ───
const TopLivre = () => {
  const [books,   setBooks]   = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/livre`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        });
        const data = await res.json();
        setBooks(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        console.error("Erreur chargement livres :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
      <h3 className="text-[15px] font-semibold text-slate-800 mb-5">Top Choices</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : books.map((b, i) => {
              const imgUrl = obtenirUrlImage(b.cover);
              return (
                <div key={b.id} className="group cursor-pointer">
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-2.5 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={b.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                        }}
                      />
                    ) : null}
                    {/* Fallback cover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${COVER_GRADIENTS[i % COVER_GRADIENTS.length]} flex flex-col items-center justify-end p-2 ${imgUrl ? "hidden" : "flex"}`}
                      style={{ display: imgUrl ? "none" : "flex" }}
                    >
                      <BookOpen className="w-6 h-6 text-white/60 mb-1" />
                      <span className="text-white text-[9px] font-medium text-center leading-tight line-clamp-3">
                        {b.titre}
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] font-semibold text-slate-700 line-clamp-2 leading-tight">{b.titre}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{b.auteur}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TopLivre;