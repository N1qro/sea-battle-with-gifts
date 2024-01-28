import { useEffect, useState } from "react"
import { Header4, Header5, SubText } from "../../styles/TextStyles"
import get_invites from "../../api/getinvitations"
import TargetIcon from "../../assets/svg/target.svg"
import { Invitation, InvitationPage, InvitationsContainer } from "../../styles/Profile"
import { FlexRow } from "../../styles/GlobalStyles"
import Button from "../../components/Button"
import { Link, useNavigate } from "react-router-dom"


interface InviteData {
    id: number,
    link: string,
    shots: number,
    text: string,
    title: string,
}


function GameInvitations() {
    const [ invites, setInvites ] = useState<InviteData[] | null>()
    const [ error, setError ] = useState({})

    useEffect(() => {
        (async () => {
            const data = await get_invites()
            if (data.status === "success") {
                setInvites(data.content)
            } else {
                setError(data.content)
            }
        })()
    }, [])

    const invitations = invites?.map(el => {
        return (
            <Invitation>
                <div>
                    <p>{el.title}</p>
                    <p>{el.text}</p>
                </div>
                <FlexRow>
                    <img src={TargetIcon} alt="amount-of-shots" />
                    <p>{el.shots}</p>
                </FlexRow>
                <Button
                    as={Link}
                    to={`/game/${el.link}`}
                    $color="green"
                >Перейти</Button>
            </Invitation>
        )
    })

    return (
        <InvitationPage>
            <Header4>Приглашения на игру</Header4>
            <SubText>Дождитесь приглашения от администратора</SubText>
    
            {!!invitations ?
                <InvitationsContainer>
                    {invitations}
                </InvitationsContainer>
                :
                <Header5>У вас ещё нет приглашений</Header5>
            }
            {!!error && <div>
                {Object.values(error).map(err => <p>{err}</p>)}
            </div>}
        </InvitationPage>
    )
}

export default GameInvitations