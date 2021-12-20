import { Breakpoints, Colors, MediaQueries, Radii, Shadows, Spacing, ZIndices } from './types'

export interface Theme {
  siteWidth: number
  colors: Colors
  breakpoints: Breakpoints
  mediaQueries: MediaQueries
  spacing: Spacing
  shadows: Shadows
  radii: Radii
  zIndices: ZIndices
}

export * from './types'
