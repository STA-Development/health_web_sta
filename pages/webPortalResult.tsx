import ResultsHeader from "../component/resultsHeader";
import TestResultContainer from "../component/testResultContainer"
import SingleTestResult from "../component/singleTestResult";
import {useEffect, useState} from "react";
import moment from "moment";
import testResultManager from "../manager/TestResultManager";

interface IResult {
    detailsAvailable: boolean,
    firstName: string,
    id: string,
    lastName: string,
    name: string,
    result: string,
    style: string,
    testDateTime: string,
}

const WebPortalResults = () => {
    const [results, setResults] = useState<IResult[]>([])
    const [single, setSingle] = useState<boolean>(false)
    const getData = async () => {
        let response = await testResultManager.getAllTestResults()
        if (response.status) {
            setResults(response.data.data)
        }
    }
    const renderResultsList = () => {
        return results.map((test: IResult) =>
            moment(test.testDateTime).format("YYYY-MM-DD") > moment().subtract(7, "days").format("YYYY-MM-DD") &&
            <SingleTestResult
                testName={test.name}
                patientName={`${test.firstName} ${test.lastName}`}
                testDate={moment(test.testDateTime).format("ddd, MMM DD, YYYY")}
                backgroundClass={test.style}
                status={test.result}
                redirectUrl={test.id}
            />
        )
    }

    useEffect(() => {
        (async () => {
            await getData()
        })()
    }, [single])
    return (
        <div className="web-portal-results">
            <ResultsHeader header="Latest Results"/>
            <TestResultContainer>
                {renderResultsList()}
            </TestResultContainer>
            <ResultsHeader header="Result History"/>
            <TestResultContainer>
                {results.map((test: IResult, index: number) =>
                    <>
                        {
                            (index == 0 ||
                                moment(test.testDateTime).format("MMMM YYYY") !=
                                moment(results[index - 1].testDateTime).format("MMMM YYYY")) &&
                            <p className="result-date">{moment(test.testDateTime).format("MMMM YYYY")}</p>
                        }
                        <SingleTestResult
                            testName={test.name}
                            patientName={`${test.firstName} ${test.lastName}`}
                            testDate={moment(test.testDateTime).format("ddd, MMM DD, YYYY")}
                            backgroundClass={test.style}
                            status={test.result}
                            redirectUrl={test.id}
                        />
                    </>
                )}
            </TestResultContainer>
        </div>
    )
}
export default WebPortalResults
