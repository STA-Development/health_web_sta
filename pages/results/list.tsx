import ResultsHeader from '@fh-health/component/resultsHeader'
import TestResultContainer from '@fh-health/component/testResultContainer'
import SingleTestResult from '@fh-health/component/singleTestResult'
import NoResults from '@fh-health/component/noResults'
import React, {useEffect, useState} from 'react'
import SingleResultPreload from '@fh-health/component/singleResultPreload'
import moment from 'moment'
import * as Sentry from '@sentry/nextjs'
import testResultManager from '@fh-health/manager/testResultManager'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'
import {UseAuthDataStateValue} from '@fh-health/context/authContext'
import {useRouter} from 'next/router'

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
  const [latestResults, setLatestResults] = useState<boolean>(false)
  const [history, setHistory] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {authDataState, setAuthDataState} = UseAuthDataStateValue()
  const router = useRouter()

  const renderResultsList = (isHistory: boolean) =>
    results.map((test: IResult, index: number) => {
      if (!latestResults) {
        if (
          moment(test.testDateTime).format('YYYY-MM-DD') >
          moment().subtract(7, 'days').format('YYYY-MM-DD')
        ) {
          setLatestResults(true)
        }
      }

       return moment(test.testDateTime).format('YYYY-MM-DD') >
       moment().subtract(7, 'days').format('YYYY-MM-DD') && !isHistory || isHistory ? (
        <div key={index}>
          {isHistory &&
            (index === 0 ||
              moment(test.testDateTime).format('MMMM YYYY') !==
                moment(results[index - 1].testDateTime).format('MMMM YYYY')) && (
              <p className="result-date">{moment(test.testDateTime).format('MMMM YYYY')}</p>
            )}
          {isHistory ||
          moment(test.testDateTime).format('YYYY-MM-DD') >
            moment().subtract(7, 'days').format('YYYY-MM-DD') ? (
            <SingleTestResult
              testName={test.name}
              patientName={`${test.firstName} ${test.lastName}`}
              testDate={moment(test.testDateTime).format('ddd, MMM DD, YYYY')}
              backgroundClass={test.style}
              status={test.result}
              redirectUrl={test.id}
            />
          ) : null}
        </div>
      ) : null
    })

  const getData = async () => {
    setLoading(true)
    try {
      const response = await testResultManager.getAllTestResults()
      if (response.status) {
        setResults(response.data.data)
        if (response.data.data.length) {
          setHistory(true)
        }
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
    } else if (authDataState.patientAccountInformation.migrationRequired) {
      router.push('/migration')
    }
  }, [authDataState.patientAccountInformation])

  return (
    <>
      <div className={loading ? 'centered-content' : 'centered-content centered-content_hidden'}>
        <CircleLoader className="middle-loader" />
      </div>
      {history && !loading && (
        <div className="web-portal-results">
          {latestResults && <ResultsHeader header="Latest Results" size={0} />}
          {latestResults && (
            <TestResultContainer dataForCypress={null}>
              {results.length ? renderResultsList(false) : <SingleResultPreload />}
            </TestResultContainer>
          )}
          <ResultsHeader header="Result History" size={0} />
          <TestResultContainer dataForCypress="history-results">
            {results.length ? renderResultsList(true) : <SingleResultPreload />}
          </TestResultContainer>
        </div>
      )}
      {!history && !loading && <NoResults />}
    </>
  )
}
export default WebPortalResults
