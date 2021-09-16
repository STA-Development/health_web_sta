import {useState} from 'react';
import Image from "next/image";
import PureBlock from "../../component/pureBlock";
import InputMask, {InputState} from "react-input-mask"

export default function SignIn() {

    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [inputMaskValue, setInputMaskValue] = useState<string>("")

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber)
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

    return (
        <>
            <PureBlock flow={true}>
                <div>
                    <Image src='/logo.svg' width={136} height={16}/>
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
                        mask="(999) 999 - 9999"
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
                    <button className='button inputGroup__button'>
                        Next
                    </button>
                </div>
            </PureBlock>
        </>
    )
}
