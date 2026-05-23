import { Livre } from '../Types';
import { Utilisateur } from '../Types';
export const UTILISATEUR: Utilisateur = {
  nom: 'Marie Dupont',
  avatar: 'https://i.pravatar.cc/150?img=1',
  livres: 12,
  heures: 48,
  streak: 7,
};

export const DERNIER_LIVRE: Livre = {
  id: 0,
  titre: "Les Mystères de l'Univers",
  auteur: 'Carl Sagan',
  cover: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300',
  pages: 234,
  totalPages: 520,
  progression: 45,
  audio: 45,
};

export const HISTORIQUE: Livre[] = [
  {
    id: 1,
    titre: 'Sapiens',
    auteur: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300',
    pages: 520,
    totalPages: 520,
    progression: 100,
    audio: 100,
    date: '2024-01-05',
  },
  {
    id: 2,
    titre: 'Thinking, Fast and Slow',
    auteur: 'Daniel Kahneman',
    cover: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300',
    pages: 180,
    totalPages: 500,
    progression: 36,
    audio: 60,
    date: '2023-12-20',
  },
];
