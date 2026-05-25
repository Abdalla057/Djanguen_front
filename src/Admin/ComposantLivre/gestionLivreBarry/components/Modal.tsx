import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 480,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal
  useEffect(() => {
    if (isOpen) contentRef.current?.focus();
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, padding: '1rem',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.2s',
      }}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        style={{
          background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 16,
          width: '100%',
          maxWidth,
          padding: '1.5rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
          transition: 'transform 0.2s',
          outline: 'none',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          {title && (
            <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)', margin: 0 }}>
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: '0.5px solid var(--color-border-tertiary)',
              background: 'var(--color-background-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--color-text-secondary)',
              fontSize: 18, marginLeft: 'auto',
            }}
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
