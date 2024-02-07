import styled from "styled-components";
import { RegularText } from "./TextStyles";

export const Container = styled.div`
    
`

export const SectionBackground = styled.div`
    border-radius: 19px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const SectionTransparentBackground = styled.div`
    border-radius: 19px;
    background: rgba(217, 217, 217, 0.50);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const MarginSection = styled.section`
    margin-block: 2rem;
`

export const Card = styled.div`
    color: black;
    padding: 20px 30px;
    text-align: center;
    background-color: #D9D9D9;
    border-radius: 19px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
`

export const AttentionTitle = styled.h1`
    font-size: 2.5rem;
    background: linear-gradient(to right, #121FCF 0%, #CF1512 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const Grid2Row = styled.div`
    & > ${Card} {
        display: flex;
        align-items: center;
    };

    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    grid-template-rows: minmax(300px, 1fr);
`