import styled from "styled-components";
import { Header4, Header5, NavText, RegularText, SubText } from "./TextStyles";
import Button from "../components/Button";
import StyledForm from "./StyledForm";
import { FlexRow } from "./GlobalStyles";

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

    ${Header5} {
        height: 300px;
        text-align: center;
    }

    p:last-child {
        margin-top: auto;
    }
`

export const GameContainer = styled.nav`
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-block: 1rem;
    overflow-y: auto;
    height: 300px;
    max-height: 300px;
`

export const Game = styled.div<{$isActive: boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 9px;

    border-radius: 10px;
    background: ${props => props.$isActive ? "gray" : "#5B85E9"};
    box-shadow: 0px 1px 6.3px 0px rgba(0, 0, 0, 0.25);

    ${FlexRow} {
        gap: 1rem;
        padding-right: 0.5rem;
    }
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

    ${Button} {
        text-align: center;
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
    height: clamp(100px, 70vh, 100%);
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
