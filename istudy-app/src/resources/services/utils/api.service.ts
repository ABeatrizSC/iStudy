import { useNotification } from "@/components";
import { getAuthHeaders } from "../auth-user/authentication.service";

export class ApiService {
    private baseURL: string = 'http://localhost:8080';
    private notification = useNotification();

    async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers: getAuthHeaders(),
            body: body ? JSON.stringify(body) : undefined
        });

        if (response.status > 201) {
            const errorResponse = await response.json();
            this.notification.notify(errorResponse.message, "error");
        }

        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            return response.json();
        } else {
            return response.text();
        }
    }
}
