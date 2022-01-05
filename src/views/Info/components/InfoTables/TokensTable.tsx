import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, ArrowBackIcon, ArrowForwardIcon } from '@buffet-dex/uikit'
import { TokenData } from 'state/info/types'
import { Link } from 'react-router-dom'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from './shared'

/**
 *  Columns on different layouts
 *  6 = | # | Name | Price | Price Change | Volume 24H | TVL |
 *  5 = | # | Name | Price |              | Volume 24H | TVL |
 *  4 = | # | Name | Price |              | Volume 24H |     |
 *  2 = |   | Name |       |              | Volume 24H |     |
 *  On smallest screen Name is reduced to just symbol
 */
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  padding: 0 24px;

  grid-template-columns: 30px 1.5fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 30px 2fr repeat(3, 1fr);
    & :nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 30px 2fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr 1fr;
    > *:first-child {
      display: none;
    }
    > *:nth-child(3) {
      display: none;
    }
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 16px;
    height: 16px;
  }
`

const TableLoader: React.FC = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<{ tokenData: TokenData }> = ({ tokenData }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  return (
    <LinkWrapper to={`/info/token/${tokenData.address}`}>
      <ResponsiveGrid>
        <Flex>
          <ResponsiveLogo size="30px" address={tokenData.address} />
        </Flex>
        <Flex alignItems="center">
          {(isXs || isSm) && <Text ml="8px">{tokenData.symbol}</Text>}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              <Text fontSize="16px" fontWeight="700">
                {tokenData.name}
              </Text>
              <Text fontSize="16px" fontWeight="700" ml="8px">
                ({tokenData.symbol})
              </Text>
            </Flex>
          )}
        </Flex>
        <Text>${formatAmount(tokenData.priceUSD, { notation: 'standard' })}</Text>
        <Text>
          <Percent value={tokenData.priceUSDChange} />
        </Text>
        <Text>${formatAmount(tokenData.volumeUSD)}</Text>
        <Text>${formatAmount(tokenData.liquidityUSD)}</Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

const SORT_FIELD = {
  name: 'name',
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  priceUSD: 'priceUSD',
  priceUSDChange: 'priceUSDChange',
  priceUSDChangeWeek: 'priceUSDChangeWeek',
}

const MAX_ITEMS = 10

const TokenTable: React.FC<{
  tokenDatas: TokenData[] | undefined
  maxItems?: number
}> = ({ tokenDatas, maxItems = MAX_ITEMS }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (tokenDatas) {
      if (tokenDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(tokenDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, tokenDatas])

  const sortedTokens = useMemo(() => {
    return tokenDatas
      ? tokenDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof TokenData] > b[sortField as keyof TokenData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [tokenDatas, maxItems, page, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  if (!tokenDatas) {
    return <Skeleton />
  }

  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="textSubtle" fontSize="14px">
          #
        </Text>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.name)}>
          {t('Name')} {arrow(SORT_FIELD.name)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.priceUSD)}>
          {t('Price')} {arrow(SORT_FIELD.priceUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.priceUSDChange)}>
          {t('Price Change')} {arrow(SORT_FIELD.priceUSDChange)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.volumeUSD)}>
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.liquidityUSD)}>
          {t('Liquidity')} {arrow(SORT_FIELD.liquidityUSD)}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      <Break />
      {sortedTokens.length > 0 ? (
        <>
          {sortedTokens.map((data) => {
            if (data) {
              return (
                <React.Fragment key={data.address}>
                  <DataRow tokenData={data} />
                  <Break />
                </React.Fragment>
              )
            }
            return null
          })}
          <PageButtons>
            <Arrow
              onClick={() => {
                setPage(page === 1 ? page : page - 1)
              }}
            >
              <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
            </Arrow>
            <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
            <Arrow
              onClick={() => {
                setPage(page === maxPage ? page : page + 1)
              }}
            >
              <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
            </Arrow>
          </PageButtons>
        </>
      ) : (
        <>
          <TableLoader />
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default TokenTable
