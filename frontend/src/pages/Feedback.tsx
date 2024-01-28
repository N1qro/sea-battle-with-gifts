import StyledForm, { FeedBackForm, FieldWrapper, FormError } from "../styles/StyledForm"
import Input, { TextArea } from "../styles/InputElement"
import { Header4, SubText, RegularText } from "../styles/TextStyles"
import Button from "../components/Button"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { ValidateEmail } from "../utils"


function Feedback() {
	const [ wasSubmitted, setWasSubmitted ] = useState(false)
	const [ error, setError ] = useState({})
	const [ formData, setFormData ] = useState({
		"email": "",
		"subject": "",
		"text": "",
	})

	function validator() {
		if (!ValidateEmail(formData.email)) {
			setError({email: "Формат почты не верен"})
		} else if (formData.email === "") {
			setError({email: "Это поле не может быть пустым"})
		} else if (formData.subject === "") {
			setError({subject: "Это поле не может быть пустым"})
		} else if (formData.text === "") {
			setError({text: "Это поле не может быть пустым"})
		} else {
			setError({})
			return true
		}

		return false
	}

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

	function handleSubmit(e) {
		e.preventDefault()
		if (!validator()) { return }

		setFormData({"email": "", "subject": "", "text": ""})
		setWasSubmitted(true)
	}

    return (
		<FeedBackForm onSubmit={handleSubmit}>
			<Header4>Сообщить об ошибке</Header4>
			<SubText>Мы отправим ответ на почту в течение 1 рабочей недели</SubText>
			<FieldWrapper>
				<div>
					<label htmlFor="">Почта</label>
					<br />
					<Input
						id="email"
						onChange={handleInput}
						value={formData.email}
						placeholder="На неё придёт ответ"
					/>
				</div>
				{error.email && <FormError>{error.email}</FormError>}
				<div>
					<label htmlFor="">Тема</label>
					<br />
					<Input
						id="subject"
						onChange={handleInput}
						value={formData.subject}
						placeholder="Не пришёл подарок.."
					/>
				</div>
				{error.subject && <FormError>{error.subject}</FormError>}
				<div>
					<label htmlFor="">Описание проблемы</label>
					<br />
					<TextArea
						id="text"
						onChange={handleInput}
						value={formData.text}
						placeholder="Детальное описание.."
					/>
				</div>
				{error.text && <FormError>{error.text}</FormError>}
				{wasSubmitted ?
					<div>
						<RegularText>Ответ успешно записан!</RegularText>
						<Button as={Link} to="../profile" $color="blue">Вернуться в профиль</Button>
					</div> :
					<Button $color="black">Отправить</Button>
				}
			</FieldWrapper>
		</FeedBackForm>
    )
}

export default Feedback