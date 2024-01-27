import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { GameData } from "../../types/responses"
import get_initial_data from "../../api/gamedata"

import {
    Container,
    NavContainer,
    TitleBox,
    SidebarContainer,
} from "../../styles/GamePage"
import Board from "../../components/Board"
import { NavLink } from "react-router-dom"

// Icons
import info_filled from "../../assets/svg/info_filled.svg"
import players_filled from "../../assets/svg/users_filled.svg"
import prizes_filled from "../../assets/svg/gift_filled.svg"
import log_filled from "../../assets/svg/document_filled.svg"

import info_empty from "../../assets/svg/info_empty.svg"
import players_empty from "../../assets/svg/users_empty.svg"
import prizes_empty from "../../assets/svg/gift_empty.svg"
import log_empty from "../../assets/svg/document_empty.svg"

export interface OutletContextType {
    selectedCell: string,
    gameData: GameData,
}

function getCellBackground(cell: CellObject): "miss" | "cross" | "ship" | null {
    switch (cell.status) {
        case 1:
            return "miss"
        case 2:
            return "ship"
        case 3:
            return "cross"
        default:
            return null
    }
}

function Game() {
    const parameters = useParams()
    const navigate = useNavigate()
    const [ gameData, setGameData ] = useState<GameData | null>(null)
    const [ selectedCell, setSelectedCell ] = useState<string>("A0")

    useEffect(() => {
        (async () => {
            const data = await get_initial_data(parameters.hash!)
            if (data.status === "success") {
                if (data.content.cells) {
                    const newCells = data.content?.cells.map(el => (
                        {...el, background: getCellBackground(el)}
                    ))
                    setGameData({...data.content, cells: newCells})
                } else {
                    setGameData(data.content)
                }
            } else {
                throw new Error(data.content)
            }
        })()
    }, [])

    console.log(gameData)

    useEffect(() => {
        navigate("ships", { replace: true })
    }, [selectedCell])

    if (!gameData) {
        return <p>Loading</p>
    } 

    return (
        <Container>
            <TitleBox>Предпросмотр игрового поля</TitleBox>
            <Board
                data={{size: gameData.size, cells: gameData.cells}}
                currentCell={selectedCell}
                setCurrentCell={setSelectedCell}
            />
            <NavContainer>
                <NavLink end to="" replace>
                    {({ isActive }) => (
                        <img src={isActive ? info_filled : info_empty} alt="info-link" />
                    )}
                </NavLink>
                <NavLink to="players" replace>
                    {({ isActive }) => (
                        <img src={isActive ? players_filled : players_empty} alt="info-link" />
                    )}
                </NavLink>
                <NavLink to="ships" replace>
                    {({ isActive }) => (
                        <img src={isActive ? prizes_filled : prizes_empty} alt="info-link" />
                    )}
                </NavLink>
                <NavLink to="log" replace>
                    {({ isActive }) => (
                        <img src={isActive ? log_filled : log_empty} alt="info-link" />
                    )}
                </NavLink>
            </NavContainer>
            <SidebarContainer>
                {!!gameData && <Outlet context={{selectedCell, gameData}}/>}
            </SidebarContainer>
        </Container>
    )
}

export default Game