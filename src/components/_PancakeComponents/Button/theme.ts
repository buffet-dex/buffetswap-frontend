import { AllColors } from 'style/theme/colors'
import { scales, variants } from './types'

export const scaleVariants = {
  [scales.LG]: {
    height: '71px',
    padding: '128px',
  },
  [scales.MD]: {
    height: '55px',
    padding: '0 32px',
  },
  [scales.SM]: {
    height: '47px',
    padding: '0 24px',
  },
  [scales.XS]: {
    height: '26px',
    fontSize: '14px',
    padding: '4px 12px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    background: `${AllColors.secondary}`,
    color: 'white',
  },
  [variants.SECONDARY]: {
    boxShadow: 'none',
    position: 'relative',
    ':disabled': {
      backgroundColor: 'transparent',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '16px',
      padding: '3px',
      background: `${AllColors.secondary}`,
      '-webkit-mask': 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
      '-webkit-mask-composite': 'destination-out',
      'mask-composite': 'exclude',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'tertiary',
    boxShadow: 'none',
    color: 'primary',
  },
  [variants.SUBTLE]: {
    backgroundColor: 'textSubtle',
    color: 'backgroundAlt',
  },
  [variants.DANGER]: {
    backgroundColor: 'failure',
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: 'none',
  },
  [variants.LIGHT]: {
    backgroundColor: 'input',
    color: 'textSubtle',
    boxShadow: 'none',
  },
}
