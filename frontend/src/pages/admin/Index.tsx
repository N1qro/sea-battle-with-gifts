import {
    GameHistory,
    ActiveGames,
    BoardCreation,
    GridContainer,
    Indicator,
} from "../../styles/AdminPage"

import { NavText, SubText } from "../../styles/TextStyles"
import Button from "../../components/Button"

import StyledForm, { FieldWrapper } from "../../styles/StyledForm"
import Input from "../../styles/InputElement"
import { useState, ChangeEvent, FormEvent } from "react"


function AdminPage() {
    const [ gameData, setGameData ] = useState({
        "title": "",
        "size": "",
    })

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setGameData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }

    return (
        <GridContainer>
            <ActiveGames>
                <NavText>Уже созданные игровые поля</NavText>
                <p>
                    <Indicator $color="#5B85E9" />Не начатые пользователями игры
                    <Indicator />Активные игры
                </p>
            </ActiveGames>
            <GameHistory>
                <NavText>История прошедших игр</NavText>
                <SubText>(Всего проведено игр: 0)</SubText>
                <Button $color="blue">Просмотреть</Button>
            </GameHistory>
            <BoardCreation>
                <StyledForm>
                    <NavText>Создать новое поле</NavText>
                    <SubText>Место для ошибки</SubText>
                    <FieldWrapper>
                        <div>
                            <label htmlFor="">Название игры</label>
                            <br />
                            <Input
                                id="title"
                                type="text"
                                onChange={handleInput}
                            />
                        </div>
                
                        <div>
                            <label htmlFor="">Размер стороны поля</label>
                            <br />
                            <Input
                                id="size"
                                placeholder='От 5 до 20'
                                type="text"
                                onChange={handleInput}
                            />
                        </div>
                        <br />
                        <Button $color="black" onClick={handleSubmit}>Создать</Button>
                    </FieldWrapper>
                </StyledForm>

            </BoardCreation>
        </GridContainer>
    )
}

export default AdminPage