import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@buffet-dex/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { useWeb3React } from '@web3-react/core'
import SunburstSvg from './SunburstSvg'
import CompositeImage from './CompositeImage'

const BgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const StyledSunburst = styled(SunburstSvg)`
  height: 350%;
  width: 350%;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 400%;
    width: 400%;
  }
`

const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const LinearBackground = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ;
  background: linear-gradient(104.3deg, #ffbb38 -0.54%, #ff2f9f 135.91%);
  opacity: 0.35;
  filter: blur(130px);
`
const LinearBackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 964px;
  height: 304px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);
  filter: blur(40px);
`
const LeftImgWrapper = styled(Flex)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`

const TopRightImgWrapper = styled(Flex)`
  position: absolute;
  right: 0;
  top: 0;
`

const topLeftImage = {
  path: '/images/home/flying-pancakes/',
  attributes: [
    { src: '1-bottom', alt: 'Pancake flying on the bottom' },
    { src: '1-left', alt: 'Pancake flying on the left' },
    { src: '1-top', alt: 'Pancake flying on the top' },
  ],
}

const bottomRightImage = {
  path: '/images/home/flying-pancakes/',
  attributes: [
    { src: '2-bottom', alt: 'Pancake flying on the bottom' },
    { src: '2-top', alt: 'Pancake flying on the top' },
    { src: '2-right', alt: 'Pancake flying on the right' },
  ],
}

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <BgWrapper>
        <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
          <StyledSunburst />
        </Flex>
      </BgWrapper>
      <FloatingPancakesWrapper>
        <LinearBackgroundWrapper>
          <LinearBackground />
        </LinearBackgroundWrapper>
        <LeftImgWrapper>
          <CompositeImage {...topLeftImage} maxHeight="256px" />
        </LeftImgWrapper>
        <TopRightImgWrapper>
          <CompositeImage {...bottomRightImage} maxHeight="256px" />
        </TopRightImgWrapper>
      </FloatingPancakesWrapper>
      <Wrapper>
        <Heading mb="16px" scale="xl" color="text">
          {t('Start in seconds.')}
        </Heading>
        <Text mb="16px" fontWeight="500" fontSize="18px" textAlign="center" color="textSubtleOpacity">
          {t('Connect your crypto wallet to start using the app in seconds.')}
        </Text>
        <Text fontSize="18px" mb="24px" bold color="text">
          {t('No registration needed.')}
        </Text>
        {!account && <ConnectWalletButton mt="24px" />}
      </Wrapper>
    </>
  )
}

export default Footer
