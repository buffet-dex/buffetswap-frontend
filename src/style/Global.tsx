import { PancakeTheme } from '@buffet-dex/uikit'
import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
font-family: 'DM Sans', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
