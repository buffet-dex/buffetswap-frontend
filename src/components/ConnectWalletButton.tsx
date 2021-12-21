import React from 'react'

import { useWalletModal } from '@pancakeswap/uikit'

import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Button from './_PancakeComponents/Button/Button'

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
