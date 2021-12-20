import { DefaultTheme } from 'styled-components'
import base from './base'
import { AllColors } from './colors'

const baseTheme: DefaultTheme = {
  ...base,
  colors: AllColors,
}

export default baseTheme
