import { Colors } from '.'

export const baseColors = {
  primary: '#EF5823',
  secondary: 'linear-gradient(79.95deg, #FF623F 3.11%, #FF8C38 52.98%, #FF2F9F 126.12%)',
  third: 'linear-gradient(104.3deg, #FFBB38 -0.54%, #FF2F9F 135.91%)',

  failure: '#ED4B9E',

  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',

  success: '#1FAD7A',
  warning: '#EB4D4D',
}

export const additionalColors = {
  binance: '#F0B90B',
  overlay: '#452a7a',
  gold: '#FFC700',
  silver: '#B2B2B2',
  bronze: '#E7974D',
}

export const AllColors: Colors = {
  ...baseColors,
  ...additionalColors,
  background: '#FAF5F2',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#FFFFFF',
  backgroundAlt2: 'linear-gradient(79.86deg, rgba(255, 98, 63, 0.76) 3.11%, rgba(255, 47, 159, 0.67) 125.94%)',
  cards: '#FFFFFF',
  cardBorder: '#E7E3EB',
  contrast: '#191326',
  danger: '#EB4D4D',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#eeeaf4',
  inputSecondary: '#d7caec',
  tertiary: '#EFF4F5',
  text: '#272727',
  textDisabled: '#BDC2C4',
  textSubtle: '#202020',
  disabled: '#E9EAEB',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  },
}
