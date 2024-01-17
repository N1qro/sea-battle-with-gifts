import { useState } from "react"
import Button from "../components/Button"
import api from "../api/api"

function Home() {
  const [ likeAmount, setLikeAmount ] = useState(0)

  function handleClick() {
    async function makeRequest() {
      const data = await api.get("user/prizes/")

      console.log(data)
      console.log(data.statusText)
    }
    makeRequest()
  }

  return (
    <div>
      <h2>Будем отталкиваться от этого =)</h2>
      <p>Я пока просто структуру проекта задал и роутер подключил =p</p>
      <p>Количество 👍 - {likeAmount}</p>
      <Button
        $color="green"
        onClick={handleClick}
      >Поставить лайк</Button>
    </div>
  )
}

export default Home