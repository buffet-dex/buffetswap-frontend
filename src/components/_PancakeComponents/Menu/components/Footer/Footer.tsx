import React from 'react'
import { Flex, Box, Link } from '@pancakeswap/uikit'
import { baseColors, AllColors } from '../../../../../style/theme/colors'
import { StyledFooter, StyledList, StyledListItem, StyledText, StyledSocialLinks } from './styles'
import { FooterProps } from './types'
import { LogoWithTextIcon } from '../Svg'

const MenuItem: React.FC<FooterProps> = ({ items, ...props }) => {
  return (
    <StyledFooter p={['24px 16px', null, '32px 24px 24px 64px;']} {...props} justifyContent="center">
      <Flex flexDirection={['column', null, 'row']} justifyContent="space-between" width={['100%', null, '1370px']}>
        <Flex
          justifyContent={['space-around', null, 'space-between']}
          flexBasis={[null, null, 'calc(100% - 200px)', '47%']}
        >
          <Box pr="20px" display={['none', null, 'block']}>
            <LogoWithTextIcon fill="white" />
          </Box>
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? baseColors.warning : AllColors.text}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
        </Flex>

        <StyledSocialLinks order={[2]} />
      </Flex>
    </StyledFooter>
  )
}

export default MenuItem
