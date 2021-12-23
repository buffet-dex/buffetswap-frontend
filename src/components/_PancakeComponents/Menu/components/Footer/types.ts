import { FlexProps } from '@pancakeswap/uikit'

export type FooterLinkType = {
  label: string
  items: { label: string; href?: string; isHighlighted?: boolean }[]
}

export type FooterProps = {
  items: FooterLinkType[]
} & FlexProps
