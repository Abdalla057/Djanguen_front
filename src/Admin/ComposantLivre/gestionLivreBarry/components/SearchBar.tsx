import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'var(--color-background-primary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0 12px', height: 36,
    flex: 1, maxWidth: 320,
  }}>
    <span style={{ fontSize: 16, color: 'var(--color-text-secondary)' }} aria-hidden="true">🔍</span>
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un livre..."
      aria-label="Rechercher un livre"
      style={{
        border: 'none', outline: 'none',
        background: 'transparent',
        fontSize: 14, color: 'var(--color-text-primary)',
        width: '100%',
        fontFamily: 'var(--font-sans)',
      }}
    />
  </div>
);
