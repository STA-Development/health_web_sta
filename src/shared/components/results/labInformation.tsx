import React from 'react'

import moment from 'moment'
import {UseTestResultDataStateValue} from '@fh-health/contexts/testResultContext'
import {TestTypes} from '@fh-health/types/context/testResultContext'

const LabInformation = () => {
  const {testResultState} = UseTestResultDataStateValue()

  const changeDate = (data: string, format: string) => {
    if (data.length) {
      return moment(data).format(format)
    }
  }

  return (
    <div className="labInfo-wrapper">
      <div className="labInfo-wrapper__left">
        <div className="labInfo-wrapper__left-first-col">
          {testResultState.testResult.dateTime && (
            <div>
              <p className="field">date of test</p>
              <p className="answer test-answer">
                {changeDate(testResultState.testResult.dateTime, 'MMMM Do, h:mm a')}
              </p>
            </div>
          )}

          {testResultState.testResult.testType && (
            <div>
              <p className="field">test-type</p>
              <p className="answer test-answer">{testResultState.testResult.testTypeName}</p>
            </div>
          )}

          {testResultState.testResult?.testKitNumber && (
            <div>
              <p className="field">test kit number</p>
              <p className="answer test-answer">{testResultState.testResult.testKitNumber}</p>
            </div>
          )}
        </div>

        <div className="labInfo-wrapper__left-second-col">
          {testResultState.testResult?.resultDate && (
            <div>
              <p className="field">date of results</p>
              <p className="answer test-answer">
                {changeDate(testResultState.testResult.resultDate, 'MMMM Do, h:mm a')}
              </p>
            </div>
          )}

          {testResultState.testResult?.swabMethod &&
            testResultState.testResult.testType !== TestTypes.Vaccine && (
              <div>
                <p className="field">collection method</p>
                <p className="answer test-answer">{testResultState.testResult.swabMethod}</p>
              </div>
            )}
        </div>
        {testResultState?.testResult?.equipment && (
          <div>
            <p className="field">test equipment (health canada approved)</p>
            <p className="answer test-answer">{testResultState.testResult.equipment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LabInformation
