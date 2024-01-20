import {User} from "../types/general.ts";

export default function setSessionStorageUser(user: User) {
    sessionStorage.setItem("user", JSON.stringify(user))
}