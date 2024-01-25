import StyledForm, { FieldWrapper } from "../styles/StyledForm"
import Input, { TextArea } from "../styles/InputElement"
import { Header4, SubText, RegularText } from "../styles/TextStyles"
import Button from "../components/Button"
import { useState } from "react"


function Feedback() {
	const [ wasSubmitted, setWasSubmitted ] = useState(false)

	function handleSubmit(e) {
		setWasSubmitted(true)
	}

    return (
		<StyledForm onSubmit={handleSubmit}>
			<Header4>Сообщить об ошибке</Header4>
			<SubText>Мы отправим ответ на почту в течение 1 рабочей недели</SubText>
			<FieldWrapper>
				<div>
					<label htmlFor="">Почта</label>
					<br />
					<Input
						placeholder="На неё придёт ответ"
					/>
				</div>
				<div>
					<label htmlFor="">Тема</label>
					<br />
					<Input
						placeholder="Не пришёл подарок.."
					/>
				</div>
				<div>
					<label htmlFor="">Описание проблемы</label>
					<br />
					<TextArea
						placeholder="Детальное описание.."
					/>
				</div>
				<Button $color="black">Отправить</Button>
				{wasSubmitted && <RegularText>Ответ успешно записан!</RegularText>}
			</FieldWrapper>
		</StyledForm>
    )
}

export default Feedback