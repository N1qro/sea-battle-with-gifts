import { AxiosError } from "axios";
import api from "./api";


export default async function remove_player(user_id: number, game: string) {
    try {
        const response = await api.delete(`game/players/${user_id}/`, { data: { game } })
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
