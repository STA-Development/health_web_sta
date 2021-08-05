import {UseTestResultDataStateValue} from "./../context/testResultContext"
import {TestTypes} from "../pages";

const TestResult = () => {
    const {testResultState} = UseTestResultDataStateValue()
    return (
    <div className={`test-result-wrapper wrapper__${testResultState?.testResult.testType === TestTypes.PCR && testResultState?.testResult.templateId === TestTypes.BioradAntiBody?'biorad-color': testResultState.testResult.result.toLowerCase()}` }>
        <p className="test-result-text">tested <span className={`span__${testResultState?.testResult.testType === TestTypes.PCR && testResultState?.testResult.templateId === TestTypes.BioradAntiBody?'': testResultState.testResult.result.toLowerCase()}`}>{testResultState?.testResult.result}</span> for sars-cov-2 (<span>{testResultState.testResult.testType}</span>)</p>
    </div>
  )
}
export default TestResult
