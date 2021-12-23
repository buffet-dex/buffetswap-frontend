import { BoxProps } from '@pancakeswap/uikit'
import { DropdownMenuItems } from '../BottomNav/DropdownMenu/types'

export type MenuItemsType = {
  label: string
  href: string
  icon?: string
  items?: DropdownMenuItems[]
  showOnMobile?: boolean
  showItemsOnMobile?: boolean
}

export interface MenuItemsProps extends BoxProps {
  items: MenuItemsType[]
  activeItem?: string
  activeSubItem?: string
}
