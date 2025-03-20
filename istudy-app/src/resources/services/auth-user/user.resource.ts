export interface User {
    name: string;
    email: string;
    password: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface AccessToken {
    accessToken: string;
}