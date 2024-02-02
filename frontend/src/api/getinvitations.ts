import { AxiosError } from "axios";
import api from "./api";


export default async function get_invites() {
    try {
        const response = await api.get(`user/invites/`)
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
        "status": "success",
        "content": {"details": "Что-то пошло не так"}
    }
}
