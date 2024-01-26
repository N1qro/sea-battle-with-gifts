import { AxiosError } from "axios";
import api from "./api";
import { GameData } from "../types/responses";

export default async function get_initial_data(hash: string) {
    try {
        const response = await api.get<GameData>(`/game/${hash}`)
        console.log(response.headers)
        return {
            "status": "success",
            "content": response.data,
        }
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            return {
                "status": "error",
                "content": err.response.data,
            }
        } else {
            throw err
        }
    }
}
