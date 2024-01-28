import { useParams } from "react-router-dom"

function Game() {
    const params = useParams<{ hash: string }>()

    return (
        <div>Game ({params.hash})</div>
    )
}

export default Game