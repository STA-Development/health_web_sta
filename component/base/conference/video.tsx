import RippleLoader from "./icon/rippleLoader"
import { useNetworkState } from "react-use"
import {useEffect, useState} from "react"
import NetworkConnectionLost from "./partials/networkConnectionLost"
import ConferenceFinalView from "./partials/conferenceFinalView"
import {useRouter} from "next/router"
import Consultation from "./partials/consultation"

interface IVideoWrapper {
    isConferenceStarted?: boolean,
    isConferenceEnded?: boolean,
    triggerCallEnd?: () => void,
    switchAudioState?: () => void
}

export default function VideoWrapper({ isConferenceStarted, isConferenceEnded, triggerCallEnd, switchAudioState }: IVideoWrapper) {
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
            {(isOnline && !isConferenceEnded) && (
                <div className='video-wrapper'>
                    {isConferenceStarted ? (
                      <Consultation
                        triggerCallEnd={triggerCallEnd}
                        switchAudioState={switchAudioState}
                      />
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
            {(isOnline && isConferenceEnded) && <ConferenceFinalView returnHome={returnHome}/>}
            {!isOnline &&  <NetworkConnectionLost retry={retryConnecting}/>}
        </>
    )
}
