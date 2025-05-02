import { ApiService } from "../utils/api.service";
import {
  Flashcard,
  FlashcardRequest,
  FlashcardAnswer,
  Card
} from "./flashcard.resource";

class FlashcardService {
  private baseURL: string = "/games/flashcards";
  private apiService = new ApiService();

  async getAll(): Promise<Flashcard[]> {
    return this.apiService.request<Flashcard[]>(`${this.baseURL}/all`, "GET");
  }

  async getById(id: string): Promise<Flashcard> {
    return this.apiService.request<Flashcard>(`${this.baseURL}/${id}`, "GET");
  }

  async getByTitle(title: string): Promise<Flashcard | null> {
    return this.apiService.request<Flashcard | null>(`${this.baseURL}/search?title=${encodeURIComponent(title)}`, "GET");
  }

  async create(data: FlashcardRequest): Promise<Flashcard[]> {
    return this.apiService.request<Flashcard[]>(this.baseURL, "POST", data);
  }

  async update(id: string, data: FlashcardRequest): Promise<Flashcard[]> {
    return this.apiService.request<Flashcard[]>(`${this.baseURL}/${id}`, "PUT", data);
  }

  async delete(id: string): Promise<Flashcard[]> {
    return this.apiService.request<Flashcard[]>(`${this.baseURL}/${id}`, "DELETE");
  }

  async answerFlashcard(id: string, data: FlashcardAnswer): Promise<Card[]> {
    return this.apiService.request<Card[]>(`${this.baseURL}/answer/${id}`, "PUT", data);
  }
}

export const useFlashcard = () => new FlashcardService();