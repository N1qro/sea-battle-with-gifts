import styled from "styled-components";
import { h4_style } from "./TextStyles";

export const Container = styled.div`
    color: black;
    display: grid;
    gap: 1.1rem;
    margin: auto;
    grid-template-areas:
        "title nav"
        "board sidebar";

    grid-template-rows: minmax(78px, 1fr) 8fr;
    grid-template-columns: 3fr 2fr;
`

export const TitleBox = styled.div`
    ${h4_style}
    grid-area: title;
    background-color: #BDCAEA;
    text-align: center;
`

export const Cell = styled.div<{$selected?: boolean}>`
    background-color: ${props => props.$selected ? "#484ba3" : "#5D61C8"};

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

    aspect-ratio: 1 / 1;
    grid-area: board;
    background-color: #BDCAEA;
    padding: 20px;
`

export const NavContainer = styled.nav`
    grid-area: nav;
    background-color: #BDCAEA;
`

export const SidebarContainer = styled.aside`
    grid-area: sidebar;
    background-color: #BDCAEA;
    padding: 10px;
    aspect-ratio: 2 / 3;
`