import { NavText, SubText } from "../styles/TextStyles"
import { GiftContainer, UserGiftMain, UserGiftStripe, AbsoluteWindow, ActivationCodePopup } from "../styles/Profile"
import { PrizeInfo } from "../pages/profile/Index"
import { MouseEventHandler, useState } from "react"
import { Header4 } from "../styles/TextStyles"
import Button from "./Button"
import { PrependBackendURI } from "../utils"


function UserPrizeCard({ title, text, activation_code, image }: PrizeInfo) {
    const [ isPopupShowing, setIsPopupShowing ] = useState(false)

    function hidePopup(e: any) {
        e.stopPropagation()
        setIsPopupShowing(false)
    }

    return (
        <GiftContainer onClick={() => setIsPopupShowing(true)}>
            {isPopupShowing && 
                <AbsoluteWindow>
                    <ActivationCodePopup>
                        <Header4>Код активации подарка</Header4>
                        <img src={PrependBackendURI(image)} alt="" />
                        <p>{activation_code}</p>
                        <Button $color="black" onClick={hidePopup}>Закрыть</Button>
                    </ActivationCodePopup>
                </AbsoluteWindow>
            }

            <UserGiftMain $background={image && PrependBackendURI(image)}>
                <NavText>{title}</NavText>
                <SubText>{text}</SubText>
            </UserGiftMain>
            <UserGiftStripe/>
        </GiftContainer>
    )
}

export default UserPrizeCard