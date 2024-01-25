import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function RootLayout() {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		// Redirect пользователя при авторизации

		if (user && user.is_superuser) {
			navigate("/admin", { replace: true })
		} else if (user && !user.is_superuser) {
			navigate("/profile", { replace: true })
		}
	}, [user])

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default RootLayout