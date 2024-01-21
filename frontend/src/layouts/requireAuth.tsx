import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function RequireAuth() {
    const {user} = useAuth()
    const isLoggedIn = !!user

    if (isLoggedIn) {
        return <Outlet />
    } 

    return <Navigate to="/login" replace/>
}

export default RequireAuth