import Header from "../component/base/header/header"
import TestResult from "../component/testResult"
import LabInformation from "../component/labInformation"
import Footer from "../component/base/footer/footer"
import PcrAnalysisData from "../component/pcrAnalysisData"
import AntiBodyAnalysisData from "../component/antyBodyAnalysisData"
import {load, ReCaptchaInstance} from "recaptcha-v3"
import {useEffect} from "react"
import {UseTestResultDataStateValue} from "../context/testResultContext"
import {TestResultContextStaticData} from "../static/TestResultContextStaticData"
import {getTestResult} from "../manager/TestResultManager"
export enum TestTypes {
  AntibodyAll = "Antibody_All",
  PCR = "PCR",
  RapidAntigenAtHome = "RapidAntigenAtHome",
}
export default function Home() {
  const {testResultState, setTestResultState} = UseTestResultDataStateValue()
  const getRecaptcha = async () => {
    const captchaToken = process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY;
    if(captchaToken) {
      return await load(process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY as string).then(
        (recaptcha: ReCaptchaInstance) => {
          return recaptcha.execute("submit")
        },
      )
    } else {
      console.error("Captcha token is undefined")
    }
  }
  const getData = async () => {
    const token = await getRecaptcha()
    try {
      const response = await getTestResult(
        token,
        "30286d6f7fb6fd55d9d9dd2975ad08bad3cb819bb51eca309228703f080b546df7a4efd8709197145db79a81099b8eb8",
      )
      if (response.status === 200) {
        const data = response.data.data
        setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT, data})
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      await getData()
    })();
  }, [])
  return (
    <div className="carcass">
      <Header />
      <TestResult />
      {testResultState?.testResult.testType === TestTypes.AntibodyAll && <AntiBodyAnalysisData />}
      {testResultState?.testResult.testType === TestTypes.PCR && <PcrAnalysisData />}
      <LabInformation />
      <Footer />
    </div>
  )
}
