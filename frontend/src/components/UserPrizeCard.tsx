import { NavText, RegularText, SubText } from "../styles/TextStyles"
import { GiftContainer, UserGiftMain, UserGiftStripe, AbsoluteWindow, ActivationCodePopup } from "../styles/Profile"
import { PrizeInfo } from "../pages/profile/Index"
import { useState } from "react"
import { Header4 } from "../styles/TextStyles"
import Button from "./Button"
import { PrependBackendURI } from "../utils"
import Input from "../styles/InputElement"


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
                        <Header4>{title}</Header4>
                        <RegularText dangerouslySetInnerHTML={{__html: text}} />
                        {image && <img src={PrependBackendURI(image)} alt="" />}
                        <RegularText>Код/ссылка активации:</RegularText>
                        <Input value={activation_code} />
                        <Button $color="black" onClick={hidePopup}>Закрыть</Button>
                    </ActivationCodePopup>
                </AbsoluteWindow>
            }

            <UserGiftMain $background={image && PrependBackendURI(image)}>
                <NavText>{title}</NavText>
                <SubText dangerouslySetInnerHTML={{__html: text}} />
            </UserGiftMain>
            <UserGiftStripe/>
        </GiftContainer>
    )
}

export default UserPrizeCard