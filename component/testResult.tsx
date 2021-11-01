import {UseTestResultDataStateValue} from "./../context/testResultContext"
import {TestTypes} from "./singleResultsPage";

const TestResult = () => {
    const {testResultState} = UseTestResultDataStateValue()
    const wrapperClassName = `test-result-wrapper wrapper__${testResultState?.testResult.testType === TestTypes.PCR && testResultState?.testResult.templateId === TestTypes.BioradAntiBody ? 'biorad-color' : testResultState.testResult.result?.toLowerCase()}`
    const textClassName = `span_test_result span__${testResultState?.testResult.testType === TestTypes.PCR && testResultState?.testResult.templateId === TestTypes.BioradAntiBody ? '' : testResultState.testResult.result?.toLowerCase()}`
    return (
        <div
            className={wrapperClassName}>
            <p className="test-result-text">tested <span
                className={textClassName}>{testResultState?.testResult.result}</span> for
                sars-cov-2 (<span>{testResultState.testResult.testType}</span>)</p>
        </div>
    )
}
export default TestResult
