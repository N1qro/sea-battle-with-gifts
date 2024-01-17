import { RegisterFields } from "../types/loginForm"
import api from "./api";


export default async function register(
    { email, username, password } : Omit<RegisterFields, "password2">
) {
    const response = await api.post("/user/register/", {
        email,
        password,
        username,
    });

    if (response.status === 201) {
        return true
    }

    return response.data
}
