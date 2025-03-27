import { ApiService } from "../utils/api.service";
import { StudyInfo, StudyRequest, StudyResponse } from "./study.resource";

class StudyService {
    private baseURL: string = "/studies" 
    private apiService = new ApiService();

    async create(study: StudyRequest) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(this.baseURL, 'POST', study);
    }
    
    async update(study: StudyRequest, id: string) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/${id}`, 'PUT', study);
    }

    async delete(id: string) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/${id}`, 'DELETE');
    }

    async getAll() : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/all`, 'GET');
    }

    async getAllCompleted() : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/completed`, 'GET');
    }

    async getById(id: string) : Promise<StudyResponse> {
        return this.apiService.request<StudyResponse>(`${this.baseURL}/${id}}`, 'GET');
    }

    async getByDate(date: string) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/date?date=${date}`, 'GET');
    }

    async getByMonth(year: number, month: number) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/month?year=${year}&month=${month}`, 'GET');
    }

    async getMonthInfo(year: number, month: number) : Promise<StudyInfo> {
        return this.apiService.request<StudyInfo>(`${this.baseURL}/month/info?year=${year}&month=${month}`, 'GET');
    }

    async getByWeek(year: number, week: number) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/week?year=${year}&week=${week}`, 'GET');
    }

    async getWeekInfo(year: number, week: number) : Promise<StudyInfo> {
        return this.apiService.request<StudyInfo>(`${this.baseURL}/week/info?year=${year}&week=${week}`, 'GET');
    }

    async getByDisciplineCategory(category: string) : Promise<StudyResponse[]> {
        return this.apiService.request<StudyResponse[]>(`${this.baseURL}/subject-category?category=${category}`, 'GET');
    }
}

export const useStudy = () => new StudyService();