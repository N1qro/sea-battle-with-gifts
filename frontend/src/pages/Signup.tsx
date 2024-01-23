import { useState, ChangeEvent, FormEvent, useRef, ElementRef } from 'react'
import StyledForm, { OneRow, FieldWrapper, FormError } from '../styles/StyledForm'
import Button from '../components/Button'
import { Header3 } from '../styles/TextStyles'
import FormLogo from "../assets/img/form-control.png"
import Input from '../styles/InputElement'
import { SubText } from '../styles/TextStyles'
import { RegisterFields, RegisterErrors } from '../types/loginForm'
import useAuth from '../hooks/useAuth'
import register from '../api/register'
import get_user_data from '../api/userdata'
import { useNavigate } from 'react-router-dom'


function Signup() {
    const [ error, setError ] = useState<RegisterErrors>({})
    const { login } = useAuth()
    const navigate = useNavigate()
    const [ userData, setUserData ] = useState<RegisterFields>({
        email: "",
        username: "",
        password: "",
        password2: "",
    })

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setUserData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        async function makeRequest() {
            const registerData = await register(userData)

            if (registerData.status === "error") {
                setError(registerData.content)
            } else {
                console.log(registerData)
                const additionalData = await get_user_data(registerData.content.access)

                login({
                    id: additionalData.id,
                    username: additionalData.username,
                    email: additionalData.email,
                    is_superuser: additionalData.is_superuser,
                    accessToken: registerData.content.access,
                    refreshToken: registerData.content.refresh,
                })

                navigate("/profile", { replace: true })
            }
        }

        makeRequest()
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Header3>Регистрация</Header3>
            <hr />
            <img width={128} height={128} src={FormLogo} alt="form-logo" />
            <FieldWrapper>
                <div>
                    <label htmlFor="email">Почта</label>
                    <br />
                    <Input
                        id="email"
                        placeholder='mail@yandex.ru'
                        type="text"
                        onChange={handleInput}
                    />
                </div>
                {error.email && <FormError>{error.email}</FormError>}
                <div>
                    <label htmlFor="username">Логин</label>
                    <br />
                    <Input
                        id="username"
                        placeholder='bestlogin123'
                        type="text"
                        onChange={handleInput}
                    />
                </div>
                {error.username && <FormError>{error.username}</FormError>}
                <div>
                    <OneRow>
                        <p>
                            <label htmlFor="password">Пароль</label>
                            <Input
                                id="password"
                                placeholder='********'
                                type="password"
                                onChange={handleInput}
                            />
                        </p>
                        <p>
                            <label htmlFor="password2">Повтор пароля</label>
                            <Input
                                id="password2"
                                placeholder='********'
                                type="password"
                                onChange={handleInput}
                            />
                        </p>
                    </OneRow>
                    {error.password && <FormError>{error.password}</FormError>}
                    {error.password2 && <FormError>{error.password2}</FormError>}
                </div>
                <Button $color="black" type="submit">Создать аккаунт</Button>
                <SubText>Регистрируясь, вы принимаете условия пользования*</SubText>
            </FieldWrapper>

            <nav>
                <p>Есть аккаунт? Войти</p>
            </nav>
        </StyledForm>
    )
}

export default Signup