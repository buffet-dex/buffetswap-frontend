import React from 'react'
import { Flex, Text, Link, Heading, Button } from '@buffet-dex/uikit'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import Container from 'components/Layout/Container'
import { useTranslation } from 'contexts/Localization'
import CompositeImage, { CompositeImageProps } from './CompositeImage'

interface EarnSectionButton {
  to: string
  text: string
  external: boolean
}

export interface EarnSectionProps {
  headingText: string
  bodyText: string
  reverse?: boolean
  primaryButton: EarnSectionButton
  secondaryButton?: EarnSectionButton
  images: CompositeImageProps | CompositeImageProps[]
}
const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: 530px;
  margin: 0 auto;
  text-align: center;
`
const LeftImgWrapper = styled(Flex)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`

const RightImgWrapper = styled(Flex)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`
const FloatingPancakesWrapper = styled(Container)`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    visibility: visible;
  }
`
const EarnSection: React.FC<EarnSectionProps> = (props) => {
  const { t } = useTranslation()
  const { headingText, bodyText, primaryButton, images } = props

  const headingTranslatedText = t(headingText)
  const bodyTranslatedText = t(bodyText)

  return (
    <>
      <Wrapper>
        <Heading mb="24px" padding="0 20px" bold scale="xl" color="text">
          {headingTranslatedText}
        </Heading>
        <Text mb="31px" textAlign="center" fontSize="18px" color="textSubtleOpacity">
          {bodyTranslatedText}
        </Text>
        <Flex>
          <Button mr="16px">
            {primaryButton.external ? (
              <Link external href={primaryButton.to}>
                <Text color="card" fontWeight="700" fontSize="18px">
                  {t(primaryButton.text)}
                </Text>
              </Link>
            ) : (
              <RouterLink to={primaryButton.to}>
                <Text color="card" bold fontSize="18px">
                  {t(primaryButton.text)}
                </Text>
              </RouterLink>
            )}
          </Button>
        </Flex>
      </Wrapper>
      <FloatingPancakesWrapper>
        <LeftImgWrapper>
          <CompositeImage {...images[0]} maxHeight="196px" />
        </LeftImgWrapper>
        <RightImgWrapper>
          <CompositeImage {...images[1]} maxHeight="196px" />
        </RightImgWrapper>
      </FloatingPancakesWrapper>
    </>
  )
}

export default EarnSection
