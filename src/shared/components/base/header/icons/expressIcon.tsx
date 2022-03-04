import React from 'react'
import {ITestIcons} from '@fh-health/types/context/testResultContext'

const ExpressIcon = ({color, large}: ITestIcons) => (
  <svg
    viewBox="-5 -5 70 70"
    xmlns="http://www.w3.org/2000/svg"
    width={large ? '64' : '37'}
    height={large ? '64' : '37'}
  >
    <defs>
      <linearGradient id="b" x1="-44.209%" x2="134.227%" y1="50%" y2="50%">
        <stop offset="0%" stopColor="#FCE7BC" />
        <stop offset="8.246%" stopColor="#FFDEA8" />
        <stop offset="22.613%" stopColor="#FFF6C6" />
        <stop offset="35.16%" stopColor="#FFDEA8" />
        <stop offset="100%" stopColor="#CCB285" />
        <stop offset="100%" stopColor="#CCB285" />
      </linearGradient>
      <filter id="a" colorInterpolationFilters="auto">
        <feColorMatrix
          in="SourceGraphic"
          values="0 0 0 0 1.000000 0 0 0 0 0.223529 0 0 0 0 0.301961 0 0 0 1.000000 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <circle cx="32" cy="32" r="32" fill={color.outer} opacity=".25" />
      <g filter={color.inner}>
        <path
          fill={color.inner}
          fillRule="nonzero"
          d="M16.877.475A.944.944 0 0 0 16.055 0H4.722a.942.942 0 0 0-.915.71L.029 15.773a.93.93 0 0 0 .171.804c.18.228.454.36.745.36h4.303L.06 30.734a.934.934 0 0 0 .437 1.155.948.948 0 0 0 1.211-.274L16.82 10.926a.932.932 0 0 0 .079-.977.948.948 0 0 0-.843-.512h-3.998l4.808-8.017a.93.93 0 0 0 .012-.945z"
          transform="translate(23 16)"
        />
      </g>
    </g>
  </svg>
)

export default ExpressIcon
