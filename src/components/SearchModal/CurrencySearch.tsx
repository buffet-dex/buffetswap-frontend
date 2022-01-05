import React, { KeyboardEvent, RefObject, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Currency, ETHER, Token } from '@buffet-dex/sdk'
import { Text, Input, Box } from '@buffet-dex/uikit'
import { useTranslation } from 'contexts/Localization'
import { FixedSizeList } from 'react-window'
import { useAudioModeManager } from 'state/user/hooks'
import useDebounce from 'hooks/useDebounce'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAllTokens, useToken, useIsUserAddedToken, useFoundOnInactiveList } from '../../hooks/Tokens'
import { isAddress } from '../../utils'
import Column, { AutoColumn } from '../Layout/Column'
import Row from '../Layout/Row'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import { filterTokens, useSortedTokensByQuery } from './filtering'
import useTokenComparator from './sorting'

import ImportRow from './ImportRow'

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  input {
    padding-left: 55px;
  }
  svg {
    position: absolute;
    left: 25px;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
  }
`

interface CurrencySearchProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}

const swapSound = new Audio('swap.mp3')

function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  showImportView,
  setImportToken,
}: CurrencySearchProps) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens()

  // if they input an address, use it
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const [audioPlay] = useAudioModeManager()

  const showETH: boolean = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    return s === '' || s === 'b' || s === 'bn' || s === 'bnb'
  }, [debouncedQuery])

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      if (audioPlay) {
        swapSound.play()
      }
    },
    [audioPlay, onCurrencySelect],
  )

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'bnb') {
          handleCurrencySelect(ETHER)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    [filteredSortedTokens, handleCurrencySelect, debouncedQuery],
  )

  // if no results on main list, show option to expand into inactive
  const inactiveTokens = useFoundOnInactiveList(debouncedQuery)
  const filteredInactiveTokens: Token[] = useSortedTokensByQuery(inactiveTokens, debouncedQuery)

  return (
    <>
      <div>
        <AutoColumn gap="16px">
          <Row>
            <SearchInputWrapper>
              <Input
                id="token-search-input"
                placeholder={t('Search name or paste address')}
                scale="lg"
                autoComplete="off"
                value={searchQuery}
                ref={inputRef as RefObject<HTMLInputElement>}
                onChange={handleInput}
                onKeyDown={handleEnter}
              />
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.7104 19.2899L17.0004 15.6099C18.4405 13.8143 19.1379 11.5352 18.9492 9.2412C18.7605 6.94721 17.7001 4.81269 15.9859 3.27655C14.2718 1.74041 12.0342 0.919414 9.73332 0.982375C7.43243 1.04534 5.24311 1.98747 3.61553 3.61505C1.98795 5.24263 1.04582 7.43194 0.982863 9.73283C0.919903 12.0337 1.7409 14.2713 3.27704 15.9854C4.81318 17.6996 6.94769 18.76 9.24169 18.9487C11.5357 19.1374 13.8148 18.44 15.6104 16.9999L19.2904 20.6799C19.3834 20.7736 19.494 20.848 19.6158 20.8988C19.7377 20.9496 19.8684 20.9757 20.0004 20.9757C20.1324 20.9757 20.2631 20.9496 20.385 20.8988C20.5068 20.848 20.6174 20.7736 20.7104 20.6799C20.8906 20.4934 20.9914 20.2442 20.9914 19.9849C20.9914 19.7256 20.8906 19.4764 20.7104 19.2899V19.2899ZM10.0004 16.9999C8.61592 16.9999 7.26255 16.5894 6.1114 15.8202C4.96026 15.051 4.06305 13.9578 3.53324 12.6787C3.00342 11.3996 2.8648 9.99214 3.1349 8.63427C3.40499 7.27641 4.07168 6.02912 5.05065 5.05016C6.02961 4.07119 7.27689 3.4045 8.63476 3.13441C9.99263 2.86431 11.4001 3.00293 12.6792 3.53275C13.9583 4.06256 15.0515 4.95977 15.8207 6.11091C16.5899 7.26206 17.0004 8.61544 17.0004 9.9999C17.0004 11.8564 16.2629 13.6369 14.9501 14.9497C13.6374 16.2624 11.8569 16.9999 10.0004 16.9999V16.9999Z"
                  fill="rgba(32, 32, 32, 0.5)"
                />
              </svg>
            </SearchInputWrapper>
          </Row>
          {showCommonBases && (
            <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
          )}
        </AutoColumn>
        {searchToken && !searchTokenIsAdded ? (
          <Column style={{ padding: '20px 0', height: '100%' }}>
            <ImportRow token={searchToken} showImportView={showImportView} setImportToken={setImportToken} />
          </Column>
        ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <Box margin="24px -24px">
            <CurrencyList
              height={390}
              showETH={showETH}
              currencies={
                filteredInactiveTokens ? filteredSortedTokens.concat(filteredInactiveTokens) : filteredSortedTokens
              }
              breakIndex={inactiveTokens && filteredSortedTokens ? filteredSortedTokens.length : undefined}
              onCurrencySelect={handleCurrencySelect}
              otherCurrency={otherSelectedCurrency}
              selectedCurrency={selectedCurrency}
              fixedListRef={fixedList}
              showImportView={showImportView}
              setImportToken={setImportToken}
            />
          </Box>
        ) : (
          <Column style={{ padding: '20px', height: '100%' }}>
            <Text color="textSubtle" textAlign="center" mb="20px">
              {t('No results found.')}
            </Text>
          </Column>
        )}
      </div>
    </>
  )
}

export default CurrencySearch
