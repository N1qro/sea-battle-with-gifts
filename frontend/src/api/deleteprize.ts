import { AxiosError } from "axios";
import api from "./api";


export default async function delete_prize(id: number, link: string) {
    try {
        const response = await api.delete(`game/prize/${id}`, { data: { game: link } })
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
