import React from 'react'
import {ITestIcons} from '@fh-health/types/context/testResultContext'

const PcrIcon = ({color, large}: ITestIcons) => (
  <svg
    viewBox="-5 -5 70 70"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={large ? '64' : '37'}
    height={large ? '64' : '37'}
  >
    <defs>
      <filter id="a" colorInterpolationFilters="auto">
        <feColorMatrix
          in="SourceGraphic"
          values="0 0 0 0 0.321569 0 0 0 0 0.756863 0 0 0 0 0.486275 0 0 0 1.000000 0"
        />
      </filter>
      <path id="b" d="M0 .017h33.199V5.2H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <circle cx="32" cy="32" r="32" fill={color.outer} />
      <g filter={color.inner}>
        <path
          fill={color.inner}
          d="M31.318 20.048a2.794 2.794 0 1 0-.002-5.586 2.794 2.794 0 0 0 .002 5.585m0 23.75a2.794 2.794 0 1 0-.002 5.59 2.794 2.794 0 0 0 .002-5.59m-6.816-16.764a2.978 2.978 0 0 0 2.602-1.483l-.006.039s.367-.657 1.079-.657h7.677c.712 0 1.08.657 1.08.657l-.006-.04a2.978 2.978 0 0 0 2.602 1.484c1.637 0 2.964-1.251 2.964-2.794 0-1.544-1.327-2.795-2.964-2.795a2.98 2.98 0 0 0-2.602 1.483l.007-.04s-.37.657-1.08.657h-7.678c-.712 0-1.08-.656-1.08-.656l.007.038a2.978 2.978 0 0 0-2.602-1.482c-1.637 0-2.964 1.25-2.964 2.794s1.327 2.795 2.964 2.795m15.028 9.779a2.98 2.98 0 0 0-2.602 1.483l.007-.04s-.37.658-1.08.658h-7.677c-.712 0-1.08-.657-1.08-.657l.006.039a2.977 2.977 0 0 0-2.602-1.483c-1.637 0-2.964 1.252-2.964 2.794 0 1.544 1.327 2.795 2.964 2.795a2.977 2.977 0 0 0 2.602-1.483l-.006.039s.368-.656 1.08-.656H33.9V40.3h1.954c.712 0 1.08.657 1.08.657l-.006-.038A2.98 2.98 0 0 0 39.53 42.4c1.638 0 2.964-1.25 2.964-2.794 0-1.543-1.326-2.795-2.964-2.795"
        />
        <g transform="translate(14.552 29.827)">
          <mask id="c" fill="#fff">
            <use xlinkHref="#b" />
          </mask>
          <path
            fill={color.inner}
            d="M30.237.017c-1.13 0-2.1.56-2.6 1.375l.006-.036s-.367.61-1.078.61H6.634c-.711 0-1.079-.61-1.079-.61l.006.036C5.062.577 4.091.017 2.961.017c-1.635 0-2.96 1.16-2.96 2.59C0 4.04 1.325 5.2 2.96 5.2c1.13 0 2.101-.56 2.6-1.375l-.006.035s.368-.609 1.08-.609h19.93c.711 0 1.078.61 1.078.61l-.006-.036c.5.814 1.47 1.375 2.6 1.375 1.636 0 2.962-1.16 2.962-2.592 0-1.43-1.326-2.591-2.962-2.591"
            mask="url(#c)"
          />
        </g>
      </g>
    </g>
  </svg>
)

export default PcrIcon
