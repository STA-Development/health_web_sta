import React, {useEffect, useState} from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import {TestTypes} from '@fh-health/types/context/testResultContext'
import moment from 'moment'
import PcrIcon from '@fh-health/component/base/header/listIcons/pcrIcon'
import AntibodyIcon from '@fh-health/component/base/header/listIcons/antibodyIcon'
import RapidIcon from '@fh-health/component/base/header/listIcons/rapidIcons'
import ExpressIcon from '@fh-health/component/base/header/listIcons/expressIcon'
import VaccineIcon from '@fh-health/component/base/header/listIcons/vaccineIcon'
import useTestResultsColor from '@fh-health/hooks/testResultsColorHook'

const Header = () => {
  const {testResultState} = UseTestResultDataStateValue()
  const {testColor, getTestResultDetailIconColors} = useTestResultsColor()
  const [addressFields, setAddressFields] = useState<string[]>(null)

  const changeDate = (data: string, format: string) => {
    if (data.length) {
      return moment(data).format(format)
    }
  }

  const getCurrentTestResultIcon = () => {
    switch (testResultState?.testResult.testType) {
      case TestTypes.PCR:
      case TestTypes.VirtualTravelPCR:
      case TestTypes.VirtualPCR:
      case TestTypes.CovidFluAB:
      case TestTypes.Covid_FluAB:
        return <PcrIcon color={testColor} large />
      case TestTypes.AntibodyBiorad:
      case TestTypes.AntibodyAll:
        return <AntibodyIcon color={testColor} large />
      case TestTypes.VirtualTravelRapidAntigen:
      case TestTypes.VirtualRapidAntigen:
      case TestTypes.RapidAntigen:
        return <RapidIcon color={testColor} large />
      case TestTypes.ExpressPCR:
        return <ExpressIcon color={testColor} large />
      case TestTypes.Vaccine:
        return <VaccineIcon color={testColor} large />
      default:
        return <PcrIcon color={testColor} large />
    }
  }

  useEffect(() => {
    getTestResultDetailIconColors(testResultState.testResult.result)
    setAddressFields(testResultState.testResult.address.split('\n'))
  }, [])

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
              {testResultState?.testResult && testResultState?.testResult.dateTime
                ? `Date: ${changeDate(testResultState.testResult.dateTime, 'MMMM Do, Y @ h:mm a')}`
                : ''}{' '}
            </p>
          </div>
        )}
      </div>
      <div className="user-info">
        <div className="left-column">
          {testResultState.testResult.firstName && (
            <div className="field-answer-wrapper">
              <p className="field">first name</p>
              <p className="answer user-main-answer">{testResultState.testResult.firstName}</p>
            </div>
          )}
          {testResultState.testResult.lastName && (
            <div className="field-answer-wrapper">
              <p className="field">last name</p>
              <p className="answer user-main-answer">{testResultState.testResult.lastName}</p>
            </div>
          )}
        </div>
        <div className="right-column">
          <div className="right-column__first">
            {addressFields && (
              <div className="right-column__first__top">
                <p className="field">address</p>
                <p className="answer user-secondary-answer">
                  {addressFields.map((field, index) => (
                    <span key={index}>{field}</span>
                  ))}
                </p>
              </div>
            )}
            <div className="right-column__first__bottom">
              <div className="right-column__first__bottom__left">
                {testResultState.testResult.gender && (
                  <>
                    <p className="field">gender</p>
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
                    <p className="field">phone</p>
                    <p className="answer user-secondary-answer">
                      {testResultState.testResult.phone}
                    </p>
                  </>
                )}

                {testResultState.testResult.ohip && (
                  <>
                    <p className="field">ohip</p>
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
            {testResultState.testResult.travelId && (
              <>
                <p className="field">passport no.</p>
                <p className="answer user-secondary-answer">
                  {testResultState.testResult.travelId}
                </p>
              </>
            )}
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
