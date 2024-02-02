import { Outlet, Navigate } from "react-router-dom"
import useUser from "../hooks/useUser"

function AnonymousOnly() {
    const { user } = useUser()

    if (!user) {
        return <Outlet />
    }

    if (user.is_superuser) {
        return <Navigate to="/admin" replace />
    }

    return <Navigate to="/profile" replace />    
}


export default AnonymousOnly;