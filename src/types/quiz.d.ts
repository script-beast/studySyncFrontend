// export interface QuizItem {
//   kind: 'mcq' | 'true_false' | 'fill_blank';
//   prompt: string;
//   options?: string[];
//   tags: string[];
//   difficulty: 'easy' | 'medium' | 'hard';
//   answer?: string; // For fill-in-the-blank questions
//   _id: string;
// }

export interface QuizItem {
  _id: string;
  kind: 'mcq' | 'true_false' | 'fill_blank';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  userAnswer: string;
  answer?: string; // For fill-in-the-blank questions
  isCorrect: boolean;
}

export interface Quiz {
  _id: string;
  title: string;
  items?: IQuizItem[];
  attempted: boolean; // Indicates if the quiz has been attempted
  attemptedDate?: Date; // Date when the quiz was attempted
  score: number;
  duration: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
}
