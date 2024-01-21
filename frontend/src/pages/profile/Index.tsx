import { useEffect, useState } from "react"
import api from "../../api/api"

interface PrizeInfo {
    id: number,
    title: string,
    description: string,
    content: string,
} 


function Index() {
    const [data, setData] = useState<PrizeInfo[]>()

    useEffect(() => {
        (async () => {
            try {
                const prizes = await api.get("user/prizes/")
                console.log(prizes)
                setData(prizes.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    if (!data) {
        return <p>Loading</p>
    }

    return (
        <div>
            <p>Призы:</p>
            {data.map(el => <p key={el.id}>{el.title}</p>)}
        </div>
    )
}

export default Index