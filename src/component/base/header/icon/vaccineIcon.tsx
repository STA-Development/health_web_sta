import React from 'react'
import {ITestIcons} from "@fh-health/types/context/testResultContext"

const VaccineIcon = ({ color, large }: ITestIcons) => (
  <svg
    viewBox="-5 -5 70 70"
    xmlns="http://www.w3.org/2000/svg"
    width={large ? '64' : '37'}
    height={large ? '64' : '37'}
  >
    <defs>
      <filter colorInterpolationFilters="auto" id="a">
        <feColorMatrix in="SourceGraphic" values="0 0 0 0 0.321569 0 0 0 0 0.756863 0 0 0 0 0.486275 0 0 0 1.000000 0"/>
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <circle fill={color.outer} cx="32" cy="32" r="32"/>
      <g filter={color.inner}>
        <path
          d="m32.17 10.836 17.946 6.497v13.124c0 12.774-6.26 16.373-16.809 22.519l-1.094.527-1.094-.527C20.526 46.83 14.222 43.23 14.222 30.457V17.333l17.947-6.497zm-6.608 11.852-1.603 1.607 5.551 5.567V41.65h2.267V28.92l-6.215-6.233zm13.111 0-6.215 6.232v12.73h2.267V29.863l5.55-5.567-1.602-1.607zm2.064 1.902-5.695 5.71 1.603 1.608 5.695-5.711-1.603-1.607zm-17.124 0-1.602 1.607 5.695 5.71 1.602-1.606-5.695-5.711z"
          fill={color.inner}
          fillRule="nonzero"
        />
      </g>
    </g>
  </svg>
)

export default VaccineIcon
