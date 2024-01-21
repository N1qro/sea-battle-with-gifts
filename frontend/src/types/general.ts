export interface User {
    id?: number;
    username?: string;
    email?: string;
    accessToken: string;
    refreshToken: string;
}

export enum serverResponses {
    success,
    error,
    unauthorized
}

export interface UserSetter {
    user: User | null;
    setUser: (user: User | null) => void;
}