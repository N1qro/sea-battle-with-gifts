import {serverResponses} from "../types/general.ts";
import {baseRequest} from "./baseRequest.ts";
import {UserGame} from "../types/userData.ts";


export default async function getUserGames(): Promise<{ status: serverResponses, content: UserGame[] }> {
    const result = await baseRequest('user/games/')
    return {status: result.status, content: result.status === serverResponses.success ? result.response : {}}
}

