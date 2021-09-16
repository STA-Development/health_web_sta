import {useState} from 'react';
import Image from "next/image";
import PureBlock from "../../component/pureBlock";
import ReactCodeInput from "react-verification-code-input";

export default function Verify() {

    const [verificationCode, setVerificationCode] = useState<string>("");
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

    return (
        <>
            <PureBlock flow={true}>
                <div>
                    <Image src='/logo.svg' width={136} height={16}/>
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
                    <button className='button inputGroup__button'>
                        Verify Code
                    </button>
                </div>
            </PureBlock>
        </>
    )
}
