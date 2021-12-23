import { DropdownMenuItemType } from '@pancakeswap/uikit'
import { noop } from 'lodash'
import { Colors } from 'style/theme/types'

export type MenuItemsType = {
  label: string
  href: string
  icon?: string
  items?: DropdownMenuItems[]
  showOnMobile?: boolean
  showItemsOnMobile?: boolean
}
interface LinkStatus {
  text: string
  color: keyof Colors
}
interface DropdownMenuItems {
  label?: string | React.ReactNode
  href?: string
  onClick?: () => void
  type?: DropdownMenuItemType
  status?: LinkStatus
  disabled?: boolean
  iconName?: string
  isMobileOnly?: boolean
}
const ItemsMock: DropdownMenuItems[] = [
  {
    label: 'Exchange',
    href: '/swap',
  },
  {
    label: 'Liquidity',
    href: '/pool',
  },
  {
    label: 'LP Migration',
    href: 'https://v1exchange.pancakeswap.finance/#/migrate',
    type: DropdownMenuItemType.EXTERNAL_LINK,
  },
  {
    type: DropdownMenuItemType.DIVIDER,
  },
  {
    label: 'Disconnect',
    onClick: noop,
    type: DropdownMenuItemType.BUTTON,
  },
]

const MenuItemsMock: MenuItemsType[] = [
  {
    label: 'Swap',
    href: '/swap',
    icon: 'Swap',
    items: ItemsMock,
    showItemsOnMobile: false,
  },
  {
    label: 'Earn',
    href: '/earn',
    icon: 'Earn',
    items: ItemsMock,
    showItemsOnMobile: true,
  },
  {
    label: 'Gagnez des jetons',
    href: '/win',
    icon: 'Trophy',
    items: ItemsMock,
    showItemsOnMobile: true,
  },
  {
    label: 'NFT',
    href: '/nft',
    icon: 'Nft',
    items: ItemsMock,
  },
  {
    label: 'More',
    href: '/more',
    icon: 'More',
    items: ItemsMock,
    showItemsOnMobile: true,
  },
]

export default MenuItemsMock
