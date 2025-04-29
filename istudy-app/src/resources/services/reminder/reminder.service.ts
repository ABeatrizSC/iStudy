import { ApiService } from "../utils/api.service";
import { Reminder, ReminderRequest } from "./reminder.resource";

class ReminderService {
  private baseURL: string = "/planners/reminders";
  private apiService = new ApiService();

  async getAll(): Promise<Reminder[]> {
    return this.apiService.request<Reminder[]>(`${this.baseURL}/all`, "GET");
  }

  async getAllByDate(date: string): Promise<Reminder[]> {
    return this.apiService.request<Reminder[]>(`${this.baseURL}?date=${date}`, "GET");
  }

  async getAllByIsCompleted(isCompleted: boolean): Promise<Reminder[]> {
    return this.apiService.request<Reminder[]>(`${this.baseURL}/completed?isCompleted=${isCompleted}`, "GET");
  }

  async getById(id: string): Promise<Reminder> {
    return this.apiService.request<Reminder>(`${this.baseURL}/${id}`, "GET");
  }

  async create(reminder: ReminderRequest): Promise<Reminder[]> {
    return this.apiService.request<Reminder[]>(this.baseURL, "POST", reminder);
  }

  async update(reminder: ReminderRequest, id: string): Promise<Reminder[]> {
    return this.apiService.request<Reminder[]>(`${this.baseURL}/${id}`, "PUT", reminder);
  }

  async delete(id: string): Promise<Reminder[]> {
    return this.apiService.request<Reminder[]>(`${this.baseURL}/${id}`, "DELETE");
  }
}

export const useReminder = () => new ReminderService();