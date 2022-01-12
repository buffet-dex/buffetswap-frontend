import { Flex } from '@buffet-dex/uikit'
import styled from 'styled-components'

export const ActionContainer = styled(Flex)<{ isAutoVault?: boolean; flexDirection?: 'string' }>`
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  align-items: center;
  flex-grow: 1;
  flex-basis: min-content;
  margin-bottom: 16px;
  background: #FFFFFF;
  min-height: 115px;
  display:flex;
  flex-direction:${({ flexDirection }) => flexDirection || 'column'} ;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    height: ${({ isAutoVault }) => (isAutoVault ? '115px' : 'auto')};
  }
}

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 32px;
    margin-right: 0;
  }
`

export const ActionTitles = styled.div`
  font-weight: 700;
  font-size: 16px;
  width: max-content;
  align-self: flex-start;
  padding-bottom: 10px;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
