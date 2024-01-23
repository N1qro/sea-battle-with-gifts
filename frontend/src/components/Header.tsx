import Button from "./Button"
import SiteLogo from "../assets/site-logo.svg"
import StyledHeader from "../styles/Header"
import { Link, NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"


function Header() {
	const { user, logout } = useAuth()
	const isLoggedIn = !!user

	return (
		<StyledHeader>
			<Link to="/">
				<img src={SiteLogo} alt="site-brand" />
			</Link>
			<nav>
				<NavLink to="about">О проекте</NavLink>
				{isLoggedIn && <NavLink to="profile">Профиль</NavLink>}
				{isLoggedIn && user.is_superuser && <NavLink to="admin">Администрирование</NavLink>}
			</nav>
			{!user ?
				<nav>
					<Button as={Link} to="login" $color="blue">Авторизация</Button>
					<Button as={Link} to="register" $color="black">Регистрация</Button>
				</nav> :
				<nav>
					<p>Здравствуйте, <strong>{user.username}</strong></p>
					<Button $color="black" onClick={logout}>Выход</Button>
				</nav>
			}
		</StyledHeader>
	)
}
  
export default Header