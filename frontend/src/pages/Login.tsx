import { useState, ChangeEvent, FormEvent } from 'react'
import StyledForm, { FormError } from '../styles/StyledForm'
import { Header3 } from '../styles/TextStyles'

import Input from '../styles/InputElement'
import FormLogo from "../assets/img/form-control.png"
import Button from '../components/Button'

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const [error] = useState("")

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setUserData(prev => ({...prev, [e.target.id]: e.target.value}))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log(userData)
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
        <Header3>Авторизация</Header3>
        <hr />
        <img width={128} height={128} src={FormLogo} alt="form-logo" />
        
        <div>
            <div>
                <label htmlFor="email">Почта</label>
                <br />
                <Input
                    id="email"
                    type="text"
                    placeholder="vladdislav@mail.ru"
                    onChange={handleInput}
                    value={userData.email} />
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <br />
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    onChange={handleInput}
                    value={userData.password} />
            </div>
            {error && <FormError>{error}</FormError>}
            <Button $color="black" type="submit">Войти</Button>
        </div>

        <nav>
            <p>Не помните пароль? Восстановить</p>
            <p>Нет аккаунта? Зарегистрироваться</p>
        </nav>
    </StyledForm>
  )
}

export default Login