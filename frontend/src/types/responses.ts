export interface CellObject {
    id: number,
    position: string,
    status: 1 | 2 | 3 | 4,
    ship: {
        id: number,
        is_alive: boolean,
        prize: {
            id: number,
            game: number,
            activation_code: string,
            text: string,
            title: string,
            winner: null
        }
    } | {}
}


export interface aa {
    id: number,
    position: string,
    status: 1 | 2 | 3 | 4,
    ship: {
        id: number,
        is_alive: boolean,
        prize: {
            id: number,
            game: number,
            activation_code: string,
            text: string,
            title: string,
            winner: null
        }
    } | {}
}

export interface GameData {
    id: number,
    title: string,
    status: 0 | 1 | 2 | 3,
    size: number,
    text: string,
    link: string,
    cells?: CellObject[]
}