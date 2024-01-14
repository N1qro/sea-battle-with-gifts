import styled from "styled-components";
import Button from "../components/Button";
import Input from "./InputElement";

const StyledForm = styled.form`
    color: black;
    border-radius: 24px;
    border: 7px solid #4F42E7;
    background: #FFF;
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.25);
    padding: 22px 76px;
    width: fit-content;
    gap: 1rem;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    margin-inline: auto;
    margin-block: auto;

    ${Button} {
        margin-top: 1rem;
    }

    ${Button}, ${Input}, hr {
        width: 100%;
    }
`

export const FormError = styled.p`
    color: red;
`

export const FieldWrapper = styled.div`
    width: 284px;
`

export const OneRow = styled(FieldWrapper)`
    width: 284px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1rem;

`

export default StyledForm
