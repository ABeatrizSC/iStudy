import { Subject, SubjectRequest } from "./subject.resource";
import { ApiService } from "../utils/api.service";

class SubjectService {
    private baseURL: string = "/disciplines" 
    private apiService = new ApiService();

    async create(subject: SubjectRequest) : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(this.baseURL, 'POST', subject);
    }
    
    async update(subject: SubjectRequest, id: string) : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(`${this.baseURL}/${id}`, 'PUT', subject);
    }

    async delete(id: string) : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(`${this.baseURL}/${id}`, 'DELETE');
    }

    async getAll() : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(`${this.baseURL}/all`, 'GET');
    }

    async getAllCategories() : Promise<string[]> {
        return this.apiService.request<string[]>(`${this.baseURL}/categories`, 'GET');
    }

    async getAllByCategory(category: string) : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(`${this.baseURL}/categories/${category}`, 'GET');
    }

    async getAllCompleted() : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(`${this.baseURL}/completed`, 'GET');
    }

    async getById(id: string) : Promise<Subject> {
        return this.apiService.request<Subject>(`${this.baseURL}/${id}}`, 'GET');
    }

    async getByName(name: string) : Promise<Subject> {
        return this.apiService.request<Subject>(`${this.baseURL}?name=${name}`, 'GET');
    }

    async search(name: string) : Promise<Subject[]> {
        return this.apiService.request<Subject[]>(`${this.baseURL}/search?name=${name}`, 'GET');
    }
}

export const useSubject = () => new SubjectService();
