export interface Document {
  _id: string;
  title: string;
  type: 'pdf' | 'docx' | 'txt';
  originalName: string;
  size: number;
  flashCardStatus: boolean;
  flashcards: number;
  quizzes: number;
  createdAt: string;
  updatedAt: string;
}

export type dashboardProps = {
  totalDoc: number;
  totalFlashcard: number;
  totalQuiz: number;
  quizList: {
    _id: string;
    title: string;
    coverUrl: string;
    totalQues: number;
    correctAnswer: number;
  }[];
  documentGenerated: number;
  documentWaiting: number;
  easyQuiz: number;
  mediumQuiz: number;
  hardQuiz: number;
  totalQues: number;
  avgDuration: number;
  percentAvgDuration: number;
  avgScore: number;
  percentAvgScore: number;
  totalFlashcardTags: number;
  flashCardsTags: { label: string; value: number }[];
};
