import ResultsHeader from "../component/resultsHeader";
import TestResultContainer from "../component/testResultContainer"
import SingleTestResult from "../component/singleTestResult";


const webPortalResults = () => {
    return (
        <div className="web-portal-results">
            <ResultsHeader header="Latest Results"/>
            <TestResultContainer>
                <span className="result-date">December 2020</span>
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
            </TestResultContainer>
            <ResultsHeader header="Latest Results"/>
            <TestResultContainer>
                <span className="result-date">December 2020</span>
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
            </TestResultContainer>
        </div>
    )
}
export default webPortalResults
