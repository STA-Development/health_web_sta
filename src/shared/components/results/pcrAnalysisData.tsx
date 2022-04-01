import React from 'react'
import {UseTestResultDataStateValue} from '@fh-health/contexts/testResultContext'
import {TestResultTypes} from '@fh-health/types/context/testResultContext'

const PcrAnalysisData = () => {
  const {testResultState} = UseTestResultDataStateValue()

  const getTestResultType = (type) => {
    switch (type) {
      case TestResultTypes.Negative:
        return TestResultTypes.Negative.toLocaleLowerCase()
      case TestResultTypes.Positive:
        return TestResultTypes.Positive.toLocaleLowerCase()
      default:
        return ''
    }
  }

  return testResultState.testResult.resultAnalysis?.length ? (
    <div className="analysis-wrapper">
      <h3 className="analysis-wrapper__title">Test Analysis Data</h3>
      <div className="analysis-wrapper__top-part">
        {testResultState.testResult.resultAnalysis?.map(
          (analysis, resultCount, resultAnalysis) =>
            resultCount < resultAnalysis.length / 2 && (
              <div className="analysis-wrapper__parameter" key={resultCount}>
                <h3 className="analysis-wrapper__bottom-title">{analysis.channelName}</h3>
                <div className="analysis-wrapper__results">
                  {analysis.groups?.map((analyse, index, list) => {
                    const resultStatus = getTestResultType(analyse.value)

                    return (
                      <div key={index}>
                        <div className="analysis-wrapper__result">{analyse.label}</div>
                        <div
                          className={`analysis-wrapper__result ${resultStatus} ${
                            list.length === 1 ? 'result_has-radius' : 'result_no-radius'
                          }`}
                        >
                          {analyse.value}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ),
        )}
      </div>
      <div className="analysis-wrapper__bottom-part">
        {testResultState.testResult.resultAnalysis?.map(
          (analysis, resultCount, resultAnalysis) =>
            resultCount >= resultAnalysis.length / 2 && (
              <div className="analysis-wrapper__parameter" key={resultCount}>
                <h3 className="analysis-wrapper__bottom-title">{analysis.channelName}</h3>
                <div className="analysis-wrapper__results">
                  {analysis.groups?.map((analyse, index, list) => {
                    const resultStatus = getTestResultType(analyse.value)

                    return (
                      <div key={index}>
                        <div className="analysis-wrapper__result">{analyse.label}</div>
                        <div
                          className={`analysis-wrapper__result ${resultStatus} ${
                            list.length === 1 ? 'result_has-radius' : 'result_no-radius'
                          }`}
                        >
                          {analyse.value}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  ) : null
}

export default PcrAnalysisData
