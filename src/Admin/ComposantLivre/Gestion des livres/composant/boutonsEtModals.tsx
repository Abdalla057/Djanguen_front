import React from "react";
import { Plus, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Livre } from "../type/listeLivreType";

import AjouterLivre   from "../../AjouterAudio/Index";
import ModifierLivre  from "../../ModifierLivre/modifierlivre";
import SupprimerLivre from "../../SupprimerLivre/supprimerlivre";
import UploaderAudio  from "../../AjouterAudio/Index";

interface FloatingButtonsProps {
  onToggleAudio: () => void;
  onToggleBook:  () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onToggleAudio, onToggleBook }) => (
  <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggleAudio}
      className="w-14 h-14 bg-amber-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-amber-600 transition-colors"
    >
      <Mic className="w-6 h-6" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggleBook}
      className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  </div>
);

interface ModalsProps {
  isAddOpen:       boolean;
  onAddClose:      () => void;
  onAddSuccess:    () => void;
  isModifyOpen:    boolean;
  modifyBook:      Livre | null;
  onModifyClose:   () => void;
  onModifySuccess: () => void;
  isDeleteOpen:    boolean;
  deleteBook:      Livre | null;
  onDeleteClose:   () => void;
  onDeleteSuccess: () => void;
  isAudioOpen:     boolean;
  onAudioClose:    () => void;
  onAudioSuccess:  () => void;
  livres:          Livre[];
}

export const Modals: React.FC<ModalsProps> = ({
  isAddOpen, onAddClose, onAddSuccess,
  isModifyOpen, modifyBook, onModifyClose, onModifySuccess,
  isDeleteOpen, deleteBook, onDeleteClose, onDeleteSuccess,
  isAudioOpen, onAudioClose, onAudioSuccess,
  livres,
}) => (
  <>
    <AjouterLivre
      isOpen={isAddOpen}
      onClose={onAddClose}
      onSuccess={onAddSuccess}
    />

    {isModifyOpen && modifyBook && (
      <ModifierLivre
        livre={modifyBook}
        isOpen={isModifyOpen}
        onClose={onModifyClose}
        onSuccess={onModifySuccess}
      />
    )}

    {isDeleteOpen && deleteBook && (
      <SupprimerLivre
        livre={deleteBook}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onSuccess={onDeleteSuccess}
      />
    )}

    <UploaderAudio
      isOpen={isAudioOpen}
      onClose={onAudioClose}
      onSuccess={onAudioSuccess}
      livres={livres}
    />
  </>
);