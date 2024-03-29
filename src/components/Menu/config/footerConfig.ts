import { FooterLinkType } from '@buffet-dex/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.pancakeswap.finance/contact-us',
      },
      {
        label: t('DISH Token'),
        href: 'https://docs.pancakeswap.finance/brand',
      },
      {
        label: t('HELP'),
        href: 'https://medium.com/pancakeswap',
      },
    ],
  },
  {
    label: t('Customer Support'),
    items: [
      {
        label: t('Github'),
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.pancakeswap.finance',
      },
      {
        label: t('Careers'),
        href: 'https://docs.pancakeswap.finance/hiring/become-a-chef',
      },
    ],
  },
]
