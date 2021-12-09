const TestResultContainer = ({children, ...props}: any) => {
    return (
        <div data-cy={props["data-cy"]} className="all-results">
            {children}
        </div>
    )
}

export default TestResultContainer
