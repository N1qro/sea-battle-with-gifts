export interface CellObject {
    id: number,
    position: string,
    status: 0 | 1 | 2 | 3,
    ship: {
        id: number,
        is_alive: boolean,
        prize: {
            id: number,
            game: number,
            activation_code: string,
            image: string | null,
            text: string,
            title: string,
            winner: null
        }
    } | {}
}

export interface PlayerObject {
    id: number,
    username: string,
    count: number,
}

export interface GameData {
    id: number,
    title: string,
    status: 0 | 1 | 2 | 3,
    size: number,
    text: string,
    link: string,
    count?: number,
    cells?: CellObject[]
    players?: PlayerObject[]
}