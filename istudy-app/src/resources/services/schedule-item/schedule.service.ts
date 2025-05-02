import { ApiService } from "../utils/api.service";
import { ScheduleItem, ScheduleItemRequest } from "./schedule.resource";

class ScheduleService {
  private baseURL: string = "/planners/schedules";
  private apiService = new ApiService();

  async getAll(): Promise<ScheduleItem[]> {
    return this.apiService.request<ScheduleItem[]>(`${this.baseURL}/all`, "GET");
  }

  async getByDayOfWeek(dayOfWeek: number): Promise<ScheduleItem[]> {
    return this.apiService.request<ScheduleItem[]>(`${this.baseURL}?dayOfWeek=${dayOfWeek}`, "GET");
  }

  async getById(id: string): Promise<ScheduleItem> {
    return this.apiService.request<ScheduleItem>(`${this.baseURL}/${id}`, "GET");
  }

  async create(schedule: ScheduleItemRequest): Promise<ScheduleItem[]> {
    return this.apiService.request<ScheduleItem[]>(this.baseURL, "POST", schedule);
  }

  async update(schedule: ScheduleItemRequest, id: string): Promise<ScheduleItem[]> {
    return this.apiService.request<ScheduleItem[]>(`${this.baseURL}/${id}`, "PUT", schedule);
  }

  async delete(id: string): Promise<ScheduleItem[]> {
    return this.apiService.request<ScheduleItem[]>(`${this.baseURL}/${id}`, "DELETE");
  }
}

export const useScheduleItem = () => new ScheduleService();