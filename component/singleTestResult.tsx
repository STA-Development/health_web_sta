import Image from "next/image";
import { useRouter } from 'next/router'
import React from 'react';
const SingleTestResult = (props: {
    testName: string
    patientName: string
    testDate: string
    backgroundClass: string
    status:string
    redirectUrl?:string
}) => {
    const router = useRouter()
    const handleRedirect = (link: string | undefined) => {
        if(link) {
            router.push(link)
        }
    }
    return (
        <div className="single-result">
            <div className="left">
                {/*TODO: Should be Used when endpoint will be connected*/}
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
                <Image className="link-to-test" alt="next icon" onClick={() => handleRedirect(props.redirectUrl)} src="/next.svg" width={16} height={16} />
            </div>
        </div>
    )
}
export default SingleTestResult