import { useState, useEffect, useCallback } from 'react';
import type { Book, CreateBookPayload, UpdateBookPayload } from '../types/book.types';
import { BookService } from '../services/book.service';

interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  addBook: (payload: CreateBookPayload) => Promise<void>;
  updateBook: (id: number, payload: UpdateBookPayload) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  refresh: () => Promise<void>;
}

// Demo data used when API is unreachable
const DEMO_BOOKS: Book[] = [
  { id: 1, titre: 'Le Coran', auteur: 'Révélation divine', description: 'Le texte fondateur de l\'Islam, récité par des millions de croyants à travers le monde depuis des siècles.', categorie: 'Religion' },
  { id: 2, titre: 'Things Fall Apart', auteur: 'Chinua Achebe', description: 'Un roman fondateur de la littérature africaine qui explore la vie d\'Okonkwo, guerrier igbo face à la colonisation.', categorie: 'Littérature' },
  { id: 3, titre: 'L\'Aventure ambiguë', auteur: 'Cheikh Hamidou Kane', description: 'Le récit initiatique de Samba Diallo, tiraillé entre sa culture africaine et la modernité occidentale.', categorie: 'Littérature' },
  { id: 4, titre: 'Atomic Habits', auteur: 'James Clear', description: 'Un guide pratique pour construire de bonnes habitudes grâce à de petits changements progressifs.', categorie: 'Développement personnel' },
  { id: 5, titre: 'Clean Code', auteur: 'Robert C. Martin', description: 'Le livre de référence pour tout développeur souhaitant écrire du code propre, lisible et maintenable.', categorie: 'Informatique' },
  { id: 6, titre: 'Sapiens', auteur: 'Yuval Noah Harari', description: 'Une histoire de l\'humanité depuis les premiers Homo Sapiens jusqu\'à l\'ère moderne.', categorie: 'Histoire' },
];

export function useBooks(): UseBooksReturn {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await BookService.getAll();
      setBooks(data);
    } catch {
      // Fallback to demo data in dev / when API is unavailable
      setBooks(DEMO_BOOKS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = useCallback(async (payload: CreateBookPayload) => {
    try {
      const created = await BookService.create(payload);
      setBooks((prev) => [created, ...prev]);
    } catch {
      // Optimistic local add when API unavailable
      const newBook: Book = {
        id: Math.max(...books.map((b) => b.id), 0) + 1,
        ...payload,
      };
      setBooks((prev) => [newBook, ...prev]);
    }
  }, [books]);

  const updateBook = useCallback(async (id: number, payload: UpdateBookPayload) => {
    try {
      const updated = await BookService.update(id, payload);
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch {
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...payload } : b))
      );
    }
  }, []);

  const deleteBook = useCallback(async (id: number) => {
    await BookService.remove(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return {
    books,
    isLoading,
    error,
    addBook,
    updateBook,
    deleteBook,
    refresh: fetchBooks,
  };
}
