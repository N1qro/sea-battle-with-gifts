import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { User } from '../types/general'


function useUser() {
    const { user, setUser } = useContext(AuthContext)

    function addUser(user: User) {
        setUser(user)
        sessionStorage.setItem("user", JSON.stringify(user))
    }

    function removeUser() {
        setUser(null)
        sessionStorage.removeItem("user")
    }

    return { user, addUser, removeUser }
}

export default useUser