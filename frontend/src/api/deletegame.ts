import { AxiosError } from "axios";
import api from "./api";


export default async function delete_game(link) {
    try {
        const response = await api.delete(`game/${link}/`)
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
