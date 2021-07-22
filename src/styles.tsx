import { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    primary: '#7F7F7F',
    secondary: '#58555A',
    alert: '#FBF37C',  
    danger: '#bd3838',
    black: '#000',
    white: '#fff',
  }
}

const GlobalStyle = createGlobalStyle`
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

  h2 {
    font-size: 18px;
    color: ${theme.colors.secondary};
    margin: 50px 0 30px;
  }
`

export default GlobalStyle;