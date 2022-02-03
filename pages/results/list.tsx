import ResultsHeader from '@fh-health/component/resultsHeader'
import TestResultContainer from '@fh-health/component/testResultContainer'
import SingleTestResult from '@fh-health/component/singleTestResult'
import NoResults from '@fh-health/component/noResults'
import React, {useEffect, useState} from 'react'
import moment from 'moment'
import * as Sentry from '@sentry/nextjs'
import testResultManager from '@fh-health/manager/testResultManager'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'
import {UseAuthDataStateValue} from '@fh-health/context/authContext'

interface IResult {
  detailsAvailable: boolean
  firstName: string
  id: string
  lastName: string
  name: string
  result: string
  style: string
  testDateTime: string
}

const WebPortalResults = () => {
  const [results, setResults] = useState<IResult[]>([])
  const [latestResults, setLatestResults] = useState<IResult[]>([])
  const [historyResults, setHistoryResults] = useState<IResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {authDataState, setAuthDataState} = UseAuthDataStateValue()

  const getData = async () => {
    setLoading(true)
    try {
      const response = await testResultManager.getAllTestResults()
      if (response.status) {
        setResults(response.data.data)
      }
    } catch (err) {
      Sentry.captureException(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [])

  useEffect(() => {
    if (!authDataState.patientAccountInformation.organizations[0].patientId) {
      setAuthDataState({
        type: AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION_CALLED,
        patientAccountInformationCalled: true,
      })
    }
  }, [authDataState.patientAccountInformation])

  useEffect(() => {
    if (results.length) {
      const filteredLatestResults = results.filter((test) => {
        if (
          moment(test.testDateTime).format('YYYY-MM-DD') >
          moment().subtract(24, 'hours').format('YYYY-MM-DD')
        ) {
          return test
        }

        return null
      })

      setLatestResults(filteredLatestResults)
    }
  }, [results])

  useEffect(() => {
    if (latestResults.length) {
      setHistoryResults(
        results.filter((test) => !latestResults.includes(test))
      )
    } else {
      setHistoryResults(results)
    }
  }, [latestResults])

  return (
    <>
      <div className={loading ? 'centered-content' : 'centered-content centered-content_hidden'}>
        <CircleLoader className="middle-loader" />
      </div>
      {!loading && results.length ? (
        <div className="web-portal-results">
          {latestResults.length ? <ResultsHeader header="Latest Results" size={0} /> : null}
          {latestResults.length ? (
            <TestResultContainer dataForCypress={null}>
              {latestResults.length ? latestResults.map((test: IResult, index: number) => (
                  <div key={index}>
                    <SingleTestResult
                      testName={test.name}
                      patientName={`${test.firstName} ${test.lastName}`}
                      testDate={moment(test.testDateTime).format('ddd, MMM DD, YYYY')}
                      backgroundClass={test.style}
                      status={test.result}
                      redirectUrl={test.id}
                    />
                  </div>
                )) : null}
            </TestResultContainer>
          ) : null}
          {historyResults.length ? <ResultsHeader header="Result History" size={0} /> : null}
          {historyResults.length ? (
            <TestResultContainer dataForCypress="history-results">
              {historyResults.length ? historyResults.map((test: IResult, index: number) => (
                <div key={index}>
                  {historyResults.length &&
                    (index === 0 ||
                      moment(test.testDateTime).format('MMMM YYYY') !==
                      moment(historyResults[index - 1].testDateTime).format('MMMM YYYY')) && (
                      <p className="result-date">{moment(test.testDateTime).format('MMMM YYYY')}</p>
                    )
                  }
                  <SingleTestResult
                    testName={test.name}
                    patientName={`${test.firstName} ${test.lastName}`}
                    testDate={moment(test.testDateTime).format('ddd, MMM DD, YYYY')}
                    backgroundClass={test.style}
                    status={test.result}
                    redirectUrl={test.id}
                  />
                </div>
              )) : null}
            </TestResultContainer>
          ) : null}
        </div>
      ) : null}
      {!results.length && !loading && <NoResults />}
    </>
  )
}
export default WebPortalResults
