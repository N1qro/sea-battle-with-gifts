import { AxiosError } from "axios";
import api from "./api";


export default async function get_user_data(token: string) {
    try {
        const response = await api.get("/user/data/", { headers: {"Authorization": `Bearer ${token}`} })
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
