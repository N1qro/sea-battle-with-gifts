import { styled } from "styled-components";
import { Header5, NavText, RegularText } from "./TextStyles";
import { PlayerCard } from "./GamePage";
import { FlexRow } from "./GlobalStyles";
import Button from "../components/Button";
import Input from "./InputElement";

export const ProfileBackground = styled.div`
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-template-rows: 1fr;

    margin-block: auto;
    height: 60vh;
    padding: 20px 40px;
    border-radius: 31px;
    border: 6px solid #FFF;
    color: black;
    background: #BDCAEA;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

    ${NavText} {
        font-weight: 500;
    }

    &>div:first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        border-right: 1px solid black;
    }

    & nav > a {
        display: block;
    }

    & nav > a.active {
        font-weight: 600;
    }
`


export const GiftContainer = styled.div`
    color: white;
    font-weight: 300;
    margin: auto;
    width: 250px;
    height: 150px;
`

export const UserGiftMain = styled.div<{$background?: string | null}>`
    padding: 10px;
    height: 80%;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
    background: url(${props => props.$background}), linear-gradient(180deg, rgba(79, 126, 237, 0.50) 0%, #3867D6 100%);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
`

export const UserGiftStripe = styled.div`
    width: 100%;
    height: 20%;
    border-radius: 0 0 10px 10px;
    background: #102E7B;
`

export const AbsoluteWindow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #256aa760;
    position: fixed;
`

export const PrizeAward = styled(AbsoluteWindow)`
    animation: 1s ease-in-out 0s 1 normal none running changeColor;
    animation-fill-mode: forwards;
    @keyframes changeColor {
        0% {background-color: transparent;}
        100% {background-color: #287dc8af;}
    }
`


export const ActivationCodePopup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 2rem;
    border-radius: 20px;
    background-color: #2172e3c3;
    
    img {
        max-height: 300px;
        margin-bottom: 1rem;
    }
    
    ${RegularText}:first-of-type {
        margin-bottom: 1rem;
        max-height: 400px;
        overflow-y: auto;
    } 

    ${Input} {
        margin-bottom: 1rem;
    }
`

export const GiftGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    max-height: 450px;
    overflow-y: auto;
    grid-auto-rows: 160px;
    grid-auto-flow: row;
`

export const GiftSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${GiftGrid} {
        margin-top: 1rem;
        width: 100%;
    }

    ${Header5} {
        margin-top: 1rem;
    }
`

export const CredentialContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const InvitationPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 2.5rem;
`

export const InvitationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    height: 400px;
    overflow-y: auto;
    width: 85%;
    margin-top: 1rem;
`

export const Invitation = styled(PlayerCard)`
    justify-content: start;
    color: white;

    :nth-child(2) {
        margin-left: auto;
    }

    ${FlexRow} {
        gap: 0.5rem;
    }
`

export const PrizeAwardWindow = styled(ActivationCodePopup)`
    color: white;
    text-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.5);
    border: 5px solid white;

    img {
        max-height: 400px;
    }

    ${FlexRow} {
        gap: 1rem;
    }

    ${Button} {
        margin-top: 3rem;
    }
`