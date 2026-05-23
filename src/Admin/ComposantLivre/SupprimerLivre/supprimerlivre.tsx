import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { X, Trash2, AlertTriangle } from "lucide-react";
import React from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

interface SupprimerLivreProps {
  livre: {
    id: number;
    titre: string;
    auteur: string;
    cover?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const SupprimerLivre = ({ livre, isOpen, onClose, onSuccess }: SupprimerLivreProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/admin/livre/${livre.id}`);
      onSuccess?.();
      navigate("/livres");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erreur lors de la suppression.");
      } else {
        setError("Erreur inattendue.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}>

      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a1a2e, #16213e)",
          border: "1px solid rgba(239,71,111,0.25)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ef476f, #c1121f)" }}>
              <Trash2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-black text-white">Supprimer le livre</h2>
          </div>
          <button onClick={onClose} disabled={loading}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 flex flex-col gap-4">

          {/* Info livre */}
          <div className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {livre.cover ? (
              <img
                src={`${API_URL}/uploads/images/${livre.cover}`}
                alt={livre.titre}
                className="w-12 h-16 rounded-lg object-cover shrink-0"
                onError={e => { (e.currentTarget as HTMLImageElement).src = "/placeholder.png"; }}
              />
            ) : (
              <div className="w-12 h-16 rounded-lg shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <Trash2 className="w-5 h-5" style={{ color: "#64748b" }} />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-black text-white leading-snug line-clamp-2">{livre.titre}</p>
              <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>{livre.auteur}</p>
            </div>
          </div>

          {/* Avertissement */}
          <div className="flex items-start gap-2 px-3 py-3 rounded-xl"
            style={{ background: "rgba(239,71,111,0.08)", border: "1px solid rgba(239,71,111,0.2)" }}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#ef476f" }} />
            <p className="text-xs leading-relaxed" style={{ color: "#fca5a5" }}>
              Cette action est <strong>irréversible</strong>. Toutes les pages et données associées seront définitivement supprimées.
            </p>
          </div>

          {/* Erreur */}
          {error && (
            <p className="text-xs font-semibold px-3 py-2 rounded-xl"
              style={{ background: "rgba(239,71,111,0.1)", color: "#ef476f", border: "1px solid rgba(239,71,111,0.2)" }}>
              {error}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#cbd5e1",
            }}
          >
            Annuler
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #ef476f, #c1121f)",
              boxShadow: loading ? "none" : "0 4px 16px rgba(239,71,111,0.35)",
            }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Suppression…
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Supprimer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupprimerLivre;