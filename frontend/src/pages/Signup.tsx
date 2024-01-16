import { useState, ChangeEvent, FormEvent } from 'react'
import StyledForm, { OneRow, FieldWrapper } from '../styles/StyledForm'
import Button from '../components/Button'
import { Header3 } from '../styles/TextStyles'
import FormLogo from "../assets/img/form-control.png"
import Input from '../styles/InputElement'
import { SubText } from '../styles/TextStyles'


function Signup() {
    const [ userData, setUserData ] = useState({
        email: "",
        login: "",
        password: "",
        password2: "",
    }) 

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setUserData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        console.log(userData)
        e.preventDefault()
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Header3>Регистрация</Header3>
            <hr />
            <img width={128} height={128} src={FormLogo} alt="form-logo" />
            <FieldWrapper>
                <div>
                    <label htmlFor="">Почта</label>
                    <br />
                    <Input
                        id="login"
                        placeholder='mail@yandex.ru'
                        type="text"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="">Логин</label>
                    <br />
                    <Input
                        id="login"
                        placeholder='bestlogin123'
                        type="text"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <OneRow>
                        <p>
                            <label htmlFor="">Пароль</label>
                            <Input
                                id="password"
                                placeholder='********'
                                type="password"
                                onChange={handleInput}
                            />
                        </p>
                        <p>
                            <label htmlFor="">Повтор пароля</label>
                            <Input
                                id="password2"
                                placeholder='********'
                                type="password"
                                onChange={handleInput}
                            />
                        </p>
                    </OneRow>
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