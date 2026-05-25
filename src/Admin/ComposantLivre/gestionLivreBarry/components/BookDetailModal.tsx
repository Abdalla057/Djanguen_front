import React, { useEffect } from 'react';
import type { Book } from '../types/book.types';
import { BookCover } from './BookCover';
import { Modal } from './Modal';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails du livre">
      {/* Cover + meta */}
      <div style={{ display: 'flex', gap: 16, marginBottom: '1.25rem' }}>
        <BookCover id={book.id} size="lg" />
        <div style={{ flex: 1 }}>
          <MetaRow label="Auteur" value={book.auteur} />
          <MetaRow label="Catégorie" value={book.categorie} />
          <MetaRow label="Référence" value={`#${book.id}`} />
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 8 }}>
        {book.titre}
      </h3>

      {/* Description */}
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
        {book.description}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <ModalButton
          onClick={() => { onClose(); onEdit(book); }}
          label="Modifier"
          variant="primary"
        />
        <ModalButton
          onClick={() => { onClose(); onDelete(book); }}
          label="Supprimer"
          variant="danger"
        />
      </div>
    </Modal>
  );
};

const MetaRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ marginBottom: 10 }}>
    <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>
      {label}
    </p>
    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
      {value}
    </p>
  </div>
);

type ButtonVariant = 'primary' | 'danger' | 'default';

const ModalButton: React.FC<{ onClick: () => void; label: string; variant: ButtonVariant }> = ({
  onClick, label, variant,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const base: React.CSSProperties = {
    flex: 1, height: 36, borderRadius: 'var(--border-radius-md)',
    fontSize: 14, fontWeight: 500, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    border: '0.5px solid var(--color-border-tertiary)',
    background: 'var(--color-background-secondary)',
    color: 'var(--color-text-primary)',
    transition: 'all 0.12s',
  };

  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a', opacity: hovered ? 0.85 : 1 }
      : variant === 'danger' && hovered
      ? { background: '#FEF2F2', color: '#DC2626', borderColor: '#FECACA' }
      : {};

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...base, ...variantStyle }}
    >
      {label}
    </button>
  );
};
