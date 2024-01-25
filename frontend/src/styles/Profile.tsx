import { styled } from "styled-components";
import { NavText } from "./TextStyles";

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

export const UserGiftMain = styled.div`
    padding: 10px;
    height: 80%;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
    background: linear-gradient(180deg, rgba(79, 126, 237, 0.50) 0%, #3867D6 100%);
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

export const ActivationCodePopup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 2rem;
    border-radius: 20px;
    background-color: #2172e3c3;
    width: 500px;
    height: 300px;
`

export const GiftGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    max-height: 500px;
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
`

export const CredentialContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`