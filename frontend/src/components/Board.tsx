import { Dispatch, ReactElement, SetStateAction, useCallback, useMemo } from "react";
import { BoardContainer, Cell } from "../styles/GamePage"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
import { CellObject } from "../types/responses";

type Cell = CellObject & { background: "ship" | "miss" | "cross" | null }

interface BoardData {
    size: number;
    cells: Cell[] | undefined;
}

interface BoardProps {
    data: BoardData,
    currentCell: string | null,
    setCurrentCell: Dispatch<SetStateAction<string>>,
}


function convertToXY(cell: string) {
    const xPos = alphabet.indexOf(cell.charAt(0))
    const yPos = parseInt(cell.slice(1))
    return [ xPos, yPos ]
}


function generateInitialBoard(size: number, setCurrentCell, currentCell) {
    const board: Array<Array<ReactElement>> = Array(size).fill(undefined).map(() => [])

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const letter = alphabet[i]
            const position = `${letter}${j}`
            
            board[i].push(
                <Cell
                    key={position}
                    onClick={() => setCurrentCell(position)}
                    $selected={currentCell === position}
                >
                    {letter}{j}
                </Cell>
            )
        }
    }
    
    return board
}


export default function Board(
    { data, currentCell, setCurrentCell }: BoardProps
) {

    const cells = generateInitialBoard(data.size, setCurrentCell, currentCell)

    data.cells?.forEach((cell) => {
        const [ x, y ] = convertToXY(cell.position)
        cells[x][y] = (
            <Cell
                key={cell.id}
                $selected={currentCell === cell.position}
                $background={cell.background}
                onClick={() => setCurrentCell(cell.position)}
            >
                {cell.position}
            </Cell>
        )
    })

    return (
        <BoardContainer $size={data.size}>
            {cells}
        </BoardContainer>
    )
}