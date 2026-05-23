import { Livre } from './Types';
import { ProgressBar } from './BarDprogression';
import { COLORS, GRADIENTS } from './Style/theme';
import { Play, Pause, Download, Share2 } from 'lucide-react';
import React from 'react';

interface Props {
  livre: Livre;
  playing: boolean;
  onToggle: () => void;
}

export function DerniereLecture({ livre, playing, onToggle }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6">
      
      {/* Cover du livre */}
      <div className="flex-shrink-0 md:w-40">
        <img
          src={livre.cover}
          alt={livre.titre}
          className="w-full h-56 object-cover rounded-xl shadow-md border-4"
          style={{ borderColor: COLORS.blue }}
        />
      </div>

      {/* Infos + Progression */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Titre et auteur */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1">{livre.titre}</h2>
          <p className="text-slate-600 text-lg mb-4">
            Par <span className="font-semibold">{livre.auteur}</span>
          </p>

          {/* Progressions */}
          <div className="space-y-4">
            <ProgressBar
              label={`Lecture: page ${livre.pages} / ${livre.totalPages}`}
              percentage={livre.progression}
              color={COLORS.blue}
              gradient={GRADIENTS.lecture}
            />
            <ProgressBar
              label={`Audio: ${livre.audio}%`}
              percentage={livre.audio}
              color={COLORS.purple}
              gradient={GRADIENTS.audio}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={onToggle}
            className="flex-1 md:flex-none px-6 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md hover:shadow-lg"
            style={{ background: GRADIENTS.primary }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? 'Pause audio' : 'Écouter'}
          </button>

          <button
            className="p-3 rounded-lg transition-all hover:scale-105 border border-gray-300 text-cyan-500"
            title="Télécharger"
          >
            <Download size={18} />
          </button>

          <button
            className="p-3 rounded-lg transition-all hover:scale-105 border border-gray-300 text-blue-500"
            title="Partager"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
