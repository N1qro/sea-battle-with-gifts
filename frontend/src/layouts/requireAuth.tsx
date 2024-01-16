import { Navigate, Outlet } from "react-router-dom"

function RequireAuth() {
    const isLoggedIn = true

    if (isLoggedIn) {
        return <Outlet />
    } 

    return <Navigate to="/login" replace/>
}

export default RequireAuth