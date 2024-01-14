import { useLoaderData } from "react-router-dom"

interface PrizeInfo {
    id: number,
    title: string,
    description: string,
    content: string,
} 

export async function loader() {
    return new Promise<PrizeInfo[]>((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    "id": 1,
                    "title": "1000 GP | PUBG",
                    "description": "Игровая валюта для Steam игры PUBG",
                    "content": "SUPER-SECRET-GCOIN-ACODE",
                },
                {
                    "id": 2,
                    "title": "12000 GP | PUBG",
                    "description": "Игровая валюта для Steam игры PUBG",
                    "content": "SUPER-SECRET-GCOIN-ACODE",
                },
                {
                    "id": 3,
                    "title": "13500 VB | Fortnite",
                    "description": "Игровая валюта для игры Fortnite",
                    "content": "SUPER-SECRET-VCOIN-ACODE",
                },
                {
                    "id": 4,
                    "title": "5175 VP | VALORANT",
                    "description": "Игровая валюта для игры Valorant",
                    "content": "SUPER-SECRET-VCOIN-ACODE",
                }
            ])
        }, 50) // аля задержка
    })
}


function Index() {
    const data = useLoaderData() as PrizeInfo[]

    return (
        <div>
            <p>Призы:</p>
            {data.map(el => <p key={el.id}>{el.title}</p>)}
        </div>
    )
}

export default Index