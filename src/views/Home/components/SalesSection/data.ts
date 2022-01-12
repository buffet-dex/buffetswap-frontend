import { SalesSectionProps } from '.'
import { EarnSectionProps } from '../EarnSection'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade everything decentralized cheaper and faster',
  bodyText: 'Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  images: {
    path: '/images/home/tradeSection/',
    attributes: [{ src: 'cat', alt: 'Cat' }],
  },
}
export const buildSectionData: SalesSectionProps = {
  headingText: 'Build your portfolio with fixed income and derivatives composition',
  bodyText: 'PancakeSwap makes it easy to make your crypto work for you.',
  reverse: false,
  primaryButton: {
    to: '/build',
    text: 'Build Now',
    external: false,
  },
  images: {
    path: '/images/home/buildSection/',
    attributes: [{ src: 'food', alt: 'Food' }],
  },
}
export const footerSectionData: SalesSectionProps = {
  headingText: 'Seeking Alpha with DISH in Buffet (find alpha strategy with DISH token)',
  bodyText: 'Sustainable Environmental, Social and Governance (ESG) ecosystem.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Buy Now',
    external: false,
  },
  images: {
    path: '/images/home/footerSection/',
    attributes: [{ src: 'loupe', alt: 'Loupe' }],
  },
}

// Old data ===============================================================>
export const earnSectionData: EarnSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'PancakeSwap makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  images: [
    {
      path: '/images/home/earn/',
      attributes: [
        { src: 'pie', alt: 'Pie chart' },
        { src: 'stonks', alt: 'Stocks chart' },
        { src: 'folder', alt: 'Folder with cake token' },
      ],
    },
    {
      path: '/images/home/earn/',
      attributes: [
        { src: 'pie', alt: 'Pie chart' },
        { src: 'stonks', alt: 'Stocks chart' },
        { src: 'folder', alt: 'Folder with cake token' },
      ],
    },
  ],
}
export const cakeSectionData: SalesSectionProps = {
  headingText: 'CAKE makes our world go round.',
  bodyText:
    'CAKE token is at the heart of the PancakeSwap ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    text: 'Buy CAKE',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.pancakeswap.finance/tokenomics/cake',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d pancake' },
      { src: 'top-right', alt: 'Small 3d pancake' },
      { src: 'coin', alt: 'CAKE token' },
      { src: 'top-left', alt: 'Small 3d pancake' },
    ],
  },
}
export const DISHSectionData: SalesSectionProps = {
  headingText: 'DISH makes our world go round.',
  bodyText: 'Sustainable Environmental, Social and Governance (ESG) ecosystem.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'BNB', alt: 'BNB token' },
      { src: 'BTC', alt: 'BTC token' },
      { src: 'CAKE', alt: 'CAKE token' },
    ],
  },
}
