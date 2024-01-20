import {User} from "../types/general.ts";

export default function getSessionStorageUser(): User | null {
    const user = sessionStorage.getItem("user")
    if (user) {
        return JSON.parse(user)
    }
    return null
}