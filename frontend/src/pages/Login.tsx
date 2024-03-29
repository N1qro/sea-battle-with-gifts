import { useState, ChangeEvent, FormEvent } from 'react'
import StyledForm, { FormError, FieldWrapper } from '../styles/StyledForm'
import { Header3 } from '../styles/TextStyles'

import { LoginFields, LoginErrors } from '../types/loginForm'

import Input, { RedirectLink } from '../styles/InputElement'
import FormLogo from "../assets/img/form-control.png"
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import RequestLogin from '../api/login'
import get_user_data from '../api/userdata'


function Login() {
	const { login } = useAuth()
	const [ error, setError ] = useState<LoginErrors>({})
	const [ userData, setUserData ] = useState<LoginFields>({
		username: "",
		password: "",
	})

	function validate() {
		if (userData.username === "") {
			setError({username: "Это поле не может быть пустым"})
		} else if (userData.password === "") {
			setError({password: "Это поле не может быть пустым"})
		} else {
			setError({})
			return true
		}
		return false
	}

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setUserData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!validate()) { return }

		async function makeRequest() {
			const data = await RequestLogin(userData)

			if (data.status === "success") {
				const data2 = await get_user_data(data.content.access)
				login({
					accessToken: data.content.access,
					refreshToken: data.content.refresh,
					is_superuser: data2.is_superuser,
					username: data2.username,
					email: data2.email,
					id: data2.id,
				})
			} else {
				setError(data.content)
			}
		}

		makeRequest()
	}

	return (
		<StyledForm onSubmit={handleSubmit}>
			<Header3>Авторизация</Header3>
			<hr />
			<img width={128} height={128} src={FormLogo} alt="form-logo" />
			
			<FieldWrapper>
				<div>
					<label htmlFor="username">Логин</label>
					<br />
					<Input
						id="username"
						type="text"
						placeholder="vladdick"
						onChange={handleInput}
						value={userData.username} />
					{error.username && <FormError>{error.username}</FormError>}
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
					{error.password && <FormError>{error.password}</FormError>}
				</div>
				{error.detail && <FormError>{error.detail}</FormError>}
				<Button $color="black" type="submit">Войти</Button>
			</FieldWrapper>

			<nav>
				<p>Не помните пароль? <RedirectLink to=".">Восстановить</RedirectLink></p>
				<p>Нет аккаунта? <RedirectLink to="../register">Зарегистрироваться</RedirectLink></p>
			</nav>
		</StyledForm>
	)
}

export default Login