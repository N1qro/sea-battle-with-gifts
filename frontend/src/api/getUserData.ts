import {serverResponses} from "../types/general.ts";
import {baseRequest} from "./baseRequest.ts";
import {UserProfile} from "../types/userData.ts";


export default async function getUserData(): Promise<{ status: serverResponses, content: UserProfile }> {
    const result = await baseRequest('user/data/')
    return {status: result.status, content: result.status === serverResponses.success ? result.response : {}}
}
