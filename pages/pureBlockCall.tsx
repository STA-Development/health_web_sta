import PureBlock from "../component/pureBlock";
import Image from "next/image";
import Notification from "../component/notification";
export default function pureBlockCall() {
    return (
        <>
            <Notification type="warning">
                <>The code you entered is incorrect. Please try again</>
            </Notification>
            <PureBlock flow={false}>
                <div>
                    <Image src='/check.svg' width={64} height={64} alt={"logo"}/>
                </div>
                <div>
                    <span className="header">Phone Number Verified!</span>
                </div>
                <div>
                    <span className="message">
                        Your Mobile Phone Number has been verified. Your results will be sent to you via SMS as soon as they are available
                    </span>
                </div>
            </PureBlock>
        </>
    )
}
