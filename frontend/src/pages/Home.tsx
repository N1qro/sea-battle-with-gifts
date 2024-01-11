import { useState } from "react"
import Button from "../components/Button"

function Home() {
  const [ likeAmount, setLikeAmount ] = useState(0)

  return (
    <div>
      <h2>Будем отталкиваться от этого =)</h2>
      <p>Я пока просто структуру проекта задал и роутер подключил =p</p>
      <p>Количество 👍 - {likeAmount}</p>
      <Button
        $color="green"
        onClick={() => setLikeAmount(prev => prev + 1)}
      >Поставить лайк</Button>
    </div>
  )
}

export default Home