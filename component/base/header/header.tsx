import RapidInconclusiveIcon from "./icon/RapidInconclusiveIcon";
import {TestResultContextStaticData} from "../../../static/TestResultContextStaticData";
import {UseTestResultDataStateValue} from "../../../context/testResultContext";

 const Header = ()=>{
     const {testResultState} = UseTestResultDataStateValue()
    return (
        <div className="header-wrapper">
            <div className="test-type-wrapper">
                <RapidInconclusiveIcon/>
                <div className="test-info">
                    <p className="test-info__result">  {testResultState.testResult.result} </p>
                    <p className="test-info__date">Date: Dec 18, 2020 @ 11:59am</p>
                </div>
            </div>
            <div className="user-info">
                <div className="left-column">
                    <div className="field-answer-wrapper">
                        <p className="field">FIRST NAME</p>
                        <p className="answer user-main-answer">{testResultState.testResult.firstName}</p>
                    </div>
                    <div className="field-answer-wrapper">
                        <p className="field">LAST NAME</p>
                        <p className="answer user-main-answer">{testResultState.testResult.lastName}</p>
                    </div>
                </div>
                <div className="right-column">
                    <div className="right-column__first">
                        <div className="right-column__first__top">
                            <p className="field">ADDRESS</p>
                            <p className="answer user-secondary-answer">502 Alexandra Boulevard <br/>
                                Suite 5053 <br/>
                                Toronto, ON <br/>
                                M4R 5T3
                            </p>
                        </div>
                        <div className="right-column__first__bottom">
                            <div className="right-column__first__bottom__left">
                                <p className="field">Gender</p>
                                <p className="answer user-secondary-answer">Male</p>

                                <p className="field">country</p>
                                <p className="answer user-secondary-answer">Canada</p>
                            </div>
                            <div className="right-column__first__bottom__right">
                                <p className="field">Phone</p>
                                <p className="answer user-secondary-answer">(000)-000-0000</p>

                                <p className="field">OHIP</p>
                                <p className="answer user-secondary-answer">000 000 000</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-column__second">
                        <p className="field">date of birth</p>
                        <p className="answer user-secondary-answer">April 20, 1989</p>
                        <p className="field">passport no.</p>
                        <p className="answer user-secondary-answer">ZE000059</p>
                        <p className="field">issuing country</p>
                        <p className="answer user-secondary-answer">Canada</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header