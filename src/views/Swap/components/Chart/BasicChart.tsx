import { Box, Dropdown, Flex, Text, Button, LangMenuButton } from '@buffet-dex/uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import { useFetchPairPrices } from 'state/swap/hooks'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import styled from 'styled-components'
import NoChartAvailable from './NoChartAvailable'
import SwapLineChart from './SwapLineChart'
import TokenDisplay from './TokenDisplay'
import { getTimeWindowChange } from './utils'

const TimeButton = styled(Button)`
  background: rgba(239, 88, 35, 0.05);
  border-radius: 16px;
  padding: 0 24px;
  h2 {
    font-size: 18px;
    background: -webkit-linear-gradient(79.95deg, #ff623f 3.11%, #ff8c38 52.98%, #ff2f9f 126.12%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 10px;
  }
`

const BasicChart = ({
  token0Address,
  token1Address,
  isChartExpanded,
  inputCurrency,
  outputCurrency,
  isMobile,
  currentSwapPrice,
}) => {
  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0)

  const { pairPrices = [], pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const valueToDisplay = hoverValue || pairPrices[pairPrices.length - 1]?.value
  const { changePercentage, changeValue } = getTimeWindowChange(pairPrices)
  const isChangePositive = changeValue >= 0
  const chartHeight = isChartExpanded ? 'calc(100% - 120px)' : '416px'
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const currentDate = new Date().toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  const ChartTime = ['24 H', '1 W', '1 M', '1 Y']

  // Sometimes we might receive array full of zeros for obscure tokens while trying to derive data
  // In that case chart is not useful to users
  const isBadData =
    pairPrices &&
    pairPrices.length > 0 &&
    pairPrices.every(
      (price) => !price.value || price.value === 0 || price.value === Infinity || Number.isNaN(price.value),
    )

  if (isBadData) {
    return (
      <NoChartAvailable
        token0Address={token0Address}
        token1Address={token1Address}
        pairAddress={pairId}
        isMobile={isMobile}
      />
    )
  }

  return (
    <>
      <Flex
        flexDirection={['column', null, null, null, null, null, 'row']}
        alignItems={['flex-start', null, null, null, null, null, 'center']}
        justifyContent="space-between"
        px="24px"
      >
        <Flex flexDirection="column" pt="12px">
          <TokenDisplay
            value={pairPrices?.length > 0 && valueToDisplay}
            inputSymbol={inputCurrency?.symbol}
            outputSymbol={outputCurrency?.symbol}
          >
            <Text color={isChangePositive ? 'success' : 'failure'} fontSize="16px" mt="-8px" mb="8px" bold>
              {`${isChangePositive ? '+' : ''}${changeValue.toFixed(3)} (${changePercentage}%)`}
            </Text>
          </TokenDisplay>
          <Text bold color="textSubtleOpacity">
            {hoverDate || currentDate}
          </Text>
        </Flex>
        <Box>
          <Dropdown
            position="bottom"
            target={
              <TimeButton scale="md" variant="text">
                <h2>{ChartTime[timeWindow]}</h2>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.0003 2.59018L5.2903 6.83018C5.38326 6.92391 5.49386 6.9983 5.61572 7.04907C5.73758 7.09984 5.86828 7.12598 6.0003 7.12598C6.13231 7.12598 6.26301 7.09984 6.38487 7.04907C6.50673 6.9983 6.61733 6.92391 6.7103 6.83018L10.9503 2.59018C11.044 2.49722 11.1184 2.38661 11.1692 2.26476C11.22 2.1429 11.2461 2.01219 11.2461 1.88018C11.2461 1.74817 11.22 1.61746 11.1692 1.4956C11.1184 1.37374 11.044 1.26314 10.9503 1.17018C10.7629 0.983927 10.5095 0.879386 10.2453 0.879386C9.98111 0.879386 9.72766 0.983927 9.5403 1.17018L6.0003 4.71018L2.4603 1.17018C2.27404 0.985433 2.02264 0.881282 1.7603 0.880178C1.62869 0.879417 1.49823 0.904641 1.37639 0.954406C1.25455 1.00417 1.14374 1.0775 1.0503 1.17018C0.953221 1.2598 0.874867 1.36776 0.81976 1.48784C0.764653 1.60791 0.733886 1.73772 0.729237 1.86975C0.724588 2.00179 0.746149 2.13344 0.792674 2.25709C0.839199 2.38074 0.909765 2.49395 1.0003 2.59018Z"
                    fill="url(#paint0_linear_978_2935)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_978_2935"
                      x1="9.63531"
                      y1="-3.22717"
                      x2="-4.34958"
                      y2="0.945751"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF623F" />
                      <stop offset="0.4054" stopColor="#FF8C38" />
                      <stop offset="1" stopColor="#FF2F9F" />
                    </linearGradient>
                  </defs>
                </svg>
              </TimeButton>
            }
          >
            {ChartTime.map((time, index) => (
              <LangMenuButton
                key={time}
                fullWidth
                onClick={() => setTimeWindow(index)}
                // Safari fix
                style={{ minHeight: '32px', height: 'auto' }}
              >
                {t(time)}
              </LangMenuButton>
            ))}
          </Dropdown>
        </Box>
      </Flex>
      <Box height={isMobile ? '100%' : chartHeight} p={isMobile ? '0px' : '16px'} width="100%">
        <SwapLineChart
          data={pairPrices}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositive}
          timeWindow={timeWindow}
        />
      </Box>
    </>
  )
}

export default BasicChart
