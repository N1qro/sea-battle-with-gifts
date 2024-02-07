import styled from "styled-components";
import StyledForm from "./StyledForm";
import { Header4 } from "./TextStyles";


export const CellInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    // Editor component
    .rsw-ce {
        overflow-y: auto;
        max-height: 200px;
        background-color: white;
    }

    ${Header4}:first-of-type {
        font-size: 1.95rem;
    }

    ${StyledForm} {
        padding: 0;
        background: inherit;
        border: none;
        width: 100%;
        box-shadow: none;
        margin-top: auto;
    }
`