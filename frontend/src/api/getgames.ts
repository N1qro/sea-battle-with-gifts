import { AxiosError } from "axios";
import api from "./api";


export default async function create(
    data: {title: string, size: number, text: string}
) {
    try {
        const response = await api.post("/game/", data)

        return null
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                "status": "error",
                "content": err.response.data,
            }
        }
    }
}
