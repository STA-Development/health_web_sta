import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import PureBlock from '@fh-health/component/pureBlock'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import ReactCodeInput from 'react-verification-code-input'
import Notification from '@fh-health/component/notification'
import AuthManager from '@fh-health/manager/authManager'
import * as Sentry from '@sentry/nextjs'
import {UseAuthDataStateValue} from '@fh-health/context/authContext'
import EmailAddressVerified from '@fh-health/component/emailAddressVerified'

const EmailVerification = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errMessage, setErrMessage] = useState<string>('')
  const [timerDuration] = useState<number>(20)
  const [displayDuration, setDisplayDuration] = useState<number>(0)
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verifyButtonState, setVerifyButtonState] = useState<boolean>(false)
  const [isEmailVerificationCompleted, setIsEmailVerificationCompleted] = useState<boolean>(false)
  const {authDataState} = UseAuthDataStateValue()

  const sendEmailVerificationEmail = async () => {
    setLoading(true)
    try {
      await AuthManager.sendEmailVerification()
    } catch (err) {
      Sentry.captureException(err)
      setErrMessage('Something Went Wrong')
    }
    setLoading(false)
  }

  const handleEmailVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    setErrMessage('')
    e.preventDefault()
    try {
      const data = {
        patientId: authDataState.patientAccountInformation.organizations?.[0].patientId,
        organizationId:
          authDataState.patientAccountInformation.organizations?.[0].firebaseOrganizationId,
        code: verificationCode,
      }
      const response = await AuthManager.verifyUserEmail(data)
      if (response.status === 200) {
        setIsEmailVerificationCompleted(true)
      }
    } catch (err) {
      Sentry.captureException(err)
      setErrMessage(err.message)
    }
    setLoading(false)
  }

  const startCountdown = () => {
    let duration = timerDuration
    const timer = setInterval(() => {
      duration -= 1
      setDisplayDuration(duration)
      if (duration === 0) {
        sendEmailVerificationEmail()
        clearInterval(timer)
      }
    }, 1000)
  }

  const handleVerificationCodeChange = (code: string) => {
    setVerificationCode(code)
  }

  const checkCodeValidity = (code: string) => {
    if (code.length === 6) {
      setVerifyButtonState(true)
    } else {
      setVerifyButtonState(false)
    }
  }

  useEffect(() => {
    sendEmailVerificationEmail()
  }, [])
  return isEmailVerificationCompleted ? (
    <EmailAddressVerified />
  ) : (
    <>
      {errMessage && <Notification type="error">{errMessage}</Notification>}
      <div className="pure-block-wrapper">
        <div>
          <PureBlock flow center={false} isNoResults={false}>
            <div>
              <Image src="/logo.svg" width={136} height={16} alt="logo" />
            </div>
            <div>
              <span className="header">Email Verification</span>
            </div>
            <div>
              <span className="message">
                A code has been sent to your Email Address to login to the FH Health Web Portal.
                Please enter it below to continue.
              </span>
            </div>
            <div className="inputGroup inputGroup_verify">
              <ReactCodeInput
                type="text"
                placeholder={['-', '-', '-', '-', '-', '-']}
                onChange={(value: string) => {
                  handleVerificationCodeChange(value)
                  checkCodeValidity(value)
                }}
                className={errMessage ? 'codeInput-err' : ''}
              />
              {displayDuration === 0 ? (
                <div className="inputGroup__resend">
                  <span>Didn&apos;t receive the email?</span>
                  <br />
                  <button
                    type="button"
                    className="button inputGroup__resend_button"
                    onClick={startCountdown}
                  >
                    Resend
                  </button>
                </div>
              ) : (
                <span>Resend Code in {displayDuration}</span>
              )}
              {loading ? (
                <CircleLoader className="middle-loader" />
              ) : (
                <button
                  type="button"
                  className={
                    verifyButtonState && displayDuration === 0
                      ? 'button inputGroup__button'
                      : 'button inputGroup__button inputGroup__button_disabled'
                  }
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEmailVerify(e)}
                >
                  Verify Code
                </button>
              )}
            </div>
          </PureBlock>
        </div>
      </div>
    </>
  )
}

export default EmailVerification
