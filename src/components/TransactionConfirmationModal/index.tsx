import React, { useCallback } from 'react'
import { ChainId, Currency, Token } from '@buffet-dex/sdk'
import styled from 'styled-components'
import {
  Button,
  Text,
  ErrorIcon,
  MetamaskIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
} from '@buffet-dex/uikit'
import { registerToken } from 'utils/wallet'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { RowFixed } from '../Layout/Row'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBscScanLink } from '../../utils'

const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 24px 0;
`

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <Spinner />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="20px">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center">
            {pendingText}
          </Text>
        </AutoColumn>
        <Text small color="textSubtle" textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </Text>
      </AutoColumn>
    </Wrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { library } = useActiveWeb3React()

  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section>
        <AutoColumn gap="0px" justify="center">
          <Text mb="24px" fontSize="30px" bold>
            {t('Transaction Submitted')}
          </Text>
          {chainId && hash && (
            <Link mb="32px" fontSize="16px" external small href={getBscScanLink(hash, 'transaction', chainId)}>
              {t('View on BscScan')}
            </Link>
          )}
          {currencyToAdd && library?.provider?.isMetaMask && (
            <Button
              variant="tertiary"
              mb="56px"
              width="fit-content"
              onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            >
              <RowFixed>
                {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })}
                <MetamaskIcon width="16px" ml="6px" />
              </RowFixed>
            </Button>
          )}
          <Button width="177px" scale="lg" onClick={onDismiss} mb="113px">
            {t('Close')}
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <ErrorIcon color="failure" width="64px" />
        <Text color="failure" style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </Text>
      </AutoColumn>

      <Flex justifyContent="center" pt="24px">
        <Button onClick={onDismiss}>{t('Dismiss')}</Button>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Modal title={title} headerBackground="gradients.cardHeader" onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
