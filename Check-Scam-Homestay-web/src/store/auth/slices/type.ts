export interface AuthState {
    user: any | null;
    isLoading: boolean;
    error: string | null;
}
export interface AuthLoginRequest {
    email: string;
    password: string;
}
export interface AuthRegisterRequest {
    email: string;
    name: string;
    password: string;
}

export interface AuthLoginResponse {
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            roles: string[];
        };
        access_token: string;
        token_type: string;
        expires_at: string;
    }
}

export interface AuthRegisterResponse {
    data: {
        email: string;
        name: string;
        id: string;
        updated_at: string;
        created_at: string;
    }
}

