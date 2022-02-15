import React from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import {TestTypes} from '@fh-health/types/context/testResultContext'

const TestResult = () => {
  const {testResultState} = UseTestResultDataStateValue()
  let wrapperVar = ''
  let textVar = ''

  if (
    testResultState?.testResult.testType === TestTypes.PCR &&
    testResultState?.testResult.templateId === TestTypes.BioradAntiBody
  ) {
    wrapperVar = 'biorad-color'
  } else {
    wrapperVar = testResultState.testResult.result?.toLowerCase()
    textVar = testResultState.testResult.result?.toLowerCase()
  }

  const wrapperClassName = `test-result-wrapper wrapper__${wrapperVar}`
  const textClassName = `span_test_result span__${textVar}`

  return (
    <div className={wrapperClassName}>
      <p className="test-result-text">
        tested <span className={textClassName}>{testResultState?.testResult.result}</span> for
        sars-cov-2 (<span>{testResultState?.testResult.testType}</span>)
      </p>
    </div>
  )
}

export default TestResult