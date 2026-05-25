import type { Book, CreateBookPayload, UpdateBookPayload } from '../types/book.types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erreur serveur' }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const BookService = {
  getAll: (): Promise<Book[]> =>
    fetch(`${BASE_URL}/admin/livre`, {
      headers: getAuthHeaders(),
    }).then((r) => handleResponse<Book[]>(r)),

  getById: (id: number): Promise<Book> =>
    fetch(`${BASE_URL}/admin/livre/${id}`, {
      headers: getAuthHeaders(),
    }).then((r) => handleResponse<Book>(r)),

  create: (payload: CreateBookPayload): Promise<Book> =>
    fetch(`${BASE_URL}/admin/livre`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }).then((r) => handleResponse<Book>(r)),

  update: (id: number, payload: UpdateBookPayload): Promise<Book> =>
    fetch(`${BASE_URL}/admin/livre/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }).then((r) => handleResponse<Book>(r)),

  remove: (id: number): Promise<void> =>
    fetch(`${BASE_URL}/admin/livre/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then((r) => handleResponse<void>(r)),
};
