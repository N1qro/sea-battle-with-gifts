import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { User } from '../types/general'
import SessionStorageUserService from "../utils/SessionStorageUserService.ts";


function useUser() {
    const { user, setUser } = useContext(AuthContext)

    function addUser(user: User) {
        setUser(user)
        SessionStorageUserService.set(user)
    }

    function removeUser() {
        setUser(null)
        SessionStorageUserService.remove()
    }

    return { user, addUser, removeUser }
}

export default useUser