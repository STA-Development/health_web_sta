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

  const wrapperClassName = `testResult-wrapper testResult-wrapper_${wrapperVar}`
  const textClassName = `testResult-text__status testResult-text__status_${textVar}`

  return (
    <div className={wrapperClassName}>
      <p className="testResult-text">
        tested <span className={textClassName}>{testResultState?.testResult.result}</span> for
        sars-cov-2 (<span>{testResultState?.testResult.testTypeName}</span>)
      </p>
    </div>
  )
}

export default TestResult
