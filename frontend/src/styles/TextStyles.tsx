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

export const regular_style = css`
    font-family: Inter;
    font-size: 20px;
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

export const h4_style = css`
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const h5_style = css`
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`


export const Header3 = styled.h3`${h3_style}`
export const Header4 = styled.h4`${h4_style}`
export const Header5 = styled.h5`${h5_style}`
export const SubText = styled.p`${subtext_style}`
export const NavText = styled.p`${navtext_style}`
export const RegularText = styled.p`${regular_style}`