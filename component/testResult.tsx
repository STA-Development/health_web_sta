import {UseTestResultDataStateValue} from "./../context/testResultContext"

const TestResult = () => {
    const {testResultState} = UseTestResultDataStateValue()
    return (
    <div className={`test-result-wrapper wrapper__${testResultState.testResult.result.toLowerCase()}` }>
      <p className="test-result-text">tested Inconclusive for sars-cov-2 (rapid Antigen)</p>
    </div>
  )
}
export default TestResult
