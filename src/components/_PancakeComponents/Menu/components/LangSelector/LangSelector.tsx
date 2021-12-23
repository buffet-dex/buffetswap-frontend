import React from 'react'
import { Colors } from 'style/theme/types'
import { Text, Dropdown, Button, LanguageIcon, Language } from '@pancakeswap/uikit'
import MenuButton from './MenuButton'

type Position = 'top' | 'top-right' | 'bottom'
export const scales = {
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const
export type Scale = typeof scales[keyof typeof scales]
interface Props {
  currentLang: string
  langs: Language[]
  setLang: (lang: Language) => void
  color: keyof Colors
  dropdownPosition?: Position
  buttonScale?: Scale
  hideLanguage?: boolean
}

const LangSelector: React.FC<Props> = ({
  currentLang,
  langs,
  setLang,
  dropdownPosition = 'bottom',
  buttonScale = 'md',
  hideLanguage = false,
}) => (
  <Dropdown
    position={dropdownPosition}
    target={
      <Button
        scale={buttonScale}
        variant="text"
        startIcon={<LanguageIcon color="rgba(32, 32, 32, 0.6)" width="24px" />}
      >
        {!hideLanguage && <Text color="rgba(32, 32, 32, 0.6)">{currentLang?.toUpperCase()}</Text>}
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.locale}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: '32px', height: 'auto' }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
)

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
