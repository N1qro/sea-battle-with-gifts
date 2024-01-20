export interface User {
    id?: number;
    username?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface UserProfile {
    username: string
    email: string
    game_count: number
    shot_count: number
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