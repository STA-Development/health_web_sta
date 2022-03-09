import React from "react"

const ResultHeader = ({ header, size }: { header: string, size: number }) => (
  <p style={size ? { fontSize: `${size}px` } : {}} className="result-header">{header}</p>
)

export default ResultHeader
