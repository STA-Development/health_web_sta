import Header from '@fh-health/component/base/header/header'
import TestResult from '@fh-health/component/results/testResult'
import LabInformation from '@fh-health/component/results/labInformation'
import Footer from '@fh-health/component/base/footer/footer'
import PcrAnalysisData from '@fh-health/component/results/pcrAnalysisData'
import * as Sentry from '@sentry/nextjs'
import BioradAntiBodyData from '@fh-health/component/results/bioradAntiBodyData'
import AntiBodyAnalysisData from '@fh-health/component/results/antyBodyAnalysisData'
import React, {useEffect, useState} from 'react'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'
import TestResultContextStaticData from '@fh-health/static/testResultContextStaticData'
import testResultManager from '@fh-health/manager/testResultManager'
import {useRouter} from 'next/router'
import ComponentPreloadView from '@fh-health/component/results/componentPreloadView'
import {TestTypes} from '@fh-health/types/context/testResultContext'
import getV3RecaptchaToken from '@fh-health/utils/getV3RecaptchaToken'

const SingleTestResultPage = ({isPublicUser}: {isPublicUser: boolean}) => {
  const {testResultState, setTestResultState} = UseTestResultDataStateValue()
  const router = useRouter()
  const {testResultId} = router.query
  const [resultId, setResultId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async () => {
    setLoading(true)
    const token = await getV3RecaptchaToken()
    try {
      if (!isPublicUser) {
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
    setLoading(false)
  }

  useEffect(() => {
    if (testResultId) {
      setResultId(testResultId as string)
    }
  }, [testResultId, testResultState])

  useEffect(() => {
    ;(async () => {
      if (resultId) {
        await getData()
      }
    })()
  }, [resultId])

  return (
    <div id="carcassFocus">
      {!loading && testResultState.testResult.testType.length ? (
        <div className="carcass">
          <Header />
          <TestResult />
          {testResultState?.testResult?.testType === TestTypes?.AntibodyAll ||
            (testResultState?.testResult?.testType === TestTypes.AntibodyBiorad && (
              <AntiBodyAnalysisData />
            ))}
          {testResultState?.testResult?.testType === TestTypes?.PCR &&
            testResultState?.testResult?.templateId === TestTypes.BioradAntiBody && (
              <BioradAntiBodyData />
            )}
          {testResultState?.testResult?.templateId !== TestTypes.BioradAntiBody &&
            (testResultState?.testResult.testType === TestTypes.PCR ||
              testResultState?.testResult.testType === TestTypes.VirtualTravelPCR ||
              testResultState?.testResult.testType === TestTypes.CovidFluAB ||
              testResultState?.testResult.testType === TestTypes.Covid_FluAB) && (
              <PcrAnalysisData />
            )}
          <LabInformation />
          <Footer />
        </div>
      ) : (
        <ComponentPreloadView />
      )}
    </div>
  )
}

export default SingleTestResultPage