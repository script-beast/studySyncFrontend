export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface DocumentUploadForm {
  title: string;
  file: File;
}

export interface GenerateContentForm {
  type: 'flashcards' | 'quiz' | 'both';
  count: number;
}
