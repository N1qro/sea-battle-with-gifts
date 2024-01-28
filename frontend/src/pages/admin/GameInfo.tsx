import { useNavigate, useOutletContext } from "react-router-dom"
import { GameData } from "../../types/responses"
import delete_game from "../../api/deletegame"
import Button from "../../components/Button"
import update_game from "../../api/updateGame"
import { OutletContextType } from "./Game"
import { useState } from "react"
import { FormError } from "../../styles/StyledForm"

function GameInfo() {
	const { gameData, refetchData } = useOutletContext<OutletContextType>()
	const [ error, setError ] = useState({})
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

	function changeStatus(e) {
		(async () => {
			const newStatus = gameData.status === 0 ? 1 : 0
			const data = await update_game(gameData.link, {
				status: newStatus,
				text: gameData.text,
				title: gameData.title,
				size: gameData.size,
			})
			if (data.status === "success") {
				refetchData()
			} else {
				setError(data.content)
			}
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

			{(gameData.status === 0 || gameData.status === 1) &&
			 	<Button onClick={changeStatus} $color="blue">
					{gameData.status === 0 ?
						"Опубликовать" :
						"Скрыть"
					}
				</Button>
			}

			{error.details && <FormError>{error.details}</FormError>}
		</div>
    )
}

export default GameInfo