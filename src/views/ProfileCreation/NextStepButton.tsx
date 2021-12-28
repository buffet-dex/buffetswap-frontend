import React from 'react'
import { ArrowForwardIcon, Button, ButtonProps } from '@buffet-dex/uikit'

const NextStepButton: React.FC<ButtonProps> = (props) => {
  return <Button endIcon={<ArrowForwardIcon color="currentColor" />} {...props} />
}

export default NextStepButton
