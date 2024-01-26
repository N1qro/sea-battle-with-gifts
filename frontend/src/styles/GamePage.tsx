import styled from "styled-components";
import { h4_style } from "./TextStyles";
import gift from "../assets/img/gift.png"
import cross from "../assets/img/cross.png"
import circle from "../assets/img/circle.png"


const mapping = {
    "ship": gift,
    "cross": cross,
    "miss": circle,
}


interface CellProps {
    $selected: boolean;
    $background: keyof typeof mapping | null;
    // ship -> стоит корабль (для админа)
    // cross -> попал в корабль (для юзера)
    // miss -> промах (для юзера)
}


export const Container = styled.div`
    color: black;
    display: grid;
    gap: 1.1rem;
    margin-block: auto;
    grid-template-areas:
        "title nav"
        "board sidebar";

    grid-template-rows: minmax(78px, 1fr) 8fr;
    grid-template-columns: 3fr 2fr;
`

export const TitleBox = styled.div`
    ${h4_style}
    grid-area: title;
    line-height: 78px;
    border-radius: 20px 20px 0px 0px;
    background-color: #BDCAEA;
    text-align: center;
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.25);
`

export const Cell = styled.div<CellProps>`
    background-color: ${props => props.$selected ? "#484ba3" : "#5D61C8"};
    background-image: url(${props => props.$background ? mapping[props.$background] : ""});
    background-position: center center;
    background-size: 70%;
    background-repeat: no-repeat;
    border-radius: 4px;
    padding: 2px;

    &:hover {
        background-color: #484ba3;
    }

    &:active {
        background-color: #5D61C8;
    }
`

export const BoardContainer = styled.div<{$size: number}>`
    display: grid;

    gap: ${props => Math.max(1 - props.$size * 0.1, 0.1)}rem;
    grid-template-columns: repeat(${props => props.$size}, 1fr);
    grid-template-rows: repeat(${props => props.$size}, 1fr);
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.25);

    aspect-ratio: 1 / 1;
    grid-area: board;
    background-color: #BDCAEA;
    padding: 20px;
`

export const NavContainer = styled.nav`
    grid-area: nav;
    background-color: #BDCAEA;
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;

    img {
        max-height: 40px;
        height: 40px;
    }
`

export const SidebarContainer = styled.aside`
    grid-area: sidebar;
    background-color: #BDCAEA;
    padding: 10px;
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.25);
    aspect-ratio: 2 / 3;
`