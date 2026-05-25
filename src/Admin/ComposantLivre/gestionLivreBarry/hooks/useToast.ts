import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

interface UseToastReturn {
  toast: Toast | null;
  showToast: (message: string, type?: ToastType) => void;
}

export function useToast(): UseToastReturn {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => setToast((prev) => (prev?.id === id ? null : prev)), 2800);
  }, []);

  return { toast, showToast };
}
