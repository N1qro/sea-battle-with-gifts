import { useEffect } from "react"
import useUser from "./useUser"
import { User } from "../types/general"
import SessionStorageUserService from "../utils/SessionStorageUserService.ts";

function useAuth() {
    const { user, addUser, removeUser } = useUser()

    useEffect(() => {
        const user = SessionStorageUserService.get()
        if (user) {
            addUser(user)
        }
    }, [])

    function login(user: User) {
        addUser(user)
    }

    const logout = removeUser
    return { user, login, logout }
}

export default useAuth