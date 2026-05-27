import { useState } from "react";
import React from "react";
import { MoreHorizontal, Plus, Pencil, Trash2, Eye, X, Loader2, AlertCircle, BookOpen } from "lucide-react";
import type { LivreApi, CreateLivreDto, UpdateLivreDto } from "../type/GestionType";


const CATEGORIES = ["Roman", "Science", "Religion", "Histoire", "Philosophie", "Informatique", "Art", "Autre"];

// ─────────────────────────────────────────────
// Sous-composant : Modal Créer / Modifier livre
// ─────────────────────────────────────────────
interface ModalLivreProps {
  livre?: LivreApi | null;
  onClose: () => void;
  onSubmit: (dto: CreateLivreDto | UpdateLivreDto, pdfFile?: File, coverFile?: File) => Promise<void>;
}

const ModalLivre = ({ livre, onClose, onSubmit }: ModalLivreProps) => {
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

  const isEdit = !!livre;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit && (!pdfFile || !coverFile)) {
      setError("Le PDF et la couverture sont requis pour un nouveau livre.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form, pdfFile, coverFile);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, textarea = false) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      {textarea ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all placeholder:text-slate-400"
          required
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all placeholder:text-slate-400"
          required
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header modal */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-slate-800">
                {isEdit ? "Modifier le livre" : "Ajouter un livre"}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isEdit ? `ID : ${livre!.id}` : "Remplissez tous les champs"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {field("titre",       "Titre",       "Ex : Le Coran")}
          {field("auteur",      "Auteur",      "Ex : Ibn Kathir")}
          {field("description", "Description", "Résumé du livre…", true)}

          {/* Catégorie */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Catégorie</label>
            <select
              value={form.categorie}
              onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value }))}
              required
              className="w-full px-3 py-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all"
            >
              <option value="">— Choisir une catégorie —</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Fichiers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                PDF {isEdit && <span className="normal-case text-slate-400">(optionnel)</span>}
              </label>
              <label className="flex flex-col items-center justify-center gap-1 h-20 border-2 border-dashed border-slate-200 hover:border-red-300 rounded-xl cursor-pointer transition-colors bg-slate-50 hover:bg-red-50/30">
                <span className="text-[11px] text-slate-400">{pdfFile ? pdfFile.name : "Choisir un PDF"}</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  required={!isEdit}
                  onChange={(e) => setPdfFile(e.target.files?.[0])}
                />
              </label>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                Couverture {isEdit && <span className="normal-case text-slate-400">(optionnel)</span>}
              </label>
              <label className="flex flex-col items-center justify-center gap-1 h-20 border-2 border-dashed border-slate-200 hover:border-red-300 rounded-xl cursor-pointer transition-colors bg-slate-50 hover:bg-red-50/30">
                <span className="text-[11px] text-slate-400">{coverFile ? coverFile.name : "Image JPG/PNG"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  required={!isEdit}
                  onChange={(e) => setCoverFile(e.target.files?.[0])}
                />
              </label>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
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
              {isEdit ? "Enregistrer" : "Créer le livre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sous-composant : Dropdown actions livre
// ─────────────────────────────────────────────
interface DropdownProps {
  livreId: number;
  onVoir:     () => void;
  onModifier: () => void;
  onSupprimer: () => void;
  onClose: () => void;
}

const DropdownActions = ({ onVoir, onModifier, onSupprimer, onClose }: DropdownProps) => (
  <div
    className="absolute right-0 top-8 z-20 w-40 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
    onMouseLeave={onClose}
  >
    <button onClick={() => { onVoir(); onClose(); }}
      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 transition-colors">
      <Eye className="w-3.5 h-3.5 text-blue-500" /> Voir
    </button>
    <button onClick={() => { onModifier(); onClose(); }}
      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 transition-colors">
      <Pencil className="w-3.5 h-3.5 text-amber-500" /> Modifier
    </button>
    <div className="border-t border-slate-100" />
    <button onClick={() => { onSupprimer(); onClose(); }}
      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors">
      <Trash2 className="w-3.5 h-3.5" /> Supprimer
    </button>
  </div>
);

// ─────────────────────────────────────────────
// Props principales
// ─────────────────────────────────────────────
interface Props {

  livres:          LivreApi[];
  livresLoading:   boolean;
  livresError:     string | null;
  onAddUser:       () => void;
  onUserAction:    (id: number) => void;
  onVoirLivre:     (livre: LivreApi) => void;
  onCreerLivre:    (dto: CreateLivreDto) => Promise<void>;
  onModifierLivre: (id: number, dto: UpdateLivreDto) => Promise<void>;
  onSupprimerLivre:(id: number) => Promise<void>;
}

// ─────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────
const UsersBooks = ({
  livres, livresLoading, livresError,
 
  onVoirLivre, onCreerLivre, onModifierLivre, onSupprimerLivre,
}: Props) => {

  const [modalOpen,    setModalOpen]    = useState<"create" | "edit" | null>(null);
  const [livreEdite,   setLivreEdite]   = useState<LivreApi | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [suppLoading,  setSuppLoading]  = useState<number | null>(null);

  const ouvrirModifier = (l: LivreApi) => {
    setLivreEdite(l);
    setModalOpen("edit");
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer ce livre définitivement ?")) return;
    setSuppLoading(id);
    try {
      await onSupprimerLivre(id);
    } finally {
      setSuppLoading(null);
    }
  };

  const handleSubmitModal = async (
    dto: CreateLivreDto | UpdateLivreDto,
    pdfFile?: File,
    coverFile?: File,
  ) => {
    if (modalOpen === "create") {
      await onCreerLivre({ ...(dto as CreateLivreDto), fichierPdf: pdfFile, cover: coverFile });
    } else if (livreEdite) {
      await onModifierLivre(livreEdite.id, { ...dto, fichierPdf: pdfFile, cover: coverFile });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5 mb-6">

        {/* ── Users List ── */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-[15px] font-semibold text-slate-800">Users List</h3>
            
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                {["User ID", "User Name", "Book Issued", "Department", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
          
          </table>
          <div className="px-5 py-3 text-right">
            <span className="text-[13px] font-medium text-red-500 hover:text-red-600 cursor-pointer transition-colors">See All</span>
          </div>
        </div>

        {/* ── Books List (API) ── */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-[15px] font-semibold text-slate-800">Books List</h3>
            <button
              onClick={() => setModalOpen("create")}
              className="flex items-center gap-1.5 text-[13px] font-medium text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Book
            </button>
          </div>

          {/* État chargement */}
          {livresLoading && (
            <div className="flex items-center justify-center gap-2 py-12 text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[13px]">Chargement des livres…</span>
            </div>
          )}

          {/* État erreur */}
          {livresError && !livresLoading && (
            <div className="flex items-center gap-2 mx-5 my-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{livresError}</p>
            </div>
          )}

          {/* Tableau */}
          {!livresLoading && !livresError && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  {["ID", "Titre", "Auteur", "Catégorie", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {livres.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-[13px] text-slate-400">
                      Aucun livre — cliquez sur "Add New Book"
                    </td>
                  </tr>
                )}
                {livres.map((l) => (
                  <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 text-[13px] text-slate-400">#{l.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        {l.coverUrl ? (
                          <img src={l.coverUrl} alt={l.titre} className="w-7 h-9 rounded object-cover flex-shrink-0 border border-slate-100" />
                        ) : (
                          <div className="w-7 h-9 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-3 h-3 text-slate-400" />
                          </div>
                        )}
                        <span className="text-[13px] font-medium text-slate-700 truncate max-w-[100px]">{l.titre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-slate-500 truncate max-w-[90px]">{l.auteur}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">{l.categorie}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="relative inline-block">
                        {suppLoading === l.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        ) : (
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === l.id ? null : l.id)}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        )}
                        {dropdownOpen === l.id && (
                          <DropdownActions
                            livreId={l.id}
                            onVoir={() => onVoirLivre(l)}
                            onModifier={() => ouvrirModifier(l)}
                            onSupprimer={() => handleSupprimer(l.id)}
                            onClose={() => setDropdownOpen(null)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="px-5 py-3 text-right border-t border-slate-50">
            <span className="text-[13px] font-medium text-red-500 hover:text-red-600 cursor-pointer transition-colors">See All</span>
          </div>
        </div>

      </div>

      {/* Modal créer / modifier */}
      {modalOpen && (
        <ModalLivre
          livre={modalOpen === "edit" ? livreEdite : null}
          onClose={() => { setModalOpen(null); setLivreEdite(null); }}
          onSubmit={handleSubmitModal}
        />
      )}
    </>
  );
};

export default UsersBooks;