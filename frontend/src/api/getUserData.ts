import {serverResponses, UserProfile} from "../types/general.ts";
import {baseRequest} from "./baseRequest.ts";


export default async function getUserData(): Promise<{ status: serverResponses, content: UserProfile }> {
    const result = await baseRequest('user/data/')
    if (result.status === serverResponses.success) {
        return {
            status: result.status,
            content: {
                username: result.response.username,
                email: result.response.email,
                game_count: result.response.game_count,
                // почему-то приходит null, а не 0, поэтому проверяем
                shot_count: result.response.shot_count ? result.response.shot_count : 0
            }
        }
    } else {
        return {
            status: result.status,
            content: {} as UserProfile,
        }
    }
}
