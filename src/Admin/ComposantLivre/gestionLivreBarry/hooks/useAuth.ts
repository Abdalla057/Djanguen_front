import { useState, useEffect } from 'react';

interface UseAuthReturn {
  isAuthenticated: boolean;
  token: string | null;
}

export function useAuth(): UseAuthReturn {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('access_token');
    setToken(stored);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_token') setToken(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return {
    isAuthenticated: Boolean(token),
    token,
  };
}
