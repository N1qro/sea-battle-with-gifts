import { useParams } from "react-router-dom"

function Game() {
    const parameters = useParams()

    return (
        <div>Game ({parameters.hash})</div>
    )
}

export default Game