import Image from "next/image";
import AntiBodySVG from "./base/header/icon/anti-body";
import {TestTypes} from "../pages";
import PcrSvg from "./base/header/icon/pcrIcon";
import RapidAtHome from "./base/header/icon/RapidAtHome";
const SingleTestResult = (props: any) => {

    return (
        <div className="single-result">
            <div className="left">
                {/*{testResultState?.testResult.testType === TestTypes.AntibodyAll && (*/}
                {/*    <AntiBodySVG style={testResultState.testResult.style.toLowerCase()} />*/}
                {/*)}*/}
                {/*{testResultState?.testResult.testType === TestTypes.PCR &&*/}
                {/*testResultState?.testResult.templateId === TestTypes.BioradAntiBody ? (*/}
                {/*    <AntiBodySVG style={testResultState.testResult.style.toLowerCase()} />*/}
                {/*) : (*/}
                {/*    testResultState?.testResult.testType === TestTypes.PCR && (*/}
                {/*        <PcrSvg style={testResultState.testResult.style.toLowerCase()} />*/}
                {/*    )*/}
                {/*)}*/}
                {/*{testResultState?.testResult.testType === TestTypes.RapidAntigenAtHome && (*/}
                {/*    <RapidAtHome style={testResultState.testResult.style?.toLowerCase()} />*/}
                {/*)}*/}
                <div>
                    <span>{props.testName}</span>
                    <span>Patient: {props.patientName}</span>
                    <span>{props.testDate}</span>
                </div>
            </div>
            <div className="right">
                <div className={`result-status ${props.backgroundClass}`}>{props.status.toUpperCase()}</div>
                <Image onClick={} src="/next.svg" width={16} height={16}></Image>
            </div>
        </div>
    )
}
export default SingleTestResult