import { createGlobalStyle } from "styled-components";
import BackgroundPattern from "../assets/bg-pattern.svg"


const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --blue-color-1: 46, 82, 167;
        --blue-color-2: 189, 202, 234;
    }

    body {
        color: white;
        font-family: "Inter", sans-serif;
        line-height: normal;
        min-height: 100vh;

        background-image: url(${BackgroundPattern}), linear-gradient(180deg, #5D85EB 0%, #102E7B 100%);
        background-size: 2rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    a.active {
        font-weight: bold;
    }

    #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        max-width: 1066px;
        margin-inline: auto;
        gap: 1rem;
    }
`

export default GlobalStyles