import { useOutletContext } from "react-router-dom"

function CellInfo() {
    const data = useOutletContext()

    return (
        <div>CellInfo ({data.selectedCell})</div>
    )
}

export default CellInfo