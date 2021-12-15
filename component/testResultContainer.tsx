import {HTMLAttributes} from "react"

const TestResultContainer = (
  {children, ...props}: { children?: JSX.Element | JSX.Element[], props?: HTMLAttributes<unknown> }
) => (
  <div data-cy={props["data-cy"]} className="all-results">
      {children}
  </div>
)

export default TestResultContainer
