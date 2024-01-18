import { AxiosError } from "axios";
import api from "./api";


export default async function login(
    { username, password } : { username: string, password: string }
) {
    try {
        const response = await api.post("user/auth/", {
            password,
            username,
        });

        return {
            status: "success",
            content: response.data,
        }
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                status: "error",
                content: err.response.data,
            }
        } else {
            throw err
        }
    }
}
