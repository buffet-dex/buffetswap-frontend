import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, Flex, Box, Skeleton, ArrowBackIcon, ArrowForwardIcon } from '@buffet-dex/uikit'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { PoolData } from 'state/info/types'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { DoubleCurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from './shared'
/**
 *  Columns on different layouts
 *  5 = | # | Pool | TVL | Volume 24H | Volume 7D |
 *  4 = | # | Pool |     | Volume 24H | Volume 7D |
 *  3 = | # | Pool |     | Volume 24H |           |
 *  2 = |   | Pool |     | Volume 24H |           |
 */
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 55px 1.2fr repeat(5, 1fr);

  padding: 0 24px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 55px 1.5fr repeat(3, 1fr);
    & :nth-child(4),
    & :nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 55px 1.5fr repeat(1, 1fr);
    & :nth-child(4),
    & :nth-child(5),
    & :nth-child(6),
    & :nth-child(7) {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 2.5fr repeat(1, 1fr);
    > *:nth-child(1) {
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

const SORT_FIELD = {
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  volumeUSDWeek: 'volumeUSDWeek',
  lpFees24h: 'lpFees24h',
  lpApr7d: 'lpApr7d',
}

const LoadingRow: React.FC = () => (
  <ResponsiveGrid>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </ResponsiveGrid>
)

const TableLoader: React.FC = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)

const DataRow = ({ poolData }: { poolData: PoolData }) => {
  const options = {
    notation: 'standard',
  }
  return (
    <LinkWrapper to={`/info/pool/${poolData.address}`}>
      <ResponsiveGrid>
        <DoubleCurrencyLogo size={30} address0={poolData.token0.address} address1={poolData.token1.address} />

        <Flex>
          <Text fontSize="16px" fontWeight="700" ml="8px">
            {poolData.token0.symbol}/{poolData.token1.symbol}
          </Text>
        </Flex>
        <Text>${formatAmount(poolData.volumeUSD, options)}</Text>
        <Text>${formatAmount(poolData.volumeUSDWeek, options)}</Text>
        <Text>${formatAmount(poolData.lpFees24h, options)}</Text>
        <Text>{formatAmount(poolData.lpApr7d)}%</Text>
        <Text>${formatAmount(poolData.liquidityUSD, options)}</Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

interface PoolTableProps {
  poolDatas: PoolData[]
  loading?: boolean // If true shows indication that SOME pools are loading, but the ones already fetched will be shown
}

const PoolTable: React.FC<PoolTableProps> = ({ poolDatas, loading }) => {
  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { t } = useTranslation()

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (poolDatas.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(poolDatas.length / ITEMS_PER_INFO_TABLE_PAGE) + extraPages)
  }, [poolDatas])

  const sortedPools = useMemo(() => {
    return poolDatas
      ? poolDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [page, poolDatas, sortDirection, sortField])

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

  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="textSubtle" fontSize="14px">
          #
        </Text>
        <Text color="textSubtle" fontSize="14px">
          {t('Pool')}
        </Text>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.volumeUSD)}>
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.volumeUSDWeek)}>
          {t('Volume 7D')} {arrow(SORT_FIELD.volumeUSDWeek)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.lpFees24h)}>
          {t('LP reward fees 24H')} {arrow(SORT_FIELD.lpFees24h)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.lpApr7d)}>
          {t('LP reward APR')} {arrow(SORT_FIELD.lpApr7d)}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="textSubtle" fontSize="14px" onClick={() => handleSort(SORT_FIELD.liquidityUSD)}>
          {t('Liquidity')} {arrow(SORT_FIELD.liquidityUSD)}
        </ClickableColumnHeader>
      </ResponsiveGrid>
      <Break />
      {sortedPools.length > 0 ? (
        <>
          {sortedPools.map((poolData) => {
            if (poolData) {
              return (
                <React.Fragment key={poolData.address}>
                  <DataRow poolData={poolData} />
                  <Break />
                </React.Fragment>
              )
            }
            return null
          })}
          {loading && <LoadingRow />}
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
          {/* spacer */}
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default PoolTable
