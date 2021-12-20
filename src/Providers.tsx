import React from 'react'
import { ModalProvider, light } from '@pancakeswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { getLibrary } from 'utils/web3React'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'
import baseTheme from 'style/theme/baseTheme'

const mergeThemes = (theme1, theme2) => {
  const mergedTheme = { ...theme1, ...theme2 }
  return mergedTheme
}
const ThemeProviderWrapper = (props) => {
  return <ThemeProvider theme={mergeThemes(light, baseTheme)} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
