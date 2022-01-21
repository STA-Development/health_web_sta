import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import PureBlock from '@fh-health/component/pureBlock'
import {UseAuthDataStateValue} from '@fh-health/context/authContext'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'
import firebase from 'lib/firbase'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import * as Sentry from '@sentry/nextjs'
import ReactCodeInput from 'react-verification-code-input'
import {useRouter} from 'next/router'
import Notification from '@fh-health/component/notification'
import AuthManager from '@fh-health/manager/authManager'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import Card from "@fh-health/component/utils/card"

interface IFirebaseAuthProps {
  user?: {
    getIdToken: () => Promise<string>
  }
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState<boolean>(false)
  const [verificationResult, setVerificationResult] = useState<{
    confirm: (value: string) => Promise<object>
  }>()
  const [loading, setLoading] = useState<boolean>(false)
  const {authDataState, setAuthDataState} = UseAuthDataStateValue()
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')
  const [timerDuration] = useState<number>(20)
  const [displayDuration, setDisplayDuration] = useState<number>(0)
  const [loginButtonState, setLoginButtonState] = useState<boolean>(false)
  const [verifyButtonState, setVerifyButtonState] = useState<boolean>(false)
  const [smsSuccessView, setSmsSuccessView] = useState<boolean>(false)

  const getFirebaseCaptcha = () => {
    firebase.auth().settings.appVerificationDisabledForTesting =
      process.env.APP_TESTING_MODE === 'true'
    const reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('re-captcha', {
      size: 'invisible',
    })
    reCaptchaVerifier.render()
    setAuthDataState({type: AuthContextStaticData.UPDATE_RE_CAPTCHA, reCaptchaVerifier})
  }

  const getPatientAccountInformation = async () => {
    try {
      const response = await AuthManager.getPatientInformation()
      if (response.data.data) {
        setAuthDataState({
          type: AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION,
          patientAccountInformation: response?.data?.data,
        })
      }
      return response?.data?.data
    } catch (e) {
      Sentry.captureException(e)
    }
  }

  const sendSMSToPhoneNumber = async (phone?: string) => {
    setWarningMessage('')
    try {
      return await firebase
        .auth()
        .signInWithPhoneNumber(
          phone || `+${phoneNumber}`,
          authDataState.reCaptchaVerifier as firebase.auth.RecaptchaVerifier,
        )
    } catch (err) {
      Sentry.captureException(err)
      getFirebaseCaptcha()
      setWarningMessage(err.message)
    }
  }

  const handlePhoneSMSSend = async () => {
    setLoading(true)
    const result = await sendSMSToPhoneNumber()
    if (result?.verificationId) {
      setVerificationResult(result)
      setAuthDataState({type: AuthContextStaticData.UPDATE_PHONE_NUMBER, phoneNumber})
      setIsVerificationCodeSent(true)
    }
    setLoading(false)
  }

  const startCountdown = () => {
    let duration = timerDuration
    const timer = setInterval(() => {
      duration -= 1
      setDisplayDuration(duration)
      if (duration === 0) {
        handlePhoneSMSSend()
        clearInterval(timer)
      }
    }, 1000)
  }

  const handleVerificationCodeChange = (code: string) => {
    setVerificationCode(code)
  }

  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number)
  }

  const handleVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    setErrMessage('')
    e.preventDefault()
    if (!authDataState.reCaptchaVerifier) {
      getFirebaseCaptcha()
    } else if (verificationResult) {
      try {
        const result: IFirebaseAuthProps = await verificationResult.confirm(verificationCode)
        const {user} = result
        if (user) {
          user.getIdToken().then((token: string) => {
            ;(async () => {
              localStorage.setItem('accessToken', token)
              setAuthDataState({type: AuthContextStaticData.UPDATE_AUTH_TOKEN, token})
              const patientAccountInformation = await getPatientAccountInformation()
              setLoading(false)
              if (patientAccountInformation) {
                if (!patientAccountInformation?.isEmailVerified) {
                  router.push(`/auth/emailVerification`)
                } else {
                  router.push(`/results/list`)
                }
              } else {
                setSmsSuccessView(true)
              }
            })()
          })
        }
      } catch (err) {
        Sentry.captureException(err)
        getFirebaseCaptcha()
        setErrMessage(err.message)
        setLoading(false)
      }
    }
  }

  const checkPhoneNumber = (value: string, type: string) => {
    if (type === 'login') {
      const maskValues = Array.from(value)
      const pureNumber = maskValues.filter((char: string) =>
        !Number.isNaN(Number(char)) ? char : false,
      )

      if (pureNumber.length === 11) setLoginButtonState(true)
      else setLoginButtonState(false)
    } else if (value.length === 6) setVerifyButtonState(true)
    else setVerifyButtonState(false)
  }

  const displaySmsVerificationSuccessView = () => (
    <div className="card-wrapper">
      <Card permissions={false}>
        <div className="card__media card__media_sm">
          <Image src="/check.svg" alt="check" height={64} width={64} />
        </div>
        <div className="card__content">
          <h4 className="card__content-title">Phone Number Verified!</h4>
          <p className="card__content-message">
            Your Mobile Phone Number has been verified.
            Your results will be sent to you via SMS as soon as they are available
          </p>
        </div>
        <button
          type="button"
          className="button card__button"
          onClick={() => router.push('/auth/createProfile')}
        >
          Continue
        </button>
      </Card>

      <p className="card-wrapper__message">
        Need help? <br />
        Live Chat available on{' '}
        <a href="https://www.fhhealth.com/" className="em-link">
          fhhealth.com
        </a>
      </p>
    </div>
  )

  useEffect(() => {
    getFirebaseCaptcha()

    return () => {
      setAuthDataState({type: AuthContextStaticData.UPDATE_RE_CAPTCHA, reCaptchaVerifier: ''})
    }
  }, [])

  return (
    <>
      {warningMessage && <Notification type="warning">{warningMessage}</Notification>}
      {errMessage && <Notification type="error">{errMessage}</Notification>}
      <div className="pure-block-wrapper">
        <div>
          <button type="button" className="hidden" id="re-captcha">
            {' '}
          </button>
          {!isVerificationCodeSent ? (
            <>
              <PureBlock flow center={false} isNoResults={false}>
                <div className="logo">
                  <Image src="/logo.svg" width={136} height={16} alt="logo" />
                </div>
                <h4 className="header">Login</h4>
                <p className="message">Enter your mobile number to secure your access</p>
                <div className="inputGroup">
                  <span>
                    Phone Number <em>*</em>
                  </span>
                  <PhoneInput
                    country="ca"
                    value={phoneNumber}
                    onChange={(phone) => {
                      handlePhoneNumberChange(phone)
                      checkPhoneNumber(phone, 'login')
                    }}
                    inputClass={warningMessage ? 'inputGroup__input_err' : ''}
                  />

                  {loading ? (
                    <CircleLoader className="middle-loader" />
                  ) : (
                    <button
                      type="button"
                      onClick={handlePhoneSMSSend}
                      className={
                        loginButtonState
                          ? 'button inputGroup__button'
                          : 'button inputGroup__button inputGroup__button_disabled'
                      }
                      data-cy="next"
                    >
                      Next
                    </button>
                  )}
                </div>
              </PureBlock>
              <span className="need-help-info">
                <p> Need help? </p>
                <p>
                  {' '}
                  Live Chat available on{' '}
                  <a href="https://www.fhhealth.com/" className="link">
                    fhhealth.com
                  </a>{' '}
                </p>
              </span>
            </>
          ) : (
            <>
              {!smsSuccessView && (
                <PureBlock flow center={false} isNoResults={false}>
                  <div>
                    <Image src="/logo.svg" width={136} height={16} alt="logo" />
                  </div>
                  <h4 className="header">SMS Verification</h4>
                  <p className="message">
                    A code has been sent to your Mobile Phone Number to login to the FH Health Web
                    Portal. Please enter it below to continue.
                  </p>
                  <div className="inputGroup inputGroup_verify">
                    <ReactCodeInput
                      type="number"
                      placeholder={['-', '-', '-', '-', '-', '-']}
                      onChange={(value) => {
                        handleVerificationCodeChange(value)
                        checkPhoneNumber(value, 'verify')
                      }}
                      className={errMessage ? 'codeInput-err' : ''}
                    />
                    {displayDuration === 0 ? (
                      <div className="inputGroup__resend">
                        <button
                          type="button"
                          onClick={startCountdown}
                          className="button inputGroup__resend_button"
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
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleVerifyCode(e)}
                        data-cy="verify"
                      >
                        Verify Code
                      </button>
                    )}
                  </div>
                </PureBlock>
              )}
              {smsSuccessView && displaySmsVerificationSuccessView()}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Login
