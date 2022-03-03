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
    getTestResultDetailIconColors(
      testResultState.testResult.result,
      testResultState.testResult.testType,
    )
    setAddressFields(testResultState.testResult.address.split('\n'))
  }, [])

  return (
    <div className="testResult-header">
      <div className="testResult-header__type">
        {getCurrentTestResultIcon()}

        {testResultState.testResult && (
          <div className="testResult-header__type-info">
            <h4 data-cy="test-status"> {testResultState.testResult.result} </h4>
            <p>
              {testResultState?.testResult && testResultState?.testResult.dateTime
                ? `Date: ${changeDate(testResultState.testResult.dateTime, 'MMMM Do, Y @ h:mm a')}`
                : ''}{' '}
            </p>
          </div>
        )}
      </div>
      <div className="testResult-header__user">
        <div className="testResult-header__user-info">
          {testResultState.testResult.firstName && (
            <div>
              <p className="field">first name</p>
              <h4>{testResultState.testResult.firstName}</h4>
            </div>
          )}
          {testResultState.testResult.lastName && (
            <div>
              <p className="field">last name</p>
              <h4>{testResultState.testResult.lastName}</h4>
            </div>
          )}
        </div>
        <div className="testResult-header__user-creds">
          <div>
            {addressFields && (
              <div className="testResult-header__user-block">
                <p className="field">address</p>
                <p className="answer answer_sm">
                  {addressFields.map((field, index) => (
                    <span key={index}>{field}</span>
                  ))}
                </p>
              </div>
            )}
            {testResultState.testResult.gender && (
              <div className="testResult-header__user-block">
                <p className="field">gender</p>
                <p className="answer answer_sm">{testResultState.testResult.gender}</p>
              </div>
            )}
            {testResultState.testResult.phone && (
              <div className="testResult-header__user-block">
                <p className="field">phone</p>
                <p className="answer answer_sm">{testResultState.testResult.phone}</p>
              </div>
            )}
            {testResultState.testResult.ohip && (
              <div className="testResult-header__user-block">
                <p className="field">ohip</p>
                <p className="answer answer_sm">{testResultState.testResult.ohip}</p>
              </div>
            )}
          </div>
          <div className="testResult-header__user-data">
            {testResultState.testResult.dateOfBirth && (
              <div>
                <p className="field">date of birth</p>
                <p className="answer answer_sm">{testResultState.testResult.dateOfBirth}</p>
              </div>
            )}
            {testResultState.testResult.travelId && (
              <div>
                <p className="field">passport no.</p>
                <p className="answer answer_sm">{testResultState.testResult.travelId}</p>
              </div>
            )}
            {testResultState.testResult.issuingCountry && (
              <div>
                <p className="field">issuing country</p>
                <p className="answer answer_sm">{testResultState.testResult.issuingCountry}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
