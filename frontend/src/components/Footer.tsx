import StyledFooter from "../styles/Footer"
import { Link } from "react-router-dom"


function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <StyledFooter>
      <p>ShootingSeas © {currentYear}. Все права защищены.</p>
      <Link to="">Связаться с нами</Link>
    </StyledFooter>
  )
}

export default Footer