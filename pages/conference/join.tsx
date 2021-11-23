import Image from "next/image";
import CircleLoader from "../../component/utils/CircleLoader";
import PureBlock from "../../component/pureBlock";
import {useState} from "react";
import {UseAuthDataStateValue} from "../../context/AuthContext";
import InputMask from "react-input-mask";
import KitNumberModal from "../../component/base/conference/partials/testKitModal";
import Card from "../../component/utils/Card";
import PermissionsModal from "../../component/base/conference/partials/permissionsModal"

export default function ConferenceJoinView() {
    const [kitNumber, setKitNumber] = useState<string>("")
    const [inputMaskValue, setInputMaskValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const {authDataState, setAuthDataState} = UseAuthDataStateValue()
    const [warningMessage, setWarningMessage] = useState<string>("")
    const [joinButtonState, setJoinButtonState] = useState<boolean>(false)
    const [kitNumberModalView, setKitNumberModalView] = useState<boolean>(false)
    const [isMediaModalAvailable, setIsMediaModalAvailable] = useState<boolean>(true)
    const [isLinkExpired, setIsLinkExpired] = useState<boolean>(false)

    const handleKitNumberChange = (kitNumber: string) => {
        setKitNumber(kitNumber)
    };

    const toggleKitNumberModal = () => {
        setKitNumberModalView(!kitNumberModalView)
    }

    const closeMediaModal = () => {
        setIsMediaModalAvailable(false)
    }

    const checkKitNumber = (value: string) => {
        let maskValues = Array.from(value)
        let pureNumber = maskValues.filter((char: string) => !isNaN(Number(char)) ? char : false)
        if (pureNumber.length === 11) {
            setJoinButtonState(true)
        } else {
            setJoinButtonState(false)
        }
    };

    const beforeMaskedValueChange = (newState: any) => {
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

    return (
        <>
            {
                kitNumberModalView &&
                <KitNumberModal
                    visibility={kitNumberModalView}
                    closeModal={setKitNumberModalView}
                />
            }
            { isMediaModalAvailable && <PermissionsModal closeModal={closeMediaModal}/>}
            <div className='pure-block-wrapper'>
                {!isLinkExpired ? (
                    <PureBlock flow={true}>
                        <div>
                            <Image src='/logo.svg' width={136} height={16} alt={"logo"}/>
                        </div>
                        <div>
                            <span className="header">Join Video Call</span>
                        </div>
                        <div>
                                <span className="message">
                                    In order to enter your consultation please locate the code on your kit.
                                </span>
                        </div>
                        <div className='inputGroup'>
                                <span>
                                    Test Kit Number <em>*</em>
                                </span>
                            <InputMask
                                mask="+1(999)999-9999"
                                value={kitNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleKitNumberChange(e.target.value);
                                    checkKitNumber(e.target.value);
                                }
                                }
                                beforeMaskedStateChange={beforeMaskedValueChange}
                            >
                                {(inputProps: {value: string; onChange: () => void}) => (
                                    <input
                                        {...inputProps}
                                        type="tel"
                                        className={warningMessage ? 'input inputGroup__input inputGroup__input_err' : 'input inputGroup__input'}
                                        placeholder="(555) 555 - 5555"
                                        aria-label="Phone Number"
                                        data-cy='testKitNumber'/>
                                )}
                            </InputMask>

                            <div className='inputGroup__resend'>
                                <span>Can't locate your test Kit number?</span>
                                <br/>
                                <button
                                    onClick={toggleKitNumberModal}
                                    className='button inputGroup__resend_button'
                                >
                                    Find kit number
                                </button>
                            </div>

                            {loading ? (
                                <CircleLoader className="middle-loader" />
                            ) : (
                                <button
                                    onClick={() => {}}
                                    className={joinButtonState ? 'button inputGroup__button' : 'button inputGroup__button inputGroup__button_disabled'}
                                    data-cy='join'>
                                    Join Call
                                </button>
                            )}
                        </div>
                    </PureBlock>
                ) : (
                    <div className='card-wrapper'>
                        <Card>
                            <div className='card__media'>
                                <Image src='/error-cross.svg' alt='kit number' height={64} width={64}/>
                            </div>
                            <div className='card__content'>
                                <h4 className='card__content-title'>Sign-in Link has Expired</h4>
                                <p className='card__content-message'>
                                    Uh Oh, It seems this link has expired. <br/>
                                    Please Visit <a href='#' className='em-link'>fhhealth.com</a> to to speak to a customer <br/>
                                    service representative.
                                </p>
                            </div>
                        </Card>

                        <p className='card-wrapper__message'>
                            Need help? <br/>
                            Live Chat available on <a href='#' className='em-link'>fhhealth.com</a>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
