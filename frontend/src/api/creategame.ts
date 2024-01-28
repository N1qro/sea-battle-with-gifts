import { AxiosError } from "axios";
import api from "./api";


export default async function create(
    data: {title: string, size: number, text: string}
) {
    try {
        const response = await api.post("/game/", data)
        return {
            "status": "success",
            "content": response.data.link,
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
        "content": {details: "Что-то пошло не так"}
    }
}
