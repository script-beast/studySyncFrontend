export interface FlashcardStats {
  total: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  topTags: Array<{ name: string; count: number }>;
  recent: Flashcard[];
}

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  averageDuration: number;
  recentAttempts: Array<{
    id: string;
    score: number;
    duration: number;
    createdAt: string;
  }>;
}
