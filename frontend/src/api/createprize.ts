import { AxiosError } from "axios";
import api from "./api";


export default async function create_prize(data) {
    try {
        const response = await api.post(`game/prize/`, data)
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
