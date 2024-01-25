import { Dispatch, SetStateAction } from "react";
import { BoardContainer, Cell } from "../styles/GamePage"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
import { CellObject } from "../types/responses";

interface BoardData {
    size: number;
    cells: CellObject[] | undefined;
}

interface BoardProps {
    data: BoardData,
    currentCell: string | null,
    setCurrentCell: Dispatch<SetStateAction<string | null>>,
}


export default function Board(
    { data, currentCell, setCurrentCell }: BoardProps
) {
    let cells = []
    for (let i = 0; i < data.size; i++) {
        for (let j = 0; j < data.size; j++) {
            let content;
            const letter = alphabet[data.size - 1 - i]
            if (i === data.size - 1 && j === 0) {
                // Левая нижняя клетка
                content = `${letter} ${j}`
            } else if(j === 0) {
                // Левый ряд
                content = letter
            } else if (i === data.size - 1) {
                // Нижний ряд
                content = j
            }

            cells.push(
                <Cell
                    key={i * data.size + j}
                    onClick={() => setCurrentCell(`${letter}${j}`)}
                    $selected={currentCell === `${letter}${j}`}
                >{content}</Cell>
            )
        }
    }

    return (
        <BoardContainer $size={data.size}>
            {cells}
        </BoardContainer>
    )
}