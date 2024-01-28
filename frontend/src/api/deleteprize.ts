import { AxiosError } from "axios";
import api from "./api";


export default async function delete_prize(id: number, link: string) {
    try {
        const response = await api.delete(`game/prize/${id}`, { data: { game: link } })
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
        "content": {"details": "Что-то пошло не так"}
    }
}
