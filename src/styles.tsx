import { createGlobalStyle } from 'styled-components'

import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    primary: '#7F7F7F',
    secondary: '#58555A',
    alert: '#FBF37C',    
    black: '#000',
    white: '#fff',
  }
}

const GlobalStyle = createGlobalStyle<{whiteColor: string}>`
  body,
  html,
  body * {
    margin: 0;
    box-sizing: border-box;
    
  }

  html, * {
    font-family: 'Roboto', sans-serif !important;
  }

  svg {
    height: 24px;
    width: 24px;

  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .fluid {
    width: 1070px;
    margin: 0 auto;
  }
`

export default GlobalStyle;