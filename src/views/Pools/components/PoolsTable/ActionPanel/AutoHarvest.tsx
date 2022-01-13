import React from 'react'
import { Text, Flex, TooltipText, useTooltip, Skeleton, Heading, useMatchBreakpoints } from '@buffet-dex/uikit'
import { useWeb3React } from '@web3-react/core'
import { getCakeVaultEarnings } from 'views/Pools/helpers'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { useCakeVault } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'

import { ActionContainer, ActionTitles, ActionContent } from './styles'
import UnstakingFeeCountdownRow from '../../CakeVaultCard/UnstakingFeeCountdownRow'

interface AutoHarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean
}

const AutoHarvestAction: React.FunctionComponent<AutoHarvestActionProps> = ({ userDataLoaded, earningTokenPrice }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const {
    userData: { dishAtLastUserAction, userShares },
    pricePerFullShare,
    fees: { performanceFee },
  } = useCakeVault()
  const { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay } = getCakeVaultEarnings(
    account,
    dishAtLastUserAction,
    userShares,
    pricePerFullShare,
    earningTokenPrice,
  )

  const earningTokenBalance = autoCakeToDisplay
  const earningTokenDollarBalance = autoUsdToDisplay
  const hasEarnings = hasAutoEarnings

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-start' },
  )

  const actionTitle = (
    <Text fontSize="16px" fontWeight="700" color="secondary" as="span">
      {t('Recent CAKE profit')}
    </Text>
  )

  if (!account) {
    return (
      <ActionContainer flexDirection="column">
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
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
    <ActionContainer flexDirection="column" isAutoVault>
      {isMobile && <ActionTitles>{actionTitle}</ActionTitles>}
      <ActionContent>
        <Flex paddingTop={isMobile ? '16px' : ''} flex="1" flexDirection="column" alignSelf="flex-start">
          {!isMobile && <ActionTitles>{actionTitle}</ActionTitles>}
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
                <Text fontSize="20px" fontWeight="700" color="textDisabled">
                  0
                </Text>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Flex
          paddingLeft={['15px', null, null, '30px']}
          flex="1.3"
          flexDirection="column"
          alignSelf="flex-start"
          alignItems="flex-start"
        >
          <UnstakingFeeCountdownRow isTableVariant />
          <Flex width="max-content" mb="2px" justifyContent="space-between" alignItems="center">
            {tooltipVisible && tooltip}
            <TooltipText fontSize="16px" fontWeight="700" ref={targetRef} color="textSubtleOpacity" small>
              {t('Performance Fee')}
            </TooltipText>
            <Flex alignItems="center">
              <Text fontSize="16px" fontWeight="700" color="textSubtleOpacity" ml="4px" small>
                {performanceFee / 100}%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </ActionContent>
    </ActionContainer>
  )
}

export default AutoHarvestAction
