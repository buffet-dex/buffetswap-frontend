import React from 'react'

import { useWalletModal, Button } from '@buffet-dex/uikit'

import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('Connect to Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
