import { useState } from "react"

function Home() {
  const [ likeAmount, setLikeAmount ] = useState(0)

  return (
    <div>
      <h2>Будем отталкиваться от этого =)</h2>
      <p>Я пока просто структуру проекта задал и роутер подключил =p</p>
      <p>Количество 👍 - {likeAmount}</p>
      <button
        onClick={() => setLikeAmount(prev => prev + 1)}
      >Поставить лайк</button>
    </div>
  )
}

export default Home