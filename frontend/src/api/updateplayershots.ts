import { AxiosError } from "axios";
import api from "./api";


export default async function update_player_shots(user_id: number, game: string, count: number) {
    try {
        const data = {
            count: count,
            user: user_id,
            game: game,
        }
        const response = await api.put(`game/players/`, data)
        return response.data
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                "status": "error",
                "content": err.response.data,
            }
        }
    }
}
