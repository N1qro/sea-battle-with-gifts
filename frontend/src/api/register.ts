import { AxiosError } from "axios";
import { RegisterFields } from "../types/loginForm"
import api from "./api";
import login from "./login";


export default async function register(
    { email, username, password } : Omit<RegisterFields, "password2">
) {
    try {
        const response = await api.post("/user/register/", {
            email,
            password,
            username,
        })

        if (response.status !== 201) {
            throw Error(response.data)
        }

        return login({ username, password })
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                "status": "error",
                "content": err.response.data,
            }
        }
    }

    return response.data
}
