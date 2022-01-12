import React from 'react'
import { Flex, Text, Button, Link } from '@buffet-dex/uikit'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
import ColoredWordHeading from './ColoredWordHeading'

interface BuildSectionButton {
  to: string
  text: string
  external: boolean
}

export interface BuildSectionProps {
  headingText: string
  bodyText: string
  reverse: boolean
  primaryButton: BuildSectionButton
  secondaryButton?: BuildSectionButton
  images: CompositeImageProps
}

const BuildSection: React.FC<BuildSectionProps> = (props) => {
  const { t } = useTranslation()

  const { headingText, bodyText, reverse, primaryButton, secondaryButton, images } = props

  const headingTranslatedText = t(headingText)
  const bodyTranslatedText = t(bodyText)

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection={['column', null, null, reverse ? 'row-reverse' : 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
      >
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
        >
          <CompositeImage {...images} />
        </Flex>
        <Flex
          flexDirection="column"
          flex="1"
          ml={[null, null, null, reverse && '64px']}
          mr={[null, null, null, !reverse && '64px']}
          alignSelf={['flex-start', null, null, 'center']}
        >
          <ColoredWordHeading text={headingTranslatedText} />
          <Text fontWeight="500" fontSize="18px" color="textSubtleOpacity" mb="32px">
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
                  <Text color="card" bold fontWeight="700" fontSize="18px">
                    {t(primaryButton.text)}
                  </Text>
                </RouterLink>
              )}
            </Button>
            {secondaryButton &&
              (secondaryButton.external ? (
                <Link external href={secondaryButton.to}>
                  {t(secondaryButton.text)}
                </Link>
              ) : (
                <RouterLink to={secondaryButton.to}>{t(secondaryButton.text)}</RouterLink>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BuildSection
