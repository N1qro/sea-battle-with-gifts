import { AxiosError } from "axios";
import api from "./api";


export default async function add_player() {
    try {
        const data = {
            user: 1,
            count: 3,
            game: "mxkazYeJ0P",
        }
        const response = await api.post(`game/players/`, data)
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
