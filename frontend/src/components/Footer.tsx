import StyledFooter from "../styles/Footer"
import { NavLink } from "react-router-dom"


function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <StyledFooter>
			<p>ShootingSeas © {currentYear}. Все права защищены.</p>
			<NavLink to="feedback">Связаться с нами</NavLink>
        </StyledFooter>
    )
}

export default Footer