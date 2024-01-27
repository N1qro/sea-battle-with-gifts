import {
    GameHistory,
    ActiveGames,
    BoardCreation,
    GridContainer,
    Indicator,
    GameContainer,
    Game,
} from "../../styles/AdminPage"

import { NavText, SubText, RegularText } from "../../styles/TextStyles"
import Button from "../../components/Button"

import StyledForm, { FieldWrapper } from "../../styles/StyledForm"
import Input from "../../styles/InputElement"
import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import createGame from "../../api/creategame"
import { Link, useNavigate } from "react-router-dom"

import get_all_games from "../../api/allgames"

import user_outline from "../../assets/svg/user_outline.svg"
import gift from '../../assets/svg/gift.svg'

function AdminPage() {
    const navigate = useNavigate()
    const [ startedGames, setStartedGames ] = useState([])
    const [ gameData, setGameData ] = useState({
        "title": "Game name",
        "size": 5,
        "text": "description",
    })

    useEffect(() => {
        (async () => {
            const game_data = await get_all_games()
            setStartedGames(game_data)
        })()
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
            navigate(`game/${hash}/`)
        })()
    }

    const games = startedGames.map(el => (
        <Game as={Link} to={`game/${el.link}`} key={el.id}>
            <RegularText>{el.title}</RegularText>
            <div>
                <img src={user_outline} alt="people-amount" />
                0
                <img src={gift} alt="assigned-prizes" />
                0
            </div>
        </Game>
    ))

    return (
        <GridContainer>
            <ActiveGames>
                <NavText>Уже созданные игровые поля</NavText>
                <GameContainer>
                    {games}
                </GameContainer>
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
                <Button as={Link} to="http://127.0.0.1:8000/admin" $color="blue">Администрирование базы данных</Button>
            </BoardCreation>
        </GridContainer>
    )
}

export default AdminPage