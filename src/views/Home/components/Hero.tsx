import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Heading, Button, Text } from '@buffet-dex/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getSrcSet } from './CompositeImage'

const imagePath = '/images/home/buffet/'
const imageSrc = 'buffet'

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <Flex mt={account ? '180px' : ''} mb={['40px']} position="relative" justifyContent="center">
        <Flex height={['auto', null, null, '100%']} width={['192px', null, null, '100%']}>
          <picture>
            <source type="image/webp" srcSet={getSrcSet(imagePath, imageSrc, '.webp')} />
            <source type="image/png" srcSet={getSrcSet(imagePath, imageSrc)} />
            <img src={`${imagePath}${imageSrc}.png`} alt={t('Buffet')} />
          </picture>
        </Flex>
      </Flex>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'column']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={['50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column" alignItems="center">
          <Heading textAlign="center" scale="xxl" color="text" mb="24px">
            {t('Mr Buffet invite you to the Buffet Swap')}
          </Heading>
          <Text fontSize="18px" fontWeight="500" color="textSubtleOpacity" textAlign="center" mb="64px">
            {t('Trade, earn, and win crypto on the most delicious decentralized platform of the world.')}
          </Text>
          <Flex>
            {!account && <ConnectWalletButton mr="17px" />}
            <Link to="/swap">
              <Button variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
