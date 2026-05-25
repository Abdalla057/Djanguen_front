import React from 'react';
import type { ToastType } from '../hooks/useToast';

interface ToastNotificationProps {
  message: string;
  type: ToastType;
  visible: boolean;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, type, visible }) => (
  <div
    role="status"
    aria-live="polite"
    style={{
      position: 'fixed', bottom: '1.5rem', left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 80}px)`,
      background: type === 'error' ? '#DC2626' : '#1a1a1a',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: 99,
      fontSize: 13, fontWeight: 500,
      opacity: visible ? 1 : 0,
      transition: 'transform 0.25s, opacity 0.25s',
      zIndex: 200,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}
  >
    {message}
  </div>
);
