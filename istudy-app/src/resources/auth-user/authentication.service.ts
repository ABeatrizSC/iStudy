import { UserCredentials, AccessToken, User } from "./user.resource";

class AuthService {
    baseURL: string = 'http://localhost:8080/auth'
    static AUTH_PARAM: string = "_auth";

    async login(credentials: UserCredentials): Promise<void> {
        const response = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            const responseError = await response.json();
            throw new Error(responseError.message);
        }

        const data = await response.json();
        const token: AccessToken = data.token;

        this.initSession(token);
    }

    async save(user: User) : Promise<string> {
        const response = await fetch(`${this.baseURL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.status != 201){
            const responseError = await response.json();
            throw new Error(responseError.message);
        }

        const responseData = await response.json();
        return responseData.message;
    }

    initSession(token: AccessToken) {
        if (token) {
            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(token));
        }
    }

    logoutSession(): void {
        localStorage.removeItem(AuthService.AUTH_PARAM)
    }
}

export const useAuth = () => new AuthService();
