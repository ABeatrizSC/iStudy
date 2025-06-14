export interface User {
    name: string;
    email: string;
    password: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface AccountDetails {
    name: string;
    email: string;
}

export interface UpdateAccount {
    name: string;
    email: string;
    currentPassword: string;
    newPassword?: string;
}

export interface DeleteAccount {
    password: string;
}

export interface AccessToken {
    accessToken: string;
}