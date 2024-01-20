import styled from "styled-components";
import { NavText, SubText } from "./TextStyles";
import Button from "../components/Button";
import StyledForm from "./StyledForm";

interface IndicatorProps {
    $color?: string;
}

export const Indicator = styled.span<IndicatorProps>`
    display: inline-block;
    width: 25px;
    height: 25px;
    background-color: ${props => props.$color};
`

Indicator.defaultProps = {
    "$color": "gray"
}

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.25);
`

export const ActiveGames = styled(FlexColumn)`
    border-radius: 20px 0px 0px 0px;
    background: rgb(var(--blue-color-2));
    grid-area: active;
`

export const BoardCreation = styled(FlexColumn)`
    border-radius: 0px 20px 20px 0px;
    background: rgb(var(--blue-color-2));
    grid-area: create;

    ${StyledForm} {
        box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.25);
        background: inherit;
        border: inherit;
    }
`

export const GameHistory = styled(FlexColumn)`
    border-radius: 0px 0px 0px 20px;
    background: rgb(var(--blue-color-2));
    grid-area: history;

    ${Button} {
        width: fit-content;
        margin-inline: auto;
    }
`

export const GridContainer = styled.div`
    display: grid;
    gap: 1rem;
    height: 70vh;
    margin-block: auto;
    color: black;

    > div {
        padding: 22px 25px;
    }

    ${NavText}, ${SubText} {
        text-align: center;
    }

    grid-template-areas:
        "active active active create create"
        "active active active create create"
        "active active active create create"
        "active active active create create"
        "history history history create create";
`
