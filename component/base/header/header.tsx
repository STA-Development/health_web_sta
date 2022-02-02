import React from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import {TestTypes} from '@fh-health/types/context/testResultContext'
import moment from 'moment'
import AntiBodySVG from './icon/antiBody'
import PcrSvg from './icon/pcrIcon'
import RapidAtHome from './icon/rapidAtHome'

const Header = () => {
  const {testResultState} = UseTestResultDataStateValue()

  const changeDate = (data: string, format: string) => {
    if (data.length) {
      return moment(data).format(format)
    }
  }
  const getCurrentTestResultIcon = () => {
    switch (testResultState?.testResult.testType) {
      case TestTypes.AntibodyAll:
        return <AntiBodySVG style={testResultState.testResult.style.toLowerCase()} />
      case TestTypes.PCR:
        return <PcrSvg style={testResultState.testResult.style.toLowerCase()} />
      case TestTypes.RapidAntigenAtHome || TestTypes.RapidAntigen:
        return <RapidAtHome style={testResultState.testResult.style.toLowerCase()} />
      default:
        return <PcrSvg style={testResultState.testResult.style.toLowerCase()} />
    }
  }
  return (
    <div className="header-wrapper">
      <div className="test-type-wrapper">
        {getCurrentTestResultIcon()}

        {testResultState.testResult && (
          <div className="test-info">
            <p data-cy="test-status" className="test-info__result">
              {' '}
              {testResultState.testResult.result}{' '}
            </p>
            <p className="test-info__date">
              {testResultState?.testResult && testResultState?.testResult.resultDate
                ? changeDate(testResultState.testResult.resultDate, 'MMMM Do, h:mm a')
                : ''}{' '}
            </p>
          </div>
        )}
      </div>
      <div className="user-info">
        <div className="left-column">
          {testResultState.testResult.firstName && (
            <div className="field-answer-wrapper">
              <p className="field">FIRST NAME</p>
              <p className="answer user-main-answer">{testResultState.testResult.firstName}</p>
            </div>
          )}
          {testResultState.testResult.lastName && (
            <div className="field-answer-wrapper">
              <p className="field">LAST NAME</p>
              <p className="answer user-main-answer">{testResultState.testResult.lastName}</p>
            </div>
          )}
        </div>
        <div className="right-column">
          <div className="right-column__first">
            {testResultState.testResult.address && (
              <div className="right-column__first__top">
                <p className="field">ADDRESS</p>
                <p className="answer user-secondary-answer">
                  {testResultState.testResult.address}
                  <br />
                </p>
              </div>
            )}
            <div className="right-column__first__bottom">
              <div className="right-column__first__bottom__left">
                {testResultState.testResult.gender && (
                  <>
                    <p className="field">Gender</p>
                    <p className="answer user-secondary-answer">
                      {testResultState.testResult.gender}
                    </p>
                  </>
                )}

                <p className="field">country</p>
                <p className="answer user-secondary-answer">Canada</p>
              </div>
              <div className="right-column__first__bottom__right">
                {testResultState.testResult.phone && (
                  <>
                    <p className="field">Phone</p>
                    <p className="answer user-secondary-answer">
                      {testResultState.testResult.phone}
                    </p>
                  </>
                )}

                {testResultState.testResult.ohip && (
                  <>
                    <p className="field">OHIP</p>
                    <p className="answer user-secondary-answer">
                      {testResultState.testResult.ohip}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right-column__second">
            {testResultState.testResult.dateOfBirth && (
              <>
                <p className="field">date of birth</p>
                <p className="answer user-secondary-answer">
                  {testResultState.testResult.dateOfBirth}
                </p>
              </>
            )}
            <p className="field">passport no.</p>
            <p className="answer user-secondary-answer">ZE000059</p>
            {testResultState.testResult.issuingCountry && (
              <>
                <p className="field">issuing country</p>
                <p className="answer user-secondary-answer">
                  {testResultState.testResult.issuingCountry}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
