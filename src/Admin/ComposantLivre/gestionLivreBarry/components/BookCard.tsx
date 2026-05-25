import React from 'react';
import type { Book } from '../types/book.types';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  onOpen: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onOpen, onEdit, onDelete }) => {
  return (
    <article
      onClick={() => onOpen(book)}
      style={{
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '1rem',
        display: 'flex',
        gap: 14,
        cursor: 'pointer',
        transition: 'border-color 0.15s, transform 0.1s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-secondary)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-tertiary)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <BookCover id={book.id} size="sm" />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 3 }}>
          {book.categorie}
        </p>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {book.titre}
        </p>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          {book.auteur}
        </p>
        <p style={{
          fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', marginBottom: 10,
        }}>
          {book.description}
        </p>

        <div style={{ display: 'flex', gap: 6 }} onClick={(e) => e.stopPropagation()}>
          <ActionButton
            onClick={() => onEdit(book)}
            label="Modifier"
            icon="✏️"
          />
          <ActionButton
            onClick={() => onDelete(book)}
            label="Supprimer"
            variant="danger"
            icon="🗑️"
          />
        </div>
      </div>
    </article>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  icon: string;
  variant?: 'default' | 'danger';
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, icon, variant = 'default' }) => {
  const [hovered, setHovered] = React.useState(false);

  const hoverStyle: React.CSSProperties = variant === 'danger' && hovered
    ? { background: '#FEF2F2', color: '#DC2626', borderColor: '#FECACA' }
    : hovered
    ? { background: 'var(--color-background-tertiary)', color: 'var(--color-text-primary)' }
    : {};

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        height: 28, padding: '0 10px',
        borderRadius: 'var(--border-radius-md)',
        fontSize: 12, cursor: 'pointer',
        border: '0.5px solid var(--color-border-tertiary)',
        background: 'var(--color-background-secondary)',
        color: 'var(--color-text-secondary)',
        transition: 'all 0.12s',
        ...hoverStyle,
      }}
    >
      <span style={{ fontSize: 11 }}>{icon}</span>
      {label}
    </button>
  );
};
