import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AudioStatusPanel from "../../AudioStatusPanel";
import type { Livre } from "../type/listeLivreType";

interface PanneauGestionLivreProps {
  livreCourant?: Livre;
  onOuvrirModif: () => void;
  onOuvrirSuppr: () => void;
  livreid: number;

  // callback venant du panel audio
  onAudioDepuisPanel: (
    livreId: number,
    pageDebut: number,
    pageFin: number
  ) => void;
}

const PanneauGestionLivre: React.FC<PanneauGestionLivreProps> = ({
  livreCourant,
  onOuvrirModif,
  onOuvrirSuppr,
  onAudioDepuisPanel,
}) => {
  const navigate = useNavigate();

  if (!livreCourant) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-slate-500">Aucun livre sélectionné</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/40 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-slate-700/30 flex flex-col gap-4">

      {/* Titre */}
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-600/30 flex items-center justify-center">
          <Edit className="w-3.5 h-3.5 text-indigo-400" />
        </div>
        Gérer le livre
      </h3>

      {/* Infos livre */}
      <div className="space-y-2">
        <div className="p-3 rounded-xl bg-slate-700/30 border border-slate-600/30">
          <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">
            Titre
          </p>
          <p className="text-sm font-semibold text-white">
            {livreCourant.titre}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-700/30 border border-slate-600/30">
          <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">
            Auteur
          </p>
          <p className="text-sm font-semibold text-white">
            {livreCourant.auteur}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => navigate(`/livre/${livreCourant.id}/pages`)}
          className="bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-300 py-2.5 rounded-xl text-xs font-bold"
        >
          <Eye className="w-3.5 h-3.5 inline mr-1" />
          Pages
        </button>

        <button
          onClick={onOuvrirModif}
          className="bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 py-2.5 rounded-xl text-xs font-bold"
        >
          <Edit className="w-3.5 h-3.5 inline mr-1" />
          Modifier
        </button>

        <button
          onClick={onOuvrirSuppr}
          className="bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-300 py-2.5 rounded-xl text-xs font-bold"
        >
          <Trash2 className="w-3.5 h-3.5 inline mr-1" />
          Suppr
        </button>
      </div>

      {/* AUDIO PANEL */}
       <AudioStatusPanel
        livre={{
          id: livreCourant.id,
          titre: livreCourant.titre,
        }}
        onAddAudio={onAudioDepuisPanel}
      />
    </div>
  );
};

export default PanneauGestionLivre;