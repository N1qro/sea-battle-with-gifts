import { useState, ChangeEvent, FormEvent } from 'react'
import StyledForm, { FormError } from '../styles/StyledForm'
import { Header3 } from '../styles/TextStyles'

import { LoginFields, LoginErrors } from '../types/loginForm'

import Input from '../styles/InputElement'
import FormLogo from "../assets/img/form-control.png"
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'

function Login() {
	const [ error, setError ] = useState<LoginErrors>({})
	const [ userData, setUserData ] = useState<LoginFields>({
		username: "",
		password: "",
	})
	const { login } = useAuth()

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		setUserData(prev => ({...prev, [e.target.id]: e.target.value}))
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		async function makeRequest() {
			const data = await fetch('http://127.0.0.1:8000/api/user/auth/', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"username": userData.username,
					"password": userData.password,
				}),
			})

			const json = await data.json()

			if (data.ok) {
				login({
					"accessToken": json.access,
					"refreshToken": json.refresh,
				})
			} else {
				setError(json)
			}
		}

		makeRequest()
		e.preventDefault()
	}

	return (
		<StyledForm onSubmit={handleSubmit}>
			<Header3>Авторизация</Header3>
			<hr />
			<img width={128} height={128} src={FormLogo} alt="form-logo" />
			
			<div>
				<div>
					<label htmlFor="email">Логин</label>
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
			</div>

			<nav>
				<p>Не помните пароль? Восстановить</p>
				<p>Нет аккаунта? Зарегистрироваться</p>
			</nav>
		</StyledForm>
	)
}

export default Login