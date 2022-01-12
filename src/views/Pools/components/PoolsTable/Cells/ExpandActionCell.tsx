import React from 'react'
import styled from 'styled-components'
import { DetailEyeIcon } from '@buffet-dex/uikit'
import BaseCell from './BaseCell'

interface ExpandActionCellProps {
  expanded: boolean
  isFullLayout: boolean
}

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
    padding-left: 8px;
  }
`
const DetailIcon = styled(DetailEyeIcon)<{ toggled: boolean }>`
  rect {
    fill: ${({ toggled }) => (toggled ? '#FFFFFF' : '#202020')};
  }
  path {
    fill: ${({ toggled }) => (toggled ? 'rgba(32, 32, 32, 0.5)' : 'primary')};
  }
`

const TotalStakedCell: React.FC<ExpandActionCellProps> = ({ expanded }) => {
  return (
    <StyledCell role="cell">
      <DetailIcon toggled={expanded} />
    </StyledCell>
  )
}

export default TotalStakedCell
