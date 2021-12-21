import React from "react"
import Image from "next/image"
import { useRouter } from 'next/router'
import TestResultIcon from "component/base/header/icon/testResult"

interface ITestResults {
    testName: string
    patientName: string
    testDate: string
    backgroundClass: string
    status: string
    redirectUrl: string
}

const SingleTestResult = ({testName, patientName, testDate, backgroundClass, status, redirectUrl}: ITestResults) => {
    const router = useRouter()

    const handleRedirect = (link: string | undefined) => {
        if(link) {
            router.push(`/my?testResultId=${link}`)
        }
    }

    return (
        <div onClick={() => handleRedirect(redirectUrl)} className="single-result link-to-test">
            <div className="left">
                <TestResultIcon fillColor={`${backgroundClass}-svg`}/>
                <div>
                    <span>{testName}</span>
                    <span>Patient: {patientName}</span>
                    <span>{testDate}</span>
                </div>
            </div>
            <div className="right">
                <div className={`result-status ${backgroundClass}`}>{status.toUpperCase()}</div>
                <Image className="link-to-test" alt="next icon" src="/next.svg" width={16} height={16} />
            </div>
        </div>
    )
}

export default SingleTestResult
