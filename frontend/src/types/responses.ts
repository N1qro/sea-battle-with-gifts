export interface GameData {
    id: number,
    title: string,
    status: 0 | 1 | 2 | 3,
    size: number,
    text: string,
    link: string,
    ships?: {
        id: number,
        cell: {
            id: number,
            x: number,
            y: number,
            status: number,
            game: number
        },
        game: number,
        is_alive: boolean,
        prize: {
            id: number,
            title: string,
            text: string,
            game: number,
            winner: null,
            activation_code: string,
        }
    }[]
}