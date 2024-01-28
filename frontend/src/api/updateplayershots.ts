import { AxiosError } from "axios";
import api from "./api";


export default async function update_player_shots(user_id: number, game: string, count: number) {
    try {
        const data = {
            count: count,
            user: user_id,
            game: game,
        }
        const response = await api.put(`game/players/${user_id}/`, data)
        return {
            "status": "success",
            "content": response.data,
        }
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                "status": "error",
                "content": err.response.data,
            }
        }
    }
    return {
        "status": "error",
        "content": {details: "Что-то пошло не так"}
    }
}
