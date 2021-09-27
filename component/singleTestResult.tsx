import Image from "next/image";
import { useRouter } from 'next/router'
import React from 'react';
import TestResultIcon from "./base/header/icon/testResult";
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
            router.push(`/my?testResultId=${link}`)
        }
    }
    return (
        <div className="single-result">
            <div className="left">
                <TestResultIcon fillColor={`${props.backgroundClass}-svg`}/>
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