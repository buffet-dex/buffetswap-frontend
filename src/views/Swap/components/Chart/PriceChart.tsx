import { ExpandIcon, Flex, IconButton, ShrinkIcon, Text } from '@buffet-dex/uikit'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import React from 'react'
import { ChartViewMode } from 'state/user/actions'
import { useExchangeChartViewManager } from 'state/user/hooks'
import BasicChart from './BasicChart'
import { StyledPriceChart } from './styles'
import TradingViewChart from './TradingViewChart'

const PriceChart = ({
  inputCurrency,
  outputCurrency,
  onSwitchTokens, // eslint-disable-line @typescript-eslint/no-unused-vars
  isDark,
  isChartExpanded,
  setIsChartExpanded,
  isMobile,
  token0Address,
  token1Address,
  currentSwapPrice,
}) => {
  const toggleExpanded = () => setIsChartExpanded((currentIsExpanded) => !currentIsExpanded)
  const [chartView] = useExchangeChartViewManager()

  return (
    <StyledPriceChart
      height={chartView === ChartViewMode.TRADING_VIEW ? '100%' : '70%'}
      overflow={chartView === ChartViewMode.TRADING_VIEW ? 'hidden' : 'unset'}
      $isDark={isDark}
      $isExpanded={isChartExpanded}
    >
      <Flex justifyContent="space-between" px="24px">
        <Flex alignItems="center">
          {outputCurrency ? (
            <DoubleCurrencyLogo currency0={inputCurrency} currency1={outputCurrency} size={24} margin />
          ) : (
            inputCurrency && <CurrencyLogo currency={inputCurrency} size="24px" style={{ marginRight: '8px' }} />
          )}
          {inputCurrency && (
            <Text color="text" bold>
              {outputCurrency ? `${inputCurrency.symbol}/${outputCurrency.symbol}` : inputCurrency.symbol}
            </Text>
          )}
        </Flex>
        {!isMobile && (
          <Flex>
            <IconButton variant="text" onClick={toggleExpanded}>
              {isChartExpanded ? <ShrinkIcon color="text" /> : <ExpandIcon color="text" />}
            </IconButton>
          </Flex>
        )}
      </Flex>
      {chartView === ChartViewMode.BASIC && (
        <BasicChart
          token0Address={token0Address}
          token1Address={token1Address}
          isChartExpanded={isChartExpanded}
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
          isMobile={isMobile}
          currentSwapPrice={currentSwapPrice}
        />
      )}
      {chartView === ChartViewMode.TRADING_VIEW && (
        <TradingViewChart
          // unmount the whole component when symbols is changed
          key={`${inputCurrency?.symbol}-${outputCurrency?.symbol}`}
          isChartExpanded={isChartExpanded}
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
          token0Address={token0Address}
          isMobile={isMobile}
          isDark={isDark}
          currentSwapPrice={currentSwapPrice}
        />
      )}
    </StyledPriceChart>
  )
}

export default PriceChart
