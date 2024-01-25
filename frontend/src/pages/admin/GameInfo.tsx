import { useOutletContext } from "react-router-dom"
import { GameData } from "../../types/responses"

function GameInfo() {
	const { gameData, selectedCell } = useOutletContext<{selectedCell : string, gameData: GameData}>()

	const statuses = [
		"Не видна пользователям",
		"Активна, ждёт пользователей",
		"Идёт игра",
		"Игра завершена"
	]

    return (
      	<div>
			<p>Название игры: {gameData.title}</p>
			<p>Описание игры: {gameData.text}</p>
			<p>Размерность поля: {gameData.size}x{gameData.size}</p>
			<p>Статус игры: {statuses[gameData.status]}</p>
			<p>Количество занятых клеток: {gameData.cells?.length || 0}</p>
		</div>
    )
}

export default GameInfo