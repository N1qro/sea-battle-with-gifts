import { useNavigate, useOutletContext } from "react-router-dom"
import { GameData } from "../../types/responses"
import delete_game from "../../api/deletegame"
import Button from "../../components/Button"

function GameInfo() {
	const { gameData, selectedCell } = useOutletContext<{selectedCell : string, gameData: GameData}>()
	const navigate = useNavigate()

	const statuses = [
		"Не видна пользователям",
		"Активна, ждёт пользователей",
		"Идёт игра",
		"Игра завершена"
	]

	function deleteGame(e) {
		(async () => {
			const data = await delete_game(gameData.link)
			navigate("/admin", { replace: true })
		})()
	}

    return (
      	<div>
			<p>Название игры: {gameData.title}</p>
			<p>Описание игры: {gameData.text}</p>
			<p>Размерность поля: {gameData.size}x{gameData.size}</p>
			<p>Статус игры: {statuses[gameData.status]}</p>
			<p>Количество занятых клеток: {gameData.cells?.length || 0}</p>
			<Button onClick={deleteGame} $color="red">Удалить игру</Button>
		</div>
    )
}

export default GameInfo