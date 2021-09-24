import {useState, useEffect} from 'react';
import Image from "next/image";
import PureBlock from "../../component/pureBlock";
import {UseAuthDataStateValue} from "../../context/AuthContext";
import {AuthContextStaticData} from "../../static/AuthContextStaticData";
import InputMask, {InputState} from "react-input-mask";
import firebase from "../../lib/firbase";
import CircleLoader from "../../component/utils/CircleLoader";
import ReactCodeInput from "react-verification-code-input";
import {useRouter} from "next/router";

interface IFirebaseAuthProps {
    user?: {
        getIdToken: () => Promise<string>
    }
}

export default function Login() {

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [inputMaskValue, setInputMaskValue] = useState<string>("");
    const router = useRouter()
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState<boolean>(false);
    const [verificationResult, setVerificationResult] = useState<{
        confirm: (verificationCode: string) => Promise<object>
    }>()
    const [loading, setLoading] = useState<boolean>(false);
    const {authDataState, setAuthDataState} = UseAuthDataStateValue();
    const [errMessage, setErrMessage] = useState<string>("");
    const [isVerificationLoading, setIsVerificationLoading] = useState<boolean>(false)
    const [timerDuration, setTimerDuration] = useState<number>(5);
    const [displayDuration, setDisplayDuration] = useState<number>(0);

    const startCountdown = () => {
        let duration = timerDuration;
        const timer = setInterval(() => {
            setDisplayDuration(duration);
            duration--;
            if (duration === -1) {
                clearInterval(timer);
            }
        }, 1000);
    };

    const handleVerificationCodeChange = (verificationCode: string) => {
        setVerificationCode(verificationCode)
    }

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
    };

    const beforeMaskedValueChange = (newState: InputState) => {
        let {value} = newState
        let selection = newState.selection
        let cursorPosition = selection ? selection.start : null
        setInputMaskValue(value)
        if (value.endsWith("-")) {
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
        try {
            return await firebase
                .auth()
                .signInWithPhoneNumber(phone ? phone : phoneNumber, authDataState.reCaptchaVerifier as any)
        } catch (e) {
            setErrMessage(e.message)
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
        e.preventDefault()
        if (!authDataState.reCaptchaVerifier) {
            getFirebaseCaptcha()
        } else {
            if (verificationResult) {
                verificationResult
                    .confirm(verificationCode)
                    .then((result: IFirebaseAuthProps) => {
                        setIsVerificationLoading(true)
                        const user = result.user
                        if (user) {
                            user.getIdToken().then((token: string) => {
                                localStorage.setItem("accessToken", token)
                                setAuthDataState({type: AuthContextStaticData.UPDATE_AUTH_TOKEN, token})
                                router.push(`/webPortalResult`)
                            })
                        }
                    })
                    .catch((err) => {
                        setIsVerificationLoading(true)
                        // router.push(`/verification-result/${VerificationResults.failed}`)
                    })
            }
        }
        setIsVerificationLoading(false)
    }

    const getFirebaseCaptcha = () => {
        const reCaptchaVerifier = new firebase.auth.RecaptchaVerifier("re-captcha", {
            size: "invisible",
        })
        reCaptchaVerifier.render()
        setAuthDataState({type: AuthContextStaticData.UPDATE_RE_CAPTCHA, reCaptchaVerifier})
    }

    useEffect(() => {
        getFirebaseCaptcha()

        return () => {
            setAuthDataState({type: AuthContextStaticData.UPDATE_RE_CAPTCHA, reCaptchaVerifier: ""})
        }
    }, [])

    return (
        <>
            <button className="hidden" id="re-captcha" />
            {!isVerificationCodeSent ? (<PureBlock flow={true}>
                <div>
                    <Image src='/logo.svg' width={136} height={16} alt={"logo"}/>
                </div>
                <div>
                    <span className="header">Login</span>
                </div>
                <div>
                    <span className="message">
                        Enter your mobile number to secure your access
                    </span>
                </div>
                <div className='inputGroup'>
                    <span>
                        Phone number <em>*</em>
                    </span>
                    <InputMask
                        mask="+1(999)999-9999"
                        value={phoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handlePhoneNumberChange(e.target.value)
                        }
                        beforeMaskedValueChange={beforeMaskedValueChange}
                    >
                        {(inputProps: {value: string; onChange: () => void}) => (
                            <input
                                {...inputProps}
                                type="tel"
                                className="input inputGroup__input"
                                placeholder="(555) 555 - 5555"
                                aria-label="Phone Number"
                            />
                        )}
                    </InputMask>

                    {loading ? (
                        <CircleLoader className="middle-loader" />
                    ) : (
                    <button
                        onClick={handlePhoneSMSSend}
                        className='button inputGroup__button'
                    >
                        Next
                    </button>
                    )}

                </div>
            </PureBlock>)
            : (<PureBlock flow={true}>
                <div>
                    <Image src='/logo.svg' width={136} height={16} alt={"logo"}/>
                </div>
                <div>
                    <span className="header">SMS Verification</span>
                </div>
                <div>
                    <span className="message">
                        A code has been sent to your Mobile Phone Number to login to the FH Health Web Portal.
                        Please enter it below to continue.
                    </span>
                </div>
                <div className='inputGroup inputGroup_verify'>
                    <ReactCodeInput
                        type={"text"}
                        placeholder={["-", "-", "-", "-", "-", "-"]}
                        onChange={handleVerificationCodeChange}
                    />
                    {
                        displayDuration === 0 ? (
                            <div className='inputGroup__resend'>
                                <span>Didn't receive the sms?</span>
                                <br/>
                                <button
                                    onClick={startCountdown}
                                    className='button inputGroup__resend_button'
                                >
                                    Resend
                                </button>
                            </div>
                        ) : <>{displayDuration}</>
                    }
                    <button className='button inputGroup__button' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleVerifyCode(e)}>
                        Verify Code
                    </button>
                </div>
            </PureBlock>)}
        </>
    )
}
