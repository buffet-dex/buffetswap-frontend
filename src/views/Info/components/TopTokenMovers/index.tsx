import React, { useMemo, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Card } from '@buffet-dex/uikit'
import { Link } from 'react-router-dom'
import { useAllTokenData } from 'state/info/hooks'
import { TokenData } from 'state/info/types'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import { useTranslation } from 'contexts/Localization'

const CardWrapper = styled(Link)`
  display: inline-block;
  min-width: 213px;
  margin-left: 12px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const TopMoverCard = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 2px 4px 11px rgba(0, 0, 0, 0.12);
`

export const ScrollableRow = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 16px 0;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`

const DataCard = ({ tokenData }: { tokenData: TokenData }) => {
  return (
    <CardWrapper to={`/info/token/${tokenData.address}`}>
      <TopMoverCard>
        <Flex>
          <Flex alignSelf="center" width="32px" height="32px">
            {/* wrapped in a box because of alignment issues between img and svg */}
            <CurrencyLogo address={tokenData.address} size="32px" />
          </Flex>
          <Box ml="16px">
            <Text mb="8px" fontWeight="700">
              {tokenData.symbol}
            </Text>
            <Flex alignItems="center">
              <Text fontSize="16px" fontWeight="400" mr="14px" lineHeight="16px">
                ${formatAmount(tokenData.priceUSD)}
              </Text>
              <Percent fontSize="16px" fontWeight="400" value={tokenData.priceUSDChange} />
            </Flex>
          </Box>
        </Flex>
      </TopMoverCard>
    </CardWrapper>
  )
}

const TopTokenMovers: React.FC = () => {
  const allTokens = useAllTokenData()
  const { t } = useTranslation()

  const topPriceIncrease = useMemo(() => {
    return Object.values(allTokens)
      .sort(({ data: a }, { data: b }) => {
        // eslint-disable-next-line no-nested-ternary
        return a && b ? (Math.abs(a?.priceUSDChange) > Math.abs(b?.priceUSDChange) ? -1 : 1) : -1
      })
      .slice(0, Math.min(20, Object.values(allTokens).length))
  }, [allTokens])

  const increaseRef = useRef<HTMLDivElement>(null)
  const moveLeftRef = useRef<boolean>(true)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (increaseRef.current) {
        if (increaseRef.current.scrollLeft === increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          moveLeftRef.current = false
        } else if (increaseRef.current.scrollLeft === 0) {
          moveLeftRef.current = true
        }
        increaseRef.current.scrollTo(
          moveLeftRef.current ? increaseRef.current.scrollLeft + 1 : increaseRef.current.scrollLeft - 1,
          0,
        )
      }
    }, 30)

    return () => {
      clearInterval(scrollInterval)
    }
  }, [])

  if (topPriceIncrease.length === 0 || !topPriceIncrease.some((entry) => entry.data)) {
    return null
  }

  return (
    <Card borderBackground="none" background="none" my="16px">
      <Text ml="16px" mt="8px">
        {t('Top Movers')}
      </Text>
      <ScrollableRow ref={increaseRef}>
        {topPriceIncrease.map((entry) =>
          entry.data ? <DataCard key={`top-card-token-${entry.data?.address}`} tokenData={entry.data} /> : null,
        )}
      </ScrollableRow>
    </Card>
  )
}

export default TopTokenMovers
