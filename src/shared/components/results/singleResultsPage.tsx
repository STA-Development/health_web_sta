import * as Sentry from '@sentry/nextjs'
import React, {useEffect, useState} from 'react'
import testResultManager from '@fh-health/manager/testResultManager'
import {useRouter} from 'next/router'
import getV3RecaptchaToken from '@fh-health/utils/getV3RecaptchaToken'
import Image from 'next/image'
import TestResultContextStaticData from '@fh-health/static/testResultContextStaticData'
import {UseTestResultDataStateValue} from '@fh-health/contexts/testResultContext'
import useResultTemplate from '@fh-health/hooks/resultTemplateHook'
import Card from '@fh-health/components/utils/card'
import Header from '../base/header/header'
import TestResult from './testResult'
import LabInformation from './labInformation'
import Footer from '../base/footer/footer'
import PcrAnalysisData from './pcrAnalysisData'
import BioradAntiBodyData from './bioradAntiBodyData'
import AntiBodyAnalysisData from './antyBodyAnalysisData'
import ComponentPreloadView from './componentPreloadView'
import VaccineResult from './vaccineResult'

const SingleTestResultPage = ({isPublicUser}: {isPublicUser: boolean}) => {
  const {testResultState, setTestResultState} = UseTestResultDataStateValue()
  const router = useRouter()
  const {testResultId} = router.query
  const [resultId, setResultId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isPublicTestResultExpired, setIsPublicTestResultExpired] = useState<boolean>(false)
  const {isAntibodyResult, isBioradAntibodyResult, isPCRResult, isVaccineResult, isCovidFluResult} =
    useResultTemplate()

  const isAntibodyTemplate = isAntibodyResult(testResultState?.testResult?.testType)
  const isBioradAntibodyTemplate = isBioradAntibodyResult(
    testResultState?.testResult?.testType,
    testResultState?.testResult?.templateId,
  )
  const isPCRTemplate = isPCRResult(
    testResultState?.testResult?.testType,
    testResultState?.testResult?.templateId,
  )

  const isVaccineTemplate = isVaccineResult(testResultState?.testResult?.testType)
  const isCovidFluTemplate = isCovidFluResult(testResultState?.testResult?.testType)

  const getData = async () => {
    setLoading(true)
    const token = await getV3RecaptchaToken()
    if (!isPublicUser) {
      try {
        const response = await testResultManager.getSingleTestResult(resultId as string)
        if (response.status === 200) {
          const {data} = response.data
          setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT, data})
        }
      } catch (err) {
        const errorObject = {
          err,
          message: 'Private Test Result Load Failed',
        }
        Sentry.captureException(errorObject)
      }
    } else if (token && testResultId) {
      try {
        const response = await testResultManager.getTestResult(token, resultId as string)
        if (response.status === 200) {
          const {data} = response.data
          setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT, data})
        }
      } catch (err) {
        setIsPublicTestResultExpired(true)
        const errorObject = {
          err,
          message: 'Public Test Result Load Failed',
        }
        Sentry.captureException(errorObject)
      }
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
          {!isCovidFluTemplate && !isVaccineTemplate && <TestResult />}
          {isVaccineTemplate && <VaccineResult />}
          {isAntibodyTemplate && <AntiBodyAnalysisData />}
          {isBioradAntibodyTemplate && <BioradAntiBodyData />}
          {isPCRTemplate && <PcrAnalysisData />}
          <LabInformation />
          <Footer isPublicUser={isPublicUser} />
        </div>
      ) : (
        <div className="pure-block-wrapper">
          {isPublicTestResultExpired ? (
            <div className="card-wrapper">
              <Card permissions={false}>
                <div className="card__media card__media_sm">
                  <Image src="/error-cross.svg" alt="kit number" height={64} width={64} />
                </div>
                <div className="card__content">
                  <h4 className="card__content-title">Access Code Expired</h4>
                  <p className="card__content-message">
                    QR code link has expired. Please contact us <br />
                    through the chat or fhhealth.com for any questions or concerns.
                  </p>
                </div>
              </Card>
              <p className="card-wrapper__message">
                Need help? <br />
                Live Chat available on{' '}
                <a href="https://www.fhhealth.com/" className="em-link">
                  fhhealth.com
                </a>
              </p>
            </div>
          ) : (
            <ComponentPreloadView />
          )}
        </div>
      )}
    </div>
  )
}

export default SingleTestResultPage
