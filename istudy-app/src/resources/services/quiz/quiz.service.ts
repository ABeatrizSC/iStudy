import { ApiService } from "../utils/api.service";
import {
  Quiz,
  QuizRequest,
  QuizAnswer,
  Question
} from "./quiz.resource";

class QuizService {
  private baseURL: string = "/games/quizzes";
  private apiService = new ApiService();

  async getAll(): Promise<Quiz[]> {
    return this.apiService.request<Quiz[]>(`${this.baseURL}/all`, "GET");
  }

  async getById(id: string): Promise<Quiz> {
    return this.apiService.request<Quiz>(`${this.baseURL}/${id}`, "GET");
  }

  async getByTitle(title: string): Promise<Quiz | null> {
    return this.apiService.request<Quiz | null>(`${this.baseURL}/search?title=${encodeURIComponent(title)}`, "GET");
  }

  async create(data: QuizRequest): Promise<Quiz[]> {
    return this.apiService.request<Quiz[]>(this.baseURL, "POST", data);
  }

  async update(id: string, data: QuizRequest): Promise<Quiz[]> {
    return this.apiService.request<Quiz[]>(`${this.baseURL}/${id}`, "PUT", data);
  }

  async delete(id: string): Promise<Quiz[]> {
    return this.apiService.request<Quiz[]>(`${this.baseURL}/${id}`, "DELETE");
  }

  async answerQuiz(id: string, data: QuizAnswer): Promise<Question[]> {
    return this.apiService.request<Question[]>(`${this.baseURL}/answer/${id}`, "PUT", data);
  }
}

export const useQuiz = () => new QuizService();