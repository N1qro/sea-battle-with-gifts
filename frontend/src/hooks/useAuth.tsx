import useUser from "./useUser"
import { User } from "../types/general"

function useAuth() {
    const { user, addUser, removeUser } = useUser()

    function login(user: User) {
        console.log("Logging in")
        console.log(user)
        addUser(user)
    }

    const logout = removeUser
    return { user, login, logout }
}

export default useAuth