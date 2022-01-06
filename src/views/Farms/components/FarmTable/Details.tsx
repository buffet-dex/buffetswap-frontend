import React from 'react'
import styled from 'styled-components'
import { DetailEyeIcon, useMatchBreakpoints } from '@buffet-dex/uikit'
import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
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
  const { t } = useTranslation()
  const { isDesktop } = useMatchBreakpoints()

  return (
    <Container>
      {!isDesktop && t('Details')}
      <DetailIcon toggled={actionPanelToggled} />
      {/*
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect opacity="0.1" width="32" height="32" rx="4" fill="#EF5823"/>
<path d="M25.9196 15.6C23.8996 10.91 20.0996 8 15.9996 8C11.8996 8 8.09958 10.91 6.07958 15.6C6.02452 15.7262 5.99609 15.8623 5.99609 16C5.99609 16.1377 6.02452 16.2738 6.07958 16.4C8.09958 21.09 11.8996 24 15.9996 24C20.0996 24 23.8996 21.09 25.9196 16.4C25.9746 16.2738 26.0031 16.1377 26.0031 16C26.0031 15.8623 25.9746 15.7262 25.9196 15.6V15.6ZM15.9996 22C12.8296 22 9.82958 19.71 8.09958 16C9.82958 12.29 12.8296 10 15.9996 10C19.1696 10 22.1696 12.29 23.8996 16C22.1696 19.71 19.1696 22 15.9996 22V22ZM15.9996 12C15.2085 12 14.4351 12.2346 13.7773 12.6741C13.1195 13.1136 12.6068 13.7384 12.3041 14.4693C12.0013 15.2002 11.9221 16.0044 12.0764 16.7804C12.2308 17.5563 12.6117 18.269 13.1712 18.8284C13.7306 19.3878 14.4433 19.7688 15.2192 19.9231C15.9951 20.0775 16.7994 19.9983 17.5303 19.6955C18.2612 19.3928 18.8859 18.8801 19.3255 18.2223C19.765 17.5645 19.9996 16.7911 19.9996 16C19.9996 14.9391 19.5781 13.9217 18.828 13.1716C18.0779 12.4214 17.0604 12 15.9996 12V12ZM15.9996 18C15.604 18 15.2173 17.8827 14.8884 17.6629C14.5595 17.4432 14.3032 17.1308 14.1518 16.7654C14.0004 16.3999 13.9608 15.9978 14.038 15.6098C14.1152 15.2219 14.3057 14.8655 14.5854 14.5858C14.8651 14.3061 15.2214 14.1156 15.6094 14.0384C15.9974 13.9613 16.3995 14.0009 16.7649 14.1522C17.1304 14.3036 17.4428 14.56 17.6625 14.8889C17.8823 15.2178 17.9996 15.6044 17.9996 16C17.9996 16.5304 17.7889 17.0391 17.4138 17.4142C17.0387 17.7893 16.53 18 15.9996 18Z" fill="#EF5823"/>
</svg> */}
    </Container>
  )
}

export default Details
