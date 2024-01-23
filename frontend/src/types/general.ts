export interface User {
    id: number;
    username: string;
    email: string;
    is_superuser: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface UserSetter {
    user: User | null;
    setUser: (user: User | null) => void;
}