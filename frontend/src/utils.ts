import { Dispatch, SetStateAction } from "react";
import get_initial_data from "./api/gamedata";
import { CellObject, GameData } from "./types/responses";

export function ValidateEmail(email: string) {
    const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return EmailRegex.test(email.toLowerCase())
}


export function PrependBackendURI(url: string) {
    const BackendURL = "http://127.0.0.1:8000"
    return `${BackendURL}${url}`
}


export function getCellBackground(cell: CellObject): "miss" | "cross" | "ship" | null {
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


export function processCells(cells: CellObject[]) {
    return cells.map(el => (
        {...el, background: getCellBackground(el)}
    ))
} 


export async function fetchGameData(hash: string, setFunction: Dispatch<SetStateAction<GameData | null>>) {
    const data = await get_initial_data(hash)

    if (data.status === "success") {
        if (data.content.cells) {
            const newCells = processCells(data.content?.cells)
            setFunction({...data.content, cells: newCells})
        } else {
            setFunction(data.content)
        }
    } else {
        throw new Error(data.content)
    }
}
