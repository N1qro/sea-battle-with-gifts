import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import get_initial_data from "../api/gamedata"
import Board from "../components/Board"
import { Container, TitleBox, SidebarContainer, NavContainer, BoardContainer } from "../styles/GamePage"
import target from "../assets/svg/target.svg"
import { FlexRow } from "../styles/GlobalStyles"
import { Header4, Header5, RegularText } from "../styles/TextStyles"
import { PrependBackendURI, fetchGameData, processCells } from "../utils"
import { CellObject, GameData } from "../types/responses"
import Button from "../components/Button"
import request_shoot from "../api/shoot"
import { PrizeInfo } from "./profile/Index"
import { FormError } from "../styles/StyledForm"
import { AbsoluteWindow, PrizeAward, PrizeAwardWindow } from "../styles/Profile"
import Confetti from "react-confetti"


function Game() {
    const params = useParams<{ hash: string }>()
    const [ cellObject, setCellObject ] = useState<CellObject>()
    const [ currentCell, setCurrentCell ] = useState()
    const [ gameData, setGameData ] = useState<GameData | null>()
    const [ error, setError ] = useState("")
    const [ prize, setPrize ] = useState<PrizeInfo>()

    const mapping = {
        3: "Корабль уничтожен",
        2: "",
        1: "Промах",
        0: "Неизвестно",
    }

    useEffect(() => {
        fetchGameData(params.hash!, setGameData)
    }, [])

    console.log(gameData)

    useEffect(() => {
        if (!!gameData) {
            const cell = gameData.cells?.filter(val => val.position === currentCell)[0]
            setCellObject(cell)
        }
    }, [gameData, currentCell])

    function shoot(e) {
        (async () => {
            const data = await request_shoot({ game: gameData?.link, position: currentCell })

            if (data.status === "error") {
                setError("Что-то пошло не так")
                return
            } else if (data.content.error === "Нет выстрелов") {
                setError("Выстрелы кончились. Теперь вы можете только наблюдать")
                return
            }

            if (data.content.after_cell_status === 3) {
                setPrize(data.content.prize)
            } else {
                setPrize(undefined)
            }

            if (data.status === "success") {
                fetchGameData(params.hash!, setGameData)
            }
        })()
    }

    if (!gameData) {
        return <p>Loading</p>
    }

    if (gameData.status === 3 && !prize) {
        return <TitleBox>Игра завершена! Спасибо!</TitleBox>
    }

    const status = mapping[cellObject?.status || 0]

    return (
        <Container>
            {prize &&
                <PrizeAward>
                    <Confetti numberOfPieces={200}/>
                    <PrizeAwardWindow>
                        <Header4>Поздравляем!!</Header4>
                        <Header5>Вы выиграли {prize.title}!</Header5>
                        <RegularText>Забрать свой выигрыш можно в профиле, в разделе "Призы"</RegularText>
                        {prize.image && <img src={PrependBackendURI(prize.image)} />}
                        <FlexRow>
                            <Button onClick={() => setPrize(undefined)} $color="green">Вернутся к игре</Button>
                            <Button as={Link} to="/profile" $color="red">В профиль</Button>
                        </FlexRow>
                    </PrizeAwardWindow>
                </PrizeAward>
            }
            <TitleBox>Игра</TitleBox>
            <SidebarContainer>
                <Header4>{gameData.title}</Header4>
                <Header5>{gameData.text}</Header5>
                <RegularText>Выбранная клетка: {currentCell}</RegularText>
                <RegularText>Статус: {status}</RegularText>

                {error && <FormError>{error}</FormError>}
                {prize && <Header5>Вы выиграли {prize.title}!</Header5>}

                {status === "Неизвестно" &&
                    <Button onClick={shoot} $color="red">Выстрелить</Button>
                }
            </SidebarContainer>
            <NavContainer as="div">
                <FlexRow>
                    <img src={target}/>
                    <p>Оставшиеся выстрелы: {gameData.count}</p>
                </FlexRow>
            </NavContainer>
            <Board
                data={{cells: gameData.cells, size: gameData.size}}
                currentCell={currentCell}
                setCurrentCell={setCurrentCell}
            />
        </Container>
    )
}

export default Game