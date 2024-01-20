import { Navigate, Outlet } from "react-router-dom"

function RequireAdmin() {
    const isAdmin = true

    if (isAdmin) {
        return <Outlet />
    } 

    return <Navigate to="/" replace/>
}

export default RequireAdmin