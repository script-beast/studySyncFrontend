import type { Document } from './document';

export interface Flashcard {
  _id: string;
  owner: string;
  document: string | Document;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  updatedAt: string;
  image?: string;
}
