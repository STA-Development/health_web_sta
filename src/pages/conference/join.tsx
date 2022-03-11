import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import ReactCodeInput from 'react-verification-code-input'
import * as Sentry from '@sentry/nextjs'
import conferenceManager from '@fh-health/manager/conferenceManager'
import checkMediaDevicePermissions from '@fh-health/utils/mediaPermissions'
import getV3RecaptchaToken from '@fh-health/utils/getV3RecaptchaToken'
import ConferenceContextStaticData from '@fh-health/static/conferenceContextStaticData'
import {IPatientInfo} from '@fh-health/types/context/ConferenceContext'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'
import PermissionsModal from '@fh-health/components/conference/permissionsModal'
import KitNumberModal from '@fh-health/components/conference/testKitModal'
import Card from '@fh-health/components/utils/card'
import PermissionsDenyModal from '@fh-health/components/conference/permissionsDenyModal'
import PureBlock from '@fh-health/components/results/pureBlock'
import CircleLoader from '@fh-health/components/utils/circleLoader'

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

  const router = useRouter()
  const {appointmentToken} = router.query
  const {setConfDataState} = UseConfDataStateValue()

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

  const handleJoinClick = async () => {
    setLoading(true)
    const captchaToken = await getV3RecaptchaToken()
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
      const captchaToken = await getV3RecaptchaToken()
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
      <div className={isFetching ? 'centered-content' : 'centered-content centered-content_hidden'}>
        <CircleLoader className="middle-loader" />
      </div>
      {kitNumberModalView && <KitNumberModal closeModal={toggleKitNumberModal} />}
      {isMediaModalAvailable && (
        <PermissionsModal closeModal={closeMediaModal} openDenyModal={openPermissionDenyModal} />
      )}
      {permissionDenyModalView && <PermissionsDenyModal />}
      {!isLinkExpired && !isFetching && (
        <div className="pure-block-wrapper">
          <div>
            <PureBlock flow center={false} isNoResults={false}>
              <div className="logo">
                <Image src="/logo.svg" width={136} height={16} alt="logo" />
              </div>
              <h4 className="header">Join Video Call</h4>
              <p className="message">
                In order to enter your consultation please locate the code on your kit.
              </p>
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

                {loading ? (
                  <CircleLoader className="middle-loader" />
                ) : (
                  <button
                    type="button"
                    onClick={handleJoinClick}
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
        </div>
      )}
      {isLinkExpired && !isFetching && (
        <div className="pure-block-wrapper">
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
        </div>
      )}
    </>
  )
}

export default ConferenceJoinView
