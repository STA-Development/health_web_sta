import React from 'react'

import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import moment from 'moment'

const LabInformation = () => {
  const {testResultState} = UseTestResultDataStateValue()

  const changeDate = (data: string, format: string) => {
    if (data.length) {
      return moment(data).format(format)
    }
  }

  return (
    <div className="lab-info-wrapper">
      <div className="left-part-wrapper">
        <div className="left-top-wrapper">
          <div className="first-column">
            {testResultState.testResult.dateTime && (
              <>
                <p className="field">date of test</p>
                <p className="answer test-answer">
                  {changeDate(testResultState.testResult.dateTime, 'MMMM Do, h:mm a')}
                </p>
              </>
            )}

            {testResultState.testResult.testType && (
              <>
                <p className="field">test-type</p>
                <p className="answer test-answer">{testResultState.testResult.testTypeName}</p>
              </>
            )}
          </div>

          <div className="second-column">
            {testResultState.testResult?.resultDate && (
              <>
                <p className="field">date of results</p>
                <p className="answer test-answer">
                  {changeDate(testResultState.testResult.resultDate, 'MMMM Do, h:mm a')}
                </p>
              </>
            )}

            {testResultState.testResult?.swabMethod && (
              <>
                <p className="field">collection method</p>
                <p className="answer test-answer">{testResultState.testResult.swabMethod}</p>
              </>
            )}
          </div>
        </div>
        {testResultState?.testResult?.equipment && (
          <div className="left-bottom-wrapper">
            <p className="field">test equipment (health canada approved)</p>
            <p className="answer test-answer">{testResultState.testResult.equipment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LabInformation
