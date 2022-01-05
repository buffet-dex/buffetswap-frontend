import React from 'react'
import { Box, BoxProps } from '@buffet-dex/uikit'

const Container: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box px={[null, '16px', null, '24px', null, null, '0']} mx="auto" maxWidth="1200px" {...props}>
    {children}
  </Box>
)

export default Container
