import { styled } from "styled-components";
import { NavText } from "./TextStyles";

export const ProfileBackground = styled.div`
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-template-rows: 1fr;

    min-height: 600px;
    padding: 20px 40px;
    border-radius: 31px;
    border: 6px solid #FFF;
    color: black;
    background: #BDCAEA;

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

