import {UseTestResultDataStateValue} from "./../context/testResultContext"

const PcrAnalysisData = () => {
  const {testResultState} = UseTestResultDataStateValue()
  return (
    <div className="analysis-wrapper">
      <h3 className="analysis-wrapper__title">Test Analysis Data</h3>
      <div className="analysis-wrapper__top-part">
        {testResultState.testResult.resultAnalysis.map((analysis, index, resultAnalysis) => {
          if (index < resultAnalysis.length / 2) {
            return (
              <div className="analysis-wrapper__parameter">
                <h3 className="analysis-wrapper__bottom-title">{analysis.channelName}</h3>
                <div className="analysis-wrapper__results">
                  <div className="analysis-wrapper__first-result">{analysis.groups[0].label}</div>
                  <div className="analysis-wrapper__second-result">{analysis.groups[0].value}</div>
                  <div className="analysis-wrapper__third-result">C(t)</div>
                  <div className="analysis-wrapper__forth-result">{analysis.groups[1].value}</div>
                </div>
              </div>
            )
          }
        })}
      </div>
      <div className="analysis-wrapper__bottom-part">
        {testResultState.testResult.resultAnalysis.map((analysis, index, resultAnalysis) => {
          if (index >= resultAnalysis.length / 2) {
            return (
              <div className="analysis-wrapper__parameter">
                <h3 className="analysis-wrapper__bottom-title">{analysis.channelName}</h3>
                <div className="analysis-wrapper__results">
                  <div className="analysis-wrapper__first-result">{analysis.groups[0].label}</div>
                  <div className="analysis-wrapper__second-result">{analysis.groups[0].value}</div>
                  <div className="analysis-wrapper__third-result">C(t)</div>
                  <div className="analysis-wrapper__forth-result">{analysis.groups[1].value}</div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
export default PcrAnalysisData
