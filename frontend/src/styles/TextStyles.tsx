import styled, { css } from "styled-components";


export const navtext_style = css`
    font-family: Inter, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -1px;
`

export const subtext_style = css`
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const h3_style = css`
    font-family: Outfit, sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const Header3 = styled.h3`${h3_style}`
export const SubText = styled.p`${subtext_style}`
export const NavText = styled.p`${navtext_style}`