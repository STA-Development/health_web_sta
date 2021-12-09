const TestResultContainer = ({children, ...props}: any) => (
        <div data-cy={props["data-cy"]} className="all-results">
            {children}
        </div>
    )

export default TestResultContainer
