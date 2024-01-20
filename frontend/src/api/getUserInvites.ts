import {serverResponses} from "../types/general.ts";
import {baseRequest} from "./baseRequest.ts";
import {UserInvite} from "../types/userData.ts";


export default async function getUserInvites(): Promise<{ status: serverResponses, content: UserInvite[] }> {
    const result = await baseRequest('user/invites/')
    return {status: result.status, content: result.status === serverResponses.success ? result.response : {}}
}

