import React from 'react'
import styled from 'styled-components'
import { AllColors } from 'style/theme/colors'
import { FlexProps, Flex, Dropdown, Link } from '@pancakeswap/uikit'
import IconComponent from '../../Svg/IconComponent'
import { socials } from '../config'

export const StyledSocialLink = styled(Link)`
  padding: 0;
  margin: 0;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  justify-content: center;
`

const SocialLinks: React.FC<FlexProps> = ({ ...props }) => (
  <Flex {...props}>
    {socials.map((social, index) => {
      const iconProps = {
        iconName: social.icon,
        width: '20px',
        color: AllColors.textSubtle,
        style: { cursor: 'pointer' },
      }
      const mr = index < socials.length - 1 ? '24px' : 0
      if (social.items) {
        return (
          <Dropdown key={social.label} position="top" target={<IconComponent {...iconProps} mr={mr} />}>
            {social.items.map((item) => (
              <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                {item.label}
              </Link>
            ))}
          </Dropdown>
        )
      }
      return (
        <StyledSocialLink external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
          <IconComponent {...iconProps} />
        </StyledSocialLink>
      )
    })}
  </Flex>
)

export default React.memo(SocialLinks, () => true)
