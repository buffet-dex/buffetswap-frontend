import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@buffet-dex/sdk'
import { Text, Flex, CardBody, CardFooter, Button } from '@buffet-dex/uikit'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background: rgba(32, 32, 32, 0.02);
  border-radius: 16px;
  width: 80.12%;
  height: 231px;
  margin: 40px auto 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #import-pool-link {
    margin-top: 24px;
    background: rgba(239, 88, 35, 0.05);
    a {
      background: linear-gradient(79.95deg, #ff623f 3.11%, #ff8c38 52.98%, #ff2f9f 126.12%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      font-weight: 400;
    }
  }
`
const JoinPoolButton = styled(Button)`
  a{
    font-size:18px;
    font-weight: 400;
  }
}
`

export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Text fontSize="18px" fontWeight="700" color="textSubtleOpacity" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtleOpacity" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <Text color="textSubtleOpacity" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }

  return (
    <Page>
      <AppBody>
        <AppHeader title={t('Liquidity')} />
        <Body>
          {renderBody()}
          {account && !v2IsLoading && (
            <Flex flexDirection="column" alignItems="center" mt="24px">
              <Text color="textSubtle" mb="8px">
                {t("Don't see a pool you joined?")}
              </Text>
              <Button id="import-pool-link" variant="primary" scale="md">
                <Link to="/find">{t('Find other LP tokens')}</Link>
              </Button>
            </Flex>
          )}
        </Body>
        <CardFooter p="40px 48px 48px" style={{ textAlign: 'center' }}>
          <JoinPoolButton scale="lg" id="join-pool-button" width="100%">
            <Link to="/find"> {t('Add Liquidity')}</Link>
          </JoinPoolButton>
        </CardFooter>
      </AppBody>
    </Page>
  )
}
