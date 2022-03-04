import React from "react"

const TestResultContainer = ({children, dataForCypress}: { children: JSX.Element | JSX.Element[], dataForCypress: string }) => (
  <div data-cy={dataForCypress} className="all-results">
      {children}
  </div>
)

export default TestResultContainer
