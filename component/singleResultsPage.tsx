import Header from '@fh-health/component/base/header/header'
import TestResult from '@fh-health/component/testResult'
import LabInformation from '@fh-health/component/labInformation'
import Footer from '@fh-health/component/base/footer/footer'
import PcrAnalysisData from '@fh-health/component/pcrAnalysisData'
import * as Sentry from '@sentry/nextjs'
import BioradAntiBodyData from '@fh-health/component/bioradAntiBodyData'
import AntiBodyAnalysisData from '@fh-health/component/antyBodyAnalysisData'
import {load, ReCaptchaInstance} from 'recaptcha-v3'
import {useEffect, useState} from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import {TestResultContextStaticData} from '@fh-health/static/TestResultContextStaticData'
import testResultManager from '@fh-health/manager/TestResultManager'
import {useRouter} from 'next/router'
import ComponentPreloadView from '@fh-health/component/componentPreloadView'

export enum TestTypes {
  AntibodyAll = 'Antibody_All',
  PCR = 'PCR',
  RapidAntigenAtHome = 'RapidAntigenAtHome',
  BioradAntiBody = 'Biorad-Anti-Body',
}

export default function SingleTestResultPage(props: {isPublicUser: boolean}) {
  const {testResultState, setTestResultState} = UseTestResultDataStateValue()
  const router = useRouter()
  const {testResultId} = router.query
  const [resultId, setResultId] = useState<string>('')
  const getRecaptcha = async () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) =>
        recaptcha.execute('submit'),
      )
    }
    console.error('Captcha token is undefined')
  }
  useEffect(() => {
    if (testResultId) {
      setResultId(testResultId as string)
    }
  }, [testResultId, testResultState])

  const getData = async () => {
    const token = await getRecaptcha()
    try {
      if (!props.isPublicUser) {
        const response = await testResultManager.getSingleTestResult(resultId as string)
        if (response.status === 200) {
          const {data} = response.data
          setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT, data})
        }
      } else if (token && testResultId) {
        const response = await testResultManager.getTestResult(token, resultId as string)
        if (response.status === 200) {
          const {data} = response.data
          setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT, data})
        }
      }
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (resultId) {
        await getData()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
