import {useEffect, useState} from 'react'
import Image from 'next/image'
import PureBlock from '@fh-health/component/pureBlock'
import {UseAuthDataStateValue} from '@fh-health/context/AuthContext'
import {AuthContextStaticData} from '@fh-health/static/AuthContextStaticData'
import InputMask from 'react-input-mask'
import firebase from 'lib/firbase'
import CircleLoader from '@fh-health/component/utils/CircleLoader'
import ReactCodeInput from 'react-verification-code-input'
import {useRouter} from 'next/router'
import Notification from '@fh-health/component/notification'

interface IFirebaseAuthProps {
  user?: {
    getIdToken: () => Promise<string>
  }
}

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState<boolean>(false)
  const [verificationResult, setVerificationResult] = useState<{
    confirm: (verificationCode: string) => Promise<object>
  }>()
  const [loading, setLoading] = useState<boolean>(false)
  const {authDataState, setAuthDataState} = UseAuthDataStateValue()
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')
  const [timerDuration] = useState<number>(20)
  const [displayDuration, setDisplayDuration] = useState<number>(0)
  const [loginButtonState, setLoginButtonState] = useState<boolean>(false)
  const [verifyButtonState, setVerifyButtonState] = useState<boolean>(false)

  const startCountdown = () => {
    let duration = timerDuration
    const timer = setInterval(() => {
      setDisplayDuration(duration)
      duration--
      if (duration === -1) {
        handlePhoneSMSSend()
        clearInterval(timer)
      }
    }, 1000)
  }

  const handleVerificationCodeChange = (verificationCode: string) => {
    setVerificationCode(verificationCode)
  }

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber)
  }

  const beforeMaskedValueChange = (newState) => {
    let {value} = newState
    let {selection} = newState
    let cursorPosition = selection ? selection.start : null
    if (value.endsWith('-')) {
      if (cursorPosition === value.length) {
        cursorPosition--
        selection = {start: cursorPosition, end: cursorPosition}
      }
      value = value.slice(0, -1)
    }

    return {
      value,
      selection,
    }
  }

  const sendSMSToPhoneNumber = async (phone?: string) => {
    setWarningMessage('')
    try {
      return await firebase
        .auth()
        .signInWithPhoneNumber(
          phone || phoneNumber,
          authDataState.reCaptchaVerifier as firebase.auth.RecaptchaVerifier,
        )
    } catch (e) {
      getFirebaseCaptcha()
      setWarningMessage(e.message)
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
            localStorage.setItem('accessToken', token)
            setAuthDataState({type: AuthContextStaticData.UPDATE_AUTH_TOKEN, token})
            router.push(`/results/list`)
          })
        }
      } catch (err) {
        getFirebaseCaptcha()
        setErrMessage(err.message)
      }
    }
    setLoading(false)
  }

  const getFirebaseCaptcha = () => {
    firebase.auth().settings.appVerificationDisabledForTesting =
      process.env.APP_TESTING_MODE === 'true'
    const reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('re-captcha', {
      size: 'invisible',
    })
    reCaptchaVerifier.render()
    setAuthDataState({type: AuthContextStaticData.UPDATE_RE_CAPTCHA, reCaptchaVerifier})
  }

  const checkPhoneNumber = (value: string, type: string) => {
    if (type === 'login') {
      const maskValues = Array.from(value)
      const pureNumber = maskValues.filter((char: string) => (!isNaN(Number(char)) ? char : false))

      if (pureNumber.length === 11) setLoginButtonState(true)
      else setLoginButtonState(false)
    } else if (value.length === 6) setVerifyButtonState(true)
    else setVerifyButtonState(false)
  }

  useEffect(() => {
    getFirebaseCaptcha()

    return () => {
      setAuthDataState({type: AuthContextStaticData.UPDATE_RE_CAPTCHA, reCaptchaVerifier: ''})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {warningMessage ? (
        <Notification type="warning">{warningMessage}</Notification>
      ) : errMessage ? (
        <Notification type="error">{errMessage}</Notification>
      ) : (
        ''
      )}
      <div className="pure-block-wrapper">
        <div>
          <button className="hidden" id="re-captcha" />
          {!isVerificationCodeSent ? (
            <>
              <PureBlock flow>
                <div className="logo">
                  <Image src="/logo.svg" width={136} height={16} alt="logo" />
                </div>
                <div>
                  <span className="header">Login</span>
                </div>
                <div>
                  <span className="message">Enter your mobile number to secure your access</span>
                </div>
                <div className="inputGroup">
                  <span>
                    Phone Number <em>*</em>
                  </span>
                  <InputMask
                    mask="+1(999)999-9999"
                    value={phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handlePhoneNumberChange(e.target.value)
                      checkPhoneNumber(e.target.value, 'login')
                    }}
                    beforeMaskedStateChange={beforeMaskedValueChange}
                  >
                    {(inputProps: {value: string; onChange: () => void}) => (
                      <input
                        {...inputProps}
                        type="tel"
                        className={
                          warningMessage
                            ? 'input inputGroup__input inputGroup__input_err'
                            : 'input inputGroup__input'
                        }
                        placeholder="(555) 555 - 5555"
                        aria-label="Phone Number"
                        data-cy="phoneNumber"
                      />
                    )}
                  </InputMask>

                  {loading ? (
                    <CircleLoader className="middle-loader" />
                  ) : (
                    <button
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
                  <a href="fhhealth.com" className="link">
                    fhhealth.com
                  </a>{' '}
                </p>
              </span>
            </>
          ) : (
            <PureBlock flow>
              <div>
                <Image src="/logo.svg" width={136} height={16} alt="logo" />
              </div>
              <div>
                <span className="header">SMS Verification</span>
              </div>
              <div>
                <span className="message">
                  A code has been sent to your Mobile Phone Number to login to the FH Health Web
                  Portal. Please enter it below to continue.
                </span>
              </div>
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
                    <button onClick={startCountdown} className="button inputGroup__resend_button">
                      Resend code in 5
                    </button>
                  </div>
                ) : (
                  <>{displayDuration}</>
                )}
                {loading ? (
                  <CircleLoader className="middle-loader" />
                ) : (
                  <button
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
        </div>
      </div>
    </>
  )
}
