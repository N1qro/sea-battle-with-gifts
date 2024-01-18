import { useEffect } from "react"
import useUser from "./useUser"
import { User } from "../types/general"

function useAuth() {
    const { user, addUser, removeUser } = useUser()

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        if (user) {
            addUser(JSON.parse(user))
        }
    }, [])

    function login(user: User) {
        addUser(user)
    }

    const logout = removeUser
    return { user, login, logout }
}

export default useAuth