import {User} from "../types/general.ts";

export default class SessionStorageUserService {
    static get(): User | null {
        const user = sessionStorage.getItem("user")
        if (user) {
            return JSON.parse(user)
        }
        return null
    }

    static set(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user))
    }

    static remove() {
        sessionStorage.removeItem("user")
    }
}
