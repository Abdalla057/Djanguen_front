import React from 'react';
import { getCoverColor, getCoverIcon } from '../utils/book.utils';

interface BookCoverProps {
  id: number;
  size?: 'sm' | 'lg';
  className?: string;
}

const SIZE_STYLES: Record<'sm' | 'lg', React.CSSProperties> = {
  sm: { width: 62, height: 88, borderRadius: 6, fontSize: 24 },
  lg: { width: 80, height: 112, borderRadius: 8, fontSize: 32 },
};

export const BookCover: React.FC<BookCoverProps> = ({ id, size = 'sm', className }) => {
  const bg = getCoverColor(id);
  const icon = getCoverIcon(id);

  return (
    <div
      className={className}
      style={{
        ...SIZE_STYLES[size],
        background: bg,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.5px solid rgba(0,0,0,0.06)',
      }}
      aria-hidden="true"
    >
      {icon}
    </div>
  );
};
