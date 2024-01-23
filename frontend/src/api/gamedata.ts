import { AxiosError } from "axios";
import api from "./api";

interface Response {
    id: number,
    title: string,
    status: 1 | 2 | 3,
    size: number,
    text: string,
    link: string,
    ships: {
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

export default async function get_initial_data() {
    try {
        const response = await api.post("/game/", data)

        return null
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                "status": "error",
                "content": err.response.data,
            }
        }
    }
}
