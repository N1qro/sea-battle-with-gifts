import { AxiosError } from "axios";
import api from "./api";


export default async function remove_player(user_id: number, game: string) {
    try {
        const response = await api.delete(`game/players/${user_id}/`, { data: { game } })
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
