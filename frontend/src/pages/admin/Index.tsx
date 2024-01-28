import {
    GameHistory,
    ActiveGames,
    BoardCreation,
    GridContainer,
    Indicator,
    GameContainer,
    Game,
} from "../../styles/AdminPage"

import { NavText, SubText, RegularText, Header4, Header5 } from "../../styles/TextStyles"
import Button from "../../components/Button"

import StyledForm, { FieldWrapper, FormError } from "../../styles/StyledForm"
import Input, { TextArea } from "../../styles/InputElement"
import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import createGame from "../../api/creategame"
import { Form, Link, useNavigate } from "react-router-dom"

import get_all_games from "../../api/allgames"

import user_outline from "../../assets/svg/user_outline.svg"
import gift from '../../assets/svg/gift.svg'
import { FlexRow } from "../../styles/GlobalStyles"

function AdminPage() {
    const navigate = useNavigate()
    const [ error, setError ] = useState({})
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
            value = parseInt(value) || 0
        }

        setGameData(prev => ({...prev, [e.target.id]: value}))
    }

    function validate() {
        if (gameData.size < 5) {
            setError({size: "Размер поля не может быть меньше 5"})
            return false
        } else if (gameData.size > 18) {
            setError({size: "Размер поля не может быть больше 18"})
            return false
        }

        setError({})
        return true
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) { return }

        (async() => {
            const response = await createGame(gameData)
            if (response.status === "success") {
                navigate(`game/${response.content}/`)
            } else {
                setError(response.content)
            }
        })()
    }

    const games = startedGames.map(el => (
        <Game as={Link} to={`game/${el.link}`} $isActive={el.status === 2} key={el.id}>
            <RegularText>{el.title}</RegularText>
            <FlexRow>
                <div>
                    <img src={user_outline} alt="people-amount" />
                    0
                </div>
                <div>
                    <img src={gift} alt="assigned-prizes" />
                    0
                </div>
            </FlexRow>
        </Game>
    ))

    return (
        <GridContainer>
            <ActiveGames>
                <NavText>Уже созданные игровые поля</NavText>
                {games.length !== 0 ? 
                    <GameContainer>{games}</GameContainer> :
                    <Header5>У вас ещё нет созданных игр!</Header5>
                }
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
                    <Header5>Создать новое поле</Header5>
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
                        {error.title && <FormError>{error.title}</FormError>}
                        <div>
                            <label htmlFor="">Описание игры</label>
                            <br />
                            <TextArea
                                id="text"
                                type="text"
                                value={gameData.text}
                                onChange={handleInput}
                            />
                        </div>
                        {error.text && <FormError>{error.text}</FormError>}
                        <div>
                            <label htmlFor="">Размер стороны поля (От 5 до 18)</label>
                            <br />
                            <Input
                                id="size"
                                placeholder='От 5 до 20'
                                type="number"
                                value={gameData.size}
                                onChange={handleInput}
                            />
                        </div>
                        {error.size && <FormError>{error.size}</FormError>}
                        <br />
                        {error.details && <FormError>{error.details}</FormError>}
                        <Button $color="black" type="submit">Создать</Button>
                    </FieldWrapper>
                </StyledForm>
                <Button as={Link} to="http://127.0.0.1:8000/admin" $color="blue">Администрирование базы данных</Button>
            </BoardCreation>
        </GridContainer>
    )
}

export default AdminPage