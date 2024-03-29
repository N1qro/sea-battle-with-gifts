import styled from "styled-components";
import { navtext_style } from "../styles/TextStyles"
import { Link } from "react-router-dom";

const Input = styled.input`
    ${navtext_style}

    border-radius: 7px;
    border: 2px solid #000;
    background: #D9D9D9;
    min-height: 35px;
    padding: 0 5px;
`

export const TextArea = styled.textarea`
    ${navtext_style}

    border-radius: 7px;
    border: 2px solid #000;
    background: #D9D9D9;
    min-height: 100px;
    padding: 0 5px;
`

export const RedirectLink = styled(Link)`
    color: blue;
    text-decoration: underline;
`

export default Input