import React from "react";
import { BookOpen, AlertCircle, Zap, SearchX } from "lucide-react";
import { motion } from "framer-motion";

/* ── Écran de chargement ── */
export const EcranChargement = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />
        <div className="relative w-24 h-24 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-indigo-300 animate-pulse" />
        </div>
      </div>
      <p className="text-xl text-slate-300 font-medium tracking-widest uppercase animate-pulse">
        Chargement de la bibliothèque…
      </p>
    </div>
  </div>
);

/* ── Bibliothèque vide ── */
export const EcranVide = ({ onAjouter }: { onAjouter: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
    <div className="text-center max-w-md">
      <div className="w-36 h-36 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
        <BookOpen className="w-16 h-16 text-indigo-400" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-3">Bibliothèque vide</h3>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Commencez à construire votre collection numérique en ajoutant votre premier ouvrage.
      </p>
      <button
        onClick={onAjouter}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 inline-flex items-center gap-3 font-semibold hover:scale-105"
      >
        <Zap className="w-5 h-5" />Ajouter un livre
      </button>
    </div>
  </div>
);

/* ── Alerte d'erreur ── */
export const AlerteErreur = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 mb-6"
  >
    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
    <p className="text-red-400 text-sm font-medium">{message}</p>
  </motion.div>
);

/* ── Aucun résultat ── */
export const EcranAucunResultat = ({ recherche }: { recherche: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-28 bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/40"
  >
    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
      <SearchX className="w-8 h-8 text-slate-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Aucun résultat trouvé</h3>
    <p className="text-slate-400 text-sm">
      Aucun livre ne correspond à "
      <span className="text-indigo-300">{recherche}</span>"
    </p>
  </motion.div>
);