import { useState } from "react"
import Button from "../components/Button"
import api from "../api/api"

function Home() {
	const [ response, setResponse ] = useState<Array<null> | undefined>()

	function handleClick() {
		async function makeRequest() {
			try {
				const data = await api.get("user/prizes/")
				setResponse(data.data)
			} catch (err) {
				console.log(err)
			}
		}
		makeRequest()
	}

	return (
		<div>
			<h2>Будем отталкиваться от этого =)</h2>
			<Button
				$color="green"
				onClick={handleClick}
			>Тест запроса на бек с авторизацией</Button>
			{ (response instanceof Array) && <p>Received!</p> }
		</div>
	)
}

export default Home