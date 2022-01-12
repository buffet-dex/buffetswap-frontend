import styled from 'styled-components'
import { Card } from '@buffet-dex/uikit'

export const StyledCard = styled(Card)<{ isFinished?: boolean }>`
  max-width: 387px;
  margin: 0 8px 24px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  box-shadow: 20px 20px 33px rgba(0, 0, 0, 0.08);
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`

export default StyledCard
