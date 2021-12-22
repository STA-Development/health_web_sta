import Image from 'next/image'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import PureBlock from '@fh-health/component/pureBlock'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import ReactCodeInput from 'react-verification-code-input'
import {load, ReCaptchaInstance} from 'recaptcha-v3'
import * as Sentry from '@sentry/nextjs'
import conferenceManager from '@fh-health/manager/conferenceManager'
import {UseConfDataStateValue} from '@fh-health/context/conferenceContext'
import PermissionsModal from '@fh-health/component/base/conference/partials/permissionsModal'
import checkMediaDevicePermissions from '@fh-health/utils/mediaPermissions'
import KitNumberModal from '@fh-health/component/base/conference/partials/testKitModal'
import Card from '@fh-health/component/utils/card'
import ConferenceContextStaticData from '@fh-health/static/conferenceContextStaticData'
import {IPatientInfo} from '@fh-health/types/context/ConferenceContext'
import PermissionDenyModal from "@fh-health/component/base/conference/partials/permissionDenyModal"

const ConferenceJoinView = () => {
  const [kitNumber, setKitNumber] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [joinButtonState, setJoinButtonState] = useState<boolean>(false)
  const [kitNumberModalView, setKitNumberModalView] = useState<boolean>(false)
  // TODO: We Should have one more endpoint for checking current appointmentToken expiration
  const [isMediaModalAvailable, setIsMediaModalAvailable] = useState<boolean>(false)
  const [permissionDenyModalView, setPermissionDenyModalView] = useState<boolean>(false)
  const [isLinkExpired, setIsLinkExpired] = useState<boolean>(false)
  const [patientInfo, setPatientInfo] = useState<IPatientInfo>({
    firstName: '',
    kitCode: '',
    lastName: '',
    testType: '',
  })
  const {setConfDataState} = UseConfDataStateValue()

  const router = useRouter()
  const {appointmentToken} = router.query

  const handleKitNumberChange = (kitCode: string) => {
    setKitNumber(kitCode)
    setWarningMessage('')
  }

  const toggleKitNumberModal = () => {
    setKitNumberModalView(!kitNumberModalView)
  }

  const closeMediaModal = () => {
    setIsMediaModalAvailable(false)
  }

  const openPermissionDenyModal = () => {
    setPermissionDenyModalView(true)
  }

  const checkKitNumber = (value: string) => {
    if (value.length === 6) {
      setJoinButtonState(true)
    } else {
      setJoinButtonState(false)
    }
  }

  const getRecaptcha = async () => {
    try {
      const captchaToken = process.env.RECAPTCHA_V3_KEY
      if (captchaToken) {
        return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) =>
          recaptcha.execute('submit'),
        )
      }
    } catch (err) {
      console.error('Captcha token is undefined', err)
    }
  }

  const handleJoinClick = async () => {
    setLoading(true)
    const captchaToken = await getRecaptcha()
    try {
      if (captchaToken && kitNumber && appointmentToken) {
        const convertedKit = kitNumber.toUpperCase()
        const result = await conferenceManager.getWaitingToken(
          captchaToken,
          convertedKit,
          appointmentToken as string,
        )
        const {waitingToken} = result.data.data
        localStorage.setItem('appointmentToken', appointmentToken as string)
        setConfDataState({type: ConferenceContextStaticData.SET_WAITING_TOKEN, waitingToken})
        setConfDataState({
          type: ConferenceContextStaticData.UPDATE_PATIENT_INFO,
          patientInfo: {...patientInfo, kitCode: kitNumber},
        })
        await router.push('/conference/room')
      } else {
        throw {
          response: {
            data: {
              status: {
                message: 'Some Data was missed',
              },
            },
          },
        }
      }
    } catch (err) {
      Sentry.captureException(err)
      setWarningMessage(
        err?.response?.data?.status?.message
          ? err?.response?.data?.status?.message
          : 'Something Went Wrong',
      )
    }
    setLoading(false)
  }

  const getAppointmentInfo = async () => {
    try {
      const captchaToken = await getRecaptcha()
      if (captchaToken && appointmentToken) {
        const result = await conferenceManager.getAppointmentInfo(
          captchaToken,
          appointmentToken as string,
        )
        const patientRegisteredInfo = {
          firstName: result.data.data.firstName,
          lastName: result.data.data.lastName,
          testType: result.data.data.testType,
          kitCode: '',
        }
        setPatientInfo(patientRegisteredInfo)
        setIsLinkExpired(false)
      }
    } catch (err) {
      Sentry.captureException(err)
      setIsLinkExpired(true)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (!(await checkMediaDevicePermissions())) {
        setIsMediaModalAvailable(true)
      }
    })()
  }, [])

  useEffect(() => {
    let isRequestHandled = true
    ;(async () => {
      if (appointmentToken?.length && isRequestHandled) {
        await getAppointmentInfo()
        setIsFetching(false)
      }
    })()

    return () => {
      isRequestHandled = false
    }
  }, [appointmentToken])

  return (
    <>
      <div className={isFetching ? "centered-content" : "centered-content centered-content_hidden"}>
        <CircleLoader className="middle-loader" />
      </div>
      {kitNumberModalView && (
        <KitNumberModal closeModal={toggleKitNumberModal} />
      )}
      {isMediaModalAvailable && <PermissionsModal closeModal={closeMediaModal} openDenyModal={openPermissionDenyModal} />}
      {permissionDenyModalView && <PermissionDenyModal />}
      <div className="pure-block-wrapper">
        {(!isLinkExpired && !isFetching) ? (
          <div>
            <PureBlock flow center={false} isNoResults={false}>
              <div className="logo">
                <Image src="/logo.svg" width={136} height={16} alt="logo" />
              </div>
              <div>
                <span className="header">Join Video Call</span>
              </div>
              <div>
                <span className="message">
                  In order to enter your consultation please locate the code on your kit.
                </span>
              </div>
              <div className="inputGroup inputGroup_kit-code">
                <span className="kit-code-label">
                  Test Kit Number <em>*</em>
                </span>
                <ReactCodeInput
                  className={warningMessage ? 'input inputGroup__input_err' : 'input'}
                  type="text"
                  placeholder={['-', '-', '-', '-', '-', '-']}
                  onChange={(value: string) => {
                    handleKitNumberChange(value)
                    checkKitNumber(value)
                  }}
                />
                {warningMessage?.length ? <p className="wrong-kit-code">{warningMessage}</p> : ''}
                <div className="inputGroup__resend">
                  <span>Can&apos;t locate your test Kit number?</span>
                  <br />
                  <button
                    type="button"
                    onClick={toggleKitNumberModal}
                    className="button inputGroup__resend_button"
                  >
                    Find kit number
                  </button>
                </div>

                {loading ? (
                  <CircleLoader className="middle-loader" />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleJoinClick()}
                    className={
                      joinButtonState
                        ? 'button inputGroup__button'
                        : 'button inputGroup__button inputGroup__button_disabled'
                    }
                    data-cy="join"
                  >
                    Join Call
                  </button>
                )}
              </div>
            </PureBlock>
          </div>
        ) : (
          <div className="card-wrapper">
            <Card permissions={false}>
              <div className="card__media card__media_sm">
                <Image src="/error-cross.svg" alt="kit number" height={64} width={64} />
              </div>
              <div className="card__content">
                <h4 className="card__content-title">Sign-in Link has Expired</h4>
                <p className="card__content-message">
                  Uh Oh, It seems this link has expired. <br />
                  Please Visit{' '}
                  <a href="https://www.fhhealth.com/" className="em-link">
                    fhhealth.com
                  </a>{' '}
                  to to speak to a customer <br />
                  service representative.
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
        )}
      </div>
    </>
  )
}

export default ConferenceJoinView
