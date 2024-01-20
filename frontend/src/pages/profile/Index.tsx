import { useLoaderData } from "react-router-dom"
import getUserPrizes from "../../api/getUserPrizes.ts";
import {UserPrize} from "../../types/userData.ts";

export async function loader() {
    const data = await getUserPrizes()
    return data.content
}


function Index() {
    const data = useLoaderData() as UserPrize[]

    return (
        <div>
            <p>Призы:</p>
            {data.map(el => <p key={el.id}>{el.title}</p>)}
        </div>
    )
}

export default Index