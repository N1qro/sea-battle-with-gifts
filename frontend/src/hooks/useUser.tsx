import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { User } from '../types/general'
import setSessionStorageUser from "../utils/setSessionStorageUser.ts";


function useUser() {
    const { user, setUser } = useContext(AuthContext)

    function addUser(user: User) {
        setUser(user)
        setSessionStorageUser(user)
    }

    function removeUser() {
        setUser(null)
        sessionStorage.removeItem("user")
    }

    return { user, addUser, removeUser }
}

export default useUser