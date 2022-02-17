import React from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'

const AntiBodyAnalysisData = () => {
  const {testResultState} = UseTestResultDataStateValue()

  return testResultState.testResult.resultAnalysis?.length ? (
    <div className="anti-body">
      <h3 className="anti-body__title">Test Analysis Data</h3>
      <p className="anti-body__description">Antibody Cut-off Index Values</p>
      {testResultState.testResult.resultAnalysis[0]?.groups.map((analysis, index) => (
        <div className="result-button" key={index}>
          <div className="result-button__left-part">{analysis.label}</div>
          <div className={`result-button__right-part ${analysis.value.toLocaleLowerCase()}`}>
            {analysis.value}
          </div>
        </div>
      ))}
      <p className="anti-body__results-title">Reference Cut-off Index:</p>
      <p className="anti-body__results-description">
        0.8 - &#60; 1.0 = Indeterminate <br />
        ≥ 1.0 = Positive <br />
        &#62; 0.8 = Negative{' '}
      </p>
    </div>
  ) : null
}

export default AntiBodyAnalysisData
