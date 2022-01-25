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
                <p className="answer test-answer">{testResultState.testResult.testType}</p>
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
      <div className="right-part-wrapper">
        <div className="right-part-first-column">
          {testResultState.testResult?.registeredNursePractitioner && (
            <>
              <p className="field">collection nurse</p>
              <p className="answer test-answer">
                {testResultState.testResult.registeredNursePractitioner}
              </p>
            </>
          )}

          <p className="field">Testing Clinic</p>
          <p className="answer test-answer">Daye Choi RPN</p>

          {testResultState.testResult.labName && (
            <>
              <p className="field">Testing Lab</p>
              <p className="answer test-answer">{testResultState.testResult.labName}</p>
            </>
          )}
        </div>
        <div className="right-part-second-column">
          {testResultState.testResult.physician && (
            <>
              <p className="field">ordering physician</p>
              <p className="answer test-answer">{testResultState.testResult.physician}</p>
            </>
          )}

          <p className="field">location</p>
          <p className="answer test-answer">Toronto, ON</p>
        </div>
      </div>
    </div>
  )
}

export default LabInformation
