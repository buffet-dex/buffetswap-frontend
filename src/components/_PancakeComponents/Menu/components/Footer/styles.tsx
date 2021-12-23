import styled from 'styled-components'
import { AllColors } from 'style/theme/colors'
import { Box, Flex } from '@pancakeswap/uikit'
import SocialLinks from './Components/SocialLinks'

export const StyledFooter = styled(Flex)`
  background: ${({ theme }) => theme.colors.backgroundAlt2};
  height: min-content;
  border-radius: 35px;
  margin: 34px auto 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 34px;
    height: 162px;
  }
`

export const StyledList = styled.ul`
  list-style: none;
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  padding-right: 16px;
  li,
  a {
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
    width: max-content;
  }
`

export const StyledListItem = styled.li`
  line-height: 25px;
`

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`

export const StyledToolsContainer = styled(Flex)`
  border-color: ${AllColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`

export const StyledSocialLinks = styled(SocialLinks)`
  height: 100%;
  width: 168px;
  gap: 12px;
  flex-wrap: wrap-reverse;
  align-items: flex-start;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.xs} {
    align-self: center;
    width: 336px;
    gap: 24px;
    margin-top: 20px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    width: 168px;
    gap: 12px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 336px;
    gap: 24px;
  }
`

export const StyledText = styled.span`
  color: ${AllColors.text};
`
