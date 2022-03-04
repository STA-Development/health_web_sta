import React from 'react'
import {ITestIcons} from '@fh-health/types/context/testResultContext'

const AntibodyIcon = ({color, large}: ITestIcons) => (
  <svg
    viewBox="-5 -5 70 70"
    xmlns="http://www.w3.org/2000/svg"
    width={large ? '64' : '37'}
    height={large ? '64' : '37'}
  >
    <g fill={color.outer} fillRule="evenodd">
      <circle cx="32" cy="32" r="32" fill={color.outer} />
      <path
        d="m20.289 15 11.006 11.006v22.48H27.28V27.67l-9.83-9.832L20.289 15zm23.218 0 2.838 2.838-9.83 9.83v20.819H32.5V26.006L43.507 15zm3.655 3.359L50 21.197 39.915 31.282l-2.838-2.838 10.085-10.085zm-30.324 0 10.085 10.085-2.838 2.838L14 21.197l2.838-2.838z"
        fill={color.inner}
        fillRule="nonzero"
      />
    </g>
  </svg>
)

export default AntibodyIcon
