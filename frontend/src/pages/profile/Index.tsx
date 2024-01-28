import { useEffect, useState } from "react"
import api from "../../api/api"
import UserPrizeCard from "../../components/UserPrizeCard"
import { Header4, Header5, RegularText, SubText } from "../../styles/TextStyles"
import { GiftGrid, GiftSection } from "../../styles/Profile"


export interface PrizeInfo {
    id: number,
    title: string,
    text: string,
    winner: null | number,
    image: string | null,
    activation_code: string,
} 


function Index() {
    const [data, setData] = useState<PrizeInfo[]>()

    useEffect(() => {
        (async () => {
            try {
                const prizes = await api.get("user/prizes/")
                setData(prizes.data)
            } catch (err) {
                console.warn(err)
            }
        })()
    }, [])

    if (!data) {
        return <p>Loading</p>
    }

    return (
        <GiftSection>
            <Header4>Доступные призы</Header4>
            <SubText>Чтобы узнать код активации, нажмите на карточку</SubText>

            {data.length > 0 ?
                <GiftGrid>
                    {data.map(el => <UserPrizeCard {...el} key={el.id} />)}
                </GiftGrid> :
                <Header5>Вы ещё не получили ни одного подарка</Header5>
            }
        </GiftSection>
    )
}

export default Index