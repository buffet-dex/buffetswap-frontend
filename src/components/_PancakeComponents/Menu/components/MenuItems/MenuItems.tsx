import React from 'react'
import { Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import isTouchDevice from './isTouchDevice'
import MenuItem from '../MenuItem'
import { DropdownMenu } from '../BottomNav/DropdownMenu'
import IconComponent from '../Svg/IconComponent'
import { MenuItemsProps } from './types'

export const StyledMenuItemContainer = styled(Flex)`
  gap: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 52px;
  }
`
const MenuItems: React.FC<MenuItemsProps> = ({ items = [], activeItem, activeSubItem, ...props }) => {
  return (
    <StyledMenuItemContainer {...props}>
      {items.map(({ label, items: menuItems = [], href, icon = '' }) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color
        const isActive = activeItem === href
        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href }
        return (
          <DropdownMenu key={`${label}#${href}#${icon}`} items={menuItems} py={1} activeItem={activeSubItem}>
            <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor}>
              {label || <IconComponent iconName={icon} color={isActive ? 'secondary' : 'textSubtle'} />}
            </MenuItem>
          </DropdownMenu>
        )
      })}
    </StyledMenuItemContainer>
  )
}

export default MenuItems
