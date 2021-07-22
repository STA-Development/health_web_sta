import {UseTestResultDataStateValue} from "./../context/testResultContext";
import moment from "moment";
const LabInformation = ()=>{
    const {testResultState} = UseTestResultDataStateValue()
    return (
        <div className="lab-info-wrapper">
            <div className="left-part-wrapper">
                <div className="left-top-wrapper">
                    <div className="first-column">
                        <p className="field">date of test</p>
                        <p className="answer test-answer">{moment(testResultState.testResult.dateTime).format('MMMM Do, h:mm a')}</p>

                        <p className="field">test-type</p>
                        <p className="answer test-answer">Rapid Antigen</p>
                    </div>

                    <div className="second-column">
                        <p className="field">date of results</p>
                        <p className="answer test-answer">{moment(testResultState.testResult.resultMetaData.resultDate).format('MMMM Do, h:mm a')}</p>

                        <p className="field">collection method</p>
                        <p className="answer test-answer">Nasal</p>
                    </div>
                </div>
                <div className="left-bottom-wrapper">
                    <p className="field">test equipment (health canada approved)</p>
                    <p className="answer test-answer">Allplex 2019-nCoV Assay, Seegene, Inc.</p>
                </div>
            </div>
            <div className="right-part-wrapper">
                <div className="right-part-first-column">
                    <p className="field">collection nurse</p>
                    <p className="answer test-answer">Daye Choi RPN</p>

                    <p className="field">collection nurse</p>
                    <p className="answer test-answer">Daye Choi RPN</p>
                </div>
                <div className="right-part-second-column">
                    <p className="field">ordering physician</p>
                    <p className="answer test-answer">Dr. Blecher</p>

                    <p className="field">location</p>
                    <p className="answer test-answer">Toronto, ON</p>
                </div>
            </div>
        </div>
    )
}
export default LabInformation