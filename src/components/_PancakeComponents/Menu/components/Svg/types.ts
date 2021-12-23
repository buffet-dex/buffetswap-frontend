import { SVGAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import { SpaceProps } from 'styled-system'
import { Colors } from 'style/theme/types'

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme
  spin?: boolean
}

export type IconComponentType = {
  iconName: string
  isActive?: boolean
  height?: string
  width?: string
  activeColor?: string
  activeBackgroundColor?: keyof Colors
} & SvgProps
