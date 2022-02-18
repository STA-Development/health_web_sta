import React from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import guid from '@fh-health/utils/guid'

const PcrAnalysisData = () => {
  const {testResultState} = UseTestResultDataStateValue()

  return testResultState.testResult.resultAnalysis?.length ? (
    <div className="analysis-wrapper">
      <h3 className="analysis-wrapper__title">Test Analysis Data</h3>
      <div className="analysis-wrapper__top-part">
        {testResultState.testResult.resultAnalysis?.map(
          (analysis, index, resultAnalysis) =>
            index < resultAnalysis.length / 2 && (
              <div className="analysis-wrapper__parameter" key={guid()}>
                <h3 className="analysis-wrapper__bottom-title">{analysis.channelName}</h3>
                <div className="analysis-wrapper__results">
                  <div className="analysis-wrapper__result">{analysis.groups?.[0]?.label}</div>
                  <div className="analysis-wrapper__result">{analysis.groups?.[0]?.value}</div>
                  {analysis.groups?.[1] && (
                    <div className="analysis-wrapper__result">{analysis.groups?.[1]?.label}</div>
                  )}
                  {analysis.groups?.[1] && (
                    <div className="analysis-wrapper__result">{analysis.groups?.[1]?.value}</div>
                  )}
                </div>
              </div>
            ),
        )}
      </div>
      <div className="analysis-wrapper__bottom-part">
        {testResultState.testResult.resultAnalysis?.map(
          (analysis, index, resultAnalysis) =>
            index >= resultAnalysis.length / 2 && (
              <div className="analysis-wrapper__parameter" key={guid()}>
                <h3 className="analysis-wrapper__bottom-title">{analysis.channelName}</h3>
                <div className="analysis-wrapper__results">
                  <div className="analysis-wrapper__result">{analysis.groups?.[0]?.label}</div>
                  <div className="analysis-wrapper__result">{analysis.groups?.[0]?.value}</div>
                  {analysis.groups?.[1] && (
                    <div className="analysis-wrapper__result">{analysis.groups?.[1]?.label}</div>
                  )}
                  {analysis.groups?.[1] && (
                    <div className="analysis-wrapper__result">{analysis.groups?.[1]?.value}</div>
                  )}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  ) : null
}

export default PcrAnalysisData
