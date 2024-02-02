import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"


function RequireAdmin() {
    const { user } = useAuth()

    if (!!user && user.is_superuser) {
        return <Outlet />
    } 

    return <Navigate to="/" replace/>
}

export default RequireAdmin