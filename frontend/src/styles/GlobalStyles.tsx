import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --blue-color-1: 46, 82, 167;
    }

    body {
        font-family: "Inter", sans-serif;
        line-height: normal;   

        min-height: 100vh;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        width: 1066px;
        margin-inline: auto;
        gap: 1rem;
    }
`

export default GlobalStyles