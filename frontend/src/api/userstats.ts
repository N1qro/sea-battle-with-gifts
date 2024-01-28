import { AxiosError } from "axios";
import api from "./api";


export default async function get_stats() {
    try {
        const response = await api.get(`user/data/`)
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
