import ResultsHeader from "../component/resultsHeader";
import TestResultContainer from "../component/testResultContainer"
import SingleTestResult from "../component/singleTestResult";
import {useEffect} from "react";
import testResultManager from "../manager/TestResultManager";

const WebPortalResults = () => {
    const getData = async () => {
        //TODO: Will fetch the data and draw, this function is not fully written
        const response = await testResultManager.getAllTestResults()
        console.log(response)
    }

    useEffect(() => {
        (async () => {
            await getData()
        })()
    })
    return (
        <div className="web-portal-results">
            <ResultsHeader header="Latest Results"/>
            <TestResultContainer>
                <span className="result-date">December 2020</span>
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
            </TestResultContainer>
            <ResultsHeader header="Result History"/>
            <TestResultContainer>
                <span className="result-date">December 2020</span>
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                />
                <SingleTestResult
                    testName={"Lab Test"}
                    patientName={"Me"}
                    testDate={"Wed, Dec 23, 2020"}
                    backgroundClass={"danger"}
                    status="positive"
                    redirectUrl={"http://localhost:3000/?testResultId=bb24bd94052842ce9fd123add1bbfa661765fa0d94bf59ab11e46925d4c4739081c1754d7a06bd66db936a3e68ef56d9"}
                />
            </TestResultContainer>
        </div>
    )
}
export default WebPortalResults
