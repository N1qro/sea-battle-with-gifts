import { Navigate, Outlet } from "react-router-dom"
import useUser from "../hooks/useUser.tsx";

function RequireAuth() {
    const {user} = useUser()
    const isLoggedIn = !!user

    if (isLoggedIn) {
        return <Outlet />
    } 

    return <Navigate to="/login" replace/>
}

export default RequireAuth