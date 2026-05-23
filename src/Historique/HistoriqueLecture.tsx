/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, BookOpen, Trash2, Edit, Save, X,
  Clock, Headphones, FileText, CheckCircle,
  User, AlertTriangle,
} from "lucide-react";
import { useUser } from "../ComposantSite/userContext";

const API_URL = import.meta.env.VITE_API_URL;

interface HistoriqueEntry {
  id: number;
  livreId: number;
  livre?: { id: number; titre: string; auteur?: string };
  utilisateur?: { id: number; nom?: string; prenom?: string; email?: string };
  dernierePage: number;
  derniereAudio: number;
  updatedAt: string;
}

/* ================================================================
   TYPES pour les panels d'action
   ================================================================ */
type ActionPanelState =
  | { type: "none" }
  | { type: "confirmDelete"; entryId: number; titre: string }
  | { type: "confirmSave";   entry: HistoriqueEntry };

type ToastState = {
  visible: boolean;
  message: string;
  variant: "success" | "error";
};

/* ================================================================
   COMPOSANT TOAST
   ================================================================ */
function Toast({ toast }: { toast: ToastState }) {
  if (!toast.visible) return null;
  const isSuccess = toast.variant === "success";
  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
      style={{
        background: isSuccess
          ? "linear-gradient(135deg, #064e3b 0%, #065f46 100%)"
          : "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
        border: `1px solid ${isSuccess ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
        animation: "toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        boxShadow: isSuccess
          ? "0 8px 32px rgba(16,185,129,0.2)"
          : "0 8px 32px rgba(239,68,68,0.2)",
      }}
    >
      {isSuccess
        ? <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#34d399" }} />
        : <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: "#f87171" }} />}
      <span
        className="text-sm font-semibold"
        style={{ color: isSuccess ? "#a7f3d0" : "#fca5a5" }}
      >
        {toast.message}
      </span>
    </div>
  );
}

/* ================================================================
   PANEL DE CONFIRMATION SUPPRESSION (inline dans la carte)
   ================================================================ */
function DeleteConfirmPanel({
  titre,
  onConfirm,
  onCancel,
}: {
  titre: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="p-6 flex flex-col gap-4"
      style={{ animation: "panelSlideIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
    >
      {/* Icône + message */}
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <Trash2 className="w-5 h-5" style={{ color: "#f87171" }} />
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-1">Supprimer cette entrée ?</p>
          <p className="text-xs" style={{ color: "#94a3b8" }}>
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>« {titre} »</span> sera
            retiré de votre historique. Cette action est irréversible.
          </p>
        </div>
      </div>

      {/* Barre de danger */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.4), transparent)" }}
      />

      {/* Boutons */}
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(220,38,38,0.3)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(220,38,38,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(220,38,38,0.3)"; }}
        >
          <Trash2 className="w-4 h-4" />
          Oui, supprimer
        </button>
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
          style={{
            background: "rgba(51,65,85,0.8)",
            color: "#94a3b8",
            border: "1px solid rgba(71,85,105,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(71,85,105,0.8)";
            (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(51,65,85,0.8)";
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
          }}
        >
          <X className="w-4 h-4" />
          Annuler
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   PANEL DE CONFIRMATION SAUVEGARDE (inline dans la carte)
   ================================================================ */
function SaveConfirmPanel({
  titre,
  onConfirm,
  onCancel,
}: {
  titre: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="px-6 pb-5 pt-1"
      style={{ animation: "panelSlideIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
    >
      {/* Séparateur */}
      <div
        className="h-px w-full mb-4"
        style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <Save className="w-4 h-4" style={{ color: "#818cf8" }} />
        </div>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Confirmer la mise à jour de{" "}
          <span style={{ color: "#e2e8f0", fontWeight: 600 }}>« {titre} »</span> ?
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(99,102,241,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(99,102,241,0.3)"; }}
        >
          <CheckCircle className="w-4 h-4" />
          Confirmer
        </button>
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
          style={{
            background: "rgba(51,65,85,0.8)",
            color: "#94a3b8",
            border: "1px solid rgba(71,85,105,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(71,85,105,0.8)";
            (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(51,65,85,0.8)";
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
          }}
        >
          <X className="w-4 h-4" />
          Annuler
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
const HistoriqueLecture: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const { profile } = useUser();

  const [historique, setHistorique]   = useState<HistoriqueEntry[]>([]);
  const [loading, setLoading]         = useState(true);
  const [editingId, setEditingId]     = useState<number | null>(null);

  // Panel d'action inline (confirmation delete ou save)
  const [actionPanel, setActionPanel] = useState<ActionPanelState>({ type: "none" });

  // Toast de feedback — géré uniquement en state React, jamais en localStorage
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "", variant: "success" });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageState  = useRef<{ [key: number]: number }>({});
  const audioState = useRef<{ [key: number]: number }>({});
  const hasFetchedRef = useRef(false);

  /* ── Toast helper ── */
  const showToast = (message: string, variant: "success" | "error" = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, message, variant });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3200);
  };

  /* ── userId helper ── */
  const getValidUserId = (): number | null => {
    if (userId) {
      const parsed = Number(userId);
      if (!isNaN(parsed)) return parsed;
    }
    if (profile?.id) return Number(profile.id);
    return null;
  };

  /* ── Fetch historique ── */
  const fetchHistorique = async () => {
    const validId = getValidUserId();
    if (!validId) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/lecture/historique/${validId}`);
      if (!res.ok) throw new Error("Erreur serveur");
      const data: HistoriqueEntry[] = await res.json();
      const pageObj: { [key: number]: number } = {};
      const audioObj: { [key: number]: number } = {};
      data.forEach((e) => {
        pageObj[e.livreId]  = e.dernierePage;
        audioObj[e.livreId] = e.derniereAudio;
      });
      pageState.current  = pageObj;
      audioState.current = audioObj;
      const unique = data.filter(
        (e, i, arr) => arr.findIndex((x) => x.livreId === e.livreId) === i
      );
      setHistorique(unique);
    } catch (err) {
      console.error(err);
      setHistorique([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((profile?.id || userId) && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchHistorique();
    }
  }, [profile?.id, userId]);

  /* ── Sauvegarder (après confirmation) ── */
  const updateProgress = async (entry: HistoriqueEntry) => {
    const validId = getValidUserId();
    if (!validId) return;
    try {
      await fetch(`${API_URL}/lecture/historique`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utilisateurId: validId,
          livreId:       entry.livreId,
          dernierePage:  pageState.current[entry.livreId]  || 1,
          derniereAudio: audioState.current[entry.livreId] || 0,
        }),
      });
      setEditingId(null);
      setActionPanel({ type: "none" });
      showToast("Progression mise à jour", "success");
      fetchHistorique();
    } catch {
      showToast("Erreur lors de la mise à jour", "error");
    }
  };

  /* ── Supprimer (après confirmation) ── */
  const deleteEntry = async (id: number) => {
    try {
      await fetch(`${API_URL}/lecture/historique/${id}`, { method: "DELETE" });
      setHistorique((prev) => prev.filter((e) => e.id !== id));
      setActionPanel({ type: "none" });
      showToast("Entrée supprimée", "success");
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  /* ── États globaux ── */
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
            <BookOpen className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Connexion requise</h3>
          <p className="text-slate-400 mb-8">
            Vous devez être connecté pour accéder à votre historique de lecture
          </p>
          <button
            onClick={() => navigate("/connection")}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-2xl opacity-50 absolute inset-0" />
            <div className="relative w-24 h-24 border-4 border-indigo-400/50 border-t-indigo-300 rounded-full animate-spin mx-auto flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-indigo-200 animate-pulse" />
            </div>
          </div>
          <p className="mt-8 text-xl text-slate-200 font-semibold">Chargement de l'historique...</p>
        </div>
      </div>
    );
  }

  /* ================================================================
     RENDU PRINCIPAL
     ================================================================ */
  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes panelSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeInStagger {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .history-card {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.3s cubic-bezier(0.4,0,0.2,1),
                      border-color 0.3s ease;
        }
        .history-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .fade-in     { animation: fadeIn 0.5s ease-out forwards; }
        .stagger-item {
          animation: fadeInStagger 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* ── Toast flottant ── */}
      <Toast toast={toast} />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="mb-12 fade-in">
            <button
              onClick={() => navigate("/site")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Retour</span>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">Historique de Lecture</h1>
                <p className="text-slate-400">
                  {historique.length} livre{historique.length > 1 ? "s" : ""} en cours
                </p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-transparent" />
          </div>

          {/* ── Liste ── */}
          {historique.length > 0 ? (
            <div className="space-y-4">
              {historique.map((entry, idx) => {
                const isDeleting =
                  actionPanel.type === "confirmDelete" && actionPanel.entryId === entry.id;
                const isSaving =
                  actionPanel.type === "confirmSave" && actionPanel.entry.id === entry.id;

                return (
                  <div
                    key={entry.livreId}
                    className="history-card stagger-item rounded-2xl overflow-hidden shadow-lg"
                    style={{
                      background: "rgba(30,41,59,0.5)",
                      backdropFilter: "blur(8px)",
                      border: isDeleting
                        ? "1px solid rgba(239,68,68,0.45)"
                        : isSaving
                        ? "1px solid rgba(99,102,241,0.45)"
                        : "1px solid rgba(51,65,85,0.6)",
                      animationDelay: `${idx * 0.08}s`,
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    {editingId === entry.id ? (
                      /* ═══ MODE ÉDITION ═══ */
                      <div className="p-6 space-y-5">
                        <div className="flex items-center gap-3">
                          <Edit className="w-5 h-5 text-indigo-400" />
                          <h4 className="text-lg font-bold text-white">
                            {entry.livre?.titre || "Livre"}
                          </h4>
                        </div>

                        {/* Page */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <FileText className="w-4 h-4 text-emerald-400" />
                            Page actuelle
                          </label>
                          <input
                            type="number" min="1"
                            defaultValue={pageState.current[entry.livreId] || 1}
                            onChange={(e) => { pageState.current[entry.livreId] = Number(e.target.value) || 1; }}
                            className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all"
                            style={{
                              background: "rgba(51,65,85,0.5)",
                              border: "1px solid rgba(71,85,105,0.7)",
                            }}
                            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,211,153,0.6)"; }}
                            onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,85,105,0.7)"; }}
                          />
                        </div>

                        {/* Audio */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <Headphones className="w-4 h-4 text-purple-400" />
                            Position audio
                          </label>
                          <input
                            type="number" min="0"
                            defaultValue={audioState.current[entry.livreId] || 0}
                            onChange={(e) => { audioState.current[entry.livreId] = Number(e.target.value) || 0; }}
                            className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all"
                            style={{
                              background: "rgba(51,65,85,0.5)",
                              border: "1px solid rgba(71,85,105,0.7)",
                            }}
                            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.6)"; }}
                            onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,85,105,0.7)"; }}
                          />
                        </div>

                        {/* Boutons save / cancel */}
                        <div
                          className="flex gap-3 pt-4"
                          style={{ borderTop: "1px solid rgba(51,65,85,0.7)" }}
                        >
                          <button
                            onClick={() => setActionPanel({ type: "confirmSave", entry })}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95"
                            style={{
                              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                              boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                            }}
                          >
                            <Save className="w-4 h-4" />
                            Sauvegarder
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setActionPanel({ type: "none" }); }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                            style={{ background: "rgba(51,65,85,0.7)", color: "#94a3b8" }}
                          >
                            <X className="w-4 h-4" />
                            Annuler
                          </button>
                        </div>

                        {/* Panel confirmation sauvegarde */}
                        {isSaving && (
                          <SaveConfirmPanel
                            titre={entry.livre?.titre || "ce livre"}
                            onConfirm={() => updateProgress(entry)}
                            onCancel={() => setActionPanel({ type: "none" })}
                          />
                        )}
                      </div>
                    ) : (
                      /* ═══ MODE LECTURE ═══ */
                      <div>
                        <div className="flex items-center justify-between p-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                              <h4 className="text-lg font-bold text-white truncate">
                                {entry.livre?.titre || "Livre"}
                              </h4>
                              {entry.utilisateur && (
                                <div
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0"
                                  style={{
                                    background: "rgba(245,158,11,0.1)",
                                    border: "1px solid rgba(245,158,11,0.3)",
                                  }}
                                >
                                  <User className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                                  <span className="text-xs font-medium" style={{ color: "#fcd34d" }}>
                                    {entry.utilisateur.prenom && entry.utilisateur.nom
                                      ? `${entry.utilisateur.prenom} ${entry.utilisateur.nom}`
                                      : entry.utilisateur.nom || entry.utilisateur.email || "Utilisateur"}
                                  </span>
                                </div>
                              )}
                            </div>

                            {entry.livre?.auteur && (
                              <p className="text-slate-400 text-sm mb-4">par {entry.livre.auteur}</p>
                            )}

                            <div className="flex flex-wrap gap-3 mb-3">
                              <div
                                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                style={{
                                  background: "rgba(52,211,153,0.08)",
                                  border: "1px solid rgba(52,211,153,0.25)",
                                }}
                              >
                                <FileText className="w-4 h-4" style={{ color: "#34d399" }} />
                                <span className="text-sm font-medium" style={{ color: "#6ee7b7" }}>
                                  Page {entry.dernierePage}
                                </span>
                              </div>
                              <div
                                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                style={{
                                  background: "rgba(167,139,250,0.08)",
                                  border: "1px solid rgba(167,139,250,0.25)",
                                }}
                              >
                                <Headphones className="w-4 h-4" style={{ color: "#a78bfa" }} />
                                <span className="text-sm font-medium" style={{ color: "#c4b5fd" }}>
                                  Audio {entry.derniereAudio}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs" style={{ color: "#475569" }}>
                              <Clock className="w-3 h-3" />
                              Dernière mise à jour :{" "}
                              {new Date(entry.updatedAt).toLocaleDateString("fr-FR", {
                                year: "numeric", month: "long", day: "numeric",
                              })}
                            </div>
                          </div>

                          {/* Boutons action */}
                          <div className="flex gap-2 ml-4 shrink-0">
                            <button
                              onClick={() => {
                                setEditingId(entry.id);
                                setActionPanel({ type: "none" });
                                pageState.current[entry.livreId]  = entry.dernierePage;
                                audioState.current[entry.livreId] = entry.derniereAudio;
                              }}
                              className="p-3 rounded-xl transition-all duration-200 active:scale-90"
                              style={{
                                background: "rgba(99,102,241,0.12)",
                                border: "1px solid rgba(99,102,241,0.3)",
                                color: "#818cf8",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.9)";
                                (e.currentTarget as HTMLElement).style.color = "#fff";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
                                (e.currentTarget as HTMLElement).style.color = "#818cf8";
                              }}
                              title="Modifier"
                            >
                              <Edit className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() =>
                                setActionPanel({
                                  type: "confirmDelete",
                                  entryId: entry.id,
                                  titre: entry.livre?.titre || "ce livre",
                                })
                              }
                              className="p-3 rounded-xl transition-all duration-200 active:scale-90"
                              style={{
                                background: "rgba(239,68,68,0.12)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                color: "#f87171",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.9)";
                                (e.currentTarget as HTMLElement).style.color = "#fff";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)";
                                (e.currentTarget as HTMLElement).style.color = "#f87171";
                              }}
                              title="Supprimer"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Panel confirmation suppression — apparaît sous la carte */}
                        {isDeleting && (
                          <DeleteConfirmPanel
                            titre={actionPanel.titre}
                            onConfirm={() => deleteEntry(entry.id)}
                            onCancel={() => setActionPanel({ type: "none" })}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="text-center py-20 fade-in">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(51,65,85,0.6)" }}
              >
                <BookOpen className="w-12 h-12" style={{ color: "#334155" }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Aucun livre consulté</h3>
              <p className="text-slate-400 mb-8">
                Commencez à lire pour voir votre historique apparaître ici
              </p>
              <button
                onClick={() => navigate("/admin/bibliotheque")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Parcourir la bibliothèque
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoriqueLecture;