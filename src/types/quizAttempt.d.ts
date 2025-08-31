import type { Quiz, QuizItem } from './quiz';

export interface QuizAnswer {
  questionIndex: number;
  userAnswer: string;
  isCorrect?: boolean;
}

export interface QuizAttempt extends Quiz {
  score: number;
  duration: number;
  attempted: boolean;
  attemptedDate?: Date;
  items?: QuizResult[];
}

export interface QuizResult extends QuizItem {
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
}
