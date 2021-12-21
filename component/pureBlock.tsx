import React from "react"

interface IPureBlock {
  flow: boolean
  center: boolean
  children: JSX.Element | JSX.Element[]
  isNoResults: boolean
}

const PureBlock = ({ flow, center, children, isNoResults } : IPureBlock) => (
  <div className={`${isNoResults ? 'noResults' : ''} ${flow ? 'contentOutline contentOutline_flow' : 'contentOutline'} ${center ? 'centerX' : ''}`}>
    <div className={flow ? 'content content_flow' : 'content'}>
      {children}
    </div>
  </div>
)

export default PureBlock
