import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, active, onChange }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {['Tous', ...categories].map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        style={{
          height: 32,
          padding: '0 14px',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 99,
          background: active === cat ? '#1a1a1a' : 'var(--color-background-primary)',
          color: active === cat ? '#fff' : 'var(--color-text-secondary)',
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 0.15s',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {cat}
      </button>
    ))}
  </div>
);
