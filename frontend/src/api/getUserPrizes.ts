import {serverResponses} from "../types/general.ts";
import {baseRequest} from "./baseRequest.ts";
import {UserPrize} from "../types/userData.ts";


export default async function getUserPrizes(): Promise<{ status: serverResponses, content: UserPrize[] }> {
    const result = await baseRequest('user/prizes/')
    return {status: result.status, content: result.status === serverResponses.success ? result.response : {}}
}

