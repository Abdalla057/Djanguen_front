import React, { useState } from "react";
import { X, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import type { LivreApi, CreateLivreDto, UpdateLivreDto } from "../type/GestionType";

const CATEGORIES = [
  "Roman", "Science", "Religion", "Histoire",
  "Philosophie", "Informatique", "Art", "Autre",
];

export interface ModalLivreProps {
  livre?: LivreApi | null;
  onClose: () => void;
  onSubmit: (dto: CreateLivreDto | UpdateLivreDto) => Promise<LivreApi>;
}

const ModalLivre = ({ livre, onClose, onSubmit }: ModalLivreProps) => {
  const isEdit = !!livre;

  const [form, setForm] = useState({
    titre:       livre?.titre       ?? "",
    auteur:      livre?.auteur      ?? "",
    description: livre?.description ?? "",
    categorie:   livre?.categorie   ?? "",
  });
  const [pdfFile,   setPdfFile]   = useState<File | undefined>();
  const [coverFile, setCoverFile] = useState<File | undefined>();
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ ...form, fichierPdf: pdfFile, cover: coverFile });
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-800">
              {isEdit ? "Modifier le livre" : "Nouveau livre"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          {/* Titre + Auteur */}
          <div className="grid grid-cols-2 gap-4">
            {(["titre", "auteur"] as const).map((k) => (
              <div key={k} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {k === "titre" ? "Titre" : "Auteur"}
                </label>
                <input
                  value={form[k]}
                  onChange={set(k)}
                  required
                  placeholder={k === "titre" ? "Le Coran" : "Ibn Kathir"}
                  className="px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all placeholder:text-slate-400"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              required
              rows={3}
              placeholder="Résumé du livre…"
              className="px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-200 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Catégorie */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Catégorie
            </label>
            <select
              value={form.categorie}
              onChange={set("categorie")}
              required
              className="px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
            >
              <option value="">— Choisir —</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Fichiers */}
          <div className="grid grid-cols-2 gap-4">
            {([
              { label: "Fichier PDF", accept: ".pdf",    file: pdfFile,   setFile: setPdfFile,   req: !isEdit },
              { label: "Couverture",  accept: "image/*", file: coverFile, setFile: setCoverFile, req: !isEdit },
            ] as const).map(({ label, accept, file, setFile, req }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {label}{" "}
                  {isEdit && <span className="normal-case text-slate-300">(optionnel)</span>}
                </label>
                <label className="flex items-center justify-center h-16 border-2 border-dashed border-slate-200 hover:border-red-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-red-50/20 transition-colors">
                  <span className="text-[11px] text-slate-400 px-2 truncate text-center w-full">
                    {file ? file.name : "Choisir un fichier"}
                  </span>
                  <input
                    type="file"
                    accept={accept}
                    required={req}
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 rounded-xl transition-all shadow-sm"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isEdit ? "Enregistrer" : "Créer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalLivre;