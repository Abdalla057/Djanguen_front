import { useEffect, useState } from "react";
import axios from "axios";
import { X, BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  cover?: string;
  fichierPdf?: string;
}

interface ModifierLivreProps {
  livre: Livre | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // pour recharger la liste des livres
}

const ModifierLivre = ({ livre, isOpen, onClose, onSuccess }: ModifierLivreProps) => {
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  // Initialisation des champs
  useEffect(() => {
    if (!isOpen || !livre) return;

    setTitre(livre.titre);
    setAuteur(livre.auteur);
    setPdfPreview(livre.fichierPdf || "");
    setCoverPreview(livre.cover || "");
    setPdfFile(null);
    setCoverFile(null);
    setNotification({ show: false, type: "success", message: "" });
  }, [isOpen, livre]);

  if (!isOpen || !livre) return null;

  // Notification
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "success", message: "" });
      if (type === "success") {
        onSuccess(); // recharge la liste des livres
        onClose();   // ferme la modal
      }
    }, 2000);
  };

  // Gestion des fichiers
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file);
    setPdfPreview(file.name);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  // Submit du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("auteur", auteur);
    if (pdfFile) formData.append("pdf", pdfFile);
    if (coverFile) formData.append("cover", coverFile);

    await axios.patch(`${API_URL}/admin/livre/${livre.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // 🔹 Appelle le callback onSuccess pour recharger la liste
    showNotification("success", "Livre modifié !");
    onSuccess(); // <-- ici, pas props.onReload()
    onClose();   // ferme la modal

  } catch (error: unknown) {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Erreur lors de la modification";
    showNotification("error", message);
  } finally {
    setLoading(false);
  }
 };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Toast Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-[60]">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl ${
              notification.type === "success" ? "bg-emerald-500" : "bg-red-500"
            } text-white`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <p className="font-semibold">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Modifier le livre</h2>
          </div>
          <button onClick={onClose} disabled={loading} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div>
            <label className="text-slate-300 text-sm font-semibold">Titre</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
              disabled={loading}
              className="w-full mt-2 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white"
            />
          </div>

          {/* Auteur */}
          <div>
            <label className="text-slate-300 text-sm font-semibold">Auteur</label>
            <input
              type="text"
              value={auteur}
              onChange={(e) => setAuteur(e.target.value)}
              required
              disabled={loading}
              className="w-full mt-2 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white"
            />
          </div>

          {/* PDF */}
          <div>
            <label className="text-slate-300 text-sm font-semibold">Fichier PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              disabled={loading}
              className="w-full mt-2 text-white"
            />
            {pdfPreview?.length > 0 && (
              <p className="text-xs text-slate-400 mt-2">📄 {pdfPreview}</p>
            )}
          </div>

          {/* Cover */}
          <div>
            <label className="text-slate-300 text-sm font-semibold">Image couverture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              disabled={loading}
              className="w-full mt-2 text-white"
            />
            {coverPreview?.length > 0 && (
              <img
                src={coverFile ? coverPreview : `${API_URL}/uploads/images/${coverPreview}`}
                alt="Preview"
                className="w-32 h-48 object-cover mt-3 rounded-lg border border-slate-600"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Modification...
                </>
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierLivre;