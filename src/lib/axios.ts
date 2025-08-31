import type { AxiosResponse, AxiosProgressEvent } from 'axios';
import type {
  User,
  Quiz,
  Document,
  Flashcard,
  LoginForm,
  QuizAnswer,
  QuizAttempt,
  AuthResponse,
  RegisterForm,
  dashboardProps,
  PaginatedResponse,
} from '../types';

import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.error || error?.message || 'Something went wrong!';
    console.error('Axios error:', message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------
export const authAPI = {
  register: async (data: RegisterForm): Promise<{ token: string }> => {
    const response: AxiosResponse<{ data: AuthResponse }> = await axiosInstance.post(
      '/auth/register',
      data
    );
    return response.data.data;
  },

  login: async (data: LoginForm): Promise<AuthResponse> => {
    const response: AxiosResponse<{ data: AuthResponse }> = await axiosInstance.post(
      '/auth/login',
      data
    );
    return response.data.data;
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data.data;
  },
};

// Documents API
export const documentsAPI = {
  upload: async (
    data: File[],
    config?: { onUploadProgress?: (progressEvent: AxiosProgressEvent) => void }
  ): Promise<{ success: boolean; document: Document }> => {
    const formData = new FormData();
    data.forEach((file) => formData.append('document', file));

    const response = await axiosInstance.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: config?.onUploadProgress,
    });
    return response.data;
  },

  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Document>> => {
    const response = await axiosInstance.get(`/documents?page=${page}&limit=${limit}`);
    return {
      success: response.data.data.success,
      data: response.data.data.documents,
      pagination: response.data.data.pagination,
    };
  },

  generateFlashcard: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.get(`/documents/generate/${id}`);
    return response.data;
  },
};

// Flashcards API
export const flashcardsAPI = {
  getAll: async (
    page = 1,
    limit = 20,
    filters?: {
      document?: string;
      tags?: string;
      difficulty?: string;
    }
  ): Promise<PaginatedResponse<Flashcard>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters?.document) params.append('document', filters.document);
    if (filters?.tags) params.append('tags', filters.tags);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);

    const response = await axiosInstance.get(`/flashcards?${params}`);
    return {
      success: response.data.data.success,
      data: response.data.data.flashcards,
      pagination: response.data.data.pagination,
    };
  },
};

// Quizzes API
export const quizzesAPI = {
  getAll: async (page = 1, limit = 20, documentId?: string): Promise<PaginatedResponse<Quiz>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (documentId) params.append('document', documentId);

    const response = await axiosInstance.get(`/quizzes?${params}`);
    return {
      success: response.data.data.success,
      data: response.data.data.quizzes,
      pagination: response.data.data.pagination,
    };
  },

  generateQuiz: async (id: string): Promise<{ quizId: string }> => {
    const response = await axiosInstance.get(`/quizzes/generate/${id}`);
    return response.data.data;
  },

  getById: async (id: string): Promise<{ success: boolean; quiz: Quiz }> => {
    const response = await axiosInstance.get(`/quizzes/${id}`);
    return response.data.data;
  },

  submitAttempt: async (
    id: string,
    data: { answers: QuizAnswer[]; duration: number }
  ): Promise<{
    success: boolean;
    attempt: QuizAttempt & {
      correctAnswers: number;
      totalQuestions: number;
      results: Array<{
        question: unknown;
        userAnswer: string;
        isCorrect: boolean;
        correctAnswer: string;
        explanation?: string;
      }>;
    };
  }> => {
    const response = await axiosInstance.post(`/quizzes/${id}/attempt`, data);
    return response.data;
  },

  getAttempt: async (
    id: string
  ): Promise<{
    quiz: Quiz;
  }> => {
    const response = await axiosInstance.get(`/quizzes/attempts/${id}`);
    return response.data.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<dashboardProps> => {
    const response = await axiosInstance.get('/dashboard/stats');
    return response.data.data;
  },
};
