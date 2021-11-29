import RippleLoader from "./icon/rippleLoader"
import { useNetworkState } from "react-use"
import {useEffect, useState} from "react"
import NetworkConnectionLost from "./partials/networkConnectionLost"
import ConferenceFinalView from "./partials/conferenceFinalView"
import {useRouter} from "next/router"

export default function VideoWrapper({ isConference }: { isConference?: boolean }) {
    const condition = useNetworkState()
    const [isOnline, setIsOnline] = useState(true)
    const router = useRouter()

    const retryConnecting = () => {
        if (condition.online) {
            setIsOnline(true)
        }
    }

    const returnHome = () => {
        router.push('/auth/login')
    }

    useEffect(() => {
        if (!condition.online) {
            setIsOnline(false)
        }
    }, [condition.online])

    return (
        <>
            {isOnline && (
                <div className='video-wrapper'>
                    {isConference ? (
                      <>
                          <video id="videoStream"/>
                          <video id="myVideoStream"/>
                      </>
                    ) : (
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
                    )}
                </div>
            )}
            {(isOnline && !isConference) && <ConferenceFinalView returnHome={returnHome}/>}
            {!isOnline &&  <NetworkConnectionLost retry={retryConnecting}/>}
        </>
    )
}
