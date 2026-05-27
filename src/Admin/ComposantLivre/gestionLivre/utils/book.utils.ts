const COVER_COLORS = [
  '#E8F5E9', '#E3F2FD', '#FFF3E0',
  '#F3E5F5', '#E0F7FA', '#FCE4EC', '#F9FBE7',
];

const COVER_ICONS = [
  '📖', '📚', '📕', '📗', '📘', '📙', '📓',
];

export function getCoverColor(id: number): string {
  return COVER_COLORS[id % COVER_COLORS.length];
}

export function getCoverIcon(id: number): string {
  return COVER_ICONS[(id + 2) % COVER_ICONS.length];
}

export function getUniqueCategories(books: { categorie: string }[]): string[] {
  return [...new Set(books.map((b) => b.categorie))];
}
