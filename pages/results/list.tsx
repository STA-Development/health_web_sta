import ResultsHeader from 'component/resultsHeader'
import TestResultContainer from 'component/testResultContainer'
import SingleTestResult from 'component/singleTestResult'
import NoResults from 'component/noResults'
import {useEffect, useState} from 'react'
import SingleResultPreload from 'component/singleResultPreload'
import moment from 'moment'
import testResultManager from 'manager/TestResultManager'

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
      return (
        <>
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
          ) : (
            <SingleResultPreload />
          )}
        </>
      )
    })

  const getData = async () => {
    try {
      const response = await testResultManager.getAllTestResults()
      if (response.status) {
        setResults(response.data.data)
        if (response.data.data.length) {
          setHistory(true)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [])
  return (
    <>
      {history ? (
        <div className="web-portal-results">
          {latestResults && <ResultsHeader header="Latest Results" />}
          {latestResults && (
            <TestResultContainer>
              {results.length > 0 ? renderResultsList(false) : <SingleResultPreload />}
            </TestResultContainer>
          )}
          <ResultsHeader header="Result History" />
          <TestResultContainer data-cy="history-results">
            {results.length > 0 ? renderResultsList(true) : <SingleResultPreload />}
          </TestResultContainer>
        </div>
      ) : (
        <NoResults />
      )}
    </>
  )
}
export default WebPortalResults
