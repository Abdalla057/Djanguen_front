import { useState } from "react";
import React from "react";
import type { SaveHistoriqueDto } from "../type/historique.types";

interface SaveProgressionFormProps {
  userId: number;
  onSave: (dto: SaveHistoriqueDto) => Promise<void>;
  onClose: () => void;
}

type FormState = { livreId: string; dernierePage: string; derniereAudio: string; positionAudio: string };

const EMPTY: FormState = { livreId: "", dernierePage: "", derniereAudio: "", positionAudio: "" };

const FIELDS: { key: keyof FormState; label: string; placeholder: string; required?: boolean }[] = [
  { key: "livreId",       label: "ID Livre",             placeholder: "10",  required: true },
  { key: "dernierePage",  label: "Dernière page",         placeholder: "42",  required: true },
  { key: "derniereAudio", label: "Dernière piste audio",  placeholder: "5",   required: true },
  { key: "positionAudio", label: "Position audio (sec)",  placeholder: "320" },
];

export function SaveProgressionForm({ userId, onSave, onClose }: SaveProgressionFormProps) {
  const [form,    setForm]    = useState<FormState>(EMPTY);
  const [saving,  setSaving]  = useState(false);

  const setField = (key: keyof FormState, val: string) => setForm((p) => ({ ...p, [key]: val }));
  const isValid  = !!form.livreId && !!form.dernierePage && !!form.derniereAudio;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSaving(true);
    await onSave({
      utilisateurId: userId,
      livreId:       Number(form.livreId),
      dernierePage:  Number(form.dernierePage),
      derniereAudio: Number(form.derniereAudio),
      positionAudio: Number(form.positionAudio) || 0,
    });
    setSaving(false);
    setForm(EMPTY);
    onClose();
  };

  return (
    <div className="bg-violet-200 border border-gray-200 rounded-2xl p-5 mb-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-gray-800">Sauvegarder la progression</p>
        <button onClick={onClose} aria-label="Fermer" className="p-1 rounded-md hover:bg-gray-100 text-gray-400 transition">
          <i className="ti ti-x text-base" aria-hidden="true" />
        </button>
      </div>

      {/* Champs */}
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map(({ key, label, placeholder, required }) => (
          <div key={key}>
            <label className="block text-xs text-gray-400 mb-1">
              {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="number"
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => setField(key, e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition"
            />
          </div>
        ))}
      </div>

      {/* Bouton */}
      <button
        onClick={handleSubmit}
        disabled={saving || !isValid}
        className={`mt-4 w-full py-2.5 text-sm font-medium rounded-xl transition
          ${isValid
            ? "bg-teal-600 hover:bg-teal-700 text-white"
            : "bg-violet-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {saving ? "Sauvegarde…" : "Sauvegarder →"}
      </button>
    </div>
  );
}
