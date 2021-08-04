import Header from "../component/base/header/header"
import TestResult from "../component/testResult"
import LabInformation from "../component/labInformation"
import Footer from "../component/base/footer/footer"
import PcrAnalysisData from "../component/pcrAnalysisData"
import BioradAntiBodyData from "../component/bioradAntiBodyData"
import AntiBodyAnalysisData from "../component/antyBodyAnalysisData"
import {load, ReCaptchaInstance} from "recaptcha-v3"
import {useEffect, useState} from "react"
import {UseTestResultDataStateValue} from "../context/testResultContext"
import {TestResultContextStaticData} from "../static/TestResultContextStaticData"
import {getTestResult} from "../manager/TestResultManager"
import {useRouter} from "next/router"
import ComponentPreloadView from "../component/componentPreloadView"

export enum TestTypes {
  AntibodyAll = "Antibody_All",
  PCR = "PCR",
  RapidAntigenAtHome = "RapidAntigenAtHome",
  BioradAntiBody = "Biorad-Anti-Body",
}

export default function Home() {
  const {testResultState, setTestResultState} = UseTestResultDataStateValue()
  const router = useRouter()
  const {testResultId} = router.query

  const [resultId, setResultId] = useState<string>("")
  const getRecaptcha = async () => {
    const captchaToken = process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY
    if (captchaToken) {
      return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) => {
        return recaptcha.execute("submit")
      })
    } else {
      console.error("Captcha token is undefined")
    }
  }
  useEffect(() => {
    if (testResultId) {
      setResultId(testResultId as string)
    }
  }, [testResultId, testResultState])

  const getData = async () => {
    const token = await getRecaptcha()
    try {
      if (token && testResultId) {
        const response = await getTestResult(token, resultId as string)
        if (response.status === 200) {
          const data = response.data.data
          setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT, data})
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (resultId) {
        await getData()
      }
    })()
  }, [resultId])
  return (
    <>
      {testResultState.testResult.testType.length ? (
        <div className="carcass">
          <Header />
          <TestResult />
          {testResultState?.testResult?.testType === TestTypes?.AntibodyAll && (
            <AntiBodyAnalysisData />
          )}
          {testResultState?.testResult?.testType === TestTypes?.PCR &&
          testResultState?.testResult?.templateId === TestTypes.BioradAntiBody ? (
            <BioradAntiBodyData />
          ) : (
            testResultState?.testResult.testType === TestTypes.PCR && <PcrAnalysisData />
          )}
          <LabInformation />
          <Footer />
        </div>
      ) : (
        <ComponentPreloadView />
      )}
    </>
  )
}
