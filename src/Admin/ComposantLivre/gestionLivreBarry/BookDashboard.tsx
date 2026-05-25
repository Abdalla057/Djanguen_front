import React, { useState, useMemo } from 'react';
import type { Book } from './types/book.types';
import { useBooks } from './hooks/useBooks';
import { useToast } from './hooks/useToast';
import { useAuth } from './hooks/useAuth';
import { getUniqueCategories } from './utils/book.utils';

import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { BookFormModal } from './components/BookFormModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { ToastNotification } from './components/ToastNotification';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';

export const BookDashboard: React.FC = () => {
  const { books, isLoading, addBook, updateBook, deleteBook } = useBooks();
  const { toast, showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [editTarget, setEditTarget] = useState<Book | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const categories = useMemo(() => getUniqueCategories(books), [books]);

  const filteredBooks = useMemo(() => {
    const q = search.toLowerCase();
    return books.filter((b) => {
      const matchCat = activeCategory === 'Tous' || b.categorie === activeCategory;
      const matchSearch = !q || b.titre.toLowerCase().includes(q) || b.auteur.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [books, search, activeCategory]);

  const openAddForm = () => {
    setEditTarget(null);
    setIsFormOpen(true);
  };

  const openEditForm = (book: Book) => {
    setEditTarget(book);
    setIsFormOpen(true);
  };

  const openDeleteConfirm = (book: Book) => {
    if (!isAuthenticated) {
      showToast('Authentification requise pour supprimer', 'error');
      return;
    }
    setDeleteTarget(book);
  };

  const handleFormSubmit = async (values: Parameters<typeof addBook>[0]) => {
    if (editTarget) {
      await updateBook(editTarget.id, values);
      showToast('Livre modifié avec succès');
    } else {
      await addBook(values);
      showToast('Livre ajouté avec succès');
    }
  };

  const handleConfirmDelete = async (book: Book) => {
    await deleteBook(book.id);
    showToast(`"${book.titre}" supprimé`);
  };

  return (
    <main style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh', padding: '2rem' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: 16, flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Ma bibliothèque{' '}
          <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--color-text-secondary)' }}>
            ({filteredBooks.length})
          </span>
        </h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 12 }}>
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <button
          onClick={openAddForm}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            height: 36, padding: '0 16px',
            background: '#1a1a1a', color: '#fff',
            border: 'none', borderRadius: 'var(--border-radius-md)',
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          + Ajouter un livre
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <LoadingState />
      ) : filteredBooks.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onOpen={setDetailBook}
              onEdit={openEditForm}
              onDelete={openDeleteConfirm}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <BookDetailModal
        book={detailBook}
        isOpen={Boolean(detailBook)}
        onClose={() => setDetailBook(null)}
        onEdit={openEditForm}
        onDelete={openDeleteConfirm}
      />

      <BookFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editTarget={editTarget}
      />

      <ConfirmDeleteModal
        book={deleteTarget}
        isOpen={Boolean(deleteTarget)}
        isAuthenticated={isAuthenticated}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast */}
      <ToastNotification
        message={toast?.message ?? ''}
        type={toast?.type ?? 'success'}
        visible={Boolean(toast)}
      />
    </main>
  );
};

const LoadingState: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)', fontSize: 14 }}>
    Chargement des livres...
  </div>
);

const EmptyState: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-secondary)' }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
    <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 6 }}>Aucun livre trouvé</p>
    <p style={{ fontSize: 13 }}>Modifiez votre recherche ou ajoutez un nouveau livre.</p>
  </div>
);
