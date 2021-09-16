import {ReactChildren} from "react";

const TestResultContainer = ({children, ...props}: any) => {
    return (
        <div className="all-results">
            {children}
        </div>
    )
}
export default TestResultContainer