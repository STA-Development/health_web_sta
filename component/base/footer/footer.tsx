import Image from "next/image"
import {UseTestResultDataStateValue} from "../../../context/testResultContext";

const Footer = ()=> {
    const {testResultState} = UseTestResultDataStateValue()
    return (
        <div className="footer-wrapper">
            <div className="important-information">
                <p className="important-information__title">Important Information</p>
                <p className='important-information__description'>
                    {testResultState.testResult.importantInfo}
                </p>

            </div>
            <div className="doctor-info">
                <Image priority={true} src="/signage.webp" alt="signage" width={"225"} height={"77px"} />
                <div className="doctor-info-title">
                    Dr. Peter Blecher <br/>
                    FH Health Physician
                </div>

            </div>
            <div className="legal-notice">
                <h4 className="legal-notice__title">Legal Notice</h4>
                <p className="legal-notice__description"> {testResultState.testResult.legalNotes}</p>
            </div>
        </div>
    )
}
export default Footer

