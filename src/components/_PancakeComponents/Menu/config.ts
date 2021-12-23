import { noop } from 'lodash'
import { LinkStatus } from './types'

export const status = {
  LIVE: <LinkStatus>{
    text: 'LIVE',
    color: 'failure',
  },
  SOON: <LinkStatus>{
    text: 'SOON',
    color: 'warning',
  },
  NEW: <LinkStatus>{
    text: 'NEW',
    color: 'success',
  },
}

// DropdownMenu type from pancake/uikit

export enum DropdownMenuItemType {
  INTERNAL_LINK,
  EXTERNAL_LINK,
  BUTTON,
  DIVIDER,
}

export interface DropdownMenuItems {
  label?: string | React.ReactNode
  href?: string
  onClick?: () => void
  type?: DropdownMenuItemType
  status?: LinkStatus
  disabled?: boolean
  iconName?: string
  isMobileOnly?: boolean
}
// MenuItems type from pancake/uikit

export type MenuItemsType = {
  label: string
  href: string
  icon?: string
  items?: DropdownMenuItems[]
  showOnMobile?: boolean
  showItemsOnMobile?: boolean
}

export const links: MenuItemsType[] = [
  {
    label: 'Trade',
    href: '/swap',
    icon: 'Swap',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.pancakeswap.finance',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/pool',
      },
      {
        label: 'Charts',
        href: 'https://exchange.pancakeswap.finance/#/charts',
        iconName: 'Chart',
        isMobileOnly: true,
      },
    ],
  },
  {
    label: 'Earn',
    href: '/',
    icon: 'Earn',
    items: [
      {
        label: 'Earn',
        href: '/',
      },
      {
        label: 'Yield Farms',
        href: '/',
      },
      {
        label: 'Syrup pools',
        href: '/',
      },
    ],
  },
  {
    label: 'Win',
    href: '/',
    icon: 'Trophy',
    items: [
      {
        label: 'Win',
        href: '/',
      },
      {
        label: 'Predictions',
        href: '/',
        status: status.LIVE,
      },
      {
        label: 'Lottery',
        href: '/',
      },
    ],
  },
  {
    label: '',
    href: '/',
    icon: 'More',
    items: [
      {
        label: 'Info & Analytics',
        href: '/',
      },
      {
        label: 'IFO Token Sales',
        href: '/',
        status: status.SOON,
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: 'NFT Collectibles',
        href: '/',
      },
      {
        label: 'Team Leaderboard',
        href: '/',
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: 'Blog',
        href: '/',
      },
      {
        label: 'Docs & Guides',
        href: '/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export const userMenulinks: DropdownMenuItems[] = [
  {
    label: 'Wallet',
    onClick: noop,
    type: DropdownMenuItemType.BUTTON,
  },
  {
    label: 'Transactions',
    type: DropdownMenuItemType.BUTTON,
  },
  {
    type: DropdownMenuItemType.DIVIDER,
  },
  {
    type: DropdownMenuItemType.BUTTON,
    disabled: true,
    label: 'Dashboard',
  },
  {
    type: DropdownMenuItemType.BUTTON,
    disabled: true,
    label: 'Portfolio',
  },
  {
    label: 'Profile',
    href: '/profile',
  },
  {
    type: DropdownMenuItemType.EXTERNAL_LINK,
    href: 'https://pancakeswap.finance',
    label: 'Link',
  },
  {
    type: DropdownMenuItemType.DIVIDER,
  },
  {
    type: DropdownMenuItemType.BUTTON,
    onClick: noop,
    label: 'Disconnect',
  },
]

export const MENU_HEIGHT = 56
export const MENU_ENTRY_HEIGHT = 48
export const MOBILE_MENU_HEIGHT = 44
export const SIDEBAR_WIDTH_FULL = 240
export const SIDEBAR_WIDTH_REDUCED = 56
export const TOP_BANNER_HEIGHT = 70
export const TOP_BANNER_HEIGHT_MOBILE = 84
