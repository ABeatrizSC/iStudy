import { ApiService } from "../utils/api.service";
import { TopicRequest, TopicResponse, TopicUpdate } from "./topic.resource";

class TopicService {
    private baseURL: string = "/disciplines/topics" 
    private apiService = new ApiService();

    async create(subject: TopicRequest) : Promise<TopicResponse[]> {
        return this.apiService.request<TopicResponse[]>(this.baseURL, 'POST', subject);
    }
    
    async update(subject: TopicUpdate, id: string) : Promise<TopicResponse[]> {
        return this.apiService.request<TopicResponse[]>(`${this.baseURL}/${id}`, 'PUT', subject);
    }

    async delete(id: string) : Promise<TopicResponse[]> {
        return this.apiService.request<TopicResponse[]>(`${this.baseURL}/${id}`, 'DELETE');
    }

    async getAll() : Promise<TopicResponse[]> {
        return this.apiService.request<TopicResponse[]>(`${this.baseURL}/all`, 'GET');
    }

    async getById(id: string) : Promise<TopicResponse> {
        return this.apiService.request<TopicResponse>(`${this.baseURL}/${id}}`, 'GET');
    }

    async getByName(name: string) : Promise<TopicResponse> {
        return this.apiService.request<TopicResponse>(`${this.baseURL}?name=${name}`, 'GET');
    }
}

export const useTopic = () => new TopicService();
