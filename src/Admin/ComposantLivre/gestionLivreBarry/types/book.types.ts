export interface Book {
  id: number;
  titre: string;
  auteur: string;
  description: string;
  categorie: string;
  coverUrl?: string;
}

export interface CreateBookPayload {
  titre: string;
  auteur: string;
  description: string;
  categorie: string;
}

export type UpdateBookPayload = Partial<CreateBookPayload>;

export interface BookFormValues {
  titre: string;
  auteur: string;
  description: string;
  categorie: string;
}
