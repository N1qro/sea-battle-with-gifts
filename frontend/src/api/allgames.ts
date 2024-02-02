import { AxiosError } from "axios";
import api from "./api";


export default async function get_all_games() {
    try {
        const response = await api.get("/game/")
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
