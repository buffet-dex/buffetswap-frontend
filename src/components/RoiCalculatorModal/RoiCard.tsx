import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text, Input, CheckmarkIcon, PencilIcon, IconButton } from '@buffet-dex/uikit'
import { useTranslation } from 'contexts/Localization'
import { CalculatorMode, RoiCalculatorReducerState } from './useRoiCalculatorReducer'

const MILLION = 1000000
const TRILLION = 1000000000000

const RoiCardWrapper = styled(Box)`
  background: rgba(32, 32, 32, 0.05);
  padding: 1px;
  width: 100%;
  border-radius: 30px;
`

const RoiCardInner = styled(Box)`
  position: relative;
  height: 179px;
  padding: 32px 28px 41px 32px;
  border-radius: 30px;
`
const RoiInputContainer = styled(Box)`
  position: relative;
  & > input {
    padding-left: 28px;
    max-width: 70%;
  }
  &:before {
    position: absolute;
    content: '$';
    color: ${({ theme }) => theme.colors.textSubtle};
    left: 16px;
    top: 8px;
  }
`

const RoiDisplayContainer = styled(Flex)`
  max-width: 82%;
  margin-right: 8px;
`

const RoiDollarAmount = styled(Text)<{ fadeOut: boolean }>`
  position: relative;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0px;
  }

  ${({ fadeOut, theme }) =>
    fadeOut &&
    `
      &:after {
        background: linear-gradient(
          to right,
          ${theme.colors.background}00,
          ${theme.colors.background}E6
        );
        content: '';
        height: 100%;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
      }
  `}
`
const PencilIconButton = styled(IconButton)`
  position: absolute;
  height: 20px;
  right: 28px;
  top: 26px;
  svg {
    path {
      fill: rgba(32, 32, 32, 0.5);
    }
  }
`

interface RoiCardProps {
  earningTokenSymbol: string
  calculatorState: RoiCalculatorReducerState
  setTargetRoi: (amount: string) => void
  setCalculatorMode: (mode: CalculatorMode) => void
}

const RoiCard: React.FC<RoiCardProps> = ({ earningTokenSymbol, calculatorState, setTargetRoi, setCalculatorMode }) => {
  const [expectedRoi, setExpectedRoi] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { roiUSD, roiTokens, roiPercentage } = calculatorState.data
  const { mode } = calculatorState.controls

  const { t } = useTranslation()

  useEffect(() => {
    if (mode === CalculatorMode.PRINCIPAL_BASED_ON_ROI && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mode])

  const onEnterEditing = () => {
    setCalculatorMode(CalculatorMode.PRINCIPAL_BASED_ON_ROI)
    setExpectedRoi(
      roiUSD.toLocaleString('en', {
        minimumFractionDigits: roiUSD > MILLION ? 0 : 2,
        maximumFractionDigits: roiUSD > MILLION ? 0 : 2,
      }),
    )
  }

  const onExitRoiEditing = () => {
    setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL)
  }
  const handleExpectedRoiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valid) {
      const roiAsString = event.target.value.replace(/,/g, '.')
      setTargetRoi(roiAsString)
      setExpectedRoi(roiAsString)
    }
  }
  return (
    <RoiCardWrapper>
      <RoiCardInner>
        <Text fontSize="16px" bold color="textSubtleOpacity">
          {t('ROI at current rates')}
        </Text>
        <PencilIconButton scale="sm" variant="text" onClick={onEnterEditing}>
          <PencilIcon />
        </PencilIconButton>
        <Flex justifyContent="space-between" mt="4px" height="auto">
          {mode === CalculatorMode.PRINCIPAL_BASED_ON_ROI ? (
            <>
              <RoiInputContainer>
                <Input
                  ref={inputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="^[0-9]+[.,]?[0-9]*$"
                  scale="sm"
                  value={expectedRoi}
                  placeholder="0.0"
                  onChange={handleExpectedRoiChange}
                />
              </RoiInputContainer>
              <IconButton scale="sm" variant="text" onClick={onExitRoiEditing}>
                <CheckmarkIcon color="primary" />
              </IconButton>
            </>
          ) : (
            <>
              <RoiDisplayContainer onClick={onEnterEditing}>
                {/* Dollar sign is separate cause its not supposed to scroll with a number if number is huge */}
                <Text fontSize="30px" bold>
                  $
                </Text>
                <RoiDollarAmount fontSize="30px" bold fadeOut={roiUSD > TRILLION}>
                  {roiUSD.toLocaleString('en', {
                    minimumFractionDigits: roiUSD > MILLION ? 0 : 2,
                    maximumFractionDigits: roiUSD > MILLION ? 0 : 2,
                  })}
                </RoiDollarAmount>
              </RoiDisplayContainer>
            </>
          )}
        </Flex>
        <Text fontSize="16px" bold color="textSubtleOpacity">
          ~ {roiTokens} {earningTokenSymbol} (
          {roiPercentage.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          %)
        </Text>
      </RoiCardInner>
    </RoiCardWrapper>
  )
}

export default RoiCard
