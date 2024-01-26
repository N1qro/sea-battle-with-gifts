import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function RequireUser() {
    const {user} = useAuth()
    const isLoggedIn = !!user

    if (isLoggedIn && !user.is_superuser) {
        return <Outlet />
    } 

    return <Navigate to="/login" replace/>
}

export default RequireUser