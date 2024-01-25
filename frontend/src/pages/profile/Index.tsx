import { useEffect, useState } from "react"
import api from "../../api/api"
import UserPrizeCard from "../../components/UserPrizeCard"
import { Header4, SubText } from "../../styles/TextStyles"
import { GiftGrid, GiftSection } from "../../styles/Profile"


export interface PrizeInfo {
    id: number,
    title: string,
    text: string,
    activation_code: string,
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

    console.log(data)

    return (
        <GiftSection>
            <Header4>Доступные призы</Header4>
            <SubText>Чтобы узнать код активации, нажмите на карточку</SubText>

            <GiftGrid>
                {data.map(el => <UserPrizeCard {...el} key={el.id} />)}
            </GiftGrid>
        </GiftSection>
    )
}

export default Index