import {UseTestResultDataStateValue} from "../../../context/testResultContext";
import AntiBodySVG from "./icon/anti-body";
import PcrSvg from "./icon/pcrIcon";

 const Header = ()=>{
     const {testResultState} = UseTestResultDataStateValue()
    return (
        <div className="header-wrapper">
            <div className="test-type-wrapper">
                {testResultState?.testResult.testType === "Antibody_All" && <AntiBodySVG style = {testResultState.testResult.style.toLowerCase()}/>}
                {testResultState?.testResult.testType ==="PCR" && <PcrSvg style = {testResultState.testResult.style.toLowerCase()}/>}

                {/*<RapidInconclusiveIcon/>*/}
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
                            <p className="answer user-secondary-answer">{testResultState.testResult.address}<br/>
                                {/*Suite 5053 <br/>*/}
                                {/*Toronto, ON <br/>*/}
                                {/*M4R 5T3*/}
                            </p>
                        </div>
                        <div className="right-column__first__bottom">
                            <div className="right-column__first__bottom__left">
                                <p className="field">Gender</p>
                                <p className="answer user-secondary-answer">{testResultState.testResult.gender}</p>

                                <p className="field">country</p>
                                <p className="answer user-secondary-answer">Canada</p>
                            </div>
                            <div className="right-column__first__bottom__right">
                                <p className="field">Phone</p>
                                <p className="answer user-secondary-answer">{testResultState.testResult.phone}</p>

                                <p className="field">OHIP</p>
                                <p className="answer user-secondary-answer">{testResultState.testResult.ohip}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-column__second">
                        <p className="field">date of birth</p>
                        <p className="answer user-secondary-answer">{testResultState.testResult.dateOfBirth}</p>
                        <p className="field">passport no.</p>
                        <p className="answer user-secondary-answer">ZE000059</p>
                        <p className="field">issuing country</p>
                        <p className="answer user-secondary-answer">{testResultState.testResult.issuingCountry}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header