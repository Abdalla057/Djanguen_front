import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UserView {
  id: number;
  nom: string;
  email: string;
  statut: "ACTIF" | "INACTIF";
  livresLus?: number;
}

interface Props {
  users: UserView[];
  onBloquer: (id: number) => void;
  onActiver: (id: number) => void;
  onSupprimer: (id: number) => void;
}

// ─── Avatar colors ────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-blue-100",   text: "text-blue-700"   },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100",  text: "text-amber-700"  },
  { bg: "bg-pink-100",   text: "text-pink-700"   },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconBan = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);

const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconTrash = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const TableauUtilisateurs = ({ users, onBloquer, onActiver, onSupprimer }: Props) => {
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; id: number | null; name: string }>({
    open: false, id: null, name: "",
  });

  const openDelete  = (id: number, name: string) => setModal({ open: true, id, name });
  const closeDelete = () => setModal({ open: false, id: null, name: "" });
  const confirmDelete = () => {
    if (modal.id !== null) onSupprimer(modal.id);
    closeDelete();
  };

  const actifCount   = users.filter((u) => u.statut === "ACTIF").length;
  const inactifCount = users.length - actifCount;

  return (
    <>
      {/* ── CARD ── */}
      <div className="rounded-lg border border-[#0C3B2E]/20 bg-white shadow-sm overflow-hidden">

        {/* Header */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
          aria-expanded={open}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0C3B2E] flex items-center justify-center text-white flex-shrink-0">
              <IconUsers />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0C3B2E]">
                Gestion des utilisateurs
              </p>
              <p className="text-xs text-slate-400">
                {users.length} utilisateur{users.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFBA00]/15 text-[#0C3B2E] font-medium">
              {actifCount} actif{actifCount !== 1 ? "s" : ""}
            </span>
            <span className="text-slate-400">
              <IconChevron open={open} />
            </span>
          </div>
        </button>

        {/* Body */}
        {open && (
          <div className="border-t border-[#0C3B2E]/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    {["Utilisateur", "Email", "Statut", "Livres lus", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-xs font-medium text-slate-500 tracking-wide ${h === "Actions" ? "text-right" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                        Aucun utilisateur
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => {
                      const actif = user.statut === "ACTIF";
                      const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                      const name  = user.nom || "Utilisateur";

                      return (
                        <tr
                          key={user.id}
                          className="border-t border-[#0C3B2E]/10 hover:bg-gray-50 transition-colors"
                        >
                          {/* Utilisateur */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color.bg} ${color.text}`}>
                                {getInitials(name)}
                              </div>
                              <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                                {name}
                              </span>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                            {user.email}
                          </td>

                          {/* Statut */}
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                              actif
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-600"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${actif ? "bg-emerald-500" : "bg-red-400"}`} />
                              {user.statut}
                            </span>
                          </td>

                          {/* Livres lus */}
                          <td className="px-4 py-3 text-sm text-slate-500">
                            {user.livresLus ?? 0}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              {actif ? (
                                <button
                                  onClick={() => onBloquer(user.id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                                >
                                  <IconBan /> Bloquer
                                </button>
                              ) : (
                                <button
                                  onClick={() => onActiver(user.id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors font-medium"
                                >
                                  <IconCheck /> Activer
                                </button>
                              )}

                              <button
                                onClick={() => openDelete(user.id, name)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                              >
                                <IconTrash /> Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-400 border-t border-[#0C3B2E]/10 bg-gray-50">
              {actifCount} actif{actifCount !== 1 ? "s" : ""} · {inactifCount} inactif{inactifCount !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => e.target === e.currentTarget && closeDelete()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="w-[340px] bg-white rounded-2xl shadow-xl border border-[#0C3B2E]/20 overflow-hidden">

            {/* Modal header */}
            <div className="p-5 flex items-center gap-3 border-b border-[#0C3B2E]/10">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                <IconAlert />
              </div>
              <div>
                <p id="modal-title" className="font-semibold text-sm text-[#0C3B2E]">
                  Confirmation
                </p>
                <p className="text-xs text-slate-400">Suppression utilisateur</p>
              </div>
              <button
                onClick={closeDelete}
                aria-label="Fermer"
                className="ml-auto w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-slate-500 transition-colors"
              >
                <IconX />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 text-sm text-slate-600">
              Supprimer{" "}
              <span className="font-semibold text-[#0C3B2E]">{modal.name}</span>{" "}
              ?
              <p className="text-xs text-red-500 mt-2">
                Cette action est irréversible.
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-2 p-4 bg-gray-50 border-t border-[#0C3B2E]/10">
              <button
                onClick={closeDelete}
                className="px-4 py-2 text-xs rounded-lg bg-white border border-[#0C3B2E]/20 hover:bg-gray-100 text-slate-700 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs rounded-lg bg-[#FFBA00] hover:bg-[#e6a800] text-[#0C3B2E] transition-colors font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableauUtilisateurs;