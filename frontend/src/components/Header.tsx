import Button from "./Button"
import SiteLogo from "../assets/site-logo.svg"
import StyledHeader from "../styles/Header"
import { Link } from "react-router-dom"


function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <img src={SiteLogo} alt="site-brand" />
      </Link>
      <nav>
        <Link to="">О проекте</Link>
      </nav>
      <nav>
        <Button as={Link} to="" $color="blue">Авторизация</Button>
        <Button as={Link} to="" $color="black">Регистрация</Button>
      </nav>
    </StyledHeader>
  )
}
  
export default Header