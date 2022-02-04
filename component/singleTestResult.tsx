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

enum testStatus {
    InProgress = "In Progress"
}

const SingleTestResult = ({testName, patientName, testDate, backgroundClass, status, redirectUrl}: ITestResults) => {
    const router = useRouter()

    const handleRedirect = (link: string | undefined) => {
        if (link) {
            router.push(`/my?testResultId=${link}#carcassFocus`)
        }
    }

    return (
        <div
          onClick={() => handleRedirect(redirectUrl)}
          className={`single-result link-to-test ${(status === testStatus.InProgress) && "single-result_disabled"}`}
        >
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
                {!(status === testStatus.InProgress) && <Image className="link-to-test" alt="next icon" src="/next.svg" width={16} height={16} />}
            </div>
        </div>
    )
}

export default SingleTestResult
