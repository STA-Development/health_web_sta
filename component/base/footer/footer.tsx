import Image from "next/image"
import {UseTestResultDataStateValue} from "../../../context/testResultContext";

const Footer = ()=> {
    const {testResultState} = UseTestResultDataStateValue()
    function replaceHTMLWithLineBreaks(text:string) {
        return text !== undefined ? text.replace(/<br\/>/gi, '\n') : "";
    }
    return (
        <div className="footer-wrapper">
            <div className="important-information">
                <p className="important-information__title">Important Information</p>
                <div className="content" dangerouslySetInnerHTML={{__html: testResultState.testResult.importantInfo}}></div>
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
                <div className="content" dangerouslySetInnerHTML={{__html: testResultState.testResult.legalNotes}}></div>
            </div>
        </div>
    )
}
export default Footer

