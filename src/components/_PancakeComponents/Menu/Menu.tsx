import throttle from 'lodash/throttle'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, SubMenuItems, useMatchBreakpoints, CakePrice, NavProps } from '@pancakeswap/uikit'
import MenuItems from './components/MenuItems'
import BottomNav from './components/BottomNav'
import LangSelector from './components/LangSelector/LangSelector'
import Logo from './components/Logo'
import Footer from './components/Footer'
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from './config'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);
  padding: 0 16px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0 121px 0 191px;
  }
`
const StyledNavContainer = styled(Flex)`
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 1px;
  width: 100%;
`

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background};
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`

const Menu: React.FC<NavProps> = ({
  userMenu,
  banner,
  globalMenu,
  isDark,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  children,
}) => {
  const { isMobile } = useMatchBreakpoints()
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [totalTopMenuHeight])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly)
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly)

  return (
    <Wrapper>
      <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
        {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
        <StyledNav>
          <StyledNavContainer>
            <Flex>
              <Logo isDark={isDark} href={homeLink?.href ?? '/'} />
              {!isMobile && (
                <MenuItems
                  ml={['24px', null, null, '68px', null, null, '137px']}
                  items={links}
                  activeItem={activeItem}
                  activeSubItem={activeSubItem}
                />
              )}
            </Flex>
            <Flex alignItems="center" height="100%">
              {!isMobile && cakePriceUsd && (
                <Box mr="12px">
                  <CakePrice cakePriceUsd={cakePriceUsd} />
                </Box>
              )}
              <Box mt="4px" mr="16px">
                <LangSelector
                  currentLang={currentLang}
                  langs={langs}
                  setLang={setLang}
                  buttonScale="xs"
                  color="textSubtle"
                />
              </Box>
              {globalMenu} {userMenu}
            </Flex>
          </StyledNavContainer>
        </StyledNav>
      </FixedContainer>
      {subLinks && (
        <Flex justifyContent="space-around">
          <SubMenuItems items={subLinksWithoutMobile} mt={`${totalTopMenuHeight + 1}px`} activeItem={activeSubItem} />

          {subLinksMobileOnly?.length > 0 && (
            <SubMenuItems
              items={subLinksMobileOnly}
              mt={`${totalTopMenuHeight + 1}px`}
              activeItem={activeSubItem}
              isMobileOnly
            />
          )}
        </Flex>
      )}
      <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : '0'}>
        <Inner isPushed={false} showMenu={showMenu}>
          {children}
          <Footer items={footerLinks} mb={[`${MOBILE_MENU_HEIGHT}px`, null, '0px']} />
        </Inner>
      </BodyWrapper>
      {isMobile && <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />}
    </Wrapper>
  )
}

export default Menu
