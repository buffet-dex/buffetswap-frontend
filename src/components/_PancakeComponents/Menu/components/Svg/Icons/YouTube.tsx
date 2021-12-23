import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="20" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 0.759766C0.2064 0.759766 0 1.80857 0 9.99977C0 18.191 0.2064 19.2398 12 19.2398C23.7936 19.2398 24 18.191 24 9.99977C24 1.80857 23.7936 0.759766 12 0.759766ZM15.846 10.4006L10.458 12.9158C9.9864 13.1342 9.6 12.8894 9.6 12.3686V7.63097C9.6 7.11137 9.9864 6.86537 10.458 7.08377L15.846 9.59897C16.3176 9.81977 16.3176 10.1798 15.846 10.4006Z"
        fill="white"
      />
    </Svg>
  )
}

export default Icon
