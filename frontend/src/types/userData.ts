export interface UserProfile {
    id: number
    username: string
    email: string
    game_count: number
    shot_count: number
}

export interface UserPrize {
    id: string
    title: string
    description: string,
    content: string
}

export interface UserInvite {
    id: string
    title: string
    text: string
    link: string
    shots: number
}

export interface UserGame {
    id: string
    title: string
    link: string
    finish_at: string
    shots: number
    prizes_count: number
}
