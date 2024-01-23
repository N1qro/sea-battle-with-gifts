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
import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import createGame from "../../api/creategame"


function AdminPage() {
    const [ startedGames, setStartedGames ] = useState([])
    const [ gameData, setGameData ] = useState({
        "title": "Game name",
        "size": 5,
        "text": "description",
    })

    useEffect(() => {
        
    }, [])

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        let value: string | number = e.target.value

        if (e.target.type === "number") {
            value = parseInt(value)
        }

        setGameData(prev => ({...prev, [e.target.id]: value}))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        (async() => {
            const hash = await createGame(gameData)
            console.log("CREATED GAME")
            console.log(hash)
            console.log(hash?.link)
        })()
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
                <StyledForm onSubmit={handleSubmit}>
                    <NavText>Создать новое поле</NavText>
                    <SubText>Место для ошибки</SubText>
                    <FieldWrapper>
                        <div>
                            <label htmlFor="">Название игры</label>
                            <br />
                            <Input
                                id="title"
                                type="text"
                                value={gameData.title}
                                onChange={handleInput}
                            />
                        </div>
                
                        <div>
                            <label htmlFor="">Размер стороны поля</label>
                            <br />
                            <Input
                                id="size"
                                placeholder='От 5 до 20'
                                type="number"
                                value={gameData.size}
                                onChange={handleInput}
                            />
                        </div>
                        <br />
                        <Button $color="black" type="submit">Создать</Button>
                    </FieldWrapper>
                </StyledForm>

            </BoardCreation>
        </GridContainer>
    )
}

export default AdminPage