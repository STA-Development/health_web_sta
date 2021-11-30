import Image from "next/image"
import CircleLoader from "../../component/utils/CircleLoader"
import PureBlock from "../../component/pureBlock"
import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import ReactCodeInput from "react-verification-code-input"
import {load, ReCaptchaInstance} from "recaptcha-v3"
import conferenceManager from "../../manager/ConferenceManager"
import {UseConfDataStateValue} from "../../context/ConferenceContext"
import PermissionsModal from "../../component/base/conference/partials/permissionsModal"
import {checkMediaDevicePermissions} from "../../utils/mediaPermissions"
import KitNumberModal from "../../component/base/conference/partials/testKitModal"
import Card from "../../component/utils/Card"
import {ConferenceContextStaticData} from "../../static/ConferenceContextStaticData"
import {IPatientInfo} from "../../types/context/ConferenceContext"

export default function ConferenceJoinView() {
  const [kitNumber, setKitNumber] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [warningMessage, setWarningMessage] = useState<string>("")
  const [joinButtonState, setJoinButtonState] = useState<boolean>(false)
  const [kitNumberModalView, setKitNumberModalView] = useState<boolean>(false)
  //TODO: We Should have one more endpoint for checking current appointmentToken expiration
  const [isMediaModalAvailable, setIsMediaModalAvailable] = useState<boolean>(false)
  const [isLinkExpired, setIsLinkExpired] = useState<boolean>(false)
  const [patientInfo, setPatientInfo] = useState<IPatientInfo>({firstName: "", kitCode: "", lastName: "", testType: ""})
  const { setConfDataState } = UseConfDataStateValue()

  const router = useRouter()
  const {appointmentToken} = router.query

  const handleKitNumberChange = (kitNumber: string) => {
    setKitNumber(kitNumber)
    setWarningMessage("")
  }

  const toggleKitNumberModal = () => {
    setKitNumberModalView(!kitNumberModalView)
  }

  const closeMediaModal = () => {
    setIsMediaModalAvailable(false)
  }
  const checkKitNumber = (value: string) => {
    if (value.length === 6) {
      setJoinButtonState(true)
    } else {
      setJoinButtonState(false)
    }
  }

  const getRecaptcha = async () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) => {
        return recaptcha.execute("submit")
      })
    } else {
      console.error("Captcha token is undefined")
    }
  }

  const handleJoinClick = async () => {
    setLoading(true)
    const captchaToken = await getRecaptcha()
    try {
      if (captchaToken && kitNumber && appointmentToken) {
        const result = await conferenceManager.getWaitingToken(captchaToken, kitNumber, appointmentToken as string)
        const waitingToken = result.data.data.waitingToken
        localStorage.setItem("appointmentToken", appointmentToken as string)
        setConfDataState({ type: ConferenceContextStaticData.SET_WAITING_TOKEN, waitingToken })
        setConfDataState({type: ConferenceContextStaticData.UPDATE_PATIENT_INFO, patientInfo: {...patientInfo, kitCode: kitNumber}})
        await router.push("/conference/room")
      } else {
        throw {
          response: {
            data: {
              status: {
                message: "Some Data was missed",
              },
            },
          },
        }
      }
    } catch (err) {
      setWarningMessage(err?.response?.data?.status?.message ? err?.response?.data?.status?.message : "Something Went Wrong")
    }
    setLoading(false)
  }

  const getAppointmentInfo = async () => {
    try {
      const captchaToken = await getRecaptcha()
      if(captchaToken && appointmentToken) {
        const result = await conferenceManager.getAppointmentInfo(captchaToken, appointmentToken as string)
        const patientInfo = {
          firstName: result.data.data.firstName,
          lastName: result.data.data.lastName,
          testType: result.data.data.testType,
          kitCode: '',
        }
        setPatientInfo(patientInfo)
        setIsLinkExpired(false);
      }

    } catch (err) {
      setIsLinkExpired(true)
    }
  }

  useEffect(() => {
    (async () => {
      if (!await checkMediaDevicePermissions()) {
        setIsMediaModalAvailable(true)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if(appointmentToken?.length) {
        await getAppointmentInfo();
      }
    })()
  }, [appointmentToken])
  return (
    <>
      {
        kitNumberModalView &&
        <KitNumberModal
          visibility={kitNumberModalView}
          closeModal={setKitNumberModalView}
        />
      }{isMediaModalAvailable && <PermissionsModal closeModal={closeMediaModal} />}
      <div className="pure-block-wrapper">
        {!isLinkExpired ? (
          <PureBlock flow={true}>
            <div className="logo">
              <Image src="/logo.svg" width={136} height={16} alt={"logo"} />
            </div>
            <div>
              <span className="header">Join Video Call</span>
            </div>
            <div>
                <span className="message">
                    In order to enter your consultation please locate the code on your kit.
                </span>
            </div>
            <div className="inputGroup">
              <span>
                  Test Kit Number <em>*</em>
              </span>
              <ReactCodeInput
                className={warningMessage ? "input inputGroup__input_err" : "input"}
                type={"text"}
                placeholder={["-", "-", "-", "-", "-", "-"]}
                onChange={(value: string) => {
                  handleKitNumberChange(value)
                  checkKitNumber(value)
                }}
              />
              {
                warningMessage?.length ? (
                  <p className="wrong-kit-code">{warningMessage}</p>
                ) : ""
              }
              <div className="inputGroup__resend">
                <span>Can't locate your test Kit number?</span>
                <br />
                <button
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
                  onClick={() => handleJoinClick()}
                  className={joinButtonState ? "button inputGroup__button" : "button inputGroup__button inputGroup__button_disabled"}
                  data-cy="join">
                  Join Call
                </button>
              )}
            </div>
          </PureBlock>
        ) : (
          <div className="card-wrapper">
            <Card>
              <div className="card__media card__media_sm">
                <Image src="/error-cross.svg" alt="kit number" height={64} width={64} />
              </div>
              <div className="card__content">
                <h4 className="card__content-title">Sign-in Link has Expired</h4>
                <p className="card__content-message">
                  Uh Oh, It seems this link has expired. <br />
                  Please Visit <a href="#" className="em-link">fhhealth.com</a> to to speak to a customer <br />
                  service representative.
                </p>
              </div>
            </Card>

            <p className="card-wrapper__message">
              Need help? <br />
              Live Chat available on <a href="#" className="em-link">fhhealth.com</a>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
