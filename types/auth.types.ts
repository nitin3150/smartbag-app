export type User = {
    id: string;
    email: string;
    name?: string | null;
    phone?: string;
    role: string;
};

export type AuthState = {
    user: User | null;
    requirePhone: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};