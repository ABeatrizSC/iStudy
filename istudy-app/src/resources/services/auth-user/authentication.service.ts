import { ApiService } from "../utils/api.service";
import { UserCredentials, AccessToken, User, DeleteAccount, AccountDetails, UpdateAccount } from "./user.resource";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string;
  name?: string;
  exp?: number;
  iss?: string;
  [key: string]: any;
};

export const getTokenPayload= () => {
    const token = localStorage.getItem('_auth');

    if (!token) return null;

    const cleanedToken = token.replace(/"/g, '');
    return jwtDecode<JwtPayload>(cleanedToken);
}

export const getAuthHeaders = () => {
    const authToken = localStorage.getItem('_auth');
    
    return {
        "Content-Type": "application/json",
        ...(authToken ? { "Authorization": `Bearer ${authToken.replace(/"/g, '')}` } : {}),
    };
};

export const getUserIdHeader = () => {
    const payload = getTokenPayload();

    return {
        "Content-Type": "application/json",
        ...(payload?.sub ? { "X-User-Id": payload.sub } : {})
    };
};

class AuthService {
    static AUTH_PARAM: string = "_auth";
    private apiService = new ApiService();

    async login(credentials: UserCredentials): Promise<void> {
        const data: any = await this.apiService.request('/auth/login', 'POST', credentials);

        const token: AccessToken = data.token;

        this.initSession(token);
    }

    async save(user: User) : Promise<string> {
        const responseData: any = await this.apiService.request('/auth/register', 'POST', user);

        return responseData.message;
    }

    async getAccountDetails(): Promise<AccountDetails> {
        return this.apiService.request<AccountDetails>(`/users/details`, "GET");
    }

    async updateUserAccount(updateAccount: UpdateAccount): Promise<string> {
        const responseData: any = await this.apiService.request('/users', 'PUT', updateAccount);

        return responseData.message;
    }

    async deleteUserAccount(deleteAccount: DeleteAccount): Promise<string> {
        const responseData: any = await this.apiService.request('/users', 'DELETE', deleteAccount);

        this.logoutSession();

        return responseData.message;
    }

    async isSessionValid(): Promise<boolean> {
        try {
            const response = await this.apiService.request('/auth/authenticated-user', 'GET');
    
            if (!response) return false;
    
            return typeof response === "string" && response.trim().length > 0; 
        } catch (error) {
            return false;
        }
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

export const useAuthService = () => new AuthService();
