import RippleLoader from "./icon/rippleLoader";
import { useNetworkState } from "react-use";
import {useEffect, useState} from "react";
import NetworkConnectionLost from "./partials/networkConnectionLost";

export default function VideoWrapper() {
    const condition = useNetworkState()
    const [isOnline, setIsOnline] = useState(true)

    const retryConnecting = () => {
        if (condition.online) {
            setIsOnline(true)
        }
    }

    useEffect(() => {
        if (!condition.online) {
            setIsOnline(false)
        }
    }, [condition.online])

    return (
        <>
            {isOnline ? (
                <div className='video-wrapper'>
                    <div className='video-wrapper__content'>
                        <RippleLoader/>
                        <h4>You are in the waiting room</h4>
                        <p>
                            Your call will being as soon as the
                            <br/>
                            Health Professional is ready.
                        </p>
                        <p>Thank you for your patience!</p>
                    </div>
                </div>
            ) : <NetworkConnectionLost retry={retryConnecting}/>}
        </>
    )
}
