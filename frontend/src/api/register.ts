import {RegisterErrors, RegisterFields} from "../types/loginForm"
import login from "./login";
import {baseRequest} from "./baseRequest.ts";
import {serverResponses} from "../types/general.ts";


export default async function register(
    {email, username, password}: Omit<RegisterFields, "password2">
): Promise<{ status: serverResponses, content: RegisterErrors }> {
    const result = await baseRequest('user/register/', {
        data: {
            email,
            password,
            username,
        }
    })
    if (result.status === serverResponses.success) {
        await login({username, password})
        return {
            status: result.status,
            content: {}
        }
    } else {
        return {
            status: result.status,
            content: result.response as RegisterErrors
        }
    }
}
