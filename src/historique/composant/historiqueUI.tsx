import React from "react";
import type { ToastState } from "../type/historique.types";

// ── GenreBadge ────────────────────────────────────────────────────────────────
const GENRE_STYLES: Record<string, string> = {
  "Roman":              "bg-violet-100 text-violet-700",
  "Fiction":            "bg-teal-100 text-teal-700",
  "Roman épistolaire":  "bg-amber-100 text-amber-700",
  "Roman historique":   "bg-orange-100 text-orange-700",
};

export function GenreBadge({ genre }: { genre: string }) {
  const cls = GENRE_STYLES[genre] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cls}`}>
      {genre}
    </span>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
const AVATAR_VARIANTS = [
  "bg-violet-100 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-orange-100 text-orange-700",
  "bg-blue-100 text-blue-700",
];

export function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase();
  const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_VARIANTS.length;
  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium shrink-0 ${AVATAR_VARIANTS[idx]}`}>
      {initials}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
export function Toast({ toast }: { toast: ToastState | null }) {
  if (!toast) return null;
  const isErr = toast.type === "error";
  return (
    <div className={`absolute top-3 right-3 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border animate-fade-in
      ${isErr ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
      <i className={`ti ${isErr ? "ti-alert-circle" : "ti-circle-check"} text-base`} aria-hidden="true" />
      {toast.msg}
    </div>
  );
}

// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <i className="ti ti-book-2 text-5xl mb-3 opacity-30" aria-hidden="true" />
      <p className="text-sm font-medium text-gray-500">Aucun historique de lecture</p>
      <p className="text-xs mt-1">Commencez à lire un livre pour voir votre progression ici.</p>
    </div>
  );
}
