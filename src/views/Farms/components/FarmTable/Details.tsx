import React from 'react'
import styled from 'styled-components'
import { DetailEyeIcon } from '@buffet-dex/uikit'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
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

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  return (
    <Container>
      <DetailIcon toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
