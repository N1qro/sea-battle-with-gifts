import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GameData } from "../../types/responses"
import get_initial_data from "../../api/gamedata"

import {
    Container,
    NavContainer,
    TitleBox,
    SidebarContainer,
    Cell,
} from "../../styles/GamePage"
import Board from "../../components/Board"

function Game() {
    const parameters = useParams()
    const [ gameData, setGameData ] = useState<GameData | null>(null)
    const [ selectedCell, setSelectedCell ] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            const data = await get_initial_data(parameters.hash!)
            if (data.status === "success") {
                setGameData(data.content)
            } else {
                throw new Error(data.content)
            }
        })()
    }, [])

    if (!gameData) {
        return <p>Loading</p>
    } 

    return (
        <Container>
            <TitleBox>Предпросмотр игрового поля</TitleBox>
            <Board
                data={{size: 10}}
                currentCell={selectedCell}
                setCurrentCell={setSelectedCell}
            />
            <NavContainer></NavContainer>
            <SidebarContainer>a</SidebarContainer>
        </Container>
    )
}

export default Game