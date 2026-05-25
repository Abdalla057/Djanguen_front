import React, { useState } from 'react';
import type { Book } from '../types/book.types';
import { Modal } from './Modal';

interface ConfirmDeleteModalProps {
  book: Book | null;
  isOpen: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
  onConfirm: (book: Book) => Promise<void>;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  book,
  isOpen,
  isAuthenticated,
  onClose,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!book) return;
    setIsDeleting(true);
    try {
      await onConfirm(book);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Supprimer ce livre ?" maxWidth={380}>
      {!isAuthenticated && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px',
          background: '#FEF3C7', border: '0.5px solid #FCD34D',
          borderRadius: 'var(--border-radius-md)',
          fontSize: 13, color: '#92400E',
          marginBottom: '1rem',
        }}>
          ⚠️ Authentification requise pour supprimer un livre.
        </div>
      )}

      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        {book ? (
          <>
            <strong style={{ color: 'var(--color-text-primary)' }}>"{book.titre}"</strong>
            {' '}sera définitivement supprimé. Cette action est irréversible.
          </>
        ) : null}
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onClose} style={cancelStyle}>
          Annuler
        </button>
        <button
          onClick={handleConfirm}
          disabled={!isAuthenticated || isDeleting}
          style={{
            ...deleteStyle,
            opacity: !isAuthenticated || isDeleting ? 0.5 : 1,
            cursor: !isAuthenticated || isDeleting ? 'not-allowed' : 'pointer',
          }}
        >
          {isDeleting ? 'Suppression...' : 'Supprimer'}
        </button>
      </div>
    </Modal>
  );
};

const cancelStyle: React.CSSProperties = {
  flex: 1, height: 36, borderRadius: 'var(--border-radius-md)',
  fontSize: 14, fontWeight: 500, cursor: 'pointer',
  border: '0.5px solid var(--color-border-tertiary)',
  background: 'var(--color-background-secondary)',
  color: 'var(--color-text-primary)',
};

const deleteStyle: React.CSSProperties = {
  flex: 1, height: 36, borderRadius: 'var(--border-radius-md)',
  fontSize: 14, fontWeight: 500,
  border: '0.5px solid #FECACA',
  background: 'transparent', color: '#DC2626',
};
