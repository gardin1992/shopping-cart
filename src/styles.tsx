import { createGlobalStyle } from 'styled-components'

import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
};

const GlobalStyle = createGlobalStyle<{whiteColor: string}>`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`

export default GlobalStyle;