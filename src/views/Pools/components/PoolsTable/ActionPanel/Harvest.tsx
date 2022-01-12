import React from 'react'
import styled from 'styled-components'
import { Button, Text, useModal, Flex, Skeleton, Heading } from '@buffet-dex/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { PoolCategory } from 'config/constants/types'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedPool } from 'state/types'

import { ActionContainer, ActionTitles, ActionContent } from './styles'
import CollectModal from '../../PoolCard/Modals/CollectModal'

interface HarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean
}
const HarvestButton = styled(Button)`
  background: rgba(239, 88, 35, 0.1);
  font-size: 16px;
  &:disabled,
  &.pancake-button--disabled {
    background: rgba(239, 88, 35, 0.1);
    opacity: 0.5;
  }
`
const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  sousId,
  poolCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isCompoundPool = sousId === 0
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  const actionTitle = (
    <>
      <Text fontSize="16px" bold color="secondary" as="span">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="16px" bold color="textSubtle" as="span">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
          <HarvestButton disabled>{isCompoundPool ? t('Collect') : t('Harvest')}</HarvestButton>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer flexDirection="row">
      <Flex flex="1" flexDirection="column" alignSelf="flex-start">
        <ActionTitles>{actionTitle}</ActionTitles>
        <>
          {hasEarnings ? (
            <>
              <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
              {earningTokenPrice > 0 && (
                <Balance
                  display="inline"
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  prefix="~"
                  value={earningTokenDollarBalance}
                  unit=" USD"
                />
              )}
            </>
          ) : (
            <>
              <Heading fontSize="20px" fontWeight="700" color="textDisabled">
                0
              </Heading>
              <Text fontSize="12px" color="textDisabled">
                0 USD
              </Text>
            </>
          )}
        </>
      </Flex>
      <HarvestButton disabled={!hasEarnings} onClick={onPresentCollect}>
        {isCompoundPool ? t('Collect') : t('Harvest')}
      </HarvestButton>
    </ActionContainer>
  )
}

export default HarvestAction
